import { create } from 'zustand';
import { QRCodeOptions } from '../types';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface Store {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // QR code state
  currentQR: QRCodeOptions;
  setCurrentQR: (options: Partial<QRCodeOptions>) => void;
}

const defaultQROptions: QRCodeOptions = {
  data: '',
  width: 300,
  height: 300,
  type: 'text',
  dotColor: '#000000',
  backgroundColor: '#ffffff',
};

export const useStore = create<Store>((set) => ({
  // User state management
  user: null,
  setUser: (user) => set({ user }),
  
  // QR code state management
  currentQR: defaultQROptions,
  setCurrentQR: (options) =>
    set((state) => ({
      currentQR: { ...state.currentQR, ...options },
    })),
}));