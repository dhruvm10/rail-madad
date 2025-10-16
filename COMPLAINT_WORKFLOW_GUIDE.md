# 📋 Complaint Resolution Workflow Guide

## Overview

This document describes the complete complaint resolution workflow in the Rail Madad system, clarifying the roles and responsibilities of each user type.

**Last Updated:** October 12, 2025

---

## 🎯 Workflow Summary

```
┌──────────────────────────────────────────────────────────────────┐
│                     COMPLAINT LIFECYCLE                           │
└──────────────────────────────────────────────────────────────────┘

1. PASSENGER submits complaint
         ↓
2. ADMIN reviews and assigns to STAFF
         ↓
3. STAFF works on and resolves complaint
         ↓
4. RESOLVED status visible to ADMIN, STAFF, and PASSENGER
         ↓
5. PASSENGER provides feedback (optional)
```

---

## 👥 Role-Based Permissions

### 🔷 Admin Responsibilities

**What Admin CAN Do:**
- ✅ View all complaints across the system
- ✅ **Assign complaints to staff members**
- ✅ Update complaint status (new, assigned, in_progress, escalated, rejected, closed)
- ✅ Update complaint priority (low, medium, high, critical)
- ✅ Override complaint properties with audit logging
- ✅ View staff performance metrics
- ✅ View resolved complaints and resolutions

**What Admin CANNOT Do:**
- ❌ **Mark complaints as "Resolved"** (Staff-only action)
- ❌ Resolve complaints directly

**Key Actions:**
1. **Assignment:** Admin assigns tasks to staff via "Assign to Staff" button
2. **Monitoring:** Track complaint progress and staff performance
3. **Escalation:** Escalate unresolved complaints when necessary

---

### 🔶 Staff Responsibilities

**What Staff CAN Do:**
- ✅ View complaints assigned to them
- ✅ **Resolve assigned complaints** (Primary responsibility)
- ✅ Add resolution notes
- ✅ Update complaint status to "in_progress"
- ✅ View their resolved complaints history

**What Staff CANNOT Do:**
- ❌ Assign or reassign complaints
- ❌ View complaints not assigned to them
- ❌ Resolve complaints assigned to other staff members

**Key Actions:**
1. **Work on Assignment:** Staff works on complaints assigned by admin
2. **Resolution:** Staff marks complaint as "Resolved" with resolution notes
3. **Notification:** System automatically notifies passenger and admin

---

### 🔵 Passenger Responsibilities

**What Passenger CAN Do:**
- ✅ Submit new complaints
- ✅ View their own complaints
- ✅ Track complaint status in real-time
- ✅ View resolution details when complaint is resolved
- ✅ Provide feedback on resolved complaints

**What Passenger CANNOT Do:**
- ❌ View other passengers' complaints
- ❌ Modify complaint status
- ❌ Assign complaints to staff

**Key Actions:**
1. **Submission:** Submit complaints with details and images
2. **Tracking:** Monitor complaint status and updates
3. **Feedback:** Rate and comment on resolved complaints

---

## 🔄 Detailed Workflow Steps

### Step 1: Complaint Submission (Passenger)

**Action:** Passenger submits a new complaint

**Process:**
1. Navigate to "New Complaint" page
2. Fill in complaint details:
   - Title
   - Description
   - Category (cleanliness, food_quality, staff_behavior, security, etc.)
   - Priority (optional, defaults to medium)
   - Train number, PNR, location (optional)
3. Upload images/attachments (optional)
4. Submit complaint

**Result:**
- Complaint created with status: **"new"**
- AI automatically classifies and suggests priority
- Complaint appears in Admin dashboard
- Passenger receives confirmation

---

### Step 2: Task Assignment (Admin Only)

**Action:** Admin assigns complaint to appropriate staff member

**Process:**
1. Admin logs into Admin Dashboard
2. Navigates to "Complaints" tab
3. Reviews new complaints
4. Clicks "Assign to Staff" button on complaint
5. Selects staff member from dropdown (filtered by department/category)
6. Confirms assignment

