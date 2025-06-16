# 🚀 Real-time Voting and Agenda Application

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)

</div>

## 📋 Project Overview

A real-time voting and agenda application that enables users to participate in voting and view agenda sessions with instant updates and live results.

### User Features

- Vote and view current agenda plans
- Real-time updates when new agendas are set
- Responsive design for all devices

### Admin Features

- Create and manage agenda plans
- Set current active agenda
- View real-time voting results
- Manage voting sessions
- Real-time updates using WebSocket

## 🏗️ Project Structure

```
src/
├── api/          # API integration and voting services
├── assets/       # Static assets and images
├── common/       # Shared components and utilities
├── components/   # Reusable UI components
│   ├── admin/    # Admin-specific components
│   ├── user/     # User-specific components
│   └── shared/   # Shared UI components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── layout/       # Layout components and templates
├── lib/          # Utility functions and helpers
├── pages/        # Page components
│   ├── MainPage.tsx    # User voting interface
│   ├── AdminPage.tsx   # Admin dashboard
│   └── AdminLogin.tsx  # Admin authentication
├── styles/       # Global styles and TailwindCSS
└── types/        # TypeScript type definitions
```

## ✨ Key Features

- 🎯 **Voting System**

  - User-friendly voting interface with real-time updates
  - Secure vote casting with validation
  - Real-time vote counting and results display
  - Multiple agenda support with active session management
  - Vote history tracking

- 📊 **Admin Dashboard**

  - Comprehensive agenda creation and management
  - Real-time agenda switching with confirmation
  - Voting session control with start/stop functionality
  - Detailed result visualization with statistics
  - CRUD operations for selections and agendas
  - User activity monitoring

- 🔄 **Real-time Updates**

  - WebSocket integration for instant updates
  - Live agenda changes with user notifications
  - Real-time voting results with progress indicators
  - Synchronized user experience across all devices
  - Connection status monitoring

- 🎨 **Modern UI**

  - Clean and intuitive design with dark/light mode
  - Fully responsive layout for all devices
  - TailwindCSS styling with custom components
  - Radix UI components for accessibility
  - Loading states and animations

- 🔒 **Security**
  - Protected admin routes with authentication
  - Secure session management
  - Type-safe operations with TypeScript
  - Input validation and sanitization
  - Error handling and logging

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.6.2
- **Styling:** 
  - TailwindCSS 3.4.17
  - CSS Modules
  - PostCSS
- **UI Components:**
  - Radix UI (Accessible components)
  - React Bootstrap (Layout components)
  - Lucide React Icons (Icon library)
  - React Hot Toast (Notifications)
- **State Management:**
  - React Context API
  - Custom hooks
- **Form Management:** 
  - Formik (Form handling)
  - Yup (Validation)
- **Real-time Communication:** 
  - Socket.IO Client
  - WebSocket API
- **HTTP Client:** 
  - Axios
  - Fetch API
- **Development Tools:**
  - ESLint (Code linting)
  - Prettier (Code formatting)
  - PostCSS (CSS processing)
  - Autoprefixer (CSS compatibility)
  - TypeScript (Type checking)

## 🔌 Real-time Communication

The application uses Socket.IO for real-time communication between the client and server:

- **Socket Implementation (`src/socket.ts`)**
  - Establishes WebSocket connection to the backend server
  - Configured with credentials for secure communication
  - Default connection to `http://localhost:5000`
  - Singleton pattern for consistent socket instance across the application

### Socket Events

The socket connection handles various real-time events:

- **Voting Events**
  - Vote submission and updates
  - Real-time vote counting
  - Vote status changes

- **Agenda Events**
  - New agenda creation
  - Agenda status updates
  - Active agenda changes

- **Admin Events**
  - Session control commands
  - Admin authentication status
  - User activity monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd [project-name]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
Made with ❤️ using React + TypeScript
</div>
