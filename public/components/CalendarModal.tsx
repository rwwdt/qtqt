
import React from 'react';

interface CalendarModalProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ currentDate, onDateSelect, onClose }) => {
  const year = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleMonthSelect = (m: number) => {
    const nextDate = new Date(year, m - 1, 1);
    onDateSelect(nextDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] px-0 pb-0 sm:px-4" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-sm rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl p-8 pb-10 sm:pb-8 animate-in slide-in-from-bottom-full duration-400 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-stone-100 rounded-full mx-auto mb-10 sm:hidden"></div>
        
        <div className="text-center mb-10">
          <h3 className="text-blue-600 text-[11px] font-semibold tracking-[0.4em] uppercase mb-4 eng-font">Month Selection</h3>
          <p className="text-4xl font-semibold text-[#333] tracking-tight eng-font">{year}<span className="text-2xl font-medium ml-1">년</span></p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {months.map((m) => {
            const isSelected = (currentDate.getMonth() + 1) === m;
            return (
              <button
                key={m}
                onClick={() => handleMonthSelect(m)}
                className={`py-6 rounded-2xl text-base font-semibold transition-all eng-font ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-stone-50 text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                }`}
              >
                {m}<span className="text-xs ml-0.5 font-medium">월</span>
              </button>
            );
          })}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 text-stone-300 text-[12px] font-semibold tracking-[0.4em] uppercase hover:text-stone-500 transition-colors eng-font"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
