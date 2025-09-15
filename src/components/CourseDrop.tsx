import React from 'react'
import { useCourseStore } from '../store/courseStore'
import './CourseDrop.css'

const CourseDrop: React.FC = () => {
  const droppedCourses = useCourseStore((state) => state.droppedCourses)

  const getTotalDroppedCredits = () => {
    return droppedCourses.reduce((total, course) => total + course.credits, 0)
  }

  if (droppedCourses.length === 0) {
    return (
      <div className="course-drop-container">
        <h2>🗑️ รายวิชาที่ถอนแล้ว</h2>
        <div className="empty-dropped">
          <p>ยังไม่มีรายวิชาที่ถอน</p>
          <p>รายวิชาที่ถอนจะปรากฏที่นี่</p>
        </div>
      </div>
    )
  }

  return (
    <div className="course-drop-container">
      <div className="dropped-header">
        <h2>🗑️ รายวิชาที่ถอนแล้ว ({droppedCourses.length} วิชา)</h2>
        <div className="dropped-summary">
          <div className="dropped-info">
            <span className="dropped-label">หน่วยกิตที่ถอน:</span>
            <span className="dropped-value">{getTotalDroppedCredits()} หน่วยกิต</span>
          </div>
        </div>
      </div>

      <div className="dropped-table-container">
        <table className="dropped-table">
          <thead>
            <tr>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา (ไทย)</th>
              <th>ชื่อวิชา (อังกฤษ)</th>
              <th>หน่วยกิต</th>
              <th>อาจารย์ผู้สอน</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {droppedCourses.map((course) => (
              <tr key={course.id} className="dropped-row">
                <td className="dropped-course-code">{course.courseCode}</td>
                <td className="dropped-course-name-th">{course.thaiName}</td>
                <td className="dropped-course-name-en">{course.englishName}</td>
                <td className="dropped-credits">{course.credits}</td>
                <td className="dropped-instructor">{course.instructor}</td>
                <td className="dropped-status">
                  <span className="withdraw-badge">W - ถอน</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dropped-note">
        <p>💡 <strong>หมายเหตุ:</strong> รายวิชาที่ถอน (W) จะไม่ถูกนำมาคำนวณใน GPA แต่จะแสดงในใบรายงานผลการเรียน</p>
      </div>
    </div>
  )
}

export default CourseDrop