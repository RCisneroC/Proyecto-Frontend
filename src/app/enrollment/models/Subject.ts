export interface Subject {
  virtualRoom: string,
  periodId: number,
  statusId: number,
  id: number,
  name: string,
  description: string,
  acronym: string,
  code: string,
  numOfCredits: number,
  numOfHours: number,
  numOfClasses: number,
  hasLaboratory: boolean,
  evaluationCriteria: string,
  degreeCurriculumDesigns: [],
  periods: [],
  parentSubjects: [],
  dependentSubjects: []
}
