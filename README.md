# 🚀 Real-time Voting and Agenda Application

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC)

</div>

## 📋 Project Overview

A real-time voting and agenda application that enables users to participate in agenda-based voting sessions with instant updates and live results.

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

  - User-friendly voting interface
  - Real-time vote casting
  - Secure vote counting
  - Multiple agenda support

- 📊 **Admin Dashboard**

  - Agenda creation and management
  - Real-time agenda switching
  - Voting session control
  - Result visualization
  - CRUD operations for selections

- 🔄 **Real-time Updates**

  - WebSocket integration
  - Instant agenda changes
  - Live voting results
  - Synchronized user experience

- 🎨 **Modern UI**

  - Clean and intuitive design
  - Responsive layout
  - TailwindCSS styling
  - Radix UI components

- 🔒 **Security**
  - Protected admin routes
  - Secure authentication
  - Type-safe operations

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.6.2
- **Styling:** TailwindCSS 3.4.17
- **UI Components:**
  - Radix UI
  - React Bootstrap
  - Lucide React Icons
- **Form Management:** Formik + Yup
- **Real-time Communication:** Socket.IO Client
- **HTTP Client:** Axios
- **Development Tools:**
  - ESLint
  - PostCSS
  - Autoprefixer

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
