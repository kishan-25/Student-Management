import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import LoadingSpinner from './components/LoadingSpinner';
import AddStudentModal from './components/modals/AddStudentModal';
import LoginModal from './components/modals/LoginModal';
import StudentDetailModal from './components/modals/StudentDetailModal';
import { fetchStudents, addStudent } from './services/mockApi';
import { login, logout } from './services/mockFirebase';

export default function App() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch students on initial load
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError('Failed to load students');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter students when course changes
  useEffect(() => {
    if (course === 'all') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => student.course === course));
    }
  }, [students, course]);

  const handleAddStudent = async (newStudent) => {
    try {
      if (!user) {
        setShowLoginModal(true);
        return;
      }
      
      setLoading(true);
      const addedStudent = await addStudent(newStudent);
      setStudents(prev => [...prev, addedStudent]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add student');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (student) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedStudent(student);
  };

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const user = await login(credentials);
      setUser(user);
      setShowLoginModal(false);
    } catch (err) {
      setError('Login failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      console.error(err);
    }
  };

  const courses = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header 
        user={user} 
        onLogin={() => setShowLoginModal(true)} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Student Management Dashboard</h1>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <select 
                className="border rounded p-2"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setShowAddModal(true)}
              >
                Add Student
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <StudentList 
              students={filteredStudents} 
              onViewDetails={handleViewDetails} 
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      {showAddModal && (
        <AddStudentModal 
          onClose={() => setShowAddModal(false)}
          onAddStudent={handleAddStudent}
          courses={courses}
        />
      )}
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
      
      {selectedStudent && (
        <StudentDetailModal 
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}