**Result:**
- Complaint status changes to: **"assigned"**
- Task assignment record created in database
- Notification sent to assigned staff member
- Notification sent to passenger (complaint assigned)
- Admin can track assignment in Performance tab

**API Used:**
```
POST /api/admin/assign-complaint
Body: {
  complaintId: string,
  assignedToUserId: string,
  taskDescription: string,
  priority: string
}
```

---

### Step 3: Complaint Resolution (Staff Only)

**Action:** Staff works on and resolves the complaint

**Process:**
1. Staff logs into Staff Dashboard
2. Views complaints assigned to them (filtered automatically)
3. Works on resolving the issue
4. Clicks "Resolve" button on complaint
5. Enters resolution notes explaining what was done
6. Submits resolution

**Result:**
- Complaint status changes to: **"resolved"**
- Timestamp recorded (resolvedAt)
- Task assignment status updated to "completed"
- Notification sent to passenger (with resolution details)
- Notification sent to admin (staff resolved complaint)
- Resolved complaint appears in:
  - Staff Dashboard (Resolved tab)
  - Admin Dashboard (visible in complaints list)
  - Passenger Dashboard (with feedback option)

**API Used:**
```
POST /api/staff/resolve-complaint
Body: {
  complaintId: string,
  resolutionNotes: string
}
```

---

### Step 4: Visibility of Resolved Complaints

**Who Can See Resolved Complaints:**

#### Admin View:
- ✅ All resolved complaints system-wide
- ✅ Resolution details and notes
- ✅ Staff member who resolved it
- ✅ Resolution timestamp
- ✅ Passenger feedback (if provided)

**Location:** Admin Dashboard → Complaints Tab (filter by status: "resolved")

#### Staff View:
- ✅ Complaints they resolved
- ✅ Their resolution notes
- ✅ Resolution timestamp
- ✅ Statistics (total resolved, resolution time)

**Location:** Staff Dashboard → Complaints Tab → Resolved section

#### Passenger View:
- ✅ Their own resolved complaints
- ✅ Resolution details
- ✅ Option to provide feedback
- ✅ Feedback submission form (rating + comment)

**Location:** Passenger Dashboard → Complaints list (status: "resolved")

---

### Step 5: Feedback Collection (Passenger - Optional)

**Action:** Passenger provides feedback on resolved complaint

**Process:**
1. Passenger views resolved complaint
2. Sees "Give Feedback" button
3. Clicks button and rates resolution (1-5 stars)
4. Enters feedback comment
5. Submits feedback

**Result:**
- Feedback stored in database
- Button changes to "Feedback Submitted" badge
- Admin can view feedback in dashboard
- Feedback included in performance metrics

**API Used:**
```
POST /api/complaints/{id}/feedback
Body: {
  rating: number (1-5),
  comment: string,
  category: string
}
```

---

## 🎨 UI Changes Summary

### Admin Dashboard (`/dashboard/admin`)

**Removed:**
- ❌ "Resolve" button for complaints
- ❌ Resolve dialog with resolution notes textarea

**Kept/Added:**
- ✅ "Assign to Staff" button (dropdown with staff selection)
- ✅ Status update dropdown (for escalations, rejections, etc.)
- ✅ "View Details" button
- ✅ Performance tracking tab showing resolution metrics

**File Modified:** `components/Admin/AdminComplaintsTable.tsx`

---

### Staff Dashboard (`/staff-dashboard`)

**Existing Features (No Changes Needed):**
- ✅ Displays only assigned complaints
- ✅ "Resolve" button for pending complaints
- ✅ Resolution notes input
- ✅ Resolved complaints history
- ✅ Statistics (total, pending, resolved)

**File:** `app/staff-dashboard/page.tsx`

---

### Passenger Dashboard (`/dashboard/passenger`)

**Existing Features (No Changes Needed):**
- ✅ View all their complaints
- ✅ Real-time status updates
- ✅ Notifications for resolved complaints
- ✅ "Give Feedback" button for resolved complaints
- ✅ Feedback submission form

