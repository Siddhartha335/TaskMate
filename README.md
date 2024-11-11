# TaskMate
## Overview

The **Task Management App** is a web application designed to help teams manage and track their tasks efficiently. It allows users to create tasks, assign them to team members, and monitor the progress of each task. The application provides both a **frontend** for user interactions and a **backend** for data handling, allowing easy access to tasks and user data.

### Key Features:
- **Task Creation**: Users can create tasks with details like title, description, and due date.
- **Task Assignment**: Tasks can be assigned to specific users within the application.
- **Task Status**: Track the status of tasks (e.g., To-Do, In Progress, Completed).
- **User Management**: Admin users can manage users and assign them tasks.
- **Task Filtering & Sorting**: Filter tasks by user, status, or due date for better task management.

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing and navigation between different pages and views.
- **React Hook Form**: For managing form state and validation efficiently.
- **React Redux**: For global state management, ensuring data consistency across components.
- **Redux Toolkit**: A set of utilities for simplifying Redux logic and improving code quality.

### Backend:
- **Express.js**: A fast, unopinionated web framework for building REST APIs in Node.js.
- **Prisma ORM**: An Object-Relational Mapping (ORM) tool for interacting with the PostgreSQL database.
- **PostgreSQL**: A relational database system used to store task and user data.
- **GraphQL**: A query language for APIs, providing a more flexible and efficient way to interact with backend data.
- **REST API**: A set of API endpoints for traditional HTTP-based requests to manage tasks and users.

### Deployment:
- **Docker**: Used for containerizing the app to ensure consistency across development, staging, and production environments.

## Installation

To run this app locally, follow the steps below.

### Prerequisites

- **Node.js** (version 14.x or higher)
- **Docker** (optional, for containerized deployment)

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
