# 🔄 Rail Madad - Complaint Resolution Workflow Diagram

## Visual Workflow

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    RAIL MADAD COMPLAINT WORKFLOW                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1: COMPLAINT SUBMISSION                                        │
│  Actor: PASSENGER                                                    │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │  [Submit Complaint]
                            │  - Title, Description
                            │  - Category, Priority
                            │  - Train#, PNR, Location
                            │  - Images (optional)
                            ↓
                    ┌───────────────┐
                    │   COMPLAINT   │
                    │  Status: NEW  │
                    └───────────────┘
                            │
                            │  [Auto-Classification]
                            │  - AI categorizes
                            │  - AI suggests priority
                            │  - Department assigned
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2: TASK ASSIGNMENT                                             │
│  Actor: ADMIN                                                        │
│  Action: Assign complaint to staff member                            │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │  Admin Dashboard Actions:
                            │  ✅ View all complaints
                            │  ✅ Click "Assign to Staff"
                            │  ✅ Select staff member
                            │  ✅ Set task priority
                            │  ❌ CANNOT resolve directly
                            ↓
                    ┌───────────────┐
                    │   COMPLAINT   │
                    │ Status: ASSIGNED│
                    └───────────────┘
                            │
                            ├──────────────────┬──────────────────┐
                            │                  │                  │
                  [Notification]      [Notification]   [Task Created]
                            │                  │                  │
                    ┌───────▼────┐    ┌───────▼────┐    ┌───────▼────┐
                    │   STAFF    │    │ PASSENGER  │    │   DATABASE │
                    │  Assigned  │    │  Informed  │    │   Record   │
                    └────────────┘    └────────────┘    └────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3: COMPLAINT RESOLUTION                                        │
│  Actor: STAFF (assigned staff member only)                           │
│  Action: Resolve complaint with resolution notes                     │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │  Staff Dashboard Actions:
                            │  ✅ View assigned complaints
                            │  ✅ Update to "in_progress"
                            │  ✅ Work on resolution
                            │  ✅ Click "Resolve"
                            │  ✅ Enter resolution notes
                            │  ❌ CANNOT reassign
                            ↓
                    ┌───────────────┐
                    │   COMPLAINT   │
                    │Status: RESOLVED│
                    └───────────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
       [Timestamp]  [Notification] [Notification]
                │           │           │
        ┌───────▼────┐ ┌───▼────┐ ┌───▼────┐
        │ resolvedAt │ │PASSENGER│ │ ADMIN  │
        │  recorded  │ │Notified │ │Notified│
        └────────────┘ └─────────┘ └────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 4: VISIBILITY & TRACKING                                       │
│  All parties can view resolved complaint                             │
└─────────────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
     ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
     │   ADMIN     │ │   STAFF   │ │  PASSENGER  │
     │ Dashboard   │ │ Dashboard │ │  Dashboard  │
     └─────────────┘ └───────────┘ └─────────────┘
            │               │               │
     ✅ View all    ✅ View own    ✅ View own
     resolved       resolved       resolved
     complaints     complaints     complaints
            │               │               │
     ✅ See         ✅ See         ✅ See
     resolution     resolution     resolution
     details        notes          details
            │               │               │
     ✅ Monitor     ✅ Track       ✅ Give
     performance    history        feedback
            │               │               │
            └───────────────┼───────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 5: FEEDBACK (Optional)                                         │
│  Actor: PASSENGER                                                    │
│  Action: Rate and comment on resolution                              │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │  Passenger Actions:
                            │  ✅ Click "Give Feedback"
                            │  ✅ Rate 1-5 stars
                            │  ✅ Write comment
                            │  ✅ Submit feedback
                            ↓
                    ┌───────────────┐
                    │   FEEDBACK    │
                    │   Submitted   │
                    └───────────────┘
                            │
                            │  [Feedback stored]
                            │  [Metrics updated]
                            │  [Badge shown]
                            ↓
                    ┌───────────────┐
                    │   COMPLAINT   │
                    │  Status: CLOSED│
                    │  (if applicable)│
                    └───────────────┘
