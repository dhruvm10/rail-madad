# 🔍 Inspector Details - Quick Reference

## Inspector Account Information

### Default Inspector Credentials
```
Email:    inspector@railmadad.com
Password: password123
Role:     staff
```

### Access Dashboard
- URL: http://localhost:3000/auth/login
- After login, redirects to: http://localhost:3000/staff-dashboard
- Inspector sees all staff capabilities + inspection features

---

## How to Add Inspector to Database

### Option 1: Via SQL (Fastest Method)

1. Open database using any SQLite client or command line:
```bash
sqlite3 sqlite.db
```

2. Run this SQL command:
```sql
INSERT INTO users (
  id,
  email,
  password,
  first_name,
  last_name,
  phone,
  role,
  is_active,
  email_verified,
  created_at,
  updated_at
) VALUES (
  lower(hex(randomblob(16))),
  'inspector@railmadad.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NN.1/iH.mfC6',  -- password123
  'Inspector',
  'General',
  '+91-9999888777',
  'staff',
  1,
  1,
  datetime('now'),
  datetime('now')
);
```

3. Verify:
```sql
SELECT email, first_name, last_name, role FROM users WHERE email = 'inspector@railmadad.com';
```

### Option 2: Via Registration Page

1. Go to: http://localhost:3000/auth/register
2. Fill in the form:
   - **First Name**: Inspector
   - **Last Name**: General
   - **Email**: inspector@railmadad.com
   - **Password**: password123
   - **Confirm Password**: password123
   - **Phone**: +91-9999888777
3. Click "Register"
4. Open database and manually change role from 'passenger' to 'staff':
```sql
UPDATE users SET role = 'staff', email_verified = 1 WHERE email = 'inspector@railmadad.com';
```

### Option 3: Copy Existing Staff Account

If you already have staff accounts:
```sql
-- Copy staff1 credentials and create inspector
INSERT INTO users (
  id,
  email,
  password,
  first_name,
  last_name,
  phone,
  role,
  is_active,
  email_verified,
  created_at,
  updated_at
)
SELECT
  lower(hex(randomblob(16))),  -- new UUID
  'inspector@railmadad.com',
  password,  -- same password as staff1
  'Inspector',
  'General',
  '+91-9999888777',
  role,  -- keep staff role
  is_active,
  email_verified,
  datetime('now'),
  datetime('now')
FROM users
WHERE email = 'staff1@railmadad.com';
```

---

## Inspector Features

### What Inspector Can Do:

#### 1. All Staff Capabilities
- ✅ View assigned complaints
- ✅ Resolve complaints
- ✅ Add notes and updates
- ✅ Upload evidence
- ✅ Communication with passengers

#### 2. Inspection-Specific Features
- ✅ Access inspection checklists
- ✅ Submit inspection reports
- ✅ Evaluate resolved complaints
- ✅ Score resolution quality (0-100%)
- ✅ Recommend complaint closure
- ✅ Add inspection notes and evidence

#### 3. Reporting
- ✅ View own inspection history
- ✅ Track inspection performance
- ✅ See approval/rejection rates
- ✅ Monitor quality scores

---

## How to Use Inspection System

### Step 1: Login as Inspector
```
1. Go to http://localhost:3000/auth/login
2. Email: inspector@railmadad.com
3. Password: password123
4. Click "Login"
```

### Step 2: Access Resolved Complaints
```
1. From staff dashboard
2. Look for complaints with status "resolved"
3. Click "View Details" on any resolved complaint
```

### Step 3: Get Inspection Checklist
```javascript
// API call to get appropriate checklist
const response = await fetch(
  `/api/inspection/checklists?category=${complaint.category}`,
  { credentials: 'include' }
);
const { checklists } = await response.json();
```

### Step 4: Submit Inspection Report
```javascript
const submitReport = async () => {
  const response = await fetch('/api/inspection/submit-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      complaintId: 'complaint-uuid',
      checklistId: 'checklist-uuid',
      inspectionResults: {
        item1: true,   // passed
        item2: false,  // failed
        item3: true,   // passed
        // ... all checklist items
      },
      overallScore: 80,  // calculated automatically
      inspectorNotes: 'Overall satisfactory, minor issues remain'
    })
  });
  
  if (response.ok) {
    console.log('Inspection report submitted!');
  }
};
```

