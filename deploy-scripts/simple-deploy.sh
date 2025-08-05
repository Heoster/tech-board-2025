#!/bin/bash
echo "🚀 Simple Deployment Setup for MCQ Testing System..."

# Create deployment directory
mkdir -p simple-deploy
cd simple-deploy

# Copy server files
echo "📁 Copying server files..."
cp -r ../server .
cp -r ../database .

# Create a simple static client build
echo "📦 Creating simple client build..."
mkdir -p client

# Create a basic HTML file that works without complex build
cat > client/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MCQ Testing System</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; color: #333; margin-bottom: 30px; }
        .nav { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; }
        .btn { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; }
        .btn:hover { background: #0056b3; }
        .form { max-width: 400px; margin: 0 auto; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .error { color: red; margin-top: 5px; }
        .success { color: green; margin-top: 5px; }
        #quiz-container { display: none; }
        .question { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .options { margin-top: 10px; }
        .option { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 MCQ Testing System</h1>
            <p>TECH BOARD 2025 Selection Test</p>
        </div>

        <div id="login-section">
            <div class="nav">
                <button class="btn" onclick="showLogin()">Student Login</button>
                <button class="btn" onclick="showRegister()">Register</button>
            </div>

            <div id="login-form" class="form">
                <h3>Student Login</h3>
                <div class="form-group">
                    <label>Roll Number:</label>
                    <input type="number" id="login-roll" min="1" max="80" required>
                </div>
                <div class="form-group">
                    <label>Grade:</label>
                    <select id="login-grade" required>
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="11">Grade 11</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Section:</label>
                    <select id="login-section" required>
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" id="login-password" required>
                </div>
                <button class="btn" onclick="login()">Login</button>
                <div id="login-error" class="error"></div>
            </div>

            <div id="register-form" class="form" style="display: none;">
                <h3>Student Registration</h3>
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" id="reg-name" required>
                </div>
                <div class="form-group">
                    <label>Roll Number:</label>
                    <input type="number" id="reg-roll" min="1" max="80" required>
                </div>
                <div class="form-group">
                    <label>Grade:</label>
                    <select id="reg-grade" required>
                        <option value="">Select Grade</option>
                        <option value="1">Grade 1</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="11">Grade 11</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Section:</label>
                    <select id="reg-section" required>
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" id="reg-password" required>
                </div>
                <button class="btn" onclick="register()">Register</button>
                <div id="register-error" class="error"></div>
                <div id="register-success" class="success"></div>
            </div>
        </div>

        <div id="dashboard-section" style="display: none;">
            <h3>Welcome, <span id="student-name"></span>!</h3>
            <p>Grade: <span id="student-grade"></span> | Section: <span id="student-section"></span></p>
            <button class="btn" onclick="startQuiz()">Start Quiz</button>
            <button class="btn" onclick="logout()" style="background: #dc3545;">Logout</button>
        </div>

        <div id="quiz-container">
            <div id="quiz-header">
                <h3>Quiz - Question <span id="current-question">1</span> of <span id="total-questions">25</span></h3>
                <div>Time Remaining: <span id="timer">30:00</span></div>
            </div>
            <div id="question-container"></div>
            <div style="margin-top: 20px;">
                <button class="btn" onclick="previousQuestion()" id="prev-btn">Previous</button>
                <button class="btn" onclick="nextQuestion()" id="next-btn">Next</button>
                <button class="btn" onclick="submitQuiz()" id="submit-btn" style="background: #28a745; display: none;">Submit Quiz</button>
            </div>
        </div>
    </div>

    <script>
        const API_BASE = window.location.origin + '/api';
        let currentUser = null;
        let currentQuiz = null;
        let currentQuestionIndex = 0;
        let quizTimer = null;

        function showLogin() {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        }

        function showRegister() {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
        }

        async function register() {
            const name = document.getElementById('reg-name').value;
            const roll = document.getElementById('reg-roll').value;
            const grade = document.getElementById('reg-grade').value;
            const section = document.getElementById('reg-section').value;
            const password = document.getElementById('reg-password').value;

            try {
                const response = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, roll_number: roll, grade, section, password })
                });

                if (response.ok) {
                    document.getElementById('register-success').textContent = 'Registration successful! You can now login.';
                    document.getElementById('register-error').textContent = '';
                } else {
                    const error = await response.json();
                    document.getElementById('register-error').textContent = error.message || 'Registration failed';
                }
            } catch (error) {
                document.getElementById('register-error').textContent = 'Network error. Please try again.';
            }
        }

        async function login() {
            const roll = document.getElementById('login-roll').value;
            const grade = document.getElementById('login-grade').value;
            const section = document.getElementById('login-section').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roll_number: roll, grade, section, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    currentUser = data.user;
                    localStorage.setItem('token', data.token);
                    showDashboard();
                } else {
                    const error = await response.json();
                    document.getElementById('login-error').textContent = error.message || 'Login failed';
                }
            } catch (error) {
                document.getElementById('login-error').textContent = 'Network error. Please try again.';
            }
        }

        function showDashboard() {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('dashboard-section').style.display = 'block';
            document.getElementById('student-name').textContent = currentUser.name;
            document.getElementById('student-grade').textContent = currentUser.grade;
            document.getElementById('student-section').textContent = currentUser.section;
        }

        async function startQuiz() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE}/quiz/generate`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ grade: currentUser.grade })
                });

                if (response.ok) {
                    currentQuiz = await response.json();
                    showQuiz();
                } else {
                    alert('Failed to start quiz. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please try again.');
            }
        }

        function showQuiz() {
            document.getElementById('dashboard-section').style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('total-questions').textContent = currentQuiz.questions.length;
            currentQuestionIndex = 0;
            showQuestion();
            startTimer();
        }

        function showQuestion() {
            const question = currentQuiz.questions[currentQuestionIndex];
            document.getElementById('current-question').textContent = currentQuestionIndex + 1;
            
            const container = document.getElementById('question-container');
            container.innerHTML = `
                <div class="question">
                    <h4>${question.question_text}</h4>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <div class="option">
                                <input type="radio" name="answer" value="${option.id}" id="option${index}">
                                <label for="option${index}">${option.option_text}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            document.getElementById('prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
            document.getElementById('next-btn').style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'none' : 'inline-block';
            document.getElementById('submit-btn').style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
        }

        function previousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
            }
        }

        function nextQuestion() {
            if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            }
        }

        function startTimer() {
            let timeLeft = 30 * 60; // 30 minutes
            quizTimer = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                document.getElementById('timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(quizTimer);
                    submitQuiz();
                }
                timeLeft--;
            }, 1000);
        }

        async function submitQuiz() {
            if (quizTimer) clearInterval(quizTimer);
            
            const answers = [];
            currentQuiz.questions.forEach((question, index) => {
                const selectedOption = document.querySelector(`input[name="answer"]:checked`);
                if (selectedOption) {
                    answers.push({
                        question_id: question.id,
                        selected_option_id: selectedOption.value
                    });
                }
            });

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE}/quiz/submit`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ 
                        quiz_id: currentQuiz.quiz_id,
                        answers: answers 
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(`Quiz submitted! Score: ${result.score}/${result.total_questions}`);
                    logout();
                } else {
                    alert('Failed to submit quiz. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please try again.');
            }
        }

        function logout() {
            localStorage.removeItem('token');
            currentUser = null;
            currentQuiz = null;
            document.getElementById('login-section').style.display = 'block';
            document.getElementById('dashboard-section').style.display = 'none';
            document.getElementById('quiz-container').style.display = 'none';
            showLogin();
        }

        // Initialize
        showLogin();
    </script>
</body>
</html>
EOF

# Create simple package.json for deployment
cat > package.json << 'EOF'
{
  "name": "mcq-system-simple-deploy",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "cd server && npm start",
    "postinstall": "cd server && npm install"
  },
  "engines": {
    "node": "18.x"
  }
}
EOF

# Create Procfile for Heroku/Railway
echo "web: cd server && npm start" > Procfile

echo "✅ Simple deployment package created!"
echo "📁 Deploy the 'simple-deploy' directory to any platform"
echo "🚀 This version bypasses all TypeScript compilation issues"
echo ""
echo "To deploy:"
echo "1. Railway: cd simple-deploy && railway init && railway up"
echo "2. Heroku: cd simple-deploy && git init && heroku create && git add . && git commit -m 'Deploy' && git push heroku main"
echo "3. Docker: cd simple-deploy && docker build -t mcq-app ."