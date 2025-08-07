
import React, { useState, useCallback } from 'react';
import { Phase, StudentData, SummaryRatings, ResponseType } from './types';
import { STUDENTS } from './constants';
import IntroPhase from './components/IntroPhase';
import ExperimentPhase from './components/ExperimentPhase';
import ResultsPreviewPhase from './components/ResultsPreviewPhase';
import FinalResultsPhase from './components/FinalResultsPhase';

const generateArrivalTime = (): number => {
    // Random arrival time between 8:15 and 8:45 (15-45 minutes after 8:00)
    return Math.round(Math.random() * 30 + 15);
};

const App: React.FC = () => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [studentData, setStudentData] = useState<StudentData[]>([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState<number>(0);
    const [summaryRatings, setSummaryRatings] = useState<SummaryRatings>({ praise: null, reprimand: null });

    const handleStartExperiment = useCallback(() => {
        setCurrentStudentIndex(0);
        const initialStudentData = STUDENTS.map(name => ({
            name,
            initialTime: generateArrivalTime(),
            response: null,
            finalTime: null,
        }));
        setStudentData(initialStudentData);
        setSummaryRatings({ praise: null, reprimand: null });
        setPhase('experiment');
    }, []);

    const handleResponse = useCallback((response: ResponseType) => {
        setStudentData(prevData => {
            const newData = [...prevData];
            newData[currentStudentIndex] = {
                ...newData[currentStudentIndex],
                response: response,
                finalTime: generateArrivalTime(),
            };
            return newData;
        });
    }, [currentStudentIndex]);

    const handleNextStudent = useCallback(() => {
        if (currentStudentIndex < STUDENTS.length - 1) {
            setCurrentStudentIndex(prevIndex => prevIndex + 1);
        } else {
            setPhase('preview');
        }
    }, [currentStudentIndex]);
    
    const handleShowResults = useCallback((ratings: SummaryRatings) => {
        setSummaryRatings(ratings);
        setPhase('results');
    }, []);

    const renderPhase = () => {
        switch (phase) {
            case 'intro':
                return <IntroPhase onStart={handleStartExperiment} />;
            case 'experiment':
                return (
                    <ExperimentPhase
                        student={studentData[currentStudentIndex]}
                        studentNumber={currentStudentIndex + 1}
                        totalStudents={STUDENTS.length}
                        onResponse={handleResponse}
                        onNextStudent={handleNextStudent}
                    />
                );
            case 'preview':
                return <ResultsPreviewPhase studentData={studentData} onComplete={handleShowResults} />;
            case 'results':
                return <FinalResultsPhase ratings={summaryRatings} onReset={handleStartExperiment} />;
            default:
                return <IntroPhase onStart={handleStartExperiment} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                {renderPhase()}
            </div>
        </div>
    );
};

export default App;
