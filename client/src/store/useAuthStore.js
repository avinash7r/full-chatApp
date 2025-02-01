import {create} from 'zustand';
import {axiosInstance} from '../lib/axiosInstance.js';
import {toast,Toaster} from 'react-hot-toast';
import {io} from 'socket.io-client';
const BASE_URL=import.meta.env.MODE === "development" ? "http://localhost:7777" : "/"

const useAuthStore = create((set,get)=>({
    authUser:null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    isConnecting: false,
    onlineUsers:[],
    socket:null,
    authCheck:async()=>{
        try {
            set({isCheckingAuth:true});
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data.user});
        } catch (error) {
            console.log(error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
            get().connectSocket();
        }
    },
    login:async(data)=>{
      try {
        set({isLoggingIn:true});
        const res=await axiosInstance.post("/auth/login",data);
        set({authUser:res.data.user});
        get().connectSocket();
      } catch (error) {
        console.log(error);
        toast.error("Login failed")
      }finally{
        set({isLoggingIn:false});
      }
    },
    signUp:async(data)=>{
      try {
        set({isSigningUp:true});
        const res=await axiosInstance.post("/auth/register",data);
        await get().login({email:data.email,password:data.password});
      } catch (error) {
        console.log(error);
        toast.error("Sign up failed")
      }finally{
        set({isSigningUp:false});
      }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            get().disconnectSocket();
        } catch (error) {
            console.log(error);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket:()=>{
        if(get().socket?.connected || !get().authUser || get().isConnecting) return;
        const socket = io(BASE_URL,{
            query:{
                userID:get().authUser._id
            }
        });
        socket.connect();
        set({socket});
        socket.on("getOnlineUsers",(usersIds)=>{
            set({onlineUsers:usersIds});
        })
    },
    disconnectSocket:()=>{
        if(!get().socket?.connected)return;
        get().socket.disconnect();
        set({socket:null});
    }

}));

export {useAuthStore};