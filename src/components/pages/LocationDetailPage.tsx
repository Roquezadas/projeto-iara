// src/components/pages/LocationDetailPage.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocationsStore } from '../../store/locationsStore';
import { useGuideStore } from '../../store/guideStore';
import { ArrowLeft, Bot, User, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LocationDetailPage = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const location = useLocationsStore(state => state.locations.find(l => l.id === locationId));
  
  const { messages, isLoading, askQuestion, startConversation, clearChat } = useGuideStore();
  
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Efeito para iniciar e limpar a conversa de forma segura
  useEffect(() => {
    if (location) {
      startConversation(location.name);
    }
    // A função de limpeza é essencial para limpar o chat ao sair da página
    return () => {
      clearChat();
    };
  }, [locationId, location, startConversation, clearChat]); // Dependências corrigidas
  
  // Efeito para rolar para a última mensagem
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && location && !isLoading) {
      askQuestion(inputValue, location.name);
      setInputValue('');
    }
  };

  // Se o local ainda não foi encontrado (pode acontecer por um instante), mostramos um loading
  if (!location) {
    return (
      <div className="p-8 text-center h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-white mb-4" />
        <h1 className="text-2xl text-white">A carregar local...</h1>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Cabeçalho */}
      <div className="relative h-64 w-full flex-shrink-0">
        <img src={location.image} alt={location.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"/>
        <Link to="/locations" className="absolute top-4 left-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
          <ArrowLeft />
        </Link>
        <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white drop-shadow-lg">{location.name}</h1>
      </div>

      {/* Corpo do Chat */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
        <p className="text-slate-300 mb-6 text-sm md:text-base bg-black/20 p-4 rounded-lg">{location.story}</p>
        
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div 
              key={index}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && <div className="flex-shrink-0 p-2 bg-blue-500/20 rounded-full"><Bot className="text-blue-300"/></div>}
              <div className={`p-3 rounded-xl max-w-lg text-white ${msg.sender === 'bot' ? 'bg-slate-800' : 'bg-blue-600'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && <div className="flex-shrink-0 p-2 bg-slate-700 rounded-full"><User/></div>}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 justify-start">
            <div className="flex-shrink-0 p-2 bg-blue-500/20 rounded-full"><Bot className="text-blue-300"/></div>
            <div className="p-3 rounded-xl max-w-sm bg-slate-800 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-white" />
              <p className="text-white italic">Iara está a pensar...</p>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      {/* Input de Chat */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-800/50 border-t border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Pergunte sobre ${location.name}...`} 
            className="flex-1 p-3 bg-slate-700 rounded-lg text-white placeholder:text-slate-400 border-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputValue.trim()} className="p-3 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors">
            <Send className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};