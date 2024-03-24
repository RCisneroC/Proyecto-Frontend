export interface GraficaDocente {
  teacherGroupedByEducationLevel: TeacherGroupedByEducationLevel[]
  teacherGroupedBySexo: TeacherGroupedBySexo[]
  teacherGroupedBySubject: TeacherGroupedBySubject[]
  teacherGroupedByActivity: TeacherGroupedByActivity[]
  teacherGroupedByProcess: TeacherGroupedByProcess[]
}

export interface TeacherGroupedByEducationLevel {
  educationLevel: number
  educationLevelName: string
  educationLevelCount: number
}

export interface TeacherGroupedBySexo {
  sexo: string
  sexoName: string
  sexoCount: number
}

export interface TeacherGroupedBySubject {
  subject: number
  subjectName: string
  subjectCount: number
}

export interface TeacherGroupedByActivity {
  activity: number
  activityName: string
  activityCount: number
}

export interface TeacherGroupedByProcess {
  process: number
  processName: string
  processCount: number
}
