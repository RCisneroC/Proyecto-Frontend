export interface QuestionSubject {
    CapacitacionVirtual: string;
    ListQuestins: ListQuestins[];
}

export interface ListQuestins {
    id: number;
    name: string;
}


export interface ListQuestins {
    id: number;
    name: string;
}


export interface SurveyResponse {
    surveyType: number;
    questions: Question[];
  }
  
  interface Question {
    name: string;
    description: string;
    questionNumber: number;
    questionId: number;
    scores: Score[];
  }
  
  export interface Score {
    score: number;
    totalStudentCount: number;
  }