import CourseForm from './components/CourseForm'
import CourseList from './components/CourseList'
import CourseDrop from './components/CourseDrop'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 ระบบการถอนรายวิชา</h1>
        <p>จัดการรายวิชาและคำนวณ GPA ด้วย Zustand</p>
      </header>
      
      <main className="app-main">
        <CourseForm />
        <CourseList />
        <CourseDrop />
      </main>
      
      <footer className="app-footer">
        <p>💡 สร้างด้วย React + TypeScript + Vite + Zustand</p>
      </footer>
    </div>
  )
}

export default App
