import { useCourseStore } from '../store/courseStore'
import DropButton from './DropButton'
import './CourseList.css'

const CourseList = () => {
  const { enrolledCourses, updateGrade, getTotalCredits, calculateGPA } = useCourseStore()

  const handleGradeChange = (courseId: string, grade: string) => {
    updateGrade(courseId, grade)
  }

  const getGradeColor = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      'A': '#27ae60',
      'B+': '#2ecc71',
      'B': '#f39c12',
      'C+': '#e67e22',
      'C': '#d35400',
      'D+': '#e74c3c',
      'D': '#c0392b',
      'F': '#8e44ad',
      'W': '#95a5a6',
      'I': '#34495e',
      'P': '#3498db',
      'NP': '#7f8c8d',
      '-': '#bdc3c7'
    }
    return gradeColors[grade] || '#bdc3c7'
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="course-list-container">
        <h2>📋 รายวิชาที่ลงทะเบียน</h2>
        <div className="empty-state">
          <p>ยังไม่มีรายวิชาที่ลงทะเบียน</p>
          <p>เริ่มต้นโดยการเพิ่มรายวิชาในฟอร์มด้านบน</p>
        </div>
      </div>
    )
  }

  return (
    <div className="course-list-container">
      <div className="header-section">
        <h2>📋 รายวิชาที่ลงทะเบียน ({enrolledCourses.length} วิชา)</h2>
        <div className="summary-info">
          <div className="info-card">
            <span className="info-label">หน่วยกิตรวม:</span>
            <span className="info-value">{getTotalCredits()} หน่วยกิต</span>
          </div>
          <div className="info-card">
            <span className="info-label">GPA เฉลี่ย:</span>
            <span className="info-value gpa">{calculateGPA().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="course-table-container">
        <table className="course-table">
          <thead>
            <tr>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา (ไทย)</th>
              <th>ชื่อวิชา (อังกฤษ)</th>
              <th>หน่วยกิต</th>
              <th>อาจารย์ผู้สอน</th>
              <th>เกรด</th>
              <th>การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course) => (
              <tr key={course.id}>
                <td className="course-code">{course.courseCode}</td>
                <td className="course-name-th">{course.thaiName}</td>
                <td className="course-name-en">{course.englishName}</td>
                <td className="credits">{course.credits}</td>
                <td className="instructor">{course.instructor}</td>
                <td className="grade-cell">
                  <select
                    value={course.grade}
                    onChange={(e) => handleGradeChange(course.id, e.target.value)}
                    className="grade-select"
                    style={{ borderColor: getGradeColor(course.grade) }}
                  >
                    <option value="-">ยังไม่มีเกรด</option>
                    <option value="A">A (4.00)</option>
                    <option value="B+">B+ (3.50)</option>
                    <option value="B">B (3.00)</option>
                    <option value="C+">C+ (2.50)</option>
                    <option value="C">C (2.00)</option>
                    <option value="D+">D+ (1.50)</option>
                    <option value="D">D (1.00)</option>
                    <option value="F">F (0.00)</option>
                    <option value="P">P (Pass)</option>
                    <option value="NP">NP (No Pass)</option>
                    <option value="I">I (Incomplete)</option>
                  </select>
                </td>
                <td className="actions">
                  <DropButton 
                    courseId={course.id} 
                    courseName={course.thaiName}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseList