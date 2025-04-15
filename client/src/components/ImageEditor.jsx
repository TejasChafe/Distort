import React, { useState } from "react";
import {GrRotateLeft, GrRotateRight} from 'react-icons/gr'
import {CgMergeVertical, CgMergeHorizontal} from 'react-icons/cg'
import {IoMdUndo, IoMdRedo, IoIosImage} from 'react-icons/io'
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

const ImageEditor = () => {
    const filterElement = [
        {name: "Brightness", property: "brightness", value: 100, range: {min: 0, max: 200}, unit: '%'},
        {name: "Grayscale", property: "grayscale", value: 0, range: {min: 0, max: 100}, unit: '%'},
        {name: "Sepia", property: "sepia", value: 0, range: {min: 0, max: 100}, unit: '%'},
        {name: "Saturation", property: "saturation", value: 100, range: {min: 0, max: 200}, unit: '%'},
        {name: "Contrast", property: "contrast", value: 100, range: {min: 0, max: 200}, unit: '%'},
        {name: "Hue", property: "hueRotate", value: 0, range: {min: 0, max: 360}, unit: 'deg'},
    ];
    
    const [details, setDetails] = useState('')
    const [crop, setCrop] = useState('')
    const [state, setState] = useState({
        image: '', brightness: 100, grayscale: 0, sepia: 0, saturation: 100, contrast: 100, hueRotate: 0, rotate: 0, vertical: 1, horizontal: 1,
        activeFilter: 'brightness'
    });

    const imageCrop = () => {
        const canvas = document.createElement('canvas')
        const scaleX = details.naturalWidth / details.width
        const scaleY = details.naturalHeight / details.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(
            details,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
        const base64Url = canvas.toDataURL('image/jpg')
        setState({
            ...state, 
            image : base64Url
        })
    }

    const saveImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = details.naturalWidth
        canvas.height = details.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.filter = `brightness(${state.brightness}%) 
        grayscale(${state.grayscale}%) 
        sepia(${state.sepia}%)
        saturate(${state.saturation}%)
        contrast(${state.contrast}%)
        hue-rotate(${state.hueRotate}deg)`

        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.rotate(state.rotate * Math.PI / 180)
        ctx.scale(state.vertical, state.horizontal)
        ctx.drawImage(
            details,
            -canvas.width/2,
            -canvas.height/2,
            canvas.width,
            canvas.height
        )
        const link = document.createElement('a')
        link.download = 'image_edit.jpg'
        link.href = canvas.toDataURL()
        link.click()
    }
    // console.log(details)
    const imageHandler = (e) => {
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            reader.onload = () => {
                setState(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleFilterChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const resetFilters = () => {
        setState({
            ...state,
            brightness: 100, grayscale: 0, sepia: 0, saturation: 100, contrast: 100, hueRotate: 0, rotate: 0, vertical: 1, horizontal: 1
        });
    };

    const getActiveFilterData = () => {
        return filterElement.find(filter => filter.property === state.activeFilter);
    };

    return(
        <div className="image_editor">
            <div className="items-center min-h-[90vh] gap-4 p-5 px-8 bg-white dark:bg-gray-600 dark:text-gray-300 shadow-md border rounded-lg">
                <div className="card_header text-center mb-6">
                    <h1 className='text-center text-3xl font-medium'>Image Editor</h1>
                </div>
                <div className='card_body flex flex-col lg:flex-row justify-center gap-4'>
                    <div className="sidebar lg:w-64">
                        <div className="side_body border border-gray-200 p-4 rounded-lg h-full">
                            <div className="filter_section">
                                <span className="mb-3 block text-base font-medium">Filters</span>
                                <div className="filter_key grid grid-cols-2 gap-2">
                                    {filterElement.map((v,i) => (
                                        <button className={`px-3 py-2 text-sm rounded-md transition-all ${
                                            state.activeFilter === v.property ? 'bg-blue-500 text-white' : 
                                            'bg-gray-800 text-white hover:scale-105'}`} 
                                            key={i} onClick={() => setState({...state, activeFilter: v.property})}>{v.name}</button>
                                    ))}
                                </div>
                            </div>
                            
                            {getActiveFilterData() && (
                                <div className="filter_slider my-4">
                                    <div className="label_bar mb-2 flex justify-between">
                                        <label className="text-sm font-medium">
                                            {getActiveFilterData().name}
                                        </label>
                                        <span className="text-sm">
                                            {state[getActiveFilterData().property]}{getActiveFilterData().unit}
                                        </span>
                                    </div>
                                    <input className="w-full" type="range" name={getActiveFilterData().property} 
                                    min={getActiveFilterData().range.min} max={getActiveFilterData().range.max} 
                                    value={state[getActiveFilterData().property]} onChange={handleFilterChange}/>
                                </div>
                            )}
                            
                            <div className="rotate mt-6">
                                <label className="mb-3 block text-base font-medium">Rotate & Flip</label>
                                <div className="icon flex gap-3 justify-center">
                                    <button className="bg-gray-800 text-white p-2 rounded-md hover:scale-105 transition-all"
                                    onClick={() => setState({...state, rotate: state.rotate - 90})}>
                                        <GrRotateLeft size={18}/>
                                    </button>
                                    <button className="bg-gray-800 text-white p-2 rounded-md hover:scale-105 transition-all"
                                    onClick={() => setState({...state, rotate: state.rotate + 90})}>
                                        <GrRotateRight size={18}/>
                                    </button>
                                    <button className="bg-gray-800 text-white p-2 rounded-md hover:scale-105 transition-all"
                                    onClick={() => setState({...state, vertical: state.vertical === 1 ? -1 : 1})}>
                                        <CgMergeVertical size={18}/>
                                    </button>
                                    <button className="bg-gray-800 text-white p-2 rounded-md hover:scale-105 transition-all"
                                    onClick={() => setState({...state, horizontal: state.horizontal === 1 ? -1 : 1})}>
                                        <CgMergeHorizontal size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="image_container flex-1 flex flex-col items-center gap-4">
                        <div className="image_window w-full aspect-video max-w-[800px] bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center">
                            {state.image ? ( <ReactCrop crop = {crop} onChange={c => setCrop(c)}>
                                <img onLoad={(e) => setDetails(e.currentTarget)} className="max-w-full max-h-full object-contain"
                                style={{
                                    filter: 
                                        `brightness(${state.brightness}%) 
                                        grayscale(${state.grayscale}%) 
                                        sepia(${state.sepia}%)
                                        saturate(${state.saturation}%)
                                        contrast(${state.contrast}%)
                                        hue-rotate(${state.hueRotate}deg)`, 
                                    transform: 
                                        `rotate(${state.rotate}deg) 
                                        scale(${state.vertical}, ${state.horizontal})`
                                    }} 
                                    src={state.image} alt="Edited"
                                />
                                </ReactCrop>
                            ) : (
                                <label htmlFor="choose" className="cursor-pointer flex flex-col items-center text-gray-500">
                                    <IoIosImage size={48} className="mb-2"/>
                                    <span className="text-lg">Choose Image</span>
                                </label>
                            )}
                        </div>
                        
                        <div className="w-full flex flex-col items-center gap-3">
                            <div className="action_buttons flex gap-2 justify-center">
                                {/* <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition-all">
                                    <IoMdUndo size={18}/>
                                </button>
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition-all">
                                    <IoMdRedo size={18}/>
                                </button> */}
                                {
                                    crop && <button onClick={imageCrop} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition-all">
                                        Crop Image
                                    </button>
                                }
                                <label htmlFor="choose" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:scale-105 transition-all cursor-pointer">
                                    Choose Image
                                </label>
                                <input onChange={imageHandler} type="file" id="choose" className="hidden" accept="image/*"/>
                            </div>
                            
                            <div className="reset_save flex gap-4 justify-center">
                                <button onClick={resetFilters} className="bg-red-500 text-white px-6 py-2 rounded-md hover:scale-105 transition-all">
                                    Reset
                                </button>
                                <button onClick={saveImage} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:scale-105 transition-all">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageEditor