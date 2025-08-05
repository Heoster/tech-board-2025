# MCQ Testing System - TECH BOARD 2025 Selection Test

A comprehensive Multiple Choice Question (MCQ) testing system designed for TECH BOARD 2025 student selection. This system supports multiple grade levels (1, 6, 7, 8, 9, 11) with adaptive difficulty distribution and comprehensive question banks.

## 🚀 Features

- **Multi-Grade Support**: Questions for Grades 1, 6, 7, 8, 9, and 11
- **Adaptive Difficulty**: Smart distribution (60% Basic, 30% Medium, 10% Advanced)
- **Comprehensive Question Bank**: 500+ questions per grade level
- **Real-time Quiz Interface**: Modern, responsive UI with timer
- **Secure Authentication**: JWT-based student authentication
- **Result Tracking**: Automatic scoring and pass/fail determination
- **Admin Dashboard**: Question management and student monitoring
- **Database Persistence**: SQLite database with proper relationships

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

## 🛠️ Installation & Setup

### 1. Clone or Download the Repository

```bash
# Option 1: Clone with Git
git clone <repository-url>
cd mcq-testing-system

# Option 2: Download ZIP and extract
# Then navigate to the extracted folder
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root directory
cd ..
```

### 3. Environment Configuration

#### Server Configuration
Create or update `server/.env`:
```env
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-change-in-production-please
DB_PATH=./database/mcq_system.db
NODE_ENV=development
```

#### Client Configuration
Update `client/.env` with your server IP:
```env
# For local development
VITE_API_URL=http://localhost:8000/api

# For network access (replace with your actual IP)
VITE_API_URL=http://192.168.1.100:8000/api
```

**Important**: Replace `192.168.1.100` with your actual machine's IP address if you want to access the app from other devices on the network.

### 4. Database Setup

The database will be automatically created when you first run the server. To populate it with questions:

```bash
cd server

# Seed all grade questions (recommended)
npm run seed

# Or seed specific grades individually
npm run seed:grade6cs
npm run seed:grade7cs
npm run seed:grade8cs
npm run seed:grade11cs
```

## 🚀 Running the Application

### Method 1: Using Batch Files (Windows)

```bash
# Start both server and client
./start-server.bat
```

### Method 2: Manual Start (Recommended)

#### Terminal 1 - Start Server
```bash
# IMPORTANT: Always run from the server directory
cd server
npm start
# Server will run on http://localhost:8000

# Alternative: Development mode with auto-reload
cd server
npm run dev
```

**⚠️ Common Mistake**: Don't run `node server/index.js` from the root directory - this will cause module errors!

#### Terminal 2 - Start Client
```bash
cd client
npm run dev
# Client will run on http://localhost:5173
```

### Method 3: Development Mode

```bash
# Server with auto-reload
cd server
npm run dev

# Client with hot-reload
cd client
npm run dev
```

## 🌐 Accessing the Application

- **Local Access**: http://localhost:5173
- **Network Access**: http://YOUR_IP_ADDRESS:5173 (replace with your actual IP)
- **API Endpoint**: http://YOUR_IP_ADDRESS:8000/api

## 👥 Default User Accounts

### Students
Students can register with:
- **Roll Number**: 1-80
- **Grade**: 1, 6, 7, 8, 9, or 11
- **Section**: A or B
- **Password**: Any secure password

### Admin (if implemented)
- **Username**: admin
- **Password**: admin123

## 📊 Grade-wise Question Distribution

| Grade | Total Questions | Basic (60%) | Medium (30%) | Advanced (10%) |
|-------|----------------|-------------|--------------|----------------|
| 1     | 500+           | 500         | 0            | 0              |
| 6     | 200+           | 120         | 60           | 20             |
| 7     | 200+           | 120         | 60           | 20             |
| 8     | 200+           | 120         | 60           | 20             |
| 9     | 150+           | 90          | 45           | 15             |
| 11    | 200+           | 120         | 60           | 20             |

## 🔧 Configuration Options

### Server Configuration (`server/.env`)
- `PORT`: Server port (default: 8000)
- `JWT_SECRET`: Secret key for JWT tokens
- `DB_PATH`: SQLite database file path
- `NODE_ENV`: Environment (development/production)

### Client Configuration (`client/.env`)
- `VITE_API_URL`: Backend API URL

## 📁 Project Structure

```
mcq-testing-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── .env
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── config/             # Database config
│   ├── database/           # SQLite database
│   ├── scripts/            # Seeding scripts
│   ├── package.json
│   └── .env
├── database/               # Database files
├── start-server.bat        # Windows startup script
├── start-server.sh         # Linux/Mac startup script
└── README.md
```

