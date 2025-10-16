# 🔐 Resolution Verification System - Access Guide

## Overview

The **Resolution Verification & Validation System** prevents fake resolutions by requiring staff to provide detailed proof of work, which then goes through automated detection, admin approval, and user confirmation.

---

## 🎯 System Components

### 1. **Staff Resolution Submission** (Enhanced API)
### 2. **Fake Resolution Detection** (Automated)
### 3. **Admin Approval System** (Manual Review)
### 4. **User Confirmation** (Final Validation)
### 5. **Time Tracking & Analytics**

---

## 📍 How to Access Each Component

### 🔷 1. Staff: Submit Resolution with Verification

**Endpoint:** `POST /api/staff/submit-resolution-enhanced`

**Who can access:** Staff members only (role: 'staff')

**When to use:** When resolving a complaint assigned to you

**Required Fields:**
```json
{
  "complaintId": "complaint-uuid",
  "resolutionText": "Detailed resolution description (min 50 characters)",
  "actionsTaken": [
    "Inspected food service area",
    "Spoke with catering manager",
    "Replaced contaminated food items"
  ],
  "rootCause": "Food storage temperature not maintained",
  "preventiveMeasures": "Installed temperature monitoring system",
  "evidence": [
    {
      "type": "photo",
      "description": "Photo of new temperature monitor",
      "url": "/uploads/evidence/photo1.jpg"
    },
    {
      "type": "document",
      "description": "Inspection report",
      "url": "/uploads/evidence/report.pdf"
    }
  ],
  "workDurationMinutes": 45,
  "verification": {
    "locationVerified": true,
    "witnessName": "John Doe (Manager)",
    "witnessContact": "+91-9876543210"
  }
}
```

**How to test:**

1. **Login as staff:**
   ```
   Email: staff1@railmadad.com
   Password: Password123!
   ```

2. **Get assigned complaint ID** from staff dashboard or API:
   ```
   GET /api/staff/complaints/resolve
   ```

3. **Submit resolution using Postman/Thunder Client:**
   ```bash
   POST http://localhost:3000/api/staff/submit-resolution-enhanced
   Content-Type: application/json
   
   {
     "complaintId": "your-complaint-id",
     "resolutionText": "Detailed explanation...",
     "actionsTaken": ["Action 1", "Action 2"],
     "rootCause": "Root cause analysis",
     "preventiveMeasures": "Prevention steps",
     "evidence": [...],
     "workDurationMinutes": 30
   }
   ```

**What happens:**
- ✅ Automated fake detection runs (checks for generic text, suspicious patterns)
- ✅ Quality check runs (keyword matching + checklist validation)
- ✅ If score ≥ 90% and not suspicious → Auto-approved ✨
- ⚠️ If score 60-89% or suspicious → Requires admin approval
- ❌ If score < 60% → Rejected for rework

---

### 🔷 2. Admin: Review Pending Resolutions

**Endpoint:** `GET /api/admin/approve-resolution`

**Who can access:** Admin only (role: 'admin')

**When to use:** Review resolutions that require manual approval

**How to test:**

1. **Login as admin:**
   ```
   Email: admin@railmadad.com
   Password: Password123!
   ```

2. **View pending resolutions:**
   ```bash
   GET http://localhost:3000/api/admin/approve-resolution
   ```

   **Response includes:**
   ```json
   {
     "complaints": [
       {
         "id": "complaint-id",
         "title": "Food Quality Issue",
         "status": "pending_admin_approval",
         "qualityScore": 75,
         "verificationScore": 82,
         "suspicionScore": 15,
         "workEvidence": [...],
         "qualityChecks": [...],
         "activityTimeline": [...]
       }
     ],
     "summary": {
       "totalPending": 5,
       "highPriority": 2,
       "averageVerificationScore": 78.5
     }
   }
   ```

3. **Approve a resolution:**
   ```bash
   POST http://localhost:3000/api/admin/approve-resolution
   Content-Type: application/json
   
   {
     "complaintId": "complaint-id",
     "decision": "approve",
     "adminNotes": "Resolution verified - actions taken are appropriate"
   }
   ```

4. **Reject a resolution:**
   ```bash
   POST http://localhost:3000/api/admin/approve-resolution
   Content-Type: application/json
   
   {
     "complaintId": "complaint-id",
     "decision": "reject",
     "adminNotes": "Insufficient evidence provided",
     "rejectionReason": "Requires photo evidence of completed work"
   }
   ```

**Admin Dashboard Integration:**
- Navigate to: `http://localhost:3000/admin`
- Look for **"Pending Resolutions"** section
- Click on any resolution to view details
- Approve/Reject with comments

---

### 🔷 3. Passenger: Confirm Resolution

**Endpoint:** `POST /api/user/confirm-resolution`

**Who can access:** Passengers (complaint owners)

**When to use:** After admin approves and complaint is marked "resolved"

**How to test:**

1. **Login as passenger (complaint owner):**
   ```
   Email: dakshgurjar@gmail.com
   Password: Password123!
   ```

