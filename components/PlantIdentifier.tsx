import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Leaf, Image as ImageIcon, X } from 'lucide-react';
import { identifyPlantFromImage } from '../services/geminiService';
import { PlantInfo } from '../types';
import PlantCard from './PlantCard';

const PlantIdentifier: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Reset previous states
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Extract the base64 data part
      const base64Data = base64String.split(',')[1];
      setImage(base64String);
      setMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image || !mimeType) return;

    setLoading(true);
    setError(null);
    
    try {
      const base64Data = image.split(',')[1];
      const data = await identifyPlantFromImage(base64Data, mimeType);
      setResult(data);
    } catch (err) {
      setError("Failed to identify the plant. Please try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (result && image) {
    return <PlantCard info={result} imageUrl={image} onReset={handleReset} />;
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {!image ? (
        <div className="text-center space-y-6 pt-10">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-2">
            <Leaf className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Identify Your Plant</h1>
          <p className="text-slate-600 text-lg px-4">
            Take a photo or upload an image to get instant care instructions and identification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
             <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative z-10 flex flex-col items-center">
                <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 mb-3 transition-colors" />
                <span className="font-semibold text-slate-700 group-hover:text-emerald-700">Upload Photo</span>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer"
            >
               <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
               <div className="relative z-10 flex flex-col items-center">
                <Camera className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 mb-3 transition-colors" />
                <span className="font-semibold text-slate-700 group-hover:text-emerald-700">Take Photo</span>
               </div>
            </button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square sm:aspect-video bg-slate-100">
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={handleReset}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-center text-sm font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Leaf className="w-6 h-6" />
                Identify Plant
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantIdentifier;