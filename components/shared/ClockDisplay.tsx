
import React, { useState, useEffect } from 'react';

interface ClockDisplayProps {
  targetMinutes: number;
  animate?: boolean;
  onAnimationComplete?: () => void;
}

const formatTime = (minutes: number): string => {
    const hour = 8;
    return `${hour}:${minutes.toString().padStart(2, '0')}`;
};

const ClockDisplay: React.FC<ClockDisplayProps> = ({ targetMinutes, animate = true, onAnimationComplete }) => {
    const [displayMinutes, setDisplayMinutes] = useState(animate ? 20 : targetMinutes);
    const [isAnimating, setIsAnimating] = useState(animate);

    useEffect(() => {
        if (!animate) {
            setDisplayMinutes(targetMinutes);
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        setDisplayMinutes(20); // Start animation from 8:20
        
        const animationInterval = setInterval(() => {
            setDisplayMinutes(prev => {
                if (prev < targetMinutes) {
                    return prev + 1;
                }
                clearInterval(animationInterval);
                setIsAnimating(false);
                if (onAnimationComplete) {
                  onAnimationComplete();
                }
                return targetMinutes;
            });
        }, 80);

        return () => clearInterval(animationInterval);
    }, [targetMinutes, onAnimationComplete, animate]);

    const timeColor = targetMinutes > 30 ? 'text-[#DF1E43]' : 'text-[#62BB46]';
    const borderColor = targetMinutes > 30 ? 'border-[#DF1E43]' : 'border-[#62BB46]';

    const containerClasses = `font-mono text-5xl sm:text-7xl font-bold text-center bg-slate-100 p-6 rounded-lg border-4 transition-colors duration-300 ${isAnimating ? 'text-slate-800 border-slate-300' : `${timeColor} ${borderColor}`}`;
    
    return (
        <div className={containerClasses}>
            {formatTime(displayMinutes)}
        </div>
    );
};

export default ClockDisplay;
