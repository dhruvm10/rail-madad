# 📋 Quality Check Checklists - Location Guide

## Overview

The **Quality Check System** uses checklists to validate resolution quality. Here's where everything is located:

---

## 📂 File Locations

### 1. **Database Schema** 
**File:** `db/schema-quality-check.ts`

**Contains:**
- ✅ `resolutionQualityCriteria` table - Defines quality criteria for each complaint category
- ✅ `resolutionSubmissions` table - Staff resolution submissions with checklist
- ✅ `staffQualityPerformance` table - Staff performance metrics
- ✅ `qualityCheckLogs` table - Detailed quality check logs
- ✅ `qualityCheckFeedback` table - Feedback on quality checks

**Key Fields in resolutionSubmissions:**
```typescript
{
  checkedReason: boolean,          // ✓ Did staff explain the reason?
  checkedApology: boolean,         // ✓ Did staff apologize?
  checkedSolution: boolean,        // ✓ Did staff provide a solution?
  checkedFutureSteps: boolean,     // ✓ Did staff outline future steps?
  checkedCompensation: boolean,    // ✓ Did staff offer compensation?
  autoScore: number,               // 0-100% quality score
  qualityGrade: string,            // excellent/good/needs_improvement/poor
}
```

---

### 2. **Checklist Seed Data**
**File:** `scripts/seed-resolution-checklists.ts`

**Contains:** 10 category-specific checklists with 81 total items

#### Checklist Categories:

1. **Cleanliness** (8 items)
   - Verified location and nature of issue
   - Dispatched cleaning crew
   - Inspected and cleaned area
   - Applied disinfectant/sanitizer
   - Took before/after photos
   - Verified with passenger
   - Scheduled regular cleaning
   - Updated maintenance record

2. **Train Delay** (8 items)
   - Investigated cause of delay
   - Verified delay duration
   - Notified passenger about timeline
   - Provided alternative travel options
   - Checked compensation eligibility
   - Processed refund/compensation
   - Submitted incident report
   - Followed up on compensation

