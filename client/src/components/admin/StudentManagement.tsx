import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

interface StudentApiError {
  response?: {
    data?: {
      error?: {
        message?: string
      }
    }
  }
  message?: string
}

interface Student {
  id: number;
  name: string;
  roll_number: string;
  grade: number;
  section: string;
  registration_date: string;
  quiz_id: number | null;
  score: number | null;
  total_questions: number | null;
  passed: boolean | null;
  start_time: string | null;
  end_time: string | null;
  quiz_status: string | null;
  percentage: number | null;
  exam_status: 'not_started' | 'in_progress' | 'completed' | 'unknown';
}

interface NewStudent {
  name: string;
  rollNumber: number;
  grade: number;
  section: string;
  password: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editStudent, setEditStudent] = useState<NewStudent>({
    name: '',
    rollNumber: 1,
    grade: 6,
    section: 'A',
    password: ''
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: '',
    rollNumber: 1,
    grade: 6,
    section: 'A',
    password: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/admin/students');
      setStudents((response.data as any)?.data || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/admin/students', {
        name: newStudent.name,
        rollNumber: newStudent.rollNumber,
        grade: newStudent.grade,
        section: newStudent.section,
        password: newStudent.password
      });
      
      setShowAddModal(false);
      setNewStudent({
        name: '',
        rollNumber: 1,
        grade: 6,
        section: 'A',
        password: ''
      });
      fetchStudents();
    } catch (error: unknown) {
      console.error('Failed to add student:', error);
      const apiError = error as StudentApiError;
      alert(apiError.response?.data?.error?.message || 'Failed to add student');
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await apiClient.delete(`/admin/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Failed to delete student:', error);
      alert('Failed to delete student');
    }
  };

  const handleEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    
    try {
      await apiClient.put(`/admin/students/${selectedStudent.id}`, {
        name: editStudent.name,
        rollNumber: editStudent.rollNumber,
        grade: editStudent.grade,
        section: editStudent.section
      });
      
      setShowEditModal(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (error: unknown) {
      console.error('Failed to update student:', error);
      const apiError = error as StudentApiError;
      alert(apiError.response?.data?.error?.message || 'Failed to update student');
    }
  };

  const handleResetPassword = async (studentId: number) => {
    const newPassword = prompt('Enter new password for student:');
    if (!newPassword) return;
    
    try {
      await apiClient.put(`/admin/students/${studentId}/password`, {
        password: newPassword
      });
      alert('Password reset successfully');
    } catch (error) {
      console.error('Failed to reset password:', error);
      alert('Failed to reset password');
    }
  };

  const filteredStudents = (students || []).filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll_number.toString().includes(searchTerm);
    const matchesGrade = filterGrade === 'all' || student.grade.toString() === filterGrade;
    const matchesStatus = filterStatus === 'all' || student.exam_status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'in_progress':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'not_started':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
    }
  };

  const getScoreBadge = (score: number | null) => {
    if (score === null) return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    if (score >= 36) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (score >= 25) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Student Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage student accounts and view their progress</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Students
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Grade
            </label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="all">All Grades</option>
              {[6, 7, 8, 9, 11].map(grade => (
                <option key={grade} value={grade.toString()}>Grade {grade}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-dark-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Section {student.section}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                    {student.roll_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(student.exam_status)}`}>
                      {student.exam_status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {student.score !== null ? `${student.score}/50` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.score !== null ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScoreBadge(student.score)}`}>
                        {student.score >= 36 ? 'QUALIFIED' : 'NOT QUALIFIED'}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setEditStudent({
                          name: student.name,
                          rollNumber: parseInt(student.roll_number),
                          grade: student.grade,
                          section: student.section,
                          password: ''
                        });
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleResetPassword(student.id)}
                      className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                    >
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add New Student
            </h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    required
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({...newStudent, rollNumber: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Grade
                  </label>
                  <select
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({...newStudent, grade: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  >
                    {[6, 7, 8, 9, 11].map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section
                </label>
                <select
                  value={newStudent.section}
                  onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-dark-600 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Edit Student
            </h3>
            <form onSubmit={handleEditStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editStudent.name}
                  onChange={(e) => setEditStudent({...editStudent, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    required
                    value={editStudent.rollNumber}
                    onChange={(e) => setEditStudent({...editStudent, rollNumber: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Grade
                  </label>
                  <select
                    value={editStudent.grade}
                    onChange={(e) => setEditStudent({...editStudent, grade: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                  >
                    {[6, 7, 8, 9, 11].map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section
                </label>
                <select
                  value={editStudent.section}
                  onChange={(e) => setEditStudent({...editStudent, section: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedStudent(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-dark-600 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;