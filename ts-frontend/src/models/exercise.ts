export interface Exercise {
  id: string;
  name: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  units: 'lbs' | 'kg';
}
