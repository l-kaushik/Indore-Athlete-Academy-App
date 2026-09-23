# Indore Athlete Academy — Frontend

React + Vite frontend for all three user roles: **Student**, **Trainer**, and **Admin**.

## Tech Stack
- **React 18** + **Vite 5**
- **React Router v6** — role-based routing
- **Tailwind CSS v3** — dark, energetic design system
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo Accounts (password: `password123`)

| Role    | Email               |
|---------|---------------------|
| Student | student@iaa.com     |
| Trainer | trainer@iaa.com     |
| Admin   | admin@iaa.com       |

## Pages

### Student
| Route                          | Page              |
|-------------------------------|-------------------|
| `/student/dashboard`          | Dashboard         |
| `/student/workouts`           | My Workouts       |
| `/student/workouts/:id/log`   | Log a Workout     |

### Trainer
| Route                       | Page              |
|----------------------------|-------------------|
| `/trainer/dashboard`       | Dashboard         |
| `/trainer/templates`       | All Templates     |
| `/trainer/templates/create`| Create Template   |
| `/trainer/assign`          | Assign Workout    |

### Admin
| Route              | Page              |
|-------------------|-------------------|
| `/admin/dashboard` | Dashboard         |
| `/admin/users`     | User Management   |

## Connecting the Backend

1. Copy `.env.example` to `.env` and set `VITE_API_URL`
2. In each file, look for `// TODO: Replace with API call` comments
3. Replace the mock data import with the corresponding `api.get/post/patch` call from `src/utils/api.js`
4. The `AuthContext` already has the `localStorage` token slot ready — just uncomment those lines

## Project Structure

```
src/
├── context/AuthContext.jsx      # Auth state + login/logout
├── data/mockData.js             # All mock data (swap for API)
├── utils/api.js                 # Fetch wrapper with auth headers
├── components/
│   ├── layout/                  # Sidebar, Navbar, Layout
│   └── ui/                      # Badge, StatCard
└── pages/
    ├── auth/                    # Login, Register
    ├── student/                 # Dashboard, MyWorkouts, LogWorkout
    ├── trainer/                 # Dashboard, Templates, CreateTemplate, AssignWorkout
    └── admin/                   # Dashboard, UserManagement
```
