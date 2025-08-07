
export type Phase = 'intro' | 'experiment' | 'preview' | 'results';

export type ResponseType = 'strong-praise' | 'mild-praise' | 'no-comment' | 'mild-reprimand' | 'strong-reprimand';

export interface StudentData {
  name: string;
  initialTime: number;
  response: ResponseType | null;
  finalTime: number | null;
}

export type SummaryEffectiveness = 'effective' | 'ineffective' | null;

export interface SummaryRatings {
    praise: SummaryEffectiveness;
    reprimand: SummaryEffectiveness;
}
