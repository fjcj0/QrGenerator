import { create } from 'zustand';
const useColorStore = create((set) => ({
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
export default useColorStore;