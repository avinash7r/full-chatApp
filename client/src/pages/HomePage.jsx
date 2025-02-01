import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Chatbox from '../components/Chatbox.jsx'
import { useMsgStore } from '../store/useMsgStore.js'

const HomePage = () => {
  const {selectedUser}=useMsgStore()
  return (
    <div className="flex-1 flex h-screen overflow-auto">
      <Sidebar/>
      {selectedUser?<Chatbox/>:<div className='flex-1 flex items-center justify-center'>select user!!!!!!</div>}

    </div>
  )
}

export default HomePage