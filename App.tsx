import React, { useState } from 'react';
import { Camera, MessageCircle, Sprout } from 'lucide-react';
import PlantIdentifier from './components/PlantIdentifier';
import ChatBot from './components/ChatBot';
import { Tab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.IDENTIFY);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 pb-24 sm:pb-0">
      
      {/* Desktop/Tablet Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Botanist AI
            </span>
          </div>
          
          <div className="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-xl">
             <button
              onClick={() => setActiveTab(Tab.IDENTIFY)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === Tab.IDENTIFY 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Camera className="w-4 h-4" />
              Identify
            </button>
            <button
              onClick={() => setActiveTab(Tab.CHAT)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === Tab.CHAT 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Ask Expert
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === Tab.IDENTIFY ? (
          <PlantIdentifier />
        ) : (
          <ChatBot />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab(Tab.IDENTIFY)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === Tab.IDENTIFY ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <Camera className={`w-6 h-6 ${activeTab === Tab.IDENTIFY ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-xs font-medium">Identify</span>
          </button>
          
          <button
            onClick={() => setActiveTab(Tab.CHAT)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === Tab.CHAT ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <MessageCircle className={`w-6 h-6 ${activeTab === Tab.CHAT ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-xs font-medium">Chat</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;