---

## Available Inspection Checklists

### 1. Cleanliness (10 criteria)
- Coach floors cleaned
- Seats dust-free
- Windows clean
- Restrooms sanitized
- Waste bins empty
- Bedding clean
- Carpets vacuumed
- Air vents cleaned
- Handrails sanitized
- Overall hygiene

### 2. Food Quality (10 criteria)
- Temperature appropriate
- Freshness verified
- Proper packaging
- Utensils clean
- Menu accuracy
- Portion sizes adequate
- Prep area clean
- Staff hygiene
- Expiry dates OK
- Customer satisfaction

### 3. Staff Behavior (10 criteria)
- Professional appearance
- Polite communication
- Prompt response
- Issue resolution
- Active listening
- Appropriate tone
- Conflict handling
- Customer priority
- Follow-up action
- Overall satisfaction

### 4. Security (10 criteria)
- Personnel present
- Emergency equipment
- Safety protocols
- Documentation
- Response time
- Communication
- Threat neutralized
- Safety ensured
- Evidence preserved
- Follow-up complete

### 5. Facilities (10 criteria)
- Lighting functional
- AC/heating working
- Charging points OK
- Water available
- Doors/windows OK
- Emergency exits clear
- Fire extinguishers present
- First aid available
- Signage visible
- Overall condition

### 6. Technical (10 criteria)
- Equipment repaired
- Testing complete
- Safety checks done
- Functionality verified
- Documentation updated
- Spare parts available
- Maintenance schedule
- No recurring issues
- Performance standard
- User acceptance

---

## Inspection Scoring

### Score Calculation
```
Score = (Items Passed / Total Items) × 100

Example:
- Total items: 10
- Items passed: 8
- Items failed: 2
- Score: (8/10) × 100 = 80%
```

### Passing Criteria
- **80-100%**: Excellent - Auto-close complaint (if admin approves)
- **60-79%**: Acceptable - Requires admin review
- **40-59%**: Poor - Requires reinspection
- **0-39%**: Failed - Must reinspect immediately

### Automatic Actions
- **Score ≥ 80% + Admin Approval**: Complaint closed automatically
- **Score < 80%**: Status → "requires_reinspection"
- **Admin Rejection**: Staff must redo resolution

---

## API Endpoints for Inspector

### 1. Get Checklists
```bash
GET /api/inspection/checklists?category=cleanliness
Authorization: JWT Token (automatic via cookie)
```

### 2. Submit Report
```bash
POST /api/inspection/submit-report
Content-Type: application/json
Authorization: JWT Token

Body:
{
  "complaintId": "uuid",
  "checklistId": "uuid",
  "inspectionResults": { ... },
  "overallScore": 85,
  "inspectorNotes": "Good quality"
}
```

### 3. View Own Reports
```bash
GET /api/inspection/reports?inspectorId=current-user-id
Authorization: JWT Token
```

### 4. Get Report Details
```bash
GET /api/inspection/reports/[reportId]
Authorization: JWT Token
```

---

## Inspection Workflow Example

### Complete Test Scenario

**Scenario**: Inspector verifies a resolved cleanliness complaint

#### Step 1: Staff Resolves Complaint
```
- Staff logs in
- Resolves complaint about dirty coach
- Status: new → resolved
```

#### Step 2: Inspector Inspects
```
- Inspector logs in (inspector@railmadad.com)
- Views resolved complaints
- Selects "Dirty Coach" complaint
- Clicks "Inspect"
```

#### Step 3: Evaluation
```
Checklist: Cleanliness (10 items)

✅ Coach floors cleaned (PASS)
✅ Seats dust-free (PASS)
✅ Windows clean (PASS)
✅ Restrooms sanitized (PASS)
❌ Waste bins empty (FAIL) - Still full
✅ Bedding clean (PASS)
✅ Carpets vacuumed (PASS)
✅ Air vents cleaned (PASS)
✅ Handrails sanitized (PASS)
✅ Overall hygiene (PASS)

Score: 9/10 = 90%
Inspector Notes: "Excellent work, only waste bins need attention"
```

