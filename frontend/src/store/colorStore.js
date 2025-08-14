import { create } from 'zustand';
const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('isDarkMode');
        return stored !== null ? JSON.parse(stored) : true;
    }
    return true;
};
const useColorStore = create((set) => ({
    isDarkMode: getInitialDarkMode(),
    toggleDarkMode: () =>
        set((state) => {
            const newMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(newMode));
            return { isDarkMode: newMode };
        }),
}));
export default useColorStore;