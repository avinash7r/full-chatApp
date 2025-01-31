import React, { useState } from 'react'
import { useMsgStore } from '../store/useMsgStore.js'
import { axiosInstance } from '../lib/axiosInstance.js'
import { Send } from 'lucide-react'

const Msginput = () => {
  const { selectedUser,messages,setMessages,sendMessage } = useMsgStore()
  
  const [text,setText]=useState('')

  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      if (text.trim() && selectedUser) {
        await sendMessage(text)
        setText('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 bg-gray-800 border-t border-gray-700 flex flex-col">
      <div className='w-full flex items-center justify-center'>
      <form className='w-full'>
      <div className="relative w-full">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full h-10 rounded-lg bg-gray-700 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' 
          placeholder='Type your message' 
        />
        <button onClick={handleSendMessage} className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Send size={20} />
        </button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default Msginput