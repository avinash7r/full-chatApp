import {create} from 'zustand';
import {axiosInstance} from '../lib/axiosInstance.js';
const useAuthStore = create((set) => ({
    authUser:null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    authCheck:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data.user});
        } catch (error) {
            console.log(error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
        } catch (error) {
            console.log(error);
        }
    },

}));

export {useAuthStore};