## 🧪 Testing the System

### 1. Check Server Status
```bash
# Check if server is running
curl http://localhost:8000/api/health
```

### 2. Test Student Registration
1. Open the application in browser
2. Click "Student Registration"
3. Fill in details (Roll: 1-80, Grade: 1/6/7/8/9/11, Section: A/B)
4. Create account and login

### 3. Take a Quiz
1. Login with student credentials
2. Click "Start Quiz"
3. Answer 25 questions
4. Submit and view results

## 🔍 Troubleshooting

### Common Issues

#### 1. Module Not Found Error (dotenv, express, etc.)

**Error**: `Cannot find module 'dotenv'` or similar module errors

**Solutions**:
```bash
# Solution 1: Ensure you're in the correct directory
cd server
npm install

# Solution 2: Clear npm cache and reinstall
cd server
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Solution 3: Install missing module specifically
cd server
npm install dotenv express cors helmet express-rate-limit sqlite3 bcrypt jsonwebtoken express-validator

# Solution 4: Check Node.js version (requires v16+)
node --version
```

**Important**: Always run the server from the `server` directory:
```bash
# Correct way
cd server
npm start

# Wrong way (will cause module errors)
node server/index.js  # Don't do this from root directory
```

#### 2. Port Already in Use
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 8000 (Linux/Mac)
lsof -ti:8000 | xargs kill -9
```

#### 2. Database Issues
```bash
# Reset database
cd server
rm database/mcq_system.db
npm run seed
```

#### 3. Network Access Issues
- Ensure firewall allows connections on ports 5173 and 8000
- Update `client/.env` with correct IP address
- Check if antivirus is blocking connections

#### 4. Module Not Found Errors
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

## 💻 Running on Another Computer

### Method 1: Complete Code Transfer (Recommended)

This method allows you to run the entire application (both server and client) on another computer.

#### Step 1: Transfer the Code

**Option A: Using Git (Recommended)**
```bash
# On the new computer, clone the repository
git clone <your-repository-url>
cd mcq-testing-system
```

**Option B: Manual File Transfer**
1. Copy the entire project folder to the new computer using:
   - USB drive
   - Network share
   - Cloud storage (Google Drive, OneDrive, etc.)
   - Email (if small enough)
2. Extract/copy to desired location on the new computer

#### Step 2: Setup on New Computer

```bash
# 1. Ensure Node.js is installed (v16+)
node --version
npm --version

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

# 4. Configure environment files
# Update server/.env and client/.env as needed
```

#### Step 3: Database Setup
```bash
# Seed the database with questions
cd server
npm run seed
```

#### Step 4: Run the Application
```bash
# Terminal 1 - Start server
cd server
npm start

# Terminal 2 - Start client
cd client
npm run dev
```

#### Step 5: Access the Application
- **Local access**: http://localhost:5173
- **Network access**: http://NEW_COMPUTER_IP:5173

### Method 2: Network Access (Server on Original Computer)

This method keeps the server running on the original computer while accessing it from another computer on the same network.

#### On Original Computer (Server Host):

1. **Find Your IP Address**
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   
   # Linux/Mac
   ifconfig
   # or
   ip addr show
   ```

2. **Update Client Configuration**
   ```bash
   # Update client/.env
   VITE_API_URL=http://YOUR_IP_ADDRESS:8000/api
   ```

3. **Configure Firewall**
   - Windows: Allow ports 5173 and 8000 through Windows Firewall
   - Linux: `sudo ufw allow 5173` and `sudo ufw allow 8000`
   - Mac: System Preferences > Security & Privacy > Firewall

4. **Start Both Services**
   ```bash
   # Terminal 1
   cd server
   npm start
   
   # Terminal 2
   cd client
   npm run dev
   ```

#### On Another Computer (Client):

**Option A: Access Web Interface Only**
- Open browser and go to: `http://ORIGINAL_COMPUTER_IP:5173`
- No installation required, just use the web interface

**Option B: Run Local Client Connected to Remote Server**
1. Copy only the `client` folder to the new computer
2. Install Node.js and dependencies:
   ```bash
   cd client
   npm install
   ```
3. Update `client/.env`:
   ```env
   VITE_API_URL=http://ORIGINAL_COMPUTER_IP:8000/api
   ```
4. Start the client:
   ```bash
   npm run dev
   ```

### Method 3: Portable Setup (USB/External Drive)

Create a portable version that can run from any Windows computer.

