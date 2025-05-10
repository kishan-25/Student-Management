# Student Management Dashboard

A React-based dashboard for managing a list of students with features like listing, filtering, and mock authentication.

## Features

- View a list of students
- Add new students with form validation
- Filter students by course
- User authentication (Firebase mock)
- Responsive design for mobile and desktop
- View detailed student information

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── StudentList.js
│   ├── LoadingSpinner.js
│   ├── modals/
│   │   ├── AddStudentModal.js
│   │   ├── LoginModal.js
│   │   └── StudentDetailModal.js
├── services/
│   ├── mockApi.js
│   └── mockFirebase.js
├── App.js
└── index.js
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Usage

- View the list of students on the main dashboard
- Use the course dropdown to filter students by course
- Click "Add Student" to add a new student (requires login)
- Click "View Details" on a student row to see more information (requires login)
- Use the Login/Logout buttons in the header to manage authentication

## Implementation Details

- React for the UI components
- Tailwind CSS for styling
- Mock API service with simulated network delays
- Mock Firebase authentication

## Note

This project uses mock services to simulate API calls and authentication. In a real-world application, these would be replaced with actual backend services.