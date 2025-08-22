import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../utils/apiClient';

interface QuestionApiError {
    response?: {
        data?: {
            error?: {
                message?: string
            }
        }
    }
    message?: string
}

interface Question {
    id: number;
    grade: number;
    difficulty: 'basic' | 'medium' | 'advanced';
    question_text: string;
    created_at: string;
    updated_at: string;
    options: Array<{
        id: number;
        text: string;
        isCorrect: boolean;
        order: number;
    }>;
}

interface NewQuestion {
    grade: number;
    difficulty: 'basic' | 'medium' | 'advanced';
    questionText: string;
    options: Array<{
        text: string;
        isCorrect: boolean;
    }>;
}

const QuestionManagement: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [filterGrade, setFilterGrade] = useState<string>('all');
    const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [newQuestion, setNewQuestion] = useState<NewQuestion>({
        grade: 6,
        difficulty: 'basic',
        questionText: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ]
    });

    const fetchQuestions = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '20'
            });

            if (filterGrade !== 'all') params.append('grade', filterGrade);
            if (filterDifficulty !== 'all') params.append('difficulty', filterDifficulty);

            const response = await apiClient.get(`/admin/questions?${params}`);
            const responseData = response.data as any;
            setQuestions(Array.isArray(responseData?.questions) ? responseData.questions : []);
            setTotalPages(responseData?.pagination?.pages || 1);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filterGrade, filterDifficulty]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that exactly one option is correct
        const correctCount = newQuestion.options.filter(opt => opt.isCorrect).length;
        if (correctCount !== 1) {
            alert('Please select exactly one correct answer');
            return;
        }

        try {
            await apiClient.post('/admin/questions/', newQuestion);
            setShowAddModal(false);
            resetNewQuestion();
            fetchQuestions();
        } catch (error: unknown) {
            console.error('Failed to add question:', error);
            const apiError = error as QuestionApiError;
            alert(apiError.response?.data?.error?.message || apiError.message || 'Failed to add question');
        }
    };

    const handleEditQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedQuestion) return;

        try {
            const updateData = {
                grade: selectedQuestion.grade,
                difficulty: selectedQuestion.difficulty,
                questionText: selectedQuestion.question_text,
                options: selectedQuestion.options.map(opt => ({
                    text: opt.text,
                    isCorrect: opt.isCorrect
                }))
            };

            await apiClient.put(`/admin/questions/${selectedQuestion.id}/`, updateData);
            setShowEditModal(false);
            setSelectedQuestion(null);
            fetchQuestions();
        } catch (error: unknown) {
            console.error('Failed to update question:', error);
            const apiError = error as QuestionApiError;
            alert(apiError.response?.data?.error?.message || apiError.message || 'Failed to update question');
        }
    };

    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm('Are you sure you want to delete this question?')) return;

        try {
            await apiClient.delete(`/admin/questions/${questionId}/`);
            fetchQuestions();
        } catch (error) {
            console.error('Failed to delete question:', error);
            alert('Failed to delete question');
        }
    };

    const resetNewQuestion = () => {
        setNewQuestion({
            grade: 6,
            difficulty: 'basic',
            questionText: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        });
    };

    const handleOptionChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        const updatedOptions = [...newQuestion.options];
        if (field === 'isCorrect' && value === true) {
            // Ensure only one option is correct
            updatedOptions.forEach((opt, i) => {
                opt.isCorrect = i === index;
            });
        } else {
            updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        }
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    const handleEditOptionChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        if (!selectedQuestion) return;

        const updatedOptions = [...selectedQuestion.options];
        if (field === 'isCorrect' && value === true) {
            // Ensure only one option is correct
            updatedOptions.forEach((opt, i) => {
                opt.isCorrect = i === index;
            });
        } else {
            updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        }
        setSelectedQuestion({ ...selectedQuestion, options: updatedOptions });
    };

    const getDifficultyBadge = (difficulty: string) => {
        switch (difficulty) {
            case 'basic':
                return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
            case 'medium':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
            case 'advanced':
                return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
        }
    };

    const filteredQuestions = (questions || []).filter(question =>
        question.question_text.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Question Management</h2>
                    <p className="text-gray-600 dark:text-gray-400">Manage the question bank for all grades</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
                >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Question
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Questions
                        </label>
                        <input
                            type="text"
                            placeholder="Search question text..."
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
                            onChange={(e) => {
                                setFilterGrade(e.target.value);
                                setCurrentPage(1);
                            }}
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
                            Filter by Difficulty
                        </label>
                        <select
                            value={filterDifficulty}
                            onChange={(e) => {
                                setFilterDifficulty(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                        >
                            <option value="all">All Difficulties</option>
                            <option value="basic">Basic</option>
                            <option value="medium">Medium</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {filteredQuestions.length} questions
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg">
                <div className="p-6">
                    <div className="space-y-4">
                        {filteredQuestions.map((question, index) => (
                            <div key={question.id} className="border border-gray-200 dark:border-dark-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-dark-700/50">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Q{(currentPage - 1) * 20 + index + 1}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Grade {question.grade}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyBadge(question.difficulty)}`}>
                                            {question.difficulty.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedQuestion(question);
                                                setShowEditModal(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuestion(question.id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                                        {question.question_text}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {question.options.map((option, optIndex) => (
                                        <div
                                            key={option.id}
                                            className={`p-2 rounded-lg text-sm ${option.isCorrect
                                                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600'
                                                : 'bg-gray-100 dark:bg-dark-700'
                                                }`}
                                        >
                                            <span className="font-semibold mr-2">
                                                {String.fromCharCode(65 + optIndex)}.
                                            </span>
                                            {option.text}
                                            {option.isCorrect && (
                                                <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                                                    ✓
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-600">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Question Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Add New Question
                        </h3>
                        <form onSubmit={handleAddQuestion} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Grade
                                    </label>
                                    <select
                                        value={newQuestion.grade}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, grade: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                    >
                                        {[6, 7, 8, 9, 11].map(grade => (
                                            <option key={grade} value={grade}>Grade {grade}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Difficulty
                                    </label>
                                    <select
                                        value={newQuestion.difficulty}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value as 'basic' | 'medium' | 'advanced' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                    >
                                        <option value="basic">Basic</option>
                                        <option value="medium">Medium</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Text
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newQuestion.questionText}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                    placeholder="Enter the question text..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Options (Select one correct answer)
                                </label>
                                <div className="space-y-3">
                                    {newQuestion.options.map((option, index) => (<div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="correctOption"
                                            checked={option.isCorrect}
                                            onChange={() => handleOptionChange(index, 'isCorrect', true)}
                                            className="text-red-500 focus:ring-red-500"
                                        />
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        <input
                                            type="text"
                                            required
                                            value={option.text}
                                            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                            placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                        />
                                    </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetNewQuestion();
                                    }}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-dark-600 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                                >
                                    Add Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Question Modal */}
            {showEditModal && selectedQuestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Edit Question
                        </h3>
                        <form onSubmit={handleEditQuestion} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Grade
                                    </label>
                                    <select
                                        value={selectedQuestion.grade}
                                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, grade: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                    >
                                        {[6, 7, 8, 9, 11].map(grade => (
                                            <option key={grade} value={grade}>Grade {grade}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Difficulty
                                    </label>
                                    <select
                                        value={selectedQuestion.difficulty}
                                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, difficulty: e.target.value as 'basic' | 'medium' | 'advanced' })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                    >
                                        <option value="basic">Basic</option>
                                        <option value="medium">Medium</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Question Text
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={selectedQuestion.question_text}
                                    onChange={(e) => setSelectedQuestion({ ...selectedQuestion, question_text: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Options (Select one correct answer)
                                </label>
                                <div className="space-y-3">
                                    {selectedQuestion.options.map((option, index) => (
                                        <div key={option.id} className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                name="editCorrectOption"
                                                checked={option.isCorrect}
                                                onChange={() => handleEditOptionChange(index, 'isCorrect', true)}
                                                className="text-red-500 focus:ring-red-500"
                                            />
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                {String.fromCharCode(65 + index)}.
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                value={option.text}
                                                onChange={(e) => handleEditOptionChange(index, 'text', e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedQuestion(null);
                                    }}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-dark-600 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                                >
                                    Update Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionManagement;