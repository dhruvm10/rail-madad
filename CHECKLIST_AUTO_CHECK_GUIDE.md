# ✅ Safe Checklist Auto-Check Guide

## What This Script Does

The `check-and-add-checklists.ts` script is a **safe, non-destructive** tool that:

✅ **Checks** if the `resolutionChecklists` table exists  
✅ **Creates** the table only if it's missing  
✅ **Detects** which checklists are already in your database  
✅ **Adds** only the missing checklists  
✅ **Preserves** all existing data (doesn't delete or modify anything)  

---

## 🚀 How to Use

### Simple Command:

```bash
npm run db:check-checklists
```

---

## 📊 What It Does Step-by-Step

### Step 1: Check Table Existence
```
📋 Checking if resolutionChecklists table exists...
✅ Table exists!  (or creates it if missing)
```

### Step 2: Check Existing Data
```
📋 Checking for existing checklists...
   Found 5 existing checklists
   Existing categories: cleanliness, delay, food_quality, staff_behavior, security
```

### Step 3: Add Missing Items
```
📋 Adding 5 missing checklists...
   ✅ Added: Technical Issue Resolution Checklist (8 items)
   ✅ Added: Facilities Resolution Checklist (8 items)
   ✅ Added: Booking Issue Resolution Checklist (8 items)
   ✅ Added: Refund Request Resolution Checklist (8 items)
   ✅ Added: General Complaint Resolution Checklist (8 items)
```

### Step 4: Verify & Summary
```
✅ SUCCESS! Checklists are now complete.

📊 Final Summary:
   Total checklists: 10
   Previously existing: 5
   Newly added: 5

📋 All Checklists:
   ✓ 1. Cleanliness Issue Resolution Checklist (cleanliness)
   ✓ 2. Train Delay Resolution Checklist (delay)
   ✓ 3. Food Quality Resolution Checklist (food_quality)
   ✓ 4. Staff Behavior Resolution Checklist (staff_behavior)
   ✓ 5. Security Issue Resolution Checklist (security)
   🆕 6. Technical Issue Resolution Checklist (technical)
   🆕 7. Facilities Resolution Checklist (facilities)
   🆕 8. Booking Issue Resolution Checklist (booking)
   🆕 9. Refund Request Resolution Checklist (refund)
   🆕 10. General Complaint Resolution Checklist (other)

📊 Total checklist items: 81
✨ Your database is ready with all required checklists!
```

---

## 🎯 Use Cases

### Scenario 1: No Checklists Yet
```bash
npm run db:check-checklists

# Output:
# ⚠️  Table doesn't exist. Creating resolutionChecklists table...
# ✅ Table created successfully!
# 📋 Adding 10 missing checklists...
# ✅ All 10 checklists added!
```

### Scenario 2: Some Checklists Exist
```bash
npm run db:check-checklists

# Output:
# ✅ Table exists!
# Found 5 existing checklists
# 📋 Adding 5 missing checklists...
# ✅ Now you have all 10 checklists!
```

### Scenario 3: All Checklists Present
```bash
npm run db:check-checklists

# Output:
# ✅ Table exists!
# Found 10 existing checklists
# ✨ All checklists are already present! Nothing to add.
```

---

## 🛡️ Safety Features

### 1. **Non-Destructive**
- ❌ Does NOT delete existing data
- ❌ Does NOT modify existing checklists
- ❌ Does NOT touch other tables
- ✅ Only adds what's missing

### 2. **Idempotent**
- Safe to run multiple times
- Won't create duplicates
- Checks before adding

### 3. **Smart Detection**
- Detects if table exists
- Identifies existing categories
- Only fills gaps

### 4. **Detailed Logging**
- Shows what it's doing at each step
- Clear success/error messages
- Easy to understand output

---

## 📋 Checklists Added

### Complete List (10 Categories, 81 Items):

1. **Cleanliness** (8 items)
   - Verify location, dispatch crew, clean area, take photos, schedule regular cleaning

2. **Train Delay** (8 items)
   - Investigate cause, notify passenger, provide alternatives, process compensation

3. **Food Quality** (8 items)
   - Identify item/vendor, collect evidence, report to officer, arrange replacement

4. **Staff Behavior** (8 items)
   - Identify staff, collect details, review CCTV, issue apology, disciplinary action

5. **Security** (9 items)
   - Assess severity, alert police, ensure safety, file report, coordinate with law enforcement

6. **Technical Issues** (8 items)
   - Identify issue (AC/lights/fan), dispatch crew, repair, test, verify with passenger

7. **Facilities** (8 items)
   - Identify facility issue, assess urgency, arrange repair, provide alternatives

8. **Booking Issues** (8 items)
   - Verify booking, identify issue, process modification, issue corrected ticket

9. **Refund Requests** (8 items)
   - Verify eligibility, check charges, calculate amount, process refund, confirm credit

10. **Other/General** (8 items)
    - Understand complaint, gather details, coordinate teams, implement action

---

## 🔧 Troubleshooting

### Error: "no such table"
```
❌ Error: no such table: resolutionChecklists

💡 Solution: Run migration first:
npm run db:migrate:verification
```

Then run the check script:
```bash
npm run db:check-checklists
```

### Error: "UNIQUE constraint"
```
❌ Error: UNIQUE constraint failed

💡 This means some checklists already exist.
The script should handle this automatically.
If it doesn't, you can:
1. Check existing checklists: npm run db:studio
2. Clear and re-seed: npm run db:seed-resolution-checklists
```

### Error: "database is locked"
```
❌ Error: database is locked

💡 Solution:
1. Stop the dev server: Ctrl+C
2. Close Drizzle Studio if open
3. Run the script again
```

---

## 🎯 Integration with Quality System

These checklists are automatically used by:

### 1. Quality Check System
**File:** `app/api/staff/submit-resolution-enhanced/route.ts`

When staff submits a resolution:
```typescript
// System fetches relevant checklist
const checklist = getChecklistByCategory(complaint.category);

// Matches staff's actions against checklist
const checklistScore = validateActions(
  staff.actionsTaken,
  checklist.items
);

// Combines with keyword score
finalScore = (keywordScore × 0.7) + (checklistScore × 0.3);
```

### 2. Admin Approval Interface
**Route:** `/admin/pending-resolutions`

Shows checklist completion:
```
Checklist Completion: 7/8 items (87.5%)
✓ Identified food item and vendor
✓ Collected evidence
✓ Reported to food safety officer
✓ Arranged refund
✓ Initiated quality inspection
✓ Documented with catering
✓ Ensured corrective action
✗ Followed up on safety measures  ← Missing
```

### 3. Staff Performance Metrics
Tracks how well staff complete checklists over time.

---

## 📈 Verification

After running the script, verify checklists exist:

### Option 1: Database Studio
```bash
npm run db:studio
# Navigate to: Tables → resolutionChecklists
```

### Option 2: SQLite Command
```bash
sqlite3 sqlite.db "SELECT category, checklistName FROM resolutionChecklists;"
```

### Option 3: Count Check
```bash
sqlite3 sqlite.db "SELECT COUNT(*) as total FROM resolutionChecklists;"
# Should return: 10
```

---

## 🚀 Quick Start

### First Time Setup:
```bash
# 1. Run migrations (creates tables)
npm run db:migrate:verification

# 2. Check and add checklists
npm run db:check-checklists

# 3. Verify
npm run db:studio
```

### Future Updates:
```bash
# Just run the check script - it's safe!
npm run db:check-checklists
```

---

## 📝 Related Commands

```bash
# Full verification system setup (includes checklists)
npm run setup:verification

# Check checklists only (safe, non-destructive)
npm run db:check-checklists

# Force re-seed (clears and re-adds all)
npm run db:seed-resolution-checklists

# View database
npm run db:studio
```

---

## ✨ Benefits

✅ **Safe** - Won't break existing data  
✅ **Fast** - Only adds what's missing  
✅ **Smart** - Auto-detects current state  
✅ **Reliable** - Can run anytime without issues  
✅ **Transparent** - Shows exactly what it does  

---

**Run it now and ensure your checklists are complete!**

```bash
npm run db:check-checklists
```
