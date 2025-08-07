
import React, { useState, useMemo } from 'react';
import { StudentData, SummaryRatings, ResponseType, SummaryEffectiveness } from '../types';
import { RESPONSE_TEXTS } from '../constants';
import Card from './shared/Card';
import Button from './shared/Button';

interface ResultsPreviewPhaseProps {
  studentData: StudentData[];
  onComplete: (ratings: SummaryRatings) => void;
}

const formatTime = (minutes: number): string => `8:${minutes.toString().padStart(2, '0')}`;

const ResultsPreviewPhase: React.FC<ResultsPreviewPhaseProps> = ({ studentData, onComplete }) => {
    const [ratings, setRatings] = useState<SummaryRatings>({ praise: null, reprimand: null });

    const handleSelect = (type: 'praise' | 'reprimand', effectiveness: SummaryEffectiveness) => {
        setRatings(prev => ({ ...prev, [type]: effectiveness }));
    };

    const { praiseAvg, reprimandAvg } = useMemo(() => {
        const praiseOutcomes = studentData.filter(s => s.response?.includes('praise') && s.finalTime && s.initialTime);
        const reprimandOutcomes = studentData.filter(s => s.response?.includes('reprimand') && s.finalTime && s.initialTime);

        let praiseSum = 0;
        if (praiseOutcomes.length > 0) {
            praiseSum = praiseOutcomes.reduce((sum, s) => sum + (s.finalTime! - s.initialTime!), 0) / praiseOutcomes.length;
        }

        let reprimandSum = 0;
        if (reprimandOutcomes.length > 0) {
            reprimandSum = reprimandOutcomes.reduce((sum, s) => sum + (s.finalTime! - s.initialTime!), 0) / reprimandOutcomes.length;
        }
        
        return { praiseAvg: praiseSum, reprimandAvg: reprimandSum };
    }, [studentData]);
    
    const isComplete = ratings.praise !== null && ratings.reprimand !== null;

    return (
        <Card className="p-8 md:p-10">
            <h1 className="text-3xl font-bold text-center text-[#232D4B]">Your Results Summary</h1>
            
            <div className="mt-6 bg-slate-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                <h3 className="text-xl font-bold text-[#232D4B] mb-2">Individual Student Results</h3>
                <ul className="space-y-1 text-sm text-slate-700">
                    {studentData.map(s => {
                        const change = s.finalTime! - s.initialTime!;
                        const changeText = change > 0 ? `+${change} min` : `${change} min`;
                        const changeColor = change > 0 ? 'text-[#DF1E43]' : 'text-[#62BB46]';
                        return (
                            <li key={s.name} className="flex justify-between items-center p-1 bg-white rounded">
                                <span><strong>{s.name}:</strong> {formatTime(s.initialTime!)} &rarr; {RESPONSE_TEXTS[s.response!]} &rarr; {formatTime(s.finalTime!)}</span>
                                <span className={`font-bold ${changeColor}`}>({changeText})</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-4 text-center font-semibold text-slate-800 space-y-2">
                 {praiseAvg !== 0 && <p>On average, after you <span className="text-[#E57200]">praised</span> students, they arrived <span className={praiseAvg > 0 ? "text-[#DF1E43]" : "text-[#62BB46]"}>{Math.abs(praiseAvg).toFixed(1)} minutes {praiseAvg > 0 ? 'later' : 'earlier'}</span>.</p>}
                 {reprimandAvg !== 0 && <p>On average, after you <span className="text-[#E57200]">reprimanded</span> students, they arrived <span className={reprimandAvg > 0 ? "text-[#DF1E43]" : "text-[#62BB46]"}>{Math.abs(reprimandAvg).toFixed(1)} minutes {reprimandAvg > 0 ? 'later' : 'earlier'}</span>.</p>}
            </div>

            <div className="mt-8 border-t-2 border-[#E57200] pt-6">
                 <h3 className="text-xl font-bold text-center text-[#232D4B]">Based on these results, what is your assessment?</h3>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    { (['praise', 'reprimand'] as const).map(type => (
                        <div key={type} className="bg-slate-100 p-4 rounded-lg">
                            <h4 className="font-bold text-center text-[#232D4B] capitalize">Overall, was {type} effective?</h4>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button onClick={() => handleSelect(type, 'effective')} className={`p-2 rounded font-bold transition ${ratings[type] === 'effective' ? 'bg-[#E57200] text-white' : 'bg-white hover:bg-slate-200 text-[#232D4B]'}`}>Generally Effective</button>
                                <button onClick={() => handleSelect(type, 'ineffective')} className={`p-2 rounded font-bold transition ${ratings[type] === 'ineffective' ? 'bg-[#232D4B] text-white' : 'bg-white hover:bg-slate-200 text-[#232D4B]'}`}>Generally Ineffective</button>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="mt-8">
                <Button onClick={() => onComplete(ratings)} disabled={!isComplete}>See Full Analysis</Button>
            </div>
        </Card>
    );
};

export default ResultsPreviewPhase;
