
import React from 'react';
import { SummaryRatings } from '../types';
import Card from './shared/Card';
import Button from './shared/Button';

interface FinalResultsPhaseProps {
  ratings: SummaryRatings;
  onReset: () => void;
}

const FinalResultsPhase: React.FC<FinalResultsPhaseProps> = ({ ratings, onReset }) => {
  return (
    <Card className="p-8 md:p-10">
      <h1 className="text-3xl font-bold text-center text-[#232D4B]">Your Experience vs. Reality</h1>
      
      <div className="mt-6 bg-slate-50 p-4 rounded-lg text-center">
        <h3 className="text-xl font-bold text-[#232D4B]">Your Assessment</h3>
        <p className="mt-2 text-slate-700"><strong>Praise:</strong> You rated praise as generally <span className="font-bold capitalize text-[#E57200]">{ratings.praise || '...'}</span>.</p>
        <p className="text-slate-700"><strong>Reprimand:</strong> You rated reprimand as generally <span className="font-bold capitalize text-[#232D4B]">{ratings.reprimand || '...'}</span>.</p>
      </div>
      
      <div className="mt-6 text-slate-700 space-y-4">
        <h3 className="text-2xl font-bold text-[#E57200]">What Really Happened?</h3>
        <p className="font-semibold text-lg">All student arrival times were <strong className="text-[#232D4B]">completely random</strong> — neither your praise nor reprimand had any real effect!</p>
        <p>Most people in this situation experience <strong className="text-[#232D4B]">"regression to the mean"</strong>. This is the statistical tendency for extreme performances to be followed by more average performances, simply by chance.</p>
        
        <p>This creates a powerful, systematic illusion:</p>
        <ul className="list-disc list-inside space-y-2 pl-4 bg-blue-50/50 p-4 rounded-md border-l-4 border-[#E57200]">
          <li>
            <strong>Praise often appears harmful</strong> because you tend to praise students after an unusually early arrival (an extreme "good" performance). Their next, more average, arrival time will likely be later, making the praise seem ineffective or even counterproductive.
          </li>
          <li>
            <strong>Reprimand often appears helpful</strong> because you tend to reprimand students after an unusually late arrival (an extreme "poor" performance). Their next, more average, arrival time will likely be earlier, making the punishment seem effective.
          </li>
        </ul>
        
        <div className="pt-4 border-t-2 border-slate-200">
            <h4 className="text-xl font-bold text-[#232D4B]">Leadership Implications</h4>
            <p className="mt-2">This "specious learning" demonstrates how leaders can develop false confidence in ineffective or harmful strategies based on random variation. In organizations, this can lead to an over-reliance on criticism and punishment while under-valuing positive reinforcement. Understanding how situations shape our perceptions helps leaders make more evidence-based decisions rather than relying on potentially misleading experiences alone.</p>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={onReset} variant="secondary">Try Again</Button>
      </div>
    </Card>
  );
};

export default FinalResultsPhase;
