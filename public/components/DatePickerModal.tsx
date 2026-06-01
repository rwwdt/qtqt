
import React, { useState, useEffect, useRef } from 'react';

interface DatePickerModalProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface DevotionalData {
  date: Date;
  reference: string;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ currentDate, onDateSelect, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
  const [devotionalList, setDevotionalList] = useState<DevotionalData[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const REFERENCE_ENDPOINT = "https://qt-bible-api.junjunebug.workers.dev/api/reference";

    const fetchDevotionalList = async () => {
      try {
        const res = await fetch(REFERENCE_ENDPOINT);
        if (!res.ok) throw new Error("시트 로드 실패");

        const raw: { date: string; reference: string }[] = await res.json();

        const list: DevotionalData[] = [];
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 7);

        for (const item of raw) {
          const [year, month, day] = item.date.split('-');
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          date.setHours(0, 0, 0, 0);

          if (date >= sevenDaysAgo && date <= sevenDaysLater) {
            list.push({ date, reference: item.reference });
          }
        }

        list.sort((a, b) => a.date.getTime() - b.date.getTime());
        setDevotionalList(list);
      } catch (error) {
        console.error("Sheet Sync Error:", error);
      }
    };

    fetchDevotionalList();
  }, []);

  useEffect(() => {
    if (selectedRef.current && listRef.current) {
      const listElement = listRef.current;
      const selectedElement = selectedRef.current;
      const listHeight = listElement.clientHeight;
      const selectedTop = selectedElement.offsetTop;
      const selectedHeight = selectedElement.clientHeight;
      
      listElement.scrollTop = selectedTop - (listHeight / 2) + (selectedHeight / 2);
    }
  }, [devotionalList]);

  const formatDate = (d: Date) => {
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `${m}/${day}`;
  };

  const formatReference = (ref: string) => {
    const match = ref.match(/^(.+?)\s+(\d+):(\d+)(?:[-~](\d+))?$/);
    if (!match) return ref;
    const [, book, chapter, start, end] = match;
    return end ? `${book} ${chapter}:${start}~${end}` : `${book} ${chapter}:${start}`;
  };

  const isSelected = (d: Date) => d.toDateString() === selectedDate.toDateString();
  const isToday = (d: Date) => d.toDateString() === today.toDateString();
  const hasSelectionChanged = selectedDate.toDateString() !== currentDate.toDateString();

  const handleConfirm = () => {
    if (hasSelectionChanged) {
      onDateSelect(selectedDate);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-stone-900 flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-5 py-4 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#333] dark:text-stone-100 noto-sans">날짜 선택</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 dark:text-stone-400">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {devotionalList.map((item, idx) => (
            <button
              key={idx}
              ref={isSelected(item.date) ? selectedRef : null}
              onClick={() => setSelectedDate(item.date)}
              className={`w-full px-5 py-4 border-b border-stone-100 dark:border-stone-800 text-left transition-colors ${
                isSelected(item.date)
                  ? 'bg-blue-50 dark:bg-blue-950/40'
                  : 'hover:bg-stone-50 dark:hover:bg-stone-800 active:bg-stone-100 dark:active:bg-stone-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-14 shrink-0">
                    <span className={`text-[13px] font-bold eng-font ${isSelected(item.date) ? 'text-blue-600' : 'text-[#333] dark:text-stone-100'}`}>
                      {formatDate(item.date)}
                    </span>
                    <span className={`text-[10px] font-medium ${isSelected(item.date) ? 'text-blue-500' : 'text-stone-400'}`}>
                      {DAYS[item.date.getDay()]}요일
                    </span>
                  </div>
                  <div className="w-[1px] h-10 bg-stone-200 dark:bg-stone-700"></div>
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <span className={`text-[13px] font-medium noto-sans ${isSelected(item.date) ? 'text-blue-700' : 'text-stone-600 dark:text-stone-300'}`}>
                      {formatReference(item.reference)}
                    </span>
                    {isToday(item.date) && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full shrink-0">오늘</span>
                    )}
                  </div>
                </div>
                {isSelected(item.date) && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 px-5 py-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 text-[13px] font-semibold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors active:scale-[0.98]"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!hasSelectionChanged}
            className={`flex-1 py-3.5 text-[13px] font-semibold rounded-xl transition-colors active:scale-[0.98] ${
              hasSelectionChanged
                ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none'
                : 'text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-800 cursor-not-allowed'
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
