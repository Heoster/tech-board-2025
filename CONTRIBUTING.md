# Contributing to Tech Board 2025

Thank you for your interest in contributing to Tech Board 2025! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 8 or higher
- Git
- Basic knowledge of React, Node.js, and SQLite

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/tech-board-2025.git
   cd tech-board-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **Set up the database**
   ```bash
   node ensure-300-questions.js
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend
   cd server && npm run dev
   
   # Terminal 2: Frontend
   cd client && npm run dev
   ```

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Include detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node.js version)

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template**
3. **Provide detailed description**:
   - Use case and motivation
   - Proposed solution
   - Alternative solutions considered

### Code Contributions

#### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

#### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(quiz): add timer pause functionality
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
```

#### Pull Request Process

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**
   ```bash
   # Run tests
   cd server && npm test
   cd ../client && npm test
   
   # Test build
   node build-production.js
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description of changes
   - Include screenshots for UI changes

## 📋 Coding Standards

### JavaScript/TypeScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer `const` over `let`, avoid `var`

### React Components
- Use functional components with hooks
- Follow component naming convention (PascalCase)
- Keep components small and focused
- Use TypeScript for type safety
- Implement proper error boundaries

### Node.js/Express
- Use async/await over callbacks
- Implement proper error handling
- Validate all inputs
- Use middleware for common functionality
- Follow RESTful API conventions

### Database
- Use parameterized queries to prevent SQL injection
- Implement proper indexing
- Keep database schema normalized
- Use transactions for multi-step operations

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic color names

## 🧪 Testing Guidelines

### Unit Tests
- Write tests for all new functions
- Aim for >80% code coverage
- Use descriptive test names
- Test both success and error cases

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flows

### End-to-End Tests
- Test critical user journeys
- Test admin workflows
- Test quiz functionality

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for public functions
- Document complex algorithms
- Include usage examples
- Keep comments up-to-date

### API Documentation
- Document all endpoints
- Include request/response examples
- Document error codes
- Keep OpenAPI spec updated

### User Documentation
- Update README for new features
- Create user guides for complex features
- Include screenshots and examples

## 🔒 Security Guidelines

### Authentication & Authorization
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Implement proper session management
- Follow principle of least privilege

### Input Validation
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries
- Implement rate limiting

### Error Handling
- Don't expose sensitive information in errors
- Log security events
- Implement proper error boundaries

## 🚀 Deployment

### Before Submitting PR
1. **Test locally**
   ```bash
   node build-production.js
   node verify-deployment.js http://localhost:8000
   ```

2. **Check for issues**
   ```bash
   node check-duplicate-questions.js
   ```

3. **Run all tests**
   ```bash
   cd server && npm test
   cd ../client && npm test
   ```

## 📞 Getting Help

### Communication Channels
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and discussions
- **Pull Request Comments** - Code review discussions

### Code Review Process
1. **Automated checks** must pass
2. **At least one maintainer** must approve
3. **All conversations** must be resolved
4. **Tests must pass** in CI/CD pipeline

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

## 📋 Checklist for Contributors

Before submitting a PR, ensure:

- [ ] Code follows project coding standards
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete
- [ ] Related issues are linked
- [ ] No sensitive data is committed
- [ ] Build process works correctly

## 🤝 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

---

Thank you for contributing to Tech Board 2025! Your efforts help make educational technology better for everyone. 🎓✨