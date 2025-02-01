import {create} from 'zustand';
import {axiosInstance} from '../lib/axiosInstance.js';
import {toast,Toaster} from 'react-hot-toast';
const useAuthStore = create((set) => ({
    authUser:null,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
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
    }

}));

export {useAuthStore};