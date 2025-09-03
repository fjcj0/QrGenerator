import { create } from "zustand";
import axios from 'axios';
axios.defaults.withCredentials = true;
const VITE_API_USER_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/qr" : "/api/qr";
export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "https://qrgenerator-ctx0.onrender.com";
const useQrStore = create((set, get) => ({
    qrData: null,
    qrs: null,
    error: null,
    isLoadingButton: false,
    totalQr: 0,
    top10Scans: null,
    loading: false,
    lastWeekQrStats: null,
    saveQr: async (logo, userId, name, config, qrId, url) => {
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
            formData.append("url", url);
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
            if (!qrId) {
                set({
                    totalQr: get().totalQr + 1
                });
            }
            set({
                qrs: updatedQrs,
                isLoadingButton: false,
                error: null
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                isLoadingButton: false,
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    }, deleteQRS: async (qrsToDelete) => {
        set({ isLoadingButton: true, error: null });
        try {
            await axios.delete(`${VITE_API_USER_URL}/delete?qrIds=${qrsToDelete.join(",")}`);
            const updatedQrs = (get().qrs || []).filter(qr => !qrsToDelete.includes(qr._id));
            set({ qrs: updatedQrs, totalQr: updatedQrs.length, isLoadingButton: false });
        } catch (error) {
            set({ error: error.message, isLoadingButton: false });
        }
    }, getQRS: async (userId) => {
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
                set({ qrs: [], totalQr: 0 });
            } else {
                set({ error: error.response?.data?.message || error.message });
            }
        }
    }, getTop10UserQrs: async (userId) => {
        set({ error: null });
        try {
            const response = await axios.get(`${VITE_API_USER_URL}/TopScans/${userId}`);
            set({ top10Scans: response?.data });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || error.message);
        }
    }, getLastWeekQrStats: async (userId) => {
        set({ error: null });
        try {
            const response = await axios.get(`${VITE_API_USER_URL}/last-week-stats/${userId}`);
            set({ lastWeekQrStats: response?.data });
        } catch (error) {
            console.log(error.message);
            set({ error: error.response?.data?.message || error.message });
            throw new Error(error.response?.data?.message || error.message);
        }
    }, getQrById: async (qrId) => {
        set({ error: null, loading: true });
        try {
            const response = await axios.get(`${VITE_API_USER_URL}/getQr/${qrId}`);
            set({ qrData: response?.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
}));
export default useQrStore;