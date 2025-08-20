import { create } from "zustand";
import axios from 'axios';
axios.defaults.withCredentials = true;
const VITE_API_USER_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/qr" : "/api/qr";
const useQrStore = create((set) => ({
    qrs: null,
    error: null,
    isLoadingButton: false,
    saveQr: async (logo,userId,name,config,qrId) => {
        set({error:null,isLoadingButton: true});
        try {
            if(!name || !config){
                set({isLoadingButton:false,error: "Error Name,Config and UserId are required!!"})
                throw new Error("Error Name and Config are required!!");
            }
            const formData = new FormData();
            formData.append("name",name);
            formData.append("config", JSON.stringify(config));
            formData.append("userId",userId);
            console.log(logo);
            if(logo){
                console.log(logo);
                formData.append("logo",logo)
              }              
            if(qrId) formData.append("qrId",qrId);
            const response = await axios.post(
                `${VITE_API_USER_URL}/save`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            set({ error: null, isLoadingButton: false });
            return response.data;
        }
        catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoadingButton: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));
export default useQrStore;