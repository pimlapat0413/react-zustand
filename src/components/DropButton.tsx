import React from 'react'
import { useCourseStore } from '../store/courseStore'
import './DropButton.css'

interface DropButtonProps {
  courseId: string
  courseName: string
}

const DropButton: React.FC<DropButtonProps> = ({ courseId, courseName }) => {
  const dropCourse = useCourseStore((state) => state.dropCourse)

  const handleDrop = () => {
    const confirmed = window.confirm(
      `คุณแน่ใจหรือไม่ที่จะถอนรายวิชา "${courseName}"?\n\nเมื่อถอนแล้วจะไม่สามารถยกเลิกได้`
    )
    
    if (confirmed) {
      dropCourse(courseId)
      alert(`ถอนรายวิชา "${courseName}" เรียบร้อยแล้ว`)
    }
  }

  return (
    <button 
      className="drop-button"
      onClick={handleDrop}
      title={`ถอนรายวิชา ${courseName}`}
    >
      🗑️ ถอน
    </button>
  )
}

export default DropButton