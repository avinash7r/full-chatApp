import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from "react-hot-toast";
import {useAuthStore} from "./useAuthStore.js"
export const useMsgStore = create((set,get)=>({
    users:[],
    messages:[],
    selectedUser:null,
    isFetchingMessages:false,
    isFetchingUsers:false,
    getUsers:async()=>{
        set({isFetchingUsers:true})
        try {
            const res=await axiosInstance.get("/message/users")
            set({users:res.data})
        } catch (error) {
            toast.error("Users fetch failed")
            console.log(error)
        }finally{
            set({isFetchingUsers:false})
        }
    },
    getMessages:async(id)=>{
        set({isFetchingMessages:true})
        try {
            const res=await axiosInstance.get(`/message/${id}`)
            set({messages:res.data})
        } catch (error) {
            toast.error("Messages fetch failed")
            console.log(error)
        }finally{
            set({isFetchingMessages:false})
        }
    },
    selectUser:(user)=>{
        set({selectedUser:user})
    },
    sendMessage:async(text)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,{
                text
            })
            set({messages:[...messages,res.data]})
        } catch (error) {
            console.log(error)
            toast.error("Message send failed")
        }
    },
    listenToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return;
        const socket=useAuthStore.getState().socket
        socket.on("newMessage",(message)=>{
            if(message.senderId!==selectedUser._id)return;
            set({messages:[...messages,message]})
        })
    },
    stopListeningToMessages:()=>{
        const socket=useAuthStore.getState().socket
        socket.off("newMessage")
    }
}));