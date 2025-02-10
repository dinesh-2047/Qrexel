export interface QRCodeOptions {
  data: string;
  width: number;
  height: number;
  type: 'text' | 'url' | 'wifi' | 'vcard';
  dotColor: string;
  backgroundColor: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
}