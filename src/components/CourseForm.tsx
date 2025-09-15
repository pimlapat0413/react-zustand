import React, { useState } from 'react'
import { useCourseStore } from '../store/courseStore'
import './CourseForm.css'

const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse)
  
  const [formData, setFormData] = useState({
    courseCode: '',
    thaiName: '',
    englishName: '',
    credits: 1,
    instructor: '',
    grade: '-'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // ตรวจสอบข้อมูลไม่ว่าง
    if (!formData.courseCode || !formData.thaiName || !formData.englishName || !formData.instructor) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    // เพิ่มรายวิชา
    addCourse(formData)
    
    // เคลียร์ฟอร์ม
    setFormData({
      courseCode: '',
      thaiName: '',
      englishName: '',
      credits: 1,
      instructor: '',
      grade: '-'
    })
    
    alert('เพิ่มรายวิชาสำเร็จ!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits' ? parseInt(value) : value
    }))
  }

  return (
    <div className="course-form-container">
      <h2>📚 เพิ่มรายวิชา</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="courseCode">รหัสวิชา *</label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="เช่น CS101"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="credits">หน่วยกิต *</label>
            <select
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6].map(credit => (
                <option key={credit} value={credit}>{credit}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="thaiName">ชื่อวิชา (ไทย) *</label>
          <input
            type="text"
            id="thaiName"
            name="thaiName"
            value={formData.thaiName}
            onChange={handleChange}
            placeholder="เช่น การเขียนโปรแกรมคอมพิวเตอร์"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="englishName">ชื่อวิชา (อังกฤษ) *</label>
          <input
            type="text"
            id="englishName"
            name="englishName"
            value={formData.englishName}
            onChange={handleChange}
            placeholder="เช่น Computer Programming"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructor">ชื่ออาจารย์ผู้สอน *</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="เช่น อาจารย์ สมชาย ใจดี"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">เกรด</label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
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
        </div>

        <button type="submit" className="submit-btn">
          ➕ เพิ่มรายวิชา
        </button>
      </form>
    </div>
  )
}

export default CourseForm