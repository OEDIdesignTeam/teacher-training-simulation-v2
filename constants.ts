
import { ResponseType } from './types';

export const STUDENTS = ['Alex', 'Jordan', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Taylor', 'Cameron', 'Drew', 'Sage'];

export const RESPONSE_TEXTS: Record<ResponseType, string> = {
    'strong-praise': 'Strong Praise',
    'mild-praise': 'Mild Praise',
    'no-comment': 'No Comment',
    'mild-reprimand': 'Mild Reprimand',
    'strong-reprimand': 'Strong Reprimand'
};

export const RESPONSE_COLORS: Record<ResponseType, string> = {
  'strong-praise': 'bg-[#E57200] hover:bg-orange-600 text-white',
  'mild-praise': 'bg-[#E57200]/80 hover:bg-[#E57200] text-white',
  'no-comment': 'bg-[#C8CBD2] hover:bg-slate-400 text-[#232D4B]',
  'mild-reprimand': 'bg-[#232D4B]/80 hover:bg-[#232D4B] text-white',
  'strong-reprimand': 'bg-[#232D4B] hover:bg-slate-800 text-white',
};
