/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Camera } from '../types';
import { db, isFirebaseEnabled } from '../firebase';
import { Plus, Trash2, Key, Upload, Check, AlertCircle, X, Film, Info, RefreshCw } from 'lucide-react';

interface AdminViewProps {
  cameras: Camera[];
  onAddCamera: (camera: Camera) => void;
  onDeleteCamera: (id: string) => void;
  onResetToSample: () => void;
}

export default function AdminView({
  cameras,
  onAddCamera,
  onDeleteCamera,
  onResetToSample,
}: AdminViewProps) {
  // ImgBB API Key state (persisted to localStorage)
  const [imgbbKey, setImgbbKey] = useState<string>('');
  
  // New Camera Form states
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Mirrorless');
  const [condition, setCondition] = useState<'New' | 'Used - Like New' | 'Refurbished' | 'Vintage'>('New');
  const [stock, setStock] = useState<string>('5');
  
  // Custom Specs list builders
  const [currentSpec, setCurrentSpec] = useState('');
  const [specs, setSpecs] = useState<string[]>([]);
  
  // Upload State
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [manualUrl, setManualUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Load ImgBB Key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('vasanth_imgbb_key');
    if (savedKey) {
      setImgbbKey(savedKey);
    }
  }, []);

  const saveImgbbKey = (key: string) => {
    setImgbbKey(key);
    localStorage.setItem('vasanth_imgbb_key', key);
    setStatusMessage({ type: 'success', text: 'ImgBB API key saved successfully!' });
  };

  const handleAddSpec = () => {
    if (currentSpec.trim()) {
      setSpecs((prev) => [...prev, currentSpec.trim()]);
      setCurrentSpec('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Upload image to ImgBB
  const uploadToImgBB = async (file: File): Promise<string | null> => {
    if (!imgbbKey) {
      throw new Error('Please configure your ImgBB API Key first.');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload response failed. Verify API token is correct.');
      }

      const result = await response.json();
      if (result && result.success && result.data && result.data.url) {
        return result.data.url;
      }
      return null;
    } catch (e: any) {
      console.error('ImgBB upload error', e);
      throw e;
    }
  };

  // Handle local files drop / select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Trigger uploads loop
  const triggerImageUploads = async () => {
    if (files.length === 0) {
      setStatusMessage({ type: 'error', text: 'No local image files selected.' });
      return;
    }
    if (!imgbbKey) {
      setStatusMessage({ type: 'error', text: 'ImgBB API Key is needed. Please configure below.' });
      return;
    }

    setIsUploading(true);
    setStatusMessage({ type: 'info', text: 'Uploading files securely to ImgBB API...' });
    
    const successfulUrls: string[] = [];
    try {
      for (const file of files) {
        const url = await uploadToImgBB(file);
        if (url) {
          successfulUrls.push(url);
        }
      }
      setUploadedUrls((prev) => [...prev, ...successfulUrls]);
      setFiles([]); // clear loaded files on success
      setStatusMessage({ type: 'success', text: `Successfully uploaded ${successfulUrls.length} file(s) to ImgBB!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Upload failed: ${err.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddManualUrl = () => {
    if (manualUrl.trim()) {
      setUploadedUrls((prev) => [...prev, manualUrl.trim()]);
      setManualUrl('');
    }
  };

  const handleRemoveUploadedUrl = (index: number) => {
    setUploadedUrls((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Clear form
  const handleResetForm = () => {
    setName('');
    setBrand('');
    setPrice('');
    setDescription('');
    setCategory('Mirrorless');
    setCondition('New');
    setStock('5');
    setSpecs([]);
    setUploadedUrls([]);
    setFiles([]);
    setStatusMessage(null);
  };

  // Form Submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!name.trim()) return setStatusMessage({ type: 'error', text: 'Name detail is required.' });
    if (!brand.trim()) return setStatusMessage({ type: 'error', text: 'Brand is required.' });
    if (!price || isNaN(Number(price))) return setStatusMessage({ type: 'error', text: 'Please enter a valid numeric pricing amount.' });
    if (!description.trim()) return setStatusMessage({ type: 'error', text: 'Camera description is required.' });
    
    const finalImages = uploadedUrls.length > 0 ? uploadedUrls : [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ]; // Default placeholder if no image uploaded

    const parsedStock = parseInt(stock) || 1;

    const newCameraItem: Camera = {
      // Craft clean descriptive URL slugs
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cam-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      price: Math.round(Number(price)),
      description: description.trim(),
      images: finalImages,
      category,
      condition,
      specs: specs.length > 0 ? specs : ['Auto Focus', 'FHD Resolution'],
      stock: parsedStock,
    };

    try {
      await onAddCamera(newCameraItem);
      setStatusMessage({ type: 'success', text: `Successfully saved "${newCameraItem.name}" camera card!` });
      handleResetForm();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Database writing failed: ${err.message}` });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      
      {/* Admin Title Info */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Catalog Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Build card listings, configure real-time cloud connections, or complete ImgBB API configurations.
          </p>
        </div>

        <button
          onClick={onResetToSample}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-350 bg-white rounded-xl text-xs font-bold text-slate-600 transition"
          title="Reset back to default samples"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Default database</span>
        </button>
      </section>

      {/* Grid: Form Uploader vs Keys Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Forms Uploader Card (Cols span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleFormSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-600" />
              <span>Create New Camera Card</span>
            </h3>

            {/* Status alerts */}
            {statusMessage && (
              <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-medium border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 border-rose-100 text-rose-800'
                  : 'bg-blue-50 border-blue-100 text-blue-800'
              }`}>
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Fields list */}
            <div className="space-y-4">
              
              {/* Row 1: Brand & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Camera Name / Model</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alpha 7R V Full-Frame"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Brand / Maker</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Sony, Fujifilm, Canon"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Row 2: Price & Category & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-500">Price (INR ₹)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 159900"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Mirrorless">Mirrorless</option>
                    <option value="DSLR">DSLR</option>
                    <option value="Cinema">Cinema</option>
                    <option value="Vintage">Vintage</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="New">New</option>
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Vintage">Vintage</option>
                  </select>
                </div>
              </div>

              {/* Stock Selector */}
              <div className="space-y-1 w-fit">
                <label className="text-xs font-bold text-slate-500">Available Stock</label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-24 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Specs array adding block */}
              <div className="space-y-2 border-t border-slate-50 pt-3">
                <label className="text-xs font-bold text-slate-550 block">Technical Features Specs</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSpec}
                    onChange={(e) => setCurrentSpec(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSpec(); } }}
                    placeholder="e.g. 61 MP, APS-C sensor, 8K Video"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-4 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {specs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {specs.map((spec, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-650">
                        <span>{spec}</span>
                        <button type="button" onClick={() => handleRemoveSpec(i)} className="text-slate-400 hover:text-rose-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description box */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Description Overview</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe camera details, package contents, lenses included, or general rental terms..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Multiple REAL Image files drag selection uploader */}
              <div className="space-y-3 border-t border-slate-50 pt-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-550 flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-teal-600" />
                    <span>Upload Camera Images (ImgBB Integration)</span>
                  </label>
                  {!imgbbKey && (
                    <span className="text-[10px] text-rose-500 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">API KEY MISSING</span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-2 w-full rounded-2xl p-6 text-center hover:border-teal-400 transition-colors bg-slate-50/50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">Drag files here or click to browse</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, or JPEG up to 6MB per item</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-3 cursor-pointer text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>

                {/* Local files list queue for trigger */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 pl-1">
                      <span>Files Selected ({files.length})</span>
                      <button
                        type="button"
                        onClick={triggerImageUploads}
                        disabled={isUploading}
                        className="text-teal-600 hover:text-teal-700 disabled:opacity-50 font-extrabold flex items-center gap-1 underline"
                      >
                        {isUploading ? 'Uploading...' : 'Upload Now'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {files.map((f, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 pl-2 pr-1 py-1 rounded-lg text-xs">
                          <span className="text-slate-600 font-medium truncate max-w-[120px]">{f.name}</span>
                          <button type="button" onClick={() => handleRemoveFile(i)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pasted Image Link Fallback Option */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OR Paste web URLs directly (Alternative fallback)</span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/your-camera-image"
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualUrl}
                      className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      Insert
                    </button>
                  </div>
                </div>

                {/* Uploaded Urls lists review */}
                {uploadedUrls.length > 0 && (
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-xs font-bold text-slate-500 block">Uploaded ImgBB / Paste Images Link ({uploadedUrls.length})</span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {uploadedUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square border border-slate-150 rounded-lg overflow-hidden group">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveUploadedUrl(i)}
                            className="absolute -top-1 -right-1 bg-white hover:bg-rose-50 text-rose-500 p-1 border border-slate-200 rounded-full cursor-pointer shadow-sm hover:scale-110"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Submitter */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleResetForm}
                className="text-xs font-bold text-slate-400 hover:text-slate-650"
              >
                Clear Fields
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-teal-600 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition shadow-md hover:shadow-teal-500/10 cursor-pointer"
              >
                Publish Camera Card
              </button>
            </div>

          </form>
        </div>

        {/* Configurations Sidepanel Cards */}
        <div className="space-y-6">
          
          {/* 1. ImgBB credential key configs */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Key className="w-4 h-4 text-teal-600" />
              <span>ImgBB API integration</span>
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ImgBB hosts your high-resolution body shots free of charge. Generate your free account key securely at{' '}
              <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-teal-600 font-bold underline">imgbb.com</a>.
            </p>

            <div className="space-y-2">
              <input
                type="password"
                value={imgbbKey}
                onChange={(e) => saveImgbbKey(e.target.value)}
                placeholder="Paste ImgBB Active Key"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs tracking-widest focus:ring-1 focus:ring-teal-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block italic leading-none pl-1">Key gets stored local to your browser.</span>
            </div>
          </div>

          {/* 2. Firestore Cloud connection metrics */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-teal-600" />
              <span>Firebase Cloud Database</span>
            </h3>
            
            <div className="text-[11px] text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isFirebaseEnabled ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                <span className="font-bold">
                  Status: {isFirebaseEnabled ? 'Active Cloud Sync' : 'Local Sandbox mode'}
                </span>
              </div>
              <p className="leading-relaxed">
                {isFirebaseEnabled
                  ? 'All changes writing instantly to Google Firebase Cloud Storage Firestore. Your team receives listings immediately.'
                  : 'Operating in Local Sandbox mode. Cards are stored temporarily in browser memory, allowing seamless full-workflow previews before Google Cloud activation.'}
              </p>
            </div>
          </div>

          {/* 3. Stored Items list */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">
              Current listings database ({cameras.length})
            </h3>

            <div className="space-y-2.5 overflow-y-auto max-h-[280px] pr-1">
              {cameras.map((c) => (
                <div key={c.id} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-none">
                  <div className="flex gap-2.5 items-center">
                    <img referrerPolicy="no-referrer" src={c.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-50" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 leading-tight line-clamp-1">{c.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block">{c.brand} | Stock: {c.stock}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onDeleteCamera(c.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title={`Delete ${c.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
