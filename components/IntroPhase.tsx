
import React from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

interface IntroPhaseProps {
  onStart: () => void;
}

const IntroPhase: React.FC<IntroPhaseProps> = ({ onStart }) => {
  return (
    <Card className="p-8 md:p-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#232D4B]">Teacher Training Simulation</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#E57200] mt-1">Student Punctuality Intervention Study</h2>
      </div>
      
      <div className="mt-8 text-slate-700 space-y-4 text-left bg-blue-50/50 p-6 rounded-lg border border-[#C8CBD2]">
          <h3 className="text-xl font-bold text-[#232D4B]">Welcome, Teacher!</h3>
          <p>You will work with 11 different students who have been arriving late to class. You encourage students to arrive by 8:25, so they have time to get set up. But school rules are that you must arrive by 8:30.</p>
          <p className="font-semibold">For each student, you will:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>Observe their current arrival time.</li>
              <li>Choose how to respond (praise, reprimand, or no comment).</li>
              <li>See how their arrival time changes the next day.</li>
              <li>Evaluate whether your intervention was effective.</li>
          </ol>
          <p className="font-bold text-[#232D4B]">Your Goal: Help students arrive by the 8:30 deadline through effective feedback.</p>
          <p>After working with all students, you'll provide your overall assessment of which approaches work best.</p>
      </div>

      <div className="mt-8">
        <Button onClick={onStart} variant="secondary">Begin Training</Button>
      </div>
    </Card>
  );
};

export default IntroPhase;
