import { create } from 'zustand';
import { QRCodeOptions } from '../types';

interface Store {
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
  currentQR: defaultQROptions,
  setCurrentQR: (options) =>
    set((state) => ({
      currentQR: { ...state.currentQR, ...options },
    })),
}));