/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Camera {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  condition: 'New' | 'Used - Like New' | 'Refurbished' | 'Vintage';
  specs: string[]; // Specs like '24.2 MP', '4K Video', etc.
  stock: number;
  createdAt?: string;
}

export interface CartItem {
  camera: Camera;
  quantity: number;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}
