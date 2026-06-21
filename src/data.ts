import { Camera } from './types';

export const SAMPLE_CAMERAS: Camera[] = [
  {
    id: 'fujifilm-xt5',
    name: 'Fujifilm X-T5 Mirrorless Camera',
    brand: 'Fujifilm',
    price: 164999,
    description: 'A classic dial-driven enthusiast mirrorless camera equipped with a high-resolution 40MP APS-C sensor, 3-way tilting LCD, and legendary film simulation modes for creators.',
    images: [
      'https://cdn.mos.cms.futurecdn.net/ubcLwYk8iEPrGv3HtYpgnJ.jpg',
      'https://i.pcmag.com/imagery/roundups/01VxxK8O0IyVMPFyM43N8Pw-8..v1640117355.jpg'
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
      'https://m.media-amazon.com/images/I/71BaBwNek-L.jpg',
      'https://m.media-amazon.com/images/I/81q2U3pGBGL.jpg'
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
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/dslr-camera/6/a/q/-original-imahgget2bqwm3za.jpeg?q=70',
      'https://m.media-amazon.com/images/I/71eOQ5ssTAL.jpg'
    ],
    category: 'Mirrorless',
    condition: 'New',
    specs: ['24.2 Megapixels', 'Dual Pixel CMOS AF II', '40 fps Electronic Shutter', '4K 60p Oversampled from 6K'],
    stock: 4
  },
  {
    id: 'sony alpha',
    name: 'sony alpha',
    brand: 'Hasselblad',
    price: 189999,
    description: 'The legendary mechanical SLR camera that captured the moon landing. Delivers standard-setting 6x6 medium format clarity with legendary Zeiss planar optics.',
    images: [
      'https://m.media-amazon.com/images/I/71zs+RZUggL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0Nxq39hyP_uVvdlnFsom51LsWu7WCAEY0Q&s'
    ],
    category: 'Vintage',
    condition: 'Vintage',
    specs: ['120 Film Medium Format', 'Zeiss Planar 80mm f/2.8 lens', 'Fully Mechanical System', 'Waist Level Finder'],
    stock: 1
  },
  {
    id: 'black magic',
    name: 'black magic',
    brand: 'Leica',
    price: 285000,
    description: 'Indestructible brass and steel chassis rangefinder. The holy grail of street photography, incorporating a built-in light meter in a timeless analog design.',
    images: [
      'https://m.media-amazon.com/images/I/61cQsrKyHXL._AC_UF1000,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61HN7WoMpfL._AC_UF1000,1000_QL80_.jpg'
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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EA0-3PAfn_Yn_h6t6qHN76WHperDzR3Eig&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNNs6IK6vWebG1PAxd116FWz4Td7fD392bw&s'
    ],
    category: 'Cinema',
    condition: 'New',
    specs: ['12.1 MP Full-Frame Exmor R Sensor', '15+ Stops Dynamic Range', '4K 120p High Frame Rate', 'Detachable XLR Handle Unit'],
    stock: 2
  }
];
