
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="mb-4">
      <p className="text-center text-sm font-semibold text-[#E57200] mb-2">
        Student {current} of {total}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#232D4B] h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
