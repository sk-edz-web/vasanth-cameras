import { Camera } from './types';

export const SAMPLE_CAMERAS: Camera[] = [
  {
    id: 'fujifilm-xt5',
    name: 'Fujifilm X-T5 Mirrorless Camera',
    brand: 'Fujifilm',
    price: 164999,
    description: 'A classic dial-driven enthusiast mirrorless camera equipped with a high-resolution 40MP APS-C sensor, 3-way tilting LCD, and legendary film simulation modes for creators.',
    images: [
      '/images/cameras/fujifilm-xt5-1.jpg',
      '/images/cameras/fujifilm-xt5-2.jpg',
      '/images/cameras/fujifilm-xt5-3.jpg'
    ],
    category: 'Mirrorless',
    condition: 'New',
    specs: ['40.2 Megapixels', 'X-Trans CMOS 5 HR', '6.2K/30p Video', '7-Stop In-body Image Stabilization'],
    stock: 5
  },
  {
    id: 'sony-a7iv',
    name: 'Sony Alpha 7 IV Full-Frame Camera',
    brand: 'Sony',
    price: 214999,
    description: 'The ultimate hybrid full-frame mirrorless camera. Packed with ground-breaking autofocus, 33MP Exmor R sensor, and spectacular 4K 60p optical performance.',
    images: [
      '/images/cameras/sony-a7iv-1.jpg',
      '/images/cameras/sony-a7iv-2.jpg',
      '/images/cameras/sony-a7iv-3.jpg'
    ],
    category: 'Mirrorless',
    condition: 'New',
    specs: ['33.0 Megapixels', 'Exmor R BSI CMOS Sensor', 'Real-time Eye AF (Human/Animal/Bird)', '4K 60p 10-bit Recording'],
    stock: 3
  },
  {
    id: 'canon-r6-ii',
    name: 'Canon EOS R6 Mark II Mirrorless',
    brand: 'Canon',
    price: 229999,
    description: 'High-speed powerhouse designed for action. Shoot raw bursts up to 40 fps, track subjects with deep learning, and record beautiful uncropped 4K 60p oversampled video.',
    images: [
      '/images/cameras/canon-r6-ii-1.jpg',
      '/images/cameras/canon-r6-ii-2.jpg'
    ],
    category: 'Mirrorless',
    condition: 'New',
    specs: ['24.2 Megapixels', 'Dual Pixel CMOS AF II', '40 fps Electronic Shutter', '4K 60p Oversampled from 6K'],
    stock: 4
  },
  {
    id: 'hasselblad-500c',
    name: 'Vintage Hasselblad 500C/M Medium Format',
    brand: 'Hasselblad',
    price: 189999,
    description: 'The legendary mechanical SLR camera that captured the moon landing. Delivers standard-setting 6x6 medium format clarity with legendary Zeiss planar optics.',
    images: [
      '/images/cameras/hasselblad-500c-1.jpg',
      '/images/cameras/hasselblad-500c-2.jpg'
    ],
    category: 'Vintage',
    condition: 'Vintage',
    specs: ['120 Film Medium Format', 'Zeiss Planar 80mm f/2.8 lens', 'Fully Mechanical System', 'Waist Level Finder'],
    stock: 1
  },
  {
    id: 'leica-m6-retro',
    name: 'Leica M6 Classic Rangefinder',
    brand: 'Leica',
    price: 285000,
    description: 'Indestructible brass and steel chassis rangefinder. The holy grail of street photography, incorporating a built-in light meter in a timeless analog design.',
    images: [
      '/images/cameras/leica-m6-1.jpg',
      '/images/cameras/leica-m6-2.jpg'
    ],
    category: 'Vintage',
    condition: 'Used - Like New',
    specs: ['35mm Film Rangefinder', '0.72x Viewfinder Magnification', 'Classic Premium Brass Build', 'Legendary M-Mount Optics'],
    stock: 2
  },
  {
    id: 'sony-fx3-cinema',
    name: 'Sony FX3 Cinema Line Camera',
    brand: 'Sony',
    price: 349999,
    description: 'Designed specifically for professional solo creators. Includes standard multi-thread mounting sockets, S-Cinetone color profile, XLR top handle, and active noiseless cooling.',
    images: [
      '/images/cameras/sony-fx3-1.jpg',
      '/images/cameras/sony-fx3-2.jpg'
    ],
    category: 'Cinema',
    condition: 'New',
    specs: ['12.1 MP Full-Frame Exmor R Sensor', '15+ Stops Dynamic Range', '4K 120p High Frame Rate', 'Detachable XLR Handle Unit'],
    stock: 2
  }
];