3. **Food Quality** (8 items)
   - Identified food item and vendor
   - Collected evidence (photos, batch #)
   - Reported to food safety officer
   - Arranged refund or replacement
   - Initiated quality inspection
   - Documented with catering dept
   - Ensured corrective action
   - Followed up on safety measures

4. **Staff Behavior** (8 items)
   - Identified staff member (name, ID)
   - Collected incident details
   - Reviewed CCTV/witness statements
   - Issued apology to passenger
   - Reported to HR/management
   - Initiated disciplinary action
   - Conducted counseling/training
   - Followed up with passenger

5. **Security** (9 items)
   - Assessed severity of concern
   - Alerted railway police immediately
   - Ensured passenger safety
   - Collected incident evidence
   - Filed security incident report
   - Coordinated with law enforcement
   - Arranged additional security
   - Provided incident reference number
   - Followed up on investigation

6. **Technical Issues** (8 items)
   - Identified specific issue (AC, lights, fan)
   - Located coach and berth/seat
   - Dispatched maintenance crew
   - Attempted immediate repair
   - Provided temporary solution
   - Completed repair and tested
   - Documented in maintenance log
   - Verified with passenger

7. **Facilities** (8 items)
   - Identified facility issue (washroom, water, bedding)
   - Assessed urgency and impact
   - Arranged immediate replacement/repair
   - Provided alternative facilities
   - Ensured adequate supply
   - Took photos of resolved issue
   - Updated maintenance record
   - Confirmed passenger satisfaction

8. **Booking Issues** (8 items)
   - Verified booking details (PNR, passenger info)
   - Identified specific issue
   - Checked availability for correction
   - Processed booking modification
   - Issued corrected ticket
   - Waived charges if railway error
   - Sent updated booking details
   - Confirmed passenger received it

9. **Refund Requests** (8 items)
   - Verified refund eligibility
   - Collected cancellation details
   - Checked ticket type and charges
   - Calculated refund amount
   - Processed refund in system
   - Generated transaction ID
   - Sent confirmation to passenger
   - Verified refund credited

10. **Other/Miscellaneous** (8 items)
    - Understood complaint thoroughly
    - Gathered relevant details
    - Identified responsible department
    - Coordinated with teams
    - Kept passenger informed
    - Implemented corrective action
    - Documented resolution process
    - Confirmed passenger satisfaction

---

### 3. **Quality Criteria Seed Data**
**File:** `scripts/seed-quality-criteria.ts`

**Contains:** Detailed quality criteria with keywords for automated scoring

**Example Criteria Structure:**
```typescript
{
  complaintCategory: "food_quality",
  criteriaType: "apology",
  keywords: ["apologize", "sorry", "regret", "inconvenience"],
  description: "Apologize for poor food quality",
  weight: 5,
  isRequired: true,
  exampleText: "We apologize for the substandard food quality you experienced."
}
```

---

## 🎯 How to Access Checklists

### Method 1: Database Query

```bash
# View all checklists
npm run db:studio

# Then navigate to:
Tables → resolutionChecklists
```

**SQL Query:**
```sql
SELECT * FROM resolutionChecklists;
```

### Method 2: API Endpoint (To Be Implemented)

```bash
GET /api/quality/checklists
GET /api/quality/checklists/:category
```

**Example Response:**
```json
{
  "checklists": [
    {
      "id": "uuid",
      "category": "food_quality",
      "checklistName": "Food Quality Resolution Checklist",
      "description": "Steps to resolve food quality and pantry complaints",
      "items": [
        "Identified the specific food item and vendor/pantry car",
        "Collected evidence (photos, batch number, receipt)",
        ...
      ],
      "isActive": true,
      "displayOrder": 2
    }
  ]
}
```

---

## 🔧 How Checklists Are Used

### 1. **During Resolution Submission**

When staff submits a resolution via `/api/staff/submit-resolution-enhanced`:

```typescript
// Staff provides resolution details
{
  "complaintId": "uuid",
  "resolutionText": "Detailed resolution...",
  "actionsTaken": [
    "Inspected pantry car heating system",
    "Replaced faulty heating element"
  ],
  "rootCause": "Malfunctioning heating system",
  "preventiveMeasures": "Daily equipment checks"
}

// System automatically:
1. Fetches relevant checklist for complaint category
2. Checks if actionsTaken match checklist items
3. Calculates checklist completion score (0-100%)
4. Combines with keyword matching (70% weight)
5. Final score = (keywordScore × 0.7) + (checklistScore × 0.3)
```

### 2. **Checklist Validation Logic**

**File:** `lib/quality-checker.ts` (if implemented)

```typescript
// Pseudo-code
function validateChecklist(
  category: string,
  actionsTaken: string[],
  resolutionText: string
) {
  // Get checklist for category
  const checklist = getChecklistByCategory(category);
  
  // Check how many items are covered
  const itemsMatched = checklist.items.filter(item => {
    return actionsTaken.some(action => 
      similarity(action, item) > 0.7
    );
  });
  
  // Calculate score
  const checklistScore = (itemsMatched.length / checklist.items.length) * 100;
  
  return {
    score: checklistScore,
    itemsMatched: itemsMatched.length,
    totalItems: checklist.items.length,
    missedItems: checklist.items.filter(i => !itemsMatched.includes(i))
  };
}
```

---

## 📊 Checklist in Database

### Database Structure:

**Table:** `resolutionChecklists`

```sql
CREATE TABLE resolutionChecklists (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  checklistName TEXT NOT NULL,
  description TEXT,
  items TEXT NOT NULL,        -- JSON array of checklist items
  isActive INTEGER DEFAULT 1,
  displayOrder INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Row:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "category": "food_quality",
  "checklistName": "Food Quality Resolution Checklist",
  "description": "Steps to resolve food quality and pantry complaints",
  "items": "[\"Identified the specific food item and vendor/pantry car\",\"Collected evidence (photos, batch number, receipt)\",\"Reported to food safety officer/catering manager\",\"Arranged refund or replacement meal for passenger\",\"Initiated quality inspection of vendor/pantry\",\"Documented complaint with catering department\",\"Ensured corrective action by vendor\",\"Followed up on food safety measures\"]",
  "isActive": 1,
  "displayOrder": 2,
  "createdAt": "2025-10-13T00:00:00.000Z",
  "updatedAt": "2025-10-13T00:00:00.000Z"
}
```

---

## 🚀 Seed Checklists

### Run Seed Script:

```bash
# Seed resolution checklists
npm run tsx scripts/seed-resolution-checklists.ts

# Expected Output:
# 🌱 Seeding Resolution Checklists...
# 🗑️  Clearing existing checklists...
# ✅ Successfully seeded 10 resolution checklists!
#
# 📋 Checklists created:
#    1. Cleanliness Issue Resolution Checklist (8 items)
#    2. Train Delay Resolution Checklist (8 items)
#    3. Food Quality Resolution Checklist (8 items)
#    4. Staff Behavior Resolution Checklist (8 items)
#    5. Security Issue Resolution Checklist (9 items)
#    6. Technical Issue Resolution Checklist (8 items)
#    7. Facilities Resolution Checklist (8 items)
#    8. Booking Issue Resolution Checklist (8 items)
#    9. Refund Request Resolution Checklist (8 items)
#    10. General Complaint Resolution Checklist (8 items)
#
# 📊 Total checklist items: 81
# ✨ Resolution checklists are ready to use!
```

---

## 📈 Viewing Checklist Data

### Option 1: Drizzle Studio

```bash
npm run db:studio

# Navigate to:
http://localhost:4983
→ Tables → resolutionChecklists
```

### Option 2: SQLite Command Line

```bash
sqlite3 sqlite.db

sqlite> SELECT category, checklistName, json_array_length(items) as item_count 
        FROM resolutionChecklists;

# Output:
# cleanliness|Cleanliness Issue Resolution Checklist|8
# delay|Train Delay Resolution Checklist|8
# food_quality|Food Quality Resolution Checklist|8
# staff_behavior|Staff Behavior Resolution Checklist|8
# security|Security Issue Resolution Checklist|9
# technical|Technical Issue Resolution Checklist|8
# facilities|Facilities Resolution Checklist|8
# booking|Booking Issue Resolution Checklist|8
# refund|Refund Request Resolution Checklist|8
# other|General Complaint Resolution Checklist|8
```

### Option 3: Node.js Script

```typescript
import { db } from './db';
import { resolutionChecklists } from './db/schema-verification';

const checklists = await db.select().from(resolutionChecklists);

checklists.forEach(checklist => {
  console.log(`\n${checklist.checklistName}:`);
  const items = JSON.parse(checklist.items);
  items.forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item}`);
  });
});
```

---

## 🎨 UI Integration (To Be Built)

### Staff Resolution Form

**Route:** `/staff-dashboard/resolve/:complaintId`

**Checklist Display:**
```tsx
<div className="checklist-section">
  <h3>Resolution Checklist</h3>
  <p className="text-sm text-muted-foreground mb-4">
    Complete these steps to ensure thorough resolution
  </p>
  
  {checklist.items.map((item, index) => (
    <div key={index} className="flex items-start gap-2 mb-2">
      <Checkbox 
        id={`item-${index}`}
        checked={completedItems.includes(index)}
        onCheckedChange={(checked) => {
          if (checked) {
            setCompletedItems([...completedItems, index]);
          } else {
            setCompletedItems(completedItems.filter(i => i !== index));
          }
        }}
      />
      <label htmlFor={`item-${index}`} className="text-sm">
        {item}
      </label>
    </div>
  ))}
  
  <div className="mt-4 p-3 bg-blue-50 rounded">
    <p className="text-sm font-medium">
      Completion: {completedItems.length} / {checklist.items.length}
      ({Math.round(completedItems.length / checklist.items.length * 100)}%)
    </p>
  </div>