2. **Confirm resolution:**
   ```bash
   POST http://localhost:3000/api/user/confirm-resolution
   Content-Type: application/json
   
   {
     "complaintId": "your-complaint-id",
     "isConfirmed": true,
     "satisfactionRating": 4,
     "feedback": "Problem was resolved quickly and professionally"
   }
   ```

3. **Dispute resolution:**
   ```bash
   POST http://localhost:3000/api/user/confirm-resolution
   Content-Type: application/json
   
   {
     "complaintId": "your-complaint-id",
     "isConfirmed": false,
     "satisfactionRating": 2,
     "feedback": "Issue still not resolved",
     "disputeReason": "The problem persists"
   }
   ```

**What happens after confirmation:**
- ✅ Complaint marked as "closed" with user verification
- 📊 Staff performance metrics updated
- 🎯 Quality score affects future auto-approval thresholds
- ⚠️ Disputes trigger admin investigation

---

## 🔍 Fake Detection System

### Automatic Checks Performed:

1. **Generic Text Detection**
   - Flags resolutions with >40% generic/template phrases
   - Examples: "issue resolved", "taken care of", "fixed properly"

2. **Copy-Paste Detection**
   - Checks for identical resolutions across multiple complaints
   - Flags if >80% similar to previous resolutions

3. **Time Verification**
   - Flags if workDurationMinutes < 5 minutes
   - Checks if resolution submitted immediately after complaint

4. **Evidence Verification**
   - Requires at least 1 evidence item for high-priority complaints
   - Validates evidence URLs and descriptions

5. **Description Quality**
   - Checks minimum length (50 characters)
   - Ensures actionsTaken array is not empty
   - Validates rootCause is provided

### Suspicion Score Calculation:

- **0-30%**: Low suspicion ✅ (Likely genuine)
- **31-69%**: Medium suspicion ⚠️ (Requires review)
- **70-100%**: High suspicion 🚨 (Likely fake)

**Formula:**
```
suspicionScore = 
  (genericTextScore × 0.3) +
  (copyPasteScore × 0.25) +
  (timeAnomalyScore × 0.2) +
  (evidenceScore × 0.15) +
  (descriptionQualityScore × 0.1)
```

---

## 📊 Database Tables

### Verification System Tables:

1. **`work_evidence`** - Stores proof of work submitted by staff
2. **`admin_approval_logs`** - Tracks admin decisions
3. **`user_confirmations`** - Stores passenger feedback
4. **`complaint_activity_timeline`** - Complete audit trail
5. **`fake_resolution_detection`** - Automated detection results
6. **`staff_performance_metrics`** - Performance tracking
7. **`resolution_time_tracking`** - Time spent per stage

### Quality Check Tables:

1. **`quality_checklists`** - Resolution quality checklists
2. **`quality_checklist_items`** - Individual checklist items
3. **`quality_check_results`** - Automated quality scores
4. **`quality_check_validations`** - Item-level validation results
5. **`manual_quality_reviews`** - Admin quality reviews

---

## 🧪 Testing Workflow

### Complete End-to-End Test:

#### Step 1: Create a Complaint (Passenger)
```bash
# Login as passenger
POST /api/auth/login
{
  "email": "dakshgurjar@gmail.com",
  "password": "Password123!"
}

# Create complaint
POST /api/complaints/submit
{
  "title": "Poor Food Quality in Train",
  "description": "Food served was cold and stale",
  "category": "food_quality",
  "trainNumber": "12345",
  "pnr": "1234567890"
}
```

#### Step 2: Assign to Staff (Admin)
```bash
# Login as admin
POST /api/auth/login
{
  "email": "admin@railmadad.com",
  "password": "Password123!"
}

# Assign complaint
POST /api/admin/assign-complaint
{
  "complaintId": "complaint-id",
  "staffId": "staff-user-id"
}
```

#### Step 3: Submit Resolution (Staff)
```bash
# Login as staff
POST /api/auth/login
{
  "email": "staff1@railmadad.com",
  "password": "Password123!"
}

# Submit enhanced resolution
POST /api/staff/submit-resolution-enhanced
{
  "complaintId": "complaint-id",
  "resolutionText": "Investigated the food quality issue. Found that the heating system in the pantry car was malfunctioning...",
  "actionsTaken": [
    "Inspected pantry car heating system",
    "Coordinated with catering supervisor",
    "Replaced faulty heating element",
    "Provided fresh hot meal to passenger"
  ],
  "rootCause": "Malfunctioning heating system in pantry car",
  "preventiveMeasures": "Scheduled daily equipment checks",
  "evidence": [
    {
      "type": "photo",
      "description": "Photo of repaired heating system",
      "url": "/uploads/heating-repair.jpg"
    }
  ],
  "workDurationMinutes": 45,
  "verification": {
    "locationVerified": true,
    "witnessName": "Pantry Manager",
    "witnessContact": "+91-9876543210"
  }
}
```

#### Step 4: Review Resolution (Admin)
```bash
# View pending resolutions
GET /api/admin/approve-resolution

# Approve resolution
POST /api/admin/approve-resolution
{
  "complaintId": "complaint-id",
  "decision": "approve",
  "adminNotes": "Well documented resolution with proper evidence"
}
```

