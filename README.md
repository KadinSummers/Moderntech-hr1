# ModernTech HR System

Vue 3 + MySQL (Port 3307) HR Dashboard - Fixes 15→16 employee persistence bug.

## Fix Applied
**Problem:** Adding employee on Dashboard (15→16) reset to 15 on Payroll/TimeOff.
**Solution:** Use `localStorage` (`moderntech_employees`) so all views share same data. Persists on navigation + refresh.

## Features
- Dashboard: 15 default employees, Add/Delete, Total/Avg/ Payroll stats
- Payroll: Synced list, totals include new employees
- Time Off: Leave requests, synced employee dropdown
- Login `/login` with hidden sidebar, Logout → login

## Run
npm install
npm run dev
Open http://localhost:5173/login


## Demo (for rubric)
1. Login → Dashboard = 15 employees
2. Add kadin summers / kadin@gmail.com / developer / 50000 / Software Dev → 16
3. Payroll → 16 ✅ | Time Off → dropdown has kadin ✅ | F5 → still 16 ✅
4. Logout → clean login page

## MySQL Schema (3NF - 3307)


## Key Code
```js
// Save on add
localStorage.setItem('moderntech_employees', JSON.stringify(this.employees))

// Load in all views
JSON.parse(localStorage.getItem('moderntech_employees'))
Admin: admin@moderntech.co.za / 123
