import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import * as fabric from 'fabric'
import ImageEditor from '../components/ImageEditor'

const Editing = () => {
  return (
    <>
      <ImageEditor/>
    </>
  )
}

export default Editing



  // const canvasRef = useRef(null);
  // const fileInputRef = useRef(null);
  // const [canvas, setCanvas] = useState(null);

  // useEffect(() => {
  //   const newCanvas = new fabric.Canvas(canvasRef.current, {
  //     width: 500,
  //     height: 500,
  //     backgroundColor: '#f3f3f3',
  //   });
  //   setCanvas(newCanvas);

  //   // Load image from assets
  //   const imageUrl = assets.car; // Ensure this exists in assets.js
  //   if (imageUrl) {
  //     fabric.FabricImage.fromURL(imageUrl, (img) => {
  //       img.scaleToWidth(300);
  //       img.set({ left: 100, top: 100 });
  //       newCanvas.add(img);
  //       newCanvas.setActiveObject(img);
  //     }, { crossOrigin: 'anonymous' }); // Fix CORS issue if needed
  //   } else {
  //     console.error("Image URL not found in assets.js");
  //   }

  //   return () => newCanvas.dispose();
  // }, []);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       fabric.FabricImage.fromURL(e.target.result, (img) => {
  //         img.scaleToWidth(300);
  //         img.set({ left: 100, top: 100, selectable: true });
  //         canvas.add(img);
  //         canvas.setActiveObject(img);
  //         canvas.renderAll();
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // // Delete selected object
  // const handleDelete = () => {
  //   const activeObject = canvas.getActiveObject();
  //   if (activeObject) {
  //     canvas.remove(activeObject);
  //     canvas.discardActiveObject();
  //     canvas.renderAll();
  //   }
  // };


    // <div className='min-h-[80vh] text-center pt-14 mb-10'>
    //   <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Edit this</button>
    //   <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Use fabric for editing</h1>
    //   <div>
    //     {/* {plans.map((item, index)=>(
    //       <div key={index}>
    //         <img src={assets.logo_icon} alt="" />
    //         <p>{item.id}</p>
    //         <p>{item.desc}</p>
    //         <p>{item.price} / {item.credits} Credits</p>
    //       </div>
    //     ))} */}
    //   </div>
    // </div>


    // <div className="min-h-[80vh] flex flex-col items-center justify-center">
    //   <div className="mb-4 flex gap-4">
    //     <button onClick={handleDelete} className="border border-gray-400 px-5 py-2 rounded-full">Delete</button>
    //   </div>
    //   <canvas ref={canvasRef} className="border border-gray-400" />
    // </div>