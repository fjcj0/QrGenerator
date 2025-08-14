import { create } from 'zustand';
const getInitialSlideState = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('isSlideOpen');
        return stored !== null ? JSON.parse(stored) : true;
    }
    return true;
};
const useSlideStore = create((set) => ({
    isSlideOpen: getInitialSlideState(),
    openSlide: () =>
        set((state) => {
            localStorage.setItem('isSlideOpen', true);
            return { isSlideOpen: true };
        }),
    closeSlide: () =>
        set((state) => {
            localStorage.setItem('isSlideOpen', false);
            return { isSlideOpen: false };
        }),
    toggleSlide: () =>
        set((state) => {
            const newState = !state.isSlideOpen;
            localStorage.setItem('isSlideOpen', newState);
            return { isSlideOpen: newState };
        }),
}));
export default useSlideStore;