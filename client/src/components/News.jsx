import React from 'react'
import { FaNewspaper, FaPlus, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
// import { ConnectButton } from './ConnectButton'

function News() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-8">
      <Navbar />

      {/* Stats Boxes */}
      <div className="w-full max-w-3xl mb-8">
        <div className="grid grid-cols-3 bg-pink-300 rounded-2xl overflow-hidden border-2 border-pink-500">
          <div className="p-4 text-center border-r border-pink-800/60">
            <h3 className="text-sm font-semibold text-black mb-1">Total News</h3>
            <p className="text-2xl font-bold text-black">8</p>
          </div>
          
          <div className="p-4 text-center border-r border-pink-800/60">
            <h3 className="text-sm font-semibold text-black mb-1">Correct Percentage</h3>
            <p className="text-2xl font-bold text-black">78%</p>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="text-sm font-semibold text-black mb-1">Verified News</h3>
            <p className="text-2xl font-bold text-black">5</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="w-full max-w-3xl mb-16">
        <div className="bg-pink-300 rounded-2xl p-6 border-2 border-pink-500">
          <h2 className="text-2xl font-bold text-black mb-4 text-center">Recent News</h2>
          <div className="text-black space-y-4">
            <div className="border-b border-pink-800/60 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Elon Musk's SpaceX</p>
                  <p className="text-sm text-gray-700">"SpaceX Successfully Launches Starship for Mars Mission"</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">1 hour ago</p>
                  <p className="text-sm font-medium text-green-600">Verified</p>
                </div>
              </div>
            </div>

            <div className="border-b border-pink-800/60 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Trump Campaign</p>
                  <p className="text-sm text-gray-700">"Trump Announces Major Policy Shift for 2024 Election"</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">3 hours ago</p>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="w-full max-w-3xl">
        <div className="bg-pink-300 rounded-2xl p-6 border-2 border-pink-500 flex justify-between items-center px-16">
          <button 
            onClick={() => navigate('/newinfo')}
            className="flex flex-col items-center gap-2 text-black"
          >
            <FaNewspaper size={32} />
            <span className="text-sm">News</span>
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="bg-pink-600 hover:bg-pink-500 text-white p-5 rounded-full transition-colors border-2 border-pink-500"
          >
            <FaPlus size={36} />
          </button>
          <button 
            onClick={() => navigate('/news')}
            className="flex flex-col items-center gap-2 text-black"
          >
            <FaUser size={32} />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default News