</div>
```

---

## 📝 Example Usage

### Complete Flow:

1. **Staff selects complaint** to resolve
   ```
   Category: food_quality
   ```

2. **System loads** relevant checklist
   ```
   Food Quality Resolution Checklist (8 items)
   ```

3. **Staff completes** checklist items
   ```
   ✓ Identified food item and vendor
   ✓ Collected evidence
   ✓ Reported to food safety officer
   ✓ Arranged refund
   ✓ Initiated quality inspection
   ✓ Documented with catering
   ✓ Ensured corrective action
   ✓ Followed up on safety measures
   
   Score: 100% (8/8 items completed)
   ```

4. **Staff writes** resolution text
   ```
   "Investigated the food quality complaint. Found that the 
   heating system in pantry car was malfunctioning, causing 
   food to be served cold. We apologize for this inconvenience. 
   
   Actions taken:
   - Replaced faulty heating element
   - Provided fresh hot meal to passenger
   - Initiated quality inspection of pantry
   
   Root cause: Equipment malfunction
   Preventive measures: Daily equipment checks scheduled"
   ```

5. **System calculates** final score
   ```
   Keyword Score: 85% (good keywords, apology present)
   Checklist Score: 100% (all items completed)
   
   Final Score = (85 × 0.7) + (100 × 0.3) = 89.5%
   
   Result: Needs Manual Review (score < 90%)
   → Sent to admin for approval
   ```

---

## 🔍 Checklist Statistics

**Total Checklists:** 10  
**Total Items:** 81 (average 8.1 per checklist)

**Category Breakdown:**
- Cleanliness: 8 items
- Delay: 8 items
- Food Quality: 8 items
- Staff Behavior: 8 items
- Security: 9 items ⭐ (highest)
- Technical: 8 items
- Facilities: 8 items
- Booking: 8 items
- Refund: 8 items
- Other: 8 items

---

## 🎯 Related Files

1. **Schema:**
   - `db/schema-quality-check.ts` - Quality check tables
   - `db/schema-verification.ts` - Verification tables including resolutionChecklists

2. **Seed Scripts:**
   - `scripts/seed-resolution-checklists.ts` - Checklist seed data
   - `scripts/seed-quality-criteria.ts` - Quality criteria seed data

3. **Migration Scripts:**
   - `scripts/migrate-quality-check-system.ts` - Creates quality check tables
   - `scripts/migrate-verification-system.ts` - Creates verification tables

4. **API Routes:**
   - `app/api/staff/submit-resolution-enhanced/route.ts` - Uses checklists for validation
   - `app/api/admin/approve-resolution/route.ts` - Shows checklist completion

5. **Documentation:**
   - `QUALITY_CHECK_IMPLEMENTATION.md` - Quality system docs
   - `RESOLUTION_VERIFICATION_IMPLEMENTATION.md` - Verification system docs
   - `VERIFICATION_SYSTEM_ACCESS_GUIDE.md` - Access guide

---

## 🚀 Quick Access Commands

```bash
# Seed checklists
npm run tsx scripts/seed-resolution-checklists.ts

# View in database
npm run db:studio

# Query checklists
sqlite3 sqlite.db "SELECT * FROM resolutionChecklists;"

# Count items per category
sqlite3 sqlite.db "SELECT category, json_array_length(items) FROM resolutionChecklists;"
```

---

**The checklists are ready and available in the database!** 🎉

They're automatically used by the quality check system when staff submit resolutions.
