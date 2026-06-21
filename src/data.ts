import { Camera } from './types';

export const SAMPLE_CAMERAS: Camera[] = [
  {
    id: 'fujifilm-xt5',
    name: 'Fujifilm X-T5 Mirrorless Camera',
    brand: 'Fujifilm',
    price: 164999,
    description: 'A classic dial-driven enthusiast mirrorless camera equipped with a high-resolution 40MP APS-C sensor, 3-way tilting LCD, and legendary film simulation modes for creators.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fujifilm_X-T5.jpg/800px-Fujifilm_X-T5.jpg',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&h=600&q=80'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sony_Alpha_7_IV.jpg/800px-Sony_Alpha_7_IV.jpg',
      'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&w=800&h=600&q=80'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Canon_EOS_R6_front.jpg/800px-Canon_EOS_R6_front.jpg',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&h=600&q=80'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Hasselblad_500c.jpg/800px-Hasselblad_500c.jpg',
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&h=600&q=80'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Leica_M6.jpg/800px-Leica_M6.jpg',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&h=600&q=80'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sony_Alpha_7S_III.jpg/800px-Sony_Alpha_7S_III.jpg',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=800&h=600&q=80'
    ],
    category: 'Cinema',
    condition: 'New',
    specs: ['12.1 MP Full-Frame Exmor R Sensor', '15+ Stops Dynamic Range', '4K 120p High Frame Rate', 'Detachable XLR Handle Unit'],
    stock: 2
  }
];