#### Step 5: Confirm Resolution (Passenger)
```bash
# Login as passenger
POST /api/auth/login
{
  "email": "dakshgurjar@gmail.com",
  "password": "Password123!"
}

# Confirm resolution
POST /api/user/confirm-resolution
{
  "complaintId": "complaint-id",
  "isConfirmed": true,
  "satisfactionRating": 5,
  "feedback": "Excellent resolution! Staff was very professional"
}
```

---

## 🎨 UI Integration Points

### Staff Dashboard Enhancement:
Create a resolution submission form at `/staff-dashboard/resolve/:complaintId` with:
- Rich text editor for resolution description
- Action items checklist
- File upload for evidence (photos/documents)
- Duration tracker
- Witness information fields

### Admin Dashboard Enhancement:
Create approval interface at `/admin/pending-resolutions` with:
- List of pending resolutions
- Verification score indicators
- Evidence preview
- Approve/Reject buttons
- Comments/feedback section

### Passenger Dashboard Enhancement:
Add confirmation section at `/dashboard/passenger` for:
- Resolved complaints awaiting confirmation
- Star rating component
- Feedback textarea
- Confirm/Dispute buttons

---

## 📈 Performance Metrics

### Track Staff Performance:
```sql
SELECT 
  staff_id,
  AVG(quality_score) as avg_quality,
  AVG(admin_approval_rate) as approval_rate,
  AVG(user_satisfaction_rating) as avg_satisfaction,
  COUNT(CASE WHEN fake_detected = 1 THEN 1 END) as fake_attempts
FROM staff_performance_metrics
GROUP BY staff_id;
```

### Monitor System Health:
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_resolutions,
  COUNT(CASE WHEN status = 'auto_approved' THEN 1 END) as auto_approved,
  COUNT(CASE WHEN status = 'admin_approved' THEN 1 END) as admin_approved,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
  AVG(suspicion_score) as avg_suspicion
FROM quality_check_results
GROUP BY DATE(created_at);
```

---

## 🔐 Security Features

1. **Role-based Access Control**
   - Staff can only submit resolutions for assigned complaints
   - Admin required for approval/rejection
   - Passengers can only confirm their own complaints

2. **Audit Trail**
   - Every action logged in `complaint_activity_timeline`
   - Timestamps and actor information recorded
   - Immutable history for compliance

3. **Data Validation**
   - Zod schema validation on all inputs
   - Minimum length requirements
   - Required fields enforcement

4. **Rate Limiting** (Recommended)
   - Limit resolution submissions per staff per hour
   - Prevent bulk fake resolution attempts

---

## 🚀 Quick Start Commands

### View all verification tables:
```bash
npm run db:studio
# Then navigate to verification tables
```

### Check system status:
```bash
# View recent activity
GET /api/admin/approve-resolution

# Check staff performance
GET /api/staff/quality-performance
```

### Test fake detection:
```bash
# Submit a suspicious resolution
POST /api/staff/submit-resolution-enhanced
{
  "complaintId": "test-id",
  "resolutionText": "Issue resolved. All good now.",  # Generic text
  "actionsTaken": ["Fixed it"],  # Too simple
  "workDurationMinutes": 2,  # Too fast
  "evidence": []  # No evidence
}
# Result: High suspicion score, requires admin approval
```

---

## 📚 Related Documentation

- **Quality Check System:** See `QUALITY_CHECK_IMPLEMENTATION.md`
- **Verification System:** See `RESOLUTION_VERIFICATION_IMPLEMENTATION.md`
- **API Documentation:** See API route files in `app/api/`
- **Database Schema:** See `db/schema-verification.ts` and `db/schema-quality.ts`

---

## 🐛 Troubleshooting

### Issue: "Complaint not found"
- Ensure complaint exists and is assigned to you
- Check complaint status (must be 'assigned' or 'in_progress')

### Issue: "Unauthorized access"
- Verify you're logged in with correct role
- Check JWT token is valid
- Ensure role matches endpoint requirements

### Issue: "High suspicion score"
- Provide detailed resolution text (min 50 chars)
- Include specific actionsTaken items
- Upload evidence files
- Increase workDurationMinutes to realistic value
- Avoid generic phrases like "fixed", "resolved", "taken care of"

### Issue: "Quality check failed"
- Ensure resolution matches complaint category
- Include category-specific keywords
- Complete all checklist items
- Provide root cause analysis

---

## ✅ Best Practices

1. **Always provide detailed resolutions** - Minimum 100+ characters
2. **Include evidence** - Photos, documents, witness statements
3. **Be specific** - Avoid generic phrases
4. **Track time accurately** - Log realistic work durations
5. **Get witnesses** - Include witness name and contact when possible
6. **Follow up** - Document preventive measures taken

---

## 🎯 Success Metrics

A good resolution submission should have:
- ✅ Quality Score: ≥ 90% (auto-approved)
- ✅ Suspicion Score: < 30% (low risk)
- ✅ Admin Approval Rate: ≥ 90%
- ✅ User Satisfaction: ≥ 4.0/5.0
- ✅ Resolution Time: < 48 hours

---

**Need Help?** Contact the development team or check the detailed implementation docs!
