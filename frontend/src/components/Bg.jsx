import React from 'react'
import { useNavigate } from 'react-router-dom'

const Bg = () => {
    const navigate= useNavigate();
    return (
        <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center 
    bg-[url(/bgImage.jpg)] bg-cover bg-no-repeat min-h-screen">
            <div className="text-center mb-6">
                <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl 2xl:text:7xl mx-auto leading-[1.2] ">Create amazing content with
                    <span className="font-bold text-blue-600"> AI Tools</span></h1>
                <br></br>
                <p className="font-medium text-2xl mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto">Transform your content with this site's AI touch.
                    Write Articles, generate images,create titles for blogs and much more
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
                <button  onClick={()=> navigate('/ai')} className="bg-gray-200 text-blue font-bold px-10 py-3 rounded-lg hover:bg-white hover:scale-102 active:scale-95 transition cursor-pointer">Start creating</button></div>
        </div>
    )
}

export default Bg