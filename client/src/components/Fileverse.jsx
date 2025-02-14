import React, { useState } from 'react'
import axios from 'axios'

function Fileverse() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [ipfsHash, setIpfsHash] = useState('')

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setUploadError('')
    setUploadSuccess('')
  }

  // Upload file to IPFS via Pinata
  const uploadToIPFS = async () => {
    if (!file) {
      setUploadError('Please select a file first')
      return
    }

    setUploading(true)
    setUploadError('')
    setUploadSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setIpfsHash(response.data.IpfsHash)
      setUploadSuccess('File uploaded successfully to IPFS!')
      
      // Get the IPFS gateway URL
      const ipfsUrl = `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${response.data.IpfsHash}`
      console.log('IPFS URL:', ipfsUrl)
      
      return ipfsUrl

    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // Get file from IPFS
  const getFromIPFS = async (hash) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${hash}`)
      return response.data
    } catch (error) {
      console.error('Error fetching from IPFS:', error)
      throw new Error('Failed to fetch file from IPFS')
    }
  }

  // Verify file hash
  const verifyFileHash = async (file, hash) => {
    try {
      const fileBuffer = await file.arrayBuffer()
      const fileHash = await crypto.subtle.digest('SHA-256', fileBuffer)
      const hashArray = Array.from(new Uint8Array(fileHash))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      
      return hashHex === hash
    } catch (error) {
      console.error('Hash verification error:', error)
      return false
    }
  }

  return (
    <div className="w-full max-w-xl p-6 bg-pink-300 rounded-2xl border-2 border-pink-500">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Upload to Fileverse
      </h2>

      {/* File Input */}
      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileSelect}
          className="w-full p-2 bg-white rounded-xl border-2 border-pink-400 focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={uploadToIPFS}
        disabled={uploading || !file}
        className={`w-full bg-gradient-to-r from-pink-600 to-pink-500 
          hover:from-pink-500 hover:to-pink-400 text-white font-bold 
          py-3 px-6 rounded-xl border-2 border-pink-500/50 
          transition-all transform hover:scale-[1.02] 
          active:scale-[0.98] ${uploading || !file ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload to IPFS'}
      </button>

      {/* Status Messages */}
      {uploadError && (
        <p className="mt-4 text-red-500 text-center">{uploadError}</p>
      )}
      {uploadSuccess && (
        <p className="mt-4 text-green-500 text-center">{uploadSuccess}</p>
      )}
      {ipfsHash && (
        <p className="mt-4 text-black text-center break-all">
          IPFS Hash: {ipfsHash}
        </p>
      )}
    </div>
  )
}

export default Fileverse