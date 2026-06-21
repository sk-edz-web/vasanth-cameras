/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AdminView from './components/AdminView';
import { Camera } from './types';
import { getCamerasList, saveCameraToDb, deleteCameraFromDb } from './dbHelper';
import { ArrowLeft, Film, ShieldAlert } from 'lucide-react';
import './index.css';

function AdminApp() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCameras = async () => {
    setLoading(true);
    try {
      const data = await getCamerasList();
      setCameras(data);
    } catch (e) {
      console.error('Failed to load cameras list for admin portal', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCameras();
  }, []);

  const handleAddCamera = async (newCamera: Camera) => {
    await saveCameraToDb(newCamera);
    await loadCameras(); // Reload immediate
  };

  const handleDeleteCamera = async (id: string) => {
    if (confirm('Are you sure you want to delete this camera card listing?')) {
      await deleteCameraFromDb(id);
      await loadCameras(); // Reload immediate
    }
  };

  const handleResetToSample = () => {
    if (confirm('Are you sure you want to restore the catalog back to default sample cameras?')) {
      localStorage.removeItem('vasanth_cameras_list');
      loadCameras();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-55 text-slate-800">
      
      {/* Dynamic Dashboard Navbar */}
      <nav className="glass-nav sticky top-0 z-50 shadow-xs border-b border-slate-100 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-800 uppercase flex items-center gap-2">
                <span>Vasanth Cameras</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Admin Portal</span>
              </h1>
              <p className="text-[9px] text-slate-400 font-bold tracking-wider leading-none">Internal Catalog Manager</p>
            </div>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Store</span>
          </a>
        </div>
      </nav>

      {/* Main Admin Contents */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-semibold">Loading internal catalogs...</p>
          </div>
        ) : (
          <AdminView
            cameras={cameras}
            onAddCamera={handleAddCamera}
            onDeleteCamera={handleDeleteCamera}
            onResetToSample={handleResetToSample}
          />
        )}
      </main>

      {/* Clean footer line */}
      <footer className="bg-slate-900 text-slate-500 py-6 border-t border-slate-850 px-4 text-center">
        <div className="max-w-7xl mx-auto text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Vasanth Cameras Admin Portal. Secure catalog management.</p>
          <div className="flex items-center gap-1 text-slate-400 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
            <span>Authorized administrators only</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>,
);
