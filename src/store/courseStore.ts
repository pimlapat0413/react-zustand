import { create } from 'zustand'

// ประเภทข้อมูลของรายวิชา
export interface Course {
  id: string
  courseCode: string
  thaiName: string
  englishName: string
  credits: number
  instructor: string
  grade: string
}

// ประเภทของ Store
interface CourseStore {
  // รายวิชาที่ลงทะเบียน
  enrolledCourses: Course[]
  // รายวิชาที่ถอนแล้ว
  droppedCourses: Course[]
  
  // Actions
  addCourse: (course: Omit<Course, 'id'>) => void
  dropCourse: (courseId: string) => void
  updateGrade: (courseId: string, grade: string) => void
  calculateGPA: () => number
  getTotalCredits: () => number
}

// แปลงเกรดเป็นคะแนน GPA
const gradeToGPA = (grade: string): number => {
  const gradeMap: { [key: string]: number } = {
    'A': 4.00,
    'B+': 3.50,
    'B': 3.00,
    'C+': 2.50,
    'C': 2.00,
    'D+': 1.50,
    'D': 1.00,
    'F': 0.00,
    'W': 0.00, // Withdraw
    'I': 0.00, // Incomplete
    'P': 0.00, // Pass (ไม่นับ GPA)
    'NP': 0.00, // No Pass
    '-': 0.00  // ยังไม่มีเกรด
  }
  return gradeMap[grade] || 0.00
}

// สร้าง Store ด้วย Zustand
export const useCourseStore = create<CourseStore>()((set, get) => ({
  enrolledCourses: [],
  droppedCourses: [],

  // เพิ่มรายวิชาใหม่
  addCourse: (courseData) => 
    set((state) => ({
      enrolledCourses: [
        ...state.enrolledCourses,
        {
          ...courseData,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }
      ]
    })),

  // ถอนรายวิชา
  dropCourse: (courseId) =>
    set((state) => {
      const courseToMove = state.enrolledCourses.find(course => course.id === courseId)
      if (!courseToMove) return state

      return {
        enrolledCourses: state.enrolledCourses.filter(course => course.id !== courseId),
        droppedCourses: [
          ...state.droppedCourses,
          { ...courseToMove, grade: 'W' } // เกรดถอน = W
        ]
      }
    }),

  // อัพเดทเกรด
  updateGrade: (courseId, grade) =>
    set((state) => ({
      enrolledCourses: state.enrolledCourses.map(course =>
        course.id === courseId ? { ...course, grade } : course
      )
    })),

  // คำนวณ GPA รวม
  calculateGPA: () => {
    const courses = get().enrolledCourses
    if (courses.length === 0) return 0.00

    let totalGradePoints = 0
    let totalCredits = 0

    courses.forEach(course => {
      // นับเฉพาะวิชาที่มีเกรดและไม่ใช่ P (Pass)
      if (course.grade && course.grade !== 'P' && course.grade !== '-') {
        totalGradePoints += gradeToGPA(course.grade) * course.credits
        totalCredits += course.credits
      }
    })

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0.00
  },

  // คำนวณหน่วยกิตรวม
  getTotalCredits: () => {
    const courses = get().enrolledCourses
    return courses.reduce((total, course) => total + course.credits, 0)
  }
}))