#### Step 4: Submit Report
```javascript
await fetch('/api/inspection/submit-report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    complaintId: complaint.id,
    checklistId: cleanlinessChecklist.id,
    inspectionResults: {
      item1: true,  // floors
      item2: true,  // seats
      item3: true,  // windows
      item4: true,  // restrooms
      item5: false, // waste bins
      item6: true,  // bedding
      item7: true,  // carpets
      item8: true,  // vents
      item9: true,  // handrails
      item10: true  // overall
    },
    overallScore: 90,
    inspectorNotes: 'Excellent work, only waste bins need attention'
  })
});
```

#### Step 5: Admin Reviews
```
- Admin logs in
- Goes to "Inspections" section
- Sees pending report (90% score)
- Reviews inspector notes
- Approves report
- Complaint automatically closed
```

#### Step 6: Notifications Sent
```
✅ User notified: "Your complaint has been verified and closed"
✅ Staff notified: "Your resolution was approved"
✅ Inspector notified: "Your inspection report was approved"
```

---

## Database Queries for Inspection Data

### View All Inspections
```sql
SELECT
  ir.id,
  c.title AS complaint_title,
  u.first_name || ' ' || u.last_name AS inspector_name,
  ir.overall_score,
  ir.status,
  ir.created_at
FROM inspection_reports ir
JOIN complaints c ON ir.complaint_id = c.id
JOIN users u ON ir.inspector_user_id = u.id
ORDER BY ir.created_at DESC;
```

### View Pending Inspections
```sql
SELECT * FROM inspection_reports
WHERE status = 'pending_admin_review'
ORDER BY created_at DESC;
```

### View Inspector Performance
```sql
SELECT
  u.first_name || ' ' || u.last_name AS inspector,
  COUNT(*) AS total_inspections,
  AVG(ir.overall_score) AS avg_score,
  SUM(CASE WHEN ir.status = 'approved' THEN 1 ELSE 0 END) AS approved,
  SUM(CASE WHEN ir.status = 'rejected' THEN 1 ELSE 0 END) AS rejected
FROM inspection_reports ir
JOIN users u ON ir.inspector_user_id = u.id
GROUP BY u.id;
```

---

## Troubleshooting

### Inspector Can't Login
**Problem**: "Invalid credentials" error

**Solution**:
```sql
-- Check if inspector exists
SELECT * FROM users WHERE email = 'inspector@railmadad.com';

-- If not found, create using SQL from "How to Add Inspector" section above
```

### Can't Submit Inspection Report
**Problem**: 403 Forbidden error

**Solution**:
1. Verify user role is 'staff':
```sql
SELECT role FROM users WHERE email = 'inspector@railmadad.com';
```

2. Check if logged in properly:
- Clear browser cookies
- Login again
- Check JWT token in browser DevTools

### Checklist Not Found
**Problem**: "Inspection checklist not found" error

**Solution**:
```sql
-- Check if checklists exist
SELECT * FROM inspection_checklists WHERE is_active = 1;

-- If empty, seed default checklists
-- Run: node scripts/seed-inspection-checklists.ts
```

---

## Summary

### Quick Facts
- **Inspector Email**: inspector@railmadad.com
- **Password**: password123
- **Role**: staff (with inspection privileges)
- **Dashboard**: http://localhost:3000/staff-dashboard
- **Checklists Available**: 6 categories, 10 items each
- **Passing Score**: 80% or higher
- **Auto-close**: Score ≥ 80% + Admin approval

### Key APIs
1. `GET /api/inspection/checklists` - Get inspection checklists
2. `POST /api/inspection/submit-report` - Submit inspection
3. `GET /api/inspection/reports` - View inspection reports
4. `POST /api/inspection/approve-report` - Admin approval (admin only)

### Complete Documentation
For detailed information, see:
- **INSPECTOR_GUIDE.md** - Full inspector system documentation
- **IMPLEMENTATION_SUMMARY.md** - Backend API details
- **QUICK_TEST_GUIDE.md** - Testing instructions

---

**Inspector system is fully operational and ready to use!** 🔍✅
