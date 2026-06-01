
import React from 'react';
import { BibleVersion, FileStatus } from '../types';

interface HeaderProps {
  selectedVersion: BibleVersion;
  fileStatus: FileStatus;
  onVersionChange: (version: BibleVersion) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedVersion, onVersionChange, isDark, onToggleTheme }) => {
  return (
    <header className="bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 z-50 pt-6 pb-2 shrink-0 relative">
      {/* BibleCard와 동일한 컨테이너 구조 적용 (max-w-3xl mx-auto px-5) */}
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#92400e" viewBox="0 0 256 256" className="shrink-0">
              <path d="M208,111v89a8,8,0,0,1-8,8H144a8,8,0,0,0,8-8V111a32,32,0,0,0-8-63h56a32,32,0,0,1,8,63Z" opacity="0.2"></path>
              <path d="M240,80a40,40,0,0,0-40-40H48a40,40,0,0,0-16,76.65V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V116.65A40.06,40.06,0,0,0,240,80ZM48,120a8,8,0,0,0,0-16,24,24,0,0,1,0-48h96a24,24,0,0,1,0,48,8,8,0,0,0,0,16v80H48Zm152-16a8,8,0,0,0,0,16v80H160V116.65A40,40,0,0,0,176,56h24a24,24,0,0,1,0,48Z"></path>
            </svg>
            <h1 className="text-[#333] dark:text-stone-100 font-bold tracking-tighter text-[19px] noto-sans shrink-0">
              큐티로 빵빵한 오늘
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              className="p-2 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors border border-stone-100 dark:border-stone-700 text-stone-600 dark:text-stone-300"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
            <a
              href="https://youtube.com/playlist?list=PLpRNm6TbW5JZ4HPC-mLm4KDLK_DAEsXvy&si=uYI0yNnBnUvjjjOt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 py-1.5 px-3 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors group border border-stone-100 dark:border-stone-700 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="hidden sm:inline text-stone-600 dark:text-stone-300 font-semibold text-[11px] tracking-tight">찬양으로 잼잼한 하루</span>
              <span className="sm:hidden text-stone-600 dark:text-stone-300 font-semibold text-[11px] tracking-tight">찬양 잼잼</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center mb-1">
          <div className="inline-flex bg-stone-100 dark:bg-stone-800 p-0.5 rounded-2xl w-full border border-stone-200/40 dark:border-stone-700/40">
            {(Object.values(BibleVersion) as BibleVersion[]).map((v) => (
              <button
                key={v}
                onClick={() => onVersionChange(v)}
                className={`flex-1 py-2.5 px-1 text-[11px] font-semibold rounded-xl transition-all whitespace-nowrap eng-font ${
                  selectedVersion === v 
                    ? 'bg-white dark:bg-stone-700 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
