import React, { useEffect } from 'react'
import { useMsgStore } from '../store/useMsgStore'
const Chatheader = () => {
  const {selectedUser,getMessages}=useMsgStore()
  useEffect(()=>{
    getMessages(selectedUser?._id)
  },[selectedUser,getMessages])
  return (
    <div className="w-full h-10 flex items-center mx-2 my-2">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={selectedUser?.profilePic || "/avatar.png"} alt="" className="w-full h-full object-cover rounded-full" />
      </div>
      <div className="flex-1 ml-4">
        <span className="font-semibold">{selectedUser?.username}</span>
      </div>
    </div>
  )
}

export default Chatheader