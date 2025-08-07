
import React, { useState, useEffect, useCallback } from 'react';
import { StudentData, ResponseType } from '../types';
import { RESPONSE_TEXTS, RESPONSE_COLORS } from '../constants';
import Card from './shared/Card';
import Button from './shared/Button';
import ProgressBar from './shared/ProgressBar';
import ClockDisplay from './shared/ClockDisplay';

interface ExperimentPhaseProps {
  student: StudentData;
  studentNumber: number;
  totalStudents: number;
  onResponse: (response: ResponseType) => void;
  onNextStudent: () => void;
}

const ExperimentPhase: React.FC<ExperimentPhaseProps> = ({ student, studentNumber, totalStudents, onResponse, onNextStudent }) => {
    const [showOutcome, setShowOutcome] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        setShowOutcome(false);
        setIsAnimating(true);
    }, [student.name]);

    const handleResponseClick = (response: ResponseType) => {
        onResponse(response);
        setShowOutcome(true);
    };

    const handleAnimationComplete = useCallback(() => {
        setIsAnimating(false);
    }, []);

    const OutcomeDisplay: React.FC = () => {
        if (!student.finalTime || !student.initialTime) return null;
        const change = student.finalTime - student.initialTime;
        let changeText: string;
        let changeColor: string;

        if (change < -2) {
            changeText = `Improved by ${Math.abs(change)} minutes!`;
            changeColor = 'text-[#62BB46]';
        } else if (change > 2) {
            changeText = `Arrived ${change} minutes later`;
            changeColor = 'text-[#DF1E43]';
        } else {
            changeText = 'About the same time';
            changeColor = 'text-slate-600';
        }

        return (
            <div className="mt-6 text-center bg-slate-50 p-6 rounded-lg animate-fade-in">
                <h3 className="text-xl font-bold text-[#232D4B]">The Next Day...</h3>
                <p className="mt-2 text-slate-600 mb-4">This student arrived at:</p>
                <ClockDisplay targetMinutes={student.finalTime} animate={false} />
                <p className={`text-lg font-bold mt-4 ${changeColor}`}>{changeText}</p>
            </div>
        );
    };

    return (
        <Card className="p-6 md:p-8">
            <ProgressBar current={studentNumber} total={totalStudents} />
            
            <h2 className="text-center text-4xl font-bold text-[#232D4B] mt-4">{student.name}</h2>
            
            <div className="mt-6 text-center">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-md">
                    <span>Today's Arrival Time:</span>
                    <span>Encouraged: by 8:25 | Required: by 8:30</span>
                </div>
                <div className="mt-4">
                    <ClockDisplay targetMinutes={student.initialTime} onAnimationComplete={handleAnimationComplete} />
                </div>
            </div>

            {!showOutcome ? (
                <div className="mt-8 animate-fade-in">
                    <h3 className="text-center text-xl font-bold text-[#232D4B] mb-4">How do you respond to this student?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        {(Object.keys(RESPONSE_TEXTS) as ResponseType[]).map(key => (
                            <button
                                key={key}
                                onClick={() => handleResponseClick(key)}
                                disabled={isAnimating}
                                className={`font-bold py-3 px-2 rounded-lg transition-all duration-200 uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed ${RESPONSE_COLORS[key]}`}
                            >
                                {RESPONSE_TEXTS[key]}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <OutcomeDisplay />
                    <div className="mt-8">
                        <Button onClick={onNextStudent}>
                           {studentNumber < totalStudents ? 'Next Student' : 'Finish & See Summary'}
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};

export default ExperimentPhase;
