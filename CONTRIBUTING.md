# Contributing to EduTrack

First off, thank you for considering contributing to EduTrack! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages
6. Push to your fork
7. Submit a pull request

## Development Setup

1. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/EduTrack.git
   cd EduTrack
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `client` and `server` directories
   - Fill in your MongoDB URI and other required variables

4. **Run the development servers:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
   cd client
   npm start
   ```

## Coding Standards

### JavaScript/React

- Use **ES6+** syntax
- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**
- Use **async/await** instead of promises when possible

### Code Style

- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Use semicolons
- **Naming Conventions:**
  - Components: PascalCase (e.g., `StudentDashboard.js`)
  - Functions/Variables: camelCase (e.g., `getUserData`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
  - Files: PascalCase for components, camelCase for utilities

### Component Structure

```javascript
// Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Component
const MyComponent = () => {
  // Hooks
  const dispatch = useDispatch();
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Backend Structure

```javascript
// Controller function
const controllerFunction = async (req, res) => {
  try {
    // Logic here
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, missing semicolons, etc.)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks

### Examples

```bash
feat(student): add attendance calculator component

fix(admin): resolve teacher deletion bug

docs(readme): update installation instructions

style(dashboard): improve card spacing and colors

refactor(api): simplify student controller logic
```

## Pull Request Process

1. **Update documentation** if you're adding/changing features
2. **Test thoroughly** on different scenarios
3. **Update the README.md** with details of changes if applicable
4. **Ensure all tests pass** (if tests exist)
5. **Request review** from maintainers

### PR Title Format

Use the same format as commit messages:
```
feat(scope): brief description
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested with different user roles
- [ ] Checked responsive design
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Additional Notes
Any additional information
```

## Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing!

## Thank You! 🙏

Your contributions are greatly appreciated and help make EduTrack better for everyone!