```

---

## Role Permissions Matrix

```
┏━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃     ACTION     ┃   ADMIN   ┃  STAFF   ┃  PASSENGER  ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Submit         ┃     ❌    ┃    ❌    ┃     ✅      ┃
┃ Complaint      ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Assign to      ┃     ✅    ┃    ❌    ┃     ❌      ┃
┃ Staff          ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Resolve        ┃     ❌    ┃    ✅    ┃     ❌      ┃
┃ Complaint      ┃   (NEW)   ┃ (ONLY)   ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ View All       ┃     ✅    ┃    ❌    ┃     ❌      ┃
┃ Complaints     ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ View Assigned  ┃     ✅    ┃    ✅    ┃     ❌      ┃
┃ Complaints     ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ View Own       ┃     ❌    ┃    ❌    ┃     ✅      ┃
┃ Complaints     ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ View Resolved  ┃     ✅    ┃    ✅    ┃     ✅      ┃
┃ Complaints     ┃   (ALL)   ┃  (OWN)   ┃   (OWN)     ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Give Feedback  ┃     ❌    ┃    ❌    ┃     ✅      ┃
┃                ┃           ┃          ┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ Update Status  ┃     ✅    ┃    ⚠️    ┃     ❌      ┃
┃ (Manual)       ┃           ┃ (Limited)┃             ┃
┣━━━━━━━━━━━━━━━━╋━━━━━━━━━━━╋━━━━━━━━━━╋━━━━━━━━━━━━━┫
┃ View           ┃     ✅    ┃    ✅    ┃     ❌      ┃
┃ Performance    ┃           ┃ (Own)    ┃             ┃
┗━━━━━━━━━━━━━━━━┻━━━━━━━━━━━┻━━━━━━━━━━┻━━━━━━━━━━━━━┛
```

---

## Status Transition Diagram

```
                    ┌─────────────┐
                    │     NEW     │ ← Passenger submits
                    └──────┬──────┘
                           │
                    Admin assigns
                           │
                           ↓
              ┌────────────────────────┐
              │      ASSIGNED          │
              └────────┬───────────────┘
                       │
                Staff accepts
                       │
                       ↓
              ┌────────────────────────┐
              │    IN_PROGRESS         │
              └────────┬───────────────┘
                       │
           ┌───────────┼───────────┐
           │           │           │
    Staff resolves   Admin       Admin
                   escalates   rejects
           │           │           │
           ↓           ↓           ↓
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ RESOLVED │ │ESCALATED │ │ REJECTED │
    └────┬─────┘ └──────────┘ └──────────┘
         │
    Inspection/
     Approval
         │
         ↓
    ┌──────────┐
    │  CLOSED  │ ← Final status
    └──────────┘
```

---

## API Call Sequence

```
ASSIGNMENT FLOW:
=================

Admin → POST /api/admin/assign-complaint
         ├─→ Update complaint.assignedUserId
         ├─→ Create taskAssignments record
         ├─→ Send notification to staff
         └─→ Send notification to passenger


RESOLUTION FLOW:
=================

Staff → POST /api/staff/resolve-complaint
         ├─→ Verify: complaint assigned to staff
         ├─→ Update complaint.status = "resolved"
         ├─→ Set complaint.resolvedAt timestamp
         ├─→ Update taskAssignments.status = "completed"
         ├─→ Send notification to passenger
         └─→ Send notification to admin


FEEDBACK FLOW:
==============

Passenger → POST /api/complaints/{id}/feedback
             ├─→ Verify: complaint belongs to passenger
             ├─→ Verify: complaint is resolved
             ├─→ Create userFeedback record
             ├─→ Update performance metrics
             └─→ Display "Feedback Submitted" badge
```

---

## Database Schema Relations

```
┌─────────────────┐
│   complaints    │
│─────────────────│
│ id (PK)         │◄─────┐
│ userId          │      │
│ assignedUserId  │◄──┐  │
│ status          │   │  │
│ resolvedAt      │   │  │
└─────────────────┘   │  │
                      │  │
                      │  │
┌─────────────────┐   │  │
│taskAssignments  │   │  │
│─────────────────│   │  │
│ id (PK)         │   │  │
│ complaintId (FK)├───┘  │
│ assignedToUserId│      │
│ assignedByUserId│      │
│ status          │      │
│ completedAt     │      │
└─────────────────┘      │
                         │
                         │
┌─────────────────┐      │
│ notifications   │      │
│─────────────────│      │
│ id (PK)         │      │
│ userId          │      │
│ complaintId (FK)├──────┘
│ type            │
│ message         │
│ isRead          │
└─────────────────┘
```

---

## Key Changes Summary

### Before (❌ Old Workflow):
- Admin could resolve complaints directly
- Staff role was unclear
- Resolve button in admin dashboard

### After (✅ New Workflow):
- Admin can ONLY assign tasks
- Staff MUST resolve assigned complaints
- Resolve button removed from admin dashboard
- Clear role separation
- Proper audit trail

---

## Benefits

1. **🎯 Clear Accountability**
   - Each complaint has an assigned staff member
   - Resolution responsibility is explicit
   - Audit trail shows who did what

2. **📊 Better Metrics**
   - Track staff performance accurately
   - Measure resolution times per staff
   - Identify bottlenecks and training needs

3. **🔒 Proper Authorization**
   - Staff can only resolve their assigned complaints
   - Admin cannot bypass the workflow
   - System enforces role boundaries

4. **👁️ Full Transparency**
   - All parties see resolved complaints
   - Passengers can track progress
   - Admin monitors overall performance

5. **⭐ Quality Assurance**
   - Passenger feedback on resolutions
   - Performance metrics for continuous improvement
   - Inspection workflow for critical issues

---

**Diagram Version:** 1.0  
**Last Updated:** October 12, 2025  
**Status:** Production Ready ✅
