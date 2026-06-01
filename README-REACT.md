# Temple Management System — React (TypeScript + Tailwind)

Standalone React frontend — **no server required**. Temple data persists in the browser session (private client-side datastore).

## Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, React Router, Vite
- **Data:** Client-side temple store + **seed v2** (23 users, 8 donations, 6 rituals, 5 events, 25+ activity rows — all cross-linked)
- **Currency:** Philippine Peso (₱)
- **Optional:** Express API in `server/` for MySQL sync (not used by default UI)

## Project structure

```
src/
  config/          # roles, demo accounts, navigation
  context/         # AuthContext, DataContext (data refresh)
  lib/storage/     # db, seed, services (persistence layer)
  components/      # Layout, UI (StatCard, Card, Badge…)
  features/pages/  # Shared feature pages + ConnectedFeaturePage (role slugs)
  pages/           # Landing, Login, Register
  routes/          # pageMap, RolePage router
  roles/           # 20 role folders with dedicated pages
    super-admin/
    temple-administrator/
    head-priest/
    … (all 20 roles)
  lib/             # api client, utils (formatMoney, etc.)
server/            # Optional Express API (MySQL)
database/          # Optional schema.sql reference
dist/              # Production build output (npm run build)
```

## Quick start

1. **Install & run**:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/templemanagementsystem
npm install
npm run dev
```

- React app: http://localhost:5173
- API: http://localhost:3001

4. **Production build:**

```bash
npm run build
```

Output in `dist/` — serve with any static host; API must run separately (`npm run dev:server`).

## Login (@gmail.com)

All demo accounts use **@gmail.com**. On the login page you get:

- Gmail sign-in form (validates `@gmail.com`)
- **Quick Access** buttons for all 20 roles (email, password, seeded data)
- Full credentials table
- **Quick Access on every role dashboard** to switch roles

| Role | Gmail | Password |
|------|-------|----------|
| Super Admin | admin@gmail.com | admin123 |
| Temple Administrator | temple.admin@gmail.com | demo123 |
| Head Priest | headpriest@gmail.com | demo123 |
| Priest | priest@gmail.com | demo123 |
| … (all 20 roles) | *@gmail.com | demo123 |

Use **Quick Access** on login or any dashboard for one-click sign-in with seeded demo data.

## 20 role routes

| Role | URL prefix |
|------|------------|
| Super Admin | `/super-admin/` |
| Temple Administrator | `/temple-administrator/` |
| Head Priest | `/head-priest/` |
| Priest | `/priest/` |
| Temple Secretary | `/temple-secretary/` |
| Treasurer | `/treasurer/` |
| Accountant | `/accountant/` |
| Donation Manager | `/donation-manager/` |
| Event Manager | `/event-manager/` |
| Volunteer Coordinator | `/volunteer-coordinator/` |
| Volunteer | `/volunteer/` |
| Member | `/member/` |
| Devotee | `/devotee/` |
| Visitor | `/visitor/` |
| Ritual Coordinator | `/ritual-coordinator/` |
| Education Coordinator | `/education-coordinator/` |
| Teacher / Instructor | `/teacher-instructor/` |
| Inventory Manager | `/inventory-manager/` |
| Maintenance Staff | `/maintenance-staff/` |
| Security Guard | `/security-guard/` |

Shared: `/shared/activity-log` (all roles)

## Features

- Auth, RBAC, 20 role portals
- Donations, rituals, events, finance, announcements, approvals
- Shared activity table (all roles, client-side)
- Philippine Peso (₱) formatting
