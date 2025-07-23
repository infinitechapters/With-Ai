import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import Markdown from 'react-markdown';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';


const GenImage = () => {
  const titleCategories = [
    'Realistic', 'Ghibli Style', 'Anime Style', 'Cartoon', '3-D style'
  ]

  const [imageStyle, setImageStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = `Generate image for ${input} in the style ${imageStyle}`;
    const { data } = await axios.post('/api/ai/gen-images', {
      prompt
    }, {
      headers: { Authorization: `Bearer ${await getToken()}` }
    })
    try {
      if (data.success) {
        setContent(data.secure_url);
        toast.success("Image generated !");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  }


  return (
    <div className='h-full  overflow-y-scroll p-6 flex items-start justify-center flex-wrap gap-4 text-slate-700'>

      <form onSubmit={onSubmitHandler} className='w-full max-w-lg mr-4 p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#377feb]' />
          <h1 className='text-xl font-semibold'>Generate Image</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe your image</p>
        <textarea onChange={(e) => setInput(e.target.value)} value={input} rows={4} type='text' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='Describe stuffs about your required image' required />
        <p className='mt-4 text-sm font-medium'>Style</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {titleCategories.map((item) => (
            <span onClick={() => setImageStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                  ${imageStyle === item ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} key={item} >{item}</span>
          ))}
        </div>
        <br></br>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-br from-[#54c4e6] to-[#3e8af5] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          {
            loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (<Image className='w-5' />)
          }
          Generate Image
        </button>
      </form>

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 '>
        <div className='flex-items-center gap-3'>
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Image</h1>
        </div>
        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9' />
                <p>Enter your required style and click "Generate Image" to get started</p>
              </div>
            </div>

          ) : (

            <div className='h-full mt-3'>
              <img src={content} alt='image' className='w-full h-full' />
               <a
    href={content}
    download="generated-image.jpg"
    className='mt-4 inline-block bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 text-sm'
  >
    Download Image
  </a>
            </div>

          )
        }

      </div>
    </div>
  )
}

export default GenImage