**File:** `app/dashboard/passenger/page.tsx`

---

## 🔌 API Endpoints Reference

### Admin APIs

```bash
# Assign complaint to staff
POST /api/admin/assign-complaint
Authorization: Required (Admin role)
Body: {
  complaintId: string,
  assignedToUserId: string,
  taskDescription: string,
  priority: "low" | "medium" | "high" | "critical"
}

# Get assignment history
GET /api/admin/assign-complaint?complaintId={id}
Authorization: Required (Admin/Staff role)
Returns: Task assignment history

# Performance metrics
GET /api/admin/performance?timeRange=30&staffId={id}
Authorization: Required (Admin role)
Returns: Comprehensive performance data
```

---

### Staff APIs

```bash
# Mark complaint as resolved
POST /api/staff/resolve-complaint
Authorization: Required (Staff role)
Body: {
  complaintId: string,
  resolutionNotes: string
}
Validations:
- Complaint must be assigned to this staff member
- Complaint cannot already be resolved

# Get assigned complaints
GET /api/staff/resolve-complaint
Authorization: Required (Staff role)
Returns: {
  assignedComplaints: Complaint[],
  activeComplaints: Complaint[],
  resolvedComplaints: Complaint[],
  stats: { total, active, resolved }
}

# Update complaint status (in_progress/resolved)
PUT /api/staff/complaints/resolve
Authorization: Required (Staff role)
Body: {
  complaintId: string,
  status: "in_progress" | "resolved",
  message?: string,
  resolutionNotes?: string
}
```

---

### Passenger APIs

```bash
# Submit feedback on resolved complaint
POST /api/complaints/{id}/feedback
Authorization: Required (Complaint owner)
Body: {
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string,
  category: string
}

# Check feedback status
GET /api/complaints/{id}/feedback
Authorization: Required (Complaint owner)
Returns: {
  canSubmitFeedback: boolean,
  hasExistingFeedback: boolean,
  existingFeedback?: {...}
}
```

---

## 📊 Status Transitions

```
new → assigned → in_progress → resolved → closed
  ↓                  ↓
escalated        rejected
```

**Who Can Change Status:**
- **Admin:** new → assigned → in_progress → escalated → rejected → closed
- **Staff:** assigned → in_progress → resolved
- **System:** resolved → closed (after inspection/approval if applicable)

---

## 🔔 Notification System

### Notifications Sent:

#### When Complaint is Assigned:
- **To Staff:** "You have been assigned a new complaint: {title}"
- **To Passenger:** "Your complaint has been assigned to a staff member for resolution"

#### When Complaint is Resolved:
- **To Passenger:** "Your complaint '{title}' has been resolved. Please provide feedback."
- **To Admin:** "Staff member {name} has resolved complaint: {title}"

---

## 🧪 Testing Checklist

### Admin Testing:
- [ ] Login as admin
- [ ] View all complaints in Complaints tab
- [ ] Verify "Resolve" button is NOT visible
- [ ] Click "Assign to Staff" on a new complaint
- [ ] Select a staff member and confirm assignment
- [ ] Verify complaint status changes to "assigned"
- [ ] Check staff member receives notification
- [ ] View Performance tab for resolution metrics
- [ ] View resolved complaints (assigned by staff)

### Staff Testing:
- [ ] Login as staff
- [ ] Verify only assigned complaints are visible
- [ ] Click "Resolve" on an assigned complaint
- [ ] Enter resolution notes
- [ ] Submit resolution
- [ ] Verify complaint status changes to "resolved"
- [ ] Check passenger receives notification
- [ ] Verify complaint appears in Resolved section
- [ ] Attempt to resolve unassigned complaint (should fail)

### Passenger Testing:
- [ ] Login as passenger
- [ ] Submit a new complaint
- [ ] Track complaint status through lifecycle
- [ ] Receive notification when complaint is assigned
- [ ] Receive notification when complaint is resolved
- [ ] View resolved complaint in dashboard
- [ ] Click "Give Feedback" button
- [ ] Submit rating and comment
- [ ] Verify button changes to "Feedback Submitted"
- [ ] Verify feedback appears in admin dashboard

