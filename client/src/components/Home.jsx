import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-pink-200 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4">
            🚀 🎯 🎊
          </div>
          <h1 className="text-3xl md:text-3xl font-bold text-pink-600 mb-8">
            Fileverse 
          </h1>
          <p className="text-xl text-black mb-12">
            <span className=" px-4 py-2 rounded-lg text-sm font-bold">
              Prediction market on Flow powered by eliza AI <br/> and polymarket insights.
            </span>

            <hr className='mt-[10px] mb-[10px] border-blue-500/30'/>
            
            <span className="bg-pink-400 px-4 py-2 rounded-lg mt-[20px] text-lg">
              Predict the future and earn rewards.
            </span>
          </p>
          <div className="flex justify-center gap-4">
          
            <button 
              onClick={() => navigate('/news')}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-2xl border-2 border-blue-600 transition-colors text-xl"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