#### Step 1: Prepare Portable Version
1. Install Node.js portable version or ensure target computers have Node.js
2. Copy entire project to USB drive
3. Create a startup script (`portable-start.bat`):
   ```batch
   @echo off
   echo Starting MCQ Testing System...
   
   echo Installing dependencies...
   cd server
   call npm install --silent
   cd ../client
   call npm install --silent
   cd ..
   
   echo Starting server...
   start cmd /k "cd server && npm start"
   
   echo Waiting for server to start...
   timeout /t 5
   
   echo Starting client...
   start cmd /k "cd client && npm run dev"
   
   echo Application starting...
   echo Server: http://localhost:8000
   echo Client: http://localhost:5173
   pause
   ```

#### Step 2: Usage on Any Computer
1. Plug in USB drive
2. Run `portable-start.bat`
3. Wait for both services to start
4. Access at http://localhost:5173

### Network Configuration Guide

#### Finding Your IP Address

**Windows:**
```cmd
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

**Linux/Mac:**
```bash
# Method 1
hostname -I

# Method 2
ip route get 1.1.1.1 | awk '{print $7}'

# Method 3
ifconfig | grep "inet " | grep -v 127.0.0.1
```

#### Firewall Configuration

**Windows Firewall:**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Click "Change Settings" → "Allow another app"
4. Add Node.js or allow ports 5173 and 8000

**Alternative - Command Line:**
```cmd
# Allow ports through firewall
netsh advfirewall firewall add rule name="MCQ System Client" dir=in action=allow protocol=TCP localport=5173
netsh advfirewall firewall add rule name="MCQ System Server" dir=in action=allow protocol=TCP localport=8000
```

#### Testing Network Access

```bash
# Test server connectivity from another computer
curl http://YOUR_IP:8000/api/health

# Or use browser to visit:
# http://YOUR_IP:8000/api/health
```

### Complete Setup Checklist for New Computer

- [ ] **Prerequisites Installed**
  - [ ] Node.js (v16 or higher)
  - [ ] npm (comes with Node.js)
  - [ ] Git (optional, for cloning)

- [ ] **Code Transfer Complete**
  - [ ] Project files copied/cloned
  - [ ] All folders present (client, server, database)

- [ ] **Dependencies Installed**
  - [ ] Server: `cd server && npm install`
  - [ ] Client: `cd client && npm install`

- [ ] **Environment Configuration**
  - [ ] `server/.env` configured
  - [ ] `client/.env` updated with correct API URL
  - [ ] IP addresses updated if needed

- [ ] **Database Setup**
  - [ ] Database seeded: `cd server && npm run seed`
  - [ ] Database file created in `database/` folder

- [ ] **Application Running**
  - [ ] Server started: `cd server && npm start`
  - [ ] Client started: `cd client && npm run dev`
  - [ ] Both accessible in browser

- [ ] **Network Access (if needed)**
  - [ ] Firewall configured
  - [ ] IP addresses shared with users
  - [ ] Network connectivity tested

### Troubleshooting Network Access

**Common Issues:**

1. **Cannot access from another computer**
   - Check firewall settings
   - Verify IP address is correct
   - Ensure both computers are on same network
   - Try disabling antivirus temporarily

2. **API calls failing**
   - Check `client/.env` has correct server IP
   - Verify server is running on correct port
   - Test API endpoint directly: `http://SERVER_IP:8000/api/health`

3. **Slow performance over network**
   - Use wired connection instead of WiFi
   - Ensure good network signal strength
   - Consider running complete setup on each computer instead

## 🚀 Deployment

### Local Network Deployment
1. Update `client/.env` with your machine's IP
2. Ensure firewall allows incoming connections
3. Start both server and client
4. Share the IP address with users

### Production Deployment
1. Set `NODE_ENV=production` in server/.env
2. Build client: `cd client && npm run build`
3. Serve built files with a web server
4. Use a process manager like PM2 for the server
5. Consider using a reverse proxy (nginx)

## 📝 Available Scripts

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Populate database with all questions
- `npm run seed:grade6cs` - Add Grade 6 CS questions
- `npm run seed:grade7cs` - Add Grade 7 CS questions
- `npm run seed:grade8cs` - Add Grade 8 CS questions
- `npm run seed:grade11cs` - Add Grade 11 CS questions

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify environment configuration
4. Check server and client logs for errors
5. Create an issue with detailed error information

## 🎯 Quick Start Checklist

- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm install` in both server and client)
- [ ] Environment files configured
- [ ] Database seeded (`npm run seed`)
- [ ] Server running on port 8000
- [ ] Client running on port 5173
- [ ] Can access application in browser
- [ ] Student registration works
- [ ] Quiz functionality tested

---

**Happy Testing! 🎉**

For technical support or questions, please refer to the troubleshooting section or create an issue in the repository.