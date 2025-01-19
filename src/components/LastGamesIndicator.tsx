import React from 'react';

interface LastGamesIndicatorProps {
  result: 'W' | 'L';
}

export const LastGamesIndicator = ({ result }: LastGamesIndicatorProps) => {
  const isWin = result === 'W';
  
  return (
    <div className={`
      w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white
      ${isWin ? 'bg-green-500' : 'bg-red-500'}
    `}>
      {result}
    </div>
  );
};
