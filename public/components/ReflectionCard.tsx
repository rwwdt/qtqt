
import React from 'react';

interface ReflectionCardProps {
  reflection: string;
  prayer: string;
}

const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflection, prayer }) => {
  if (!reflection && !prayer) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
      <div className="bg-white/40 backdrop-blur-sm border border-stone-200/50 rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">Reflection</span>
            <div className="h-px flex-1 bg-stone-100"></div>
          </div>
          <p className="text-stone-700 leading-[1.8] serif-font text-[16px] break-keep whitespace-pre-wrap">
            {reflection}
          </p>
        </div>

        <div className="pt-8 border-t border-stone-100">
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-stone-100 text-stone-500 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">Prayer</span>
            <div className="h-px flex-1 bg-stone-100"></div>
          </div>
          <p className="text-stone-500 italic leading-[1.8] serif-font text-[15px] break-keep whitespace-pre-wrap">
            {prayer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReflectionCard;