---

## 🚨 Important Notes

### Key Constraints:

1. **Staff Authorization:**
   - Staff can ONLY resolve complaints assigned to them
   - Attempting to resolve unassigned complaint returns 404 error
   - Staff cannot reassign complaints

2. **Admin Limitations:**
   - Admin cannot directly resolve complaints
   - Admin must assign to staff for resolution
   - Admin can override status for escalations/rejections

3. **Status Validation:**
   - Resolved complaints cannot be resolved again
   - Closed complaints are final (no further changes)
   - Status transitions are validated server-side

4. **Notification Guarantees:**
   - All resolution actions trigger notifications
   - Passengers always notified when status changes
   - Admin notified of all staff resolutions

---

## 📁 Files Modified

### Core Changes:
1. **`components/Admin/AdminComplaintsTable.tsx`**
   - Removed: Resolve button and dialog
   - Removed: Resolution state variables and handler
   - Removed: Unused imports (Dialog, Label, Textarea, Edit icon)
   - Kept: Assign to Staff functionality
   - Kept: Status update dropdown
   - Kept: View Details button

### Existing Files (No Changes):
2. **`app/staff-dashboard/page.tsx`** - Already implements resolve functionality
3. **`app/dashboard/passenger/page.tsx`** - Already shows resolved complaints
4. **`app/api/staff/resolve-complaint/route.ts`** - Staff resolution API
5. **`app/api/admin/assign-complaint/route.ts`** - Admin assignment API

---

## 🎓 Best Practices

### For Admins:
1. ✅ Assign complaints promptly to reduce response time
2. ✅ Match staff expertise to complaint category
3. ✅ Monitor staff workload to balance assignments
4. ✅ Review Performance tab regularly for insights
5. ✅ Escalate unresolved complaints when necessary

### For Staff:
1. ✅ Check dashboard regularly for new assignments
2. ✅ Update complaint to "in_progress" when starting work
3. ✅ Provide detailed resolution notes
4. ✅ Mark as resolved only when issue is fully addressed
5. ✅ Respond to passenger questions promptly

### For Passengers:
1. ✅ Provide detailed complaint descriptions
2. ✅ Include train number, PNR, and location when relevant
3. ✅ Upload photos/evidence if available
4. ✅ Track status regularly for updates
5. ✅ Provide honest feedback on resolutions

---

## 🔍 Troubleshooting

### "Complaint not found or not assigned to you" Error
**Cause:** Staff trying to resolve complaint not assigned to them
**Solution:** Admin must assign complaint to staff first

### Resolve button not visible (Staff)
**Cause:** Complaint already resolved or not assigned
**Solution:** Check complaint status and assignment

### Cannot assign complaint (Admin)
**Cause:** Staff member not available or invalid
**Solution:** Verify staff member exists and is active

### Feedback button not showing (Passenger)
**Cause:** Complaint not resolved or feedback already submitted
**Solution:** Wait for resolution or check if feedback was already provided

---

## 📞 Support

For technical issues or questions about the workflow:

1. Check this documentation
2. Review API endpoint documentation in route files
3. Check database schema in `db/schema.ts`
4. Review audit logs in admin dashboard
5. Contact system administrator

---

## 🎉 Summary

**The Rail Madad complaint resolution workflow ensures:**

✅ **Clear Role Separation:** Admin assigns → Staff resolves  
✅ **Full Visibility:** Resolved complaints visible to Admin, Staff, and Passenger  
✅ **Proper Authorization:** Only authorized actions allowed per role  
✅ **Audit Trail:** All actions logged and tracked  
✅ **User Notifications:** Automatic notifications at each step  
✅ **Quality Feedback:** Passengers can rate resolutions  
✅ **Performance Tracking:** Admin monitors staff performance  

This workflow ensures efficient complaint handling while maintaining proper governance and accountability.

---

**Document Version:** 1.0  
**Last Updated:** October 12, 2025  
**Status:** Production Ready ✅
