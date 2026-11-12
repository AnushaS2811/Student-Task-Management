
# Student Task Management System

## 1. Project Overview

The Student Task Management System is a simple web-based application designed to help students organize, manage and track their daily academic tasks.

Students can add tasks, mark them as completed, delete tasks and track their progress.

This project demonstrates the implementation of DevOps practices such as version control, automated testing, build automation, Continuous Integration and Continuous Deployment (CI/CD).

## 2. Objectives

- To develop a simple task management application for students.
- To manage daily academic tasks efficiently.
- To implement version control using Git and GitHub.
- To automate application building and testing.
- To implement CI/CD using GitHub Actions.
- To deploy the application using GitHub Pages.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Application structure |
| CSS | Application styling |
| JavaScript | Application functionality |
| Node.js | Build and testing environment |
| Git | Version control |
| GitHub | Source code repository |
| GitHub Actions | CI/CD automation |
| GitHub Pages | Application deployment |

## 4. Application Features

- Add new tasks.
- Mark tasks as completed.
- Delete tasks.
- Display total tasks.
- Display pending tasks.
- Display completed tasks.
- Save tasks using browser Local Storage.
- Maintain task data after refreshing the page.

## 5. Project Structure

```text
Student-Task-Management/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── scripts/
│   └── build.js
│
├── src/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── tests/
│   └── app.test.js
│
├── package.json
├── .gitignore
└── README.md
```

## 6. DevOps Implementation

### Version Control
Git is used to track changes in the project, and GitHub is used to store the source code remotely.

### Build Automation
A Node.js build script copies the application files from the `src` folder into the `dist` folder.

Command:
```bash
npm run build
```

### Automated Testing
Node.js built-in test runner is used to test the application functions.

Command:
```bash
npm test
```

A total of 10 automated test cases are implemented.

### Continuous Integration (CI)
GitHub Actions automatically executes the testing and build process whenever code is pushed to the main branch or a pull request is created.

### Continuous Deployment (CD)
After successful testing and building, GitHub Actions uploads the production build and deploys it to GitHub Pages.

## 7. CI/CD Workflow

1. Developer modifies the application.
2. Changes are committed using Git.
3. Code is pushed to GitHub.
4. GitHub Actions starts the workflow.
5. Repository code is checked out.
6. Node.js environment is configured.
7. Automated tests are executed.
8. Application is built.
9. Build files are uploaded as an artifact.
10. Application is deployed using GitHub Pages.

## 8. Testing Results

- Total automated tests: 10
- Passed: 10
- Failed: 0

The live application was also tested for adding, completing, deleting and retaining tasks after refreshing the browser.

## 9. Deployment

The application is deployed using GitHub Pages.

Live Application:
[Student Task Management System](https://anushas2811.github.io/Student-Task-Management/)

Source Code:
[GitHub Repository](https://github.com/AnushaS2811/Student-Task-Management)

## 10. Conclusion

The Student Task Management System successfully demonstrates the use of DevOps practices in a web application.

Git, GitHub, Node.js and GitHub Actions are used to implement version control, build automation, automated testing and continuous deployment.

The project provides practical experience in developing and deploying an application using a basic CI/CD pipeline.
