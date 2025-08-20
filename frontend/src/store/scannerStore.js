import { create } from "zustand";
import axios from 'axios';
axios.defaults.withCredentials = true;
const VITE_API_USER_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/qr" : "/api/qr";
const useScannerStore = create((set,get) => ({ 
    userQrsScans: [],
    totalScan: 0,
    error: null,
getQrsUserScans: async (userId) => {
    set({ error: null });
    try {
        const response = await axios.get(`${VITE_API_USER_URL}/QrUserScan/${userId}`);        ;
        const data = response.data;
        const totalScans = data.reduce((sum, qr) => sum + (qr.totalScans || 0), 0);
        set({
            userQrsScans: data,
            totalScan: totalScans,
            isLoading: false
          });
    }catch(error){
        set({
            error: error.response?.data?.message || error.message,
            isLoadingButton: false,
        });
        throw new Error(error.response?.data?.message || error.message);
    }
},
}));
export default useScannerStore;