import React from 'react';
import { PlantInfo } from '../types';
import { Sun, Droplets, Thermometer, Info, Shovel, AlertTriangle } from 'lucide-react';

interface PlantCardProps {
  info: PlantInfo;
  imageUrl: string;
  onReset: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ info, imageUrl, onReset }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-64 sm:h-80 w-full">
        <img 
          src={imageUrl} 
          alt={info.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold">{info.name}</h2>
            <p className="text-sm italic opacity-90">{info.scientific_name}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-slate-600 leading-relaxed text-lg">
          {info.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CareItem 
            icon={<Sun className="w-5 h-5 text-amber-500" />} 
            label="Sunlight" 
            value={info.care_instructions.sunlight} 
          />
          <CareItem 
            icon={<Droplets className="w-5 h-5 text-blue-500" />} 
            label="Water" 
            value={info.care_instructions.water} 
          />
          <CareItem 
            icon={<Shovel className="w-5 h-5 text-emerald-600" />} 
            label="Soil" 
            value={info.care_instructions.soil} 
          />
          <CareItem 
            icon={<Thermometer className="w-5 h-5 text-orange-500" />} 
            label="Temperature" 
            value={info.care_instructions.temperature} 
          />
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="block font-semibold text-amber-900 text-sm mb-1">Toxicity info</span>
            <p className="text-amber-800 text-sm">{info.care_instructions.toxicity}</p>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200"
        >
          Scan Another Plant
        </button>
      </div>
    </div>
  );
};

const CareItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
    <div className="mt-0.5 bg-white p-2 rounded-lg shadow-sm border border-slate-100">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
      <p className="text-sm text-slate-600">{value}</p>
    </div>
  </div>
);

export default PlantCard;