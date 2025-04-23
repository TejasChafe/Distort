import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors({
    origin : '*',
    // methods : ['POST','GET','PUT','DELETE','OPTIONS'],
    // credentials : true
}))
await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.use('/api/comments', commentRoutes)
app.get('/', (req,res)=> res.send("API Working"))

const clientDistPath = path.join(__dirname,'client','dist')
app.use(express.static(clientDistPath))

app.get('*',(req,res)=>{
    res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.listen(PORT, ()=> console.log('Server running on port: ' + PORT));