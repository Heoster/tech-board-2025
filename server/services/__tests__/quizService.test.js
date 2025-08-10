const { selectUniqueQuizQuestions } = require('../quizService');

// Mock the database
jest.mock('../../config/database', () => ({
  getDb: jest.fn()
}));

const database = require('../../config/database');

describe('QuizService', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      all: jest.fn(),
      get: jest.fn(),
      run: jest.fn()
    };
    database.getDb.mockReturnValue(mockDb);
  });

  describe('selectUniqueQuizQuestions', () => {
    const mockQuestions = [
      { id: 1, difficulty: 'basic', question_text: 'Basic question 1' },
      { id: 2, difficulty: 'basic', question_text: 'Basic question 2' },
      { id: 3, difficulty: 'basic', question_text: 'Basic question 3' },
      { id: 4, difficulty: 'medium', question_text: 'Medium question 1' },
      { id: 5, difficulty: 'medium', question_text: 'Medium question 2' },
      { id: 6, difficulty: 'advanced', question_text: 'Advanced question 1' }
    ];

    it('should return unique question IDs for a given grade', async () => {
      // Mock database calls
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          // Mock for previously used questions (empty)
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          // Mock for active quiz questions (empty)
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          // Mock for available questions with options
          callback(null, mockQuestions);
        });

      const result = await selectUniqueQuizQuestions(9, 6, 1);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(6);
      expect(result.every(id => typeof id === 'number')).toBe(true);
      expect(new Set(result).size).toBe(result.length); // All unique
    });

    it('should exclude previously used questions', async () => {
      const usedQuestions = [{ question_id: 1 }, { question_id: 2 }];
      
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          // Mock for previously used questions
          callback(null, usedQuestions);
        })
        .mockImplementationOnce((query, params, callback) => {
          // Mock for active quiz questions (empty)
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          // Mock for available questions (excluding used ones)
          const availableQuestions = mockQuestions.filter(q => ![1, 2].includes(q.id));
          callback(null, availableQuestions);
        });

      const result = await selectUniqueQuizQuestions(9, 4, 1);

      expect(result).not.toContain(1);
      expect(result).not.toContain(2);
      expect(result.length).toBe(4);
    });

    it('should maintain difficulty distribution when possible', async () => {
      const largeQuestionSet = [];
      // Create 30 basic, 20 medium, 10 advanced questions
      for (let i = 1; i <= 30; i++) {
        largeQuestionSet.push({ id: i, difficulty: 'basic', question_text: `Basic ${i}` });
      }
      for (let i = 31; i <= 50; i++) {
        largeQuestionSet.push({ id: i, difficulty: 'medium', question_text: `Medium ${i}` });
      }
      for (let i = 51; i <= 60; i++) {
        largeQuestionSet.push({ id: i, difficulty: 'advanced', question_text: `Advanced ${i}` });
      }

      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []); // No previously used
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []); // No active quiz questions
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, largeQuestionSet);
        });

      const result = await selectUniqueQuizQuestions(9, 50, 1);

      expect(result.length).toBe(50);
      
      // Check that we have a reasonable distribution
      // Should be approximately 60% basic, 30% medium, 10% advanced
      const basicCount = result.filter(id => id <= 30).length;
      const mediumCount = result.filter(id => id >= 31 && id <= 50).length;
      const advancedCount = result.filter(id => id >= 51).length;

      expect(basicCount).toBeGreaterThanOrEqual(25); // At least 50% basic
      expect(mediumCount).toBeGreaterThanOrEqual(10); // At least 20% medium
      expect(advancedCount).toBeGreaterThanOrEqual(3); // At least 6% advanced
    });

    it('should throw error when insufficient questions available', async () => {
      const fewQuestions = mockQuestions.slice(0, 3); // Only 3 questions

      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, fewQuestions);
        });

      await expect(selectUniqueQuizQuestions(9, 50, 1))
        .rejects
        .toThrow('INSUFFICIENT_QUESTIONS');
    });

    it('should handle database errors gracefully', async () => {
      mockDb.all.mockImplementationOnce((query, params, callback) => {
        callback(new Error('Database connection failed'), null);
      });

      await expect(selectUniqueQuizQuestions(9, 10, 1))
        .rejects
        .toThrow('Database connection failed');
    });

    it('should work without studentId parameter', async () => {
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []); // No previously used (should skip this query)
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []); // No active quiz questions
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockQuestions);
        });

      const result = await selectUniqueQuizQuestions(9, 6); // No studentId

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(6);
    });

    it('should adjust target questions based on availability', async () => {
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockQuestions); // Only 6 questions available
        });

      const result = await selectUniqueQuizQuestions(9, 50, 1); // Request 50 but only 6 available

      expect(result.length).toBe(6); // Should return available count
    });

    it('should return shuffled results', async () => {
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockQuestions);
        });

      const result1 = await selectUniqueQuizQuestions(9, 6, 1);
      
      // Reset mocks and run again
      mockDb.all
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, []);
        })
        .mockImplementationOnce((query, params, callback) => {
          callback(null, mockQuestions);
        });

      const result2 = await selectUniqueQuizQuestions(9, 6, 1);

      // Results should contain same elements but potentially in different order
      expect(result1.sort()).toEqual(expect.arrayContaining(result2.sort()));
    });
  });
});