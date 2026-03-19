export interface Lesson {
  id: string;
  name: string;
  teacher?: string;
  room?: string;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  day: string;
  lessons: Lesson[];
}

export interface ProductionProject {
  id: string;
  title: string;
  status: 'Idea' | 'Arrangement' | 'Mixing' | 'Mastering' | 'Completed';
  bpm?: number;
  key?: string;
  deadline?: string;
}

export interface Insect {
  id: string;
  species: string;
  name: string;
  lastFed: string;
  nextFeeding: string;
  notes: string;
  isFed?: boolean;
  isCleaned?: boolean;
}

export interface Beat {
  id: string;
  name: string;
  createdAt: string;
}

export interface AIClassInfo {
  teacher: string;
  day: string;
  topic?: string;
  notes: string[];
}
