import { create } from "zustand";
import axios from 'axios';
axios.defaults.withCredentials = true;
const VITE_API_USER_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/qr" : "/api/qr";
export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "";
const useQrStore = create((set,get) => ({
    qrs: null,
    error: null,
    isLoadingButton: false,
    totalQr: 0,
    saveQr: async (logo, userId, name, config, qrId,url) => {
        set({ error: null, isLoadingButton: true });
        try {
            if (!name || !config) {
                set({ isLoadingButton: false, error: "Error Name, Config, and UserId are required!!" });
                throw new Error("Error Name and Config are required!!");
            }
            const formData = new FormData();
            formData.append("name", name);
            formData.append("config", JSON.stringify(config));
            formData.append("userId", userId);
            if (logo) formData.append("logo", logo);
            if (qrId) formData.append("qrId", qrId);
            formData.append("url",url);
            const response = await axios.post(
                `${VITE_API_USER_URL}/save`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            const savedQR = response.data.qr;
            const currentQrs = get().qrs || [];
            const updatedQrs = qrId
                ? currentQrs.map(qr => qr._id === qrId ? savedQR : qr) 
                : [savedQR, ...currentQrs]; 
            set({
                qrs: updatedQrs,
                totalQr: updatedQrs.length,
                isLoadingButton: false,
                error: null
            });
            return;
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoadingButton: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },    
    deleteQRS: async (qrsToDelete) => {
        set({error:null,isLoadingButton:true});
        try{
            await axios.delete(
                `${VITE_API_USER_URL}/delete?qrIds=${qrsToDelete.join(",")}`
            );              
            set({ isLoadingButton: false });
        }catch(error){
            set({
                error: error.response?.data?.message || error.message,
                isLoadingButton: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },getQRS: async (userId) => {
        set({ error: null });
        try {
            const response = await axios.get(`${VITE_API_USER_URL}/user/${userId}`);
            const qrs = response?.data?.qrs || [];
            set({ 
                qrs, 
                totalQr: qrs.length 
            });
        } catch (error) {
            if (error.response?.status === 404) {
                set({ qrs: [] , totalQr: 0});
            } else {
                set({ error: error.response?.data?.message || error.message });
            }
        }
    },
}));
export default useQrStore;