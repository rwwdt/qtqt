
import React from 'react';

interface FooterNavProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
  onOpenCalendar: () => void;
}

const FooterNav: React.FC<FooterNavProps> = ({ date, onDateChange, onOpenCalendar }) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const today = new Date();
  
  const getDayWindow = () => {
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(date);
      d.setDate(date.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getDayOfWeek = (d: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[d.getDay()];
  };

  const dayWindow = getDayWindow();

  const changeDate = (newDate: Date) => {
    onDateChange(newDate);
  };

  const shiftMonth = (offset: number) => {
    const nextDate = new Date(year, month - 1 + offset, 1);
    onDateChange(nextDate);
  };

  return (
    <footer className="bg-white border-t border-stone-100 z-40 px-4 pt-3 pb-6 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.01)]">
      <div className="max-w-3xl mx-auto flex items-center justify-between space-x-4">
        <div className="flex items-center bg-stone-50 rounded-2xl p-0.5 shrink-0 border border-stone-100">
          <button onClick={() => shiftMonth(-1)} className="p-2 text-stone-400 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <button onClick={onOpenCalendar} className="px-2 py-1 flex flex-col items-center justify-center min-w-[50px]">
            <span className="text-[9px] font-semibold text-stone-400 eng-font -mb-1">{year}</span>
            <span className="text-sm font-semibold text-[#333]">{month}월</span>
          </button>

          <button onClick={() => shiftMonth(1)} className="p-2 text-stone-400 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-around">
          {dayWindow.map((d, idx) => {
            const dNum = d.getDate();
            const isActive = d.toDateString() === date.toDateString();
            const isActualToday = d.toDateString() === today.toDateString();
            const dayOfWeek = getDayOfWeek(d);
            
            return (
              <button
                key={idx}
                onClick={() => changeDate(d)}
                className={`flex flex-col items-center justify-center min-w-[44px] h-[56px] rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' 
                    : 'bg-transparent text-stone-400'
                }`}
              >
                <span className={`text-[9px] font-medium mb-0.5 ${isActive ? 'text-blue-100' : 'text-stone-400'}`}>
                  {dayOfWeek}
                </span>
                {isActualToday && (
                  <div className={`w-1 h-1 rounded-full mb-0.5 ${isActive ? 'bg-white' : 'bg-blue-500'}`}></div>
                )}
                <span className={`text-[13px] font-medium eng-font ${isActive ? 'text-white' : 'text-[#333]'}`}>
                  {dNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;
