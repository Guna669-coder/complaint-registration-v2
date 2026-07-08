# Complaint Registry

A full-stack complaint management system with three panels: public, admin, and agent.

## Project Structure

```
complaint-registry/
├── backend/
│   ├── models/
│   │   └── Complaint.js       ← Mongoose schema
│   ├── routes/
│   │   └── complaintRoutes.js ← All API routes
│   ├── server.js              ← Express + MongoDB entry point
│   ├── .env                   ← Environment variables
│   └── package.json
└── frontend/
    ├── index.html             ← Public: submit & track complaints
    ├── admin.html             ← Admin: view all, assign to agents
    ├── agent.html             ← Agent: view assigned, update status
    └── styles.css             ← Shared stylesheet
```

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
Edit `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/complaints
PORT=7000
```

### 3. Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

### 4. Start the server
```bash
cd backend
npm start          # production
# or
npm run dev        # with auto-restart (nodemon)
```

### 5. Open the app
Visit **http://localhost:7000** in your browser.

- `/`           → Submit a complaint (public)
- `/admin.html` → Admin panel
- `/agent.html` → Agent panel

## API Endpoints

| Method | Route                          | Description                |
|--------|-------------------------------|----------------------------|
| POST   | /api/complaints               | Register new complaint     |
| GET    | /api/complaints               | Get all (filter: ?assignedTo=) |
| GET    | /api/complaints/:id/status    | Get complaint status       |
| PUT    | /api/complaints/:id/assign    | Assign to agent + priority |
| PUT    | /api/complaints/:id/status    | Update status              |
| GET    | /api/complaints/stats/summary | Dashboard stats            |
