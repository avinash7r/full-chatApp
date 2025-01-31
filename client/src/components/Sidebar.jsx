import React from 'react';
import { useMsgStore } from '../store/useMsgStore';
import { useEffect ,useState } from 'react';
import { User } from 'lucide-react';

const Sidebar = () => {
    const {getUsers,users,selectedUser,selectUser}=useMsgStore()
    useEffect(()=>{
        getUsers()
    },[])
    const [onLineUsers,setOnLineUsers]=useState([])
  return (
    <aside className="h-screen w-64 bg-gray-800 p-4">
        <div className="flex items-center justify-between border-b-2 pb-4">
            {/* here there will be a users logo and a text as contacts */}
            <User className='text-gray-300'/>
            <span className="text-gray-300">Contacts</span>
        </div>
        <div className="mt-4">
            {/* here there will be multuple templates showing diffrent users from an function */}
            {
                users.map((user)=>{
                    const isSelected=user._id===selectedUser?._id
                    return (
                        <div key={user._id} className={`flex items-center p-2 hover:bg-gray-700 cursor-pointer ${isSelected?"bg-gray-700":""}`} onClick={()=>selectUser(user)}>
                            {/* here we will displat the image and the username */}
                            <div className="w-12 h-12 mr-4">
                                <img src={user.profilePic || "/avatar.png"} alt="" className="w-full h-full rounded-full"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-300 mb-1">{user.username}</span>
                                {
                                    onLineUsers?._id===user._id ? <span className="text-green-500 text-sm">Online</span>:<span className="text-red-500 text-sm">Offline</span>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </aside>
  )
}

export default Sidebar