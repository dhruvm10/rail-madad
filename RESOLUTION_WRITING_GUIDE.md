# Resolution Writing Guide 📝

## Quality Check System

The Rail Madad system uses an **automated quality checker** that scores your resolutions based on:
- **70% Keyword Matching** - Your text must contain specific keywords
- **30% Checklist Completion** - Checking the boxes

## Scoring Thresholds

- **≥ 90%** = ✅ Auto-approved (resolution immediately sent to passenger)
- **60-89%** = ⚠️ Requires admin approval (admin reviews before sending)
- **< 60%** = ❌ Requires rework (you must revise and resubmit)

---

## Required Keywords by Complaint Category

### 🛠️ TECHNICAL (AC, Electrical, Equipment Issues)

**You MUST include ALL of these:**

1. **APOLOGY** (weight: 2) - Required ✅
   - Use one of: "sorry", "apologize", "regret", "apologise", "inconvenience"
   - Example: "We sincerely apologize for the inconvenience"

2. **REASON** (weight: 3) - Required ✅
   - Use one of: "due to", "caused by", "technical", "malfunction", "failure", "issue"
   - Example: "The issue was caused by a technical malfunction"

3. **SOLUTION** (weight: 4) - Required ✅
   - Use one of: "repaired", "fixed", "resolved", "replaced", "maintenance", "technician"
   - Example: "Our technician has repaired the system"

**Example Good Resolution for AC Not Cooling:**
```
We sincerely apologize for the inconvenience caused by the AC not cooling properly. 
The issue was due to a technical malfunction in the compressor unit. Our maintenance 
technician has inspected and repaired the AC system, and it is now functioning 
correctly. We have tested the cooling to ensure proper operation. To prevent future 
issues, we will conduct regular preventive maintenance on all AC units.
```

---

### 🧹 CLEANLINESS

**Required Keywords:**

1. **ACKNOWLEDGMENT** (weight: 2) - Required ✅
   - "understand", "acknowledge", "noted", "aware", "recognize"

2. **APOLOGY** (weight: 2) - Required ✅
   - "sorry", "apologize", "regret", "apologise", "inconvenience"

3. **SOLUTION** (weight: 4) - Required ✅
   - "cleaned", "sanitized", "disinfected", "addressed", "resolved", "action taken"

4. **FUTURE_ASSURANCE** (weight: 1) - Optional
   - "prevent", "ensure", "monitor", "regular", "inspection", "maintain"

**Example:**
```
We acknowledge the cleanliness issue you reported. We sincerely apologize for the 
unclean conditions. The coach has been thoroughly cleaned and sanitized by our 
housekeeping team. We will ensure regular inspections to maintain high cleanliness 
standards.
```

---

### 🍽️ FOOD QUALITY

**Required Keywords:**

1. **APOLOGY** (weight: 2) - Required ✅
   - "sorry", "apologize", "regret", "apologise", "inconvenience"

2. **REASON** (weight: 2) - Required ✅
   - "due to", "caused by", "because", "supplier", "preparation", "storage"

3. **SOLUTION** (weight: 3) - Required ✅
   - "replaced", "improved", "changed", "quality check", "ensured", "fresh"

4. **COMPENSATION** (weight: 2) - Optional
   - "refund", "compensation", "reimbursed", "eligible"

**Example:**
```
We apologize for the poor food quality. The issue was caused by a delay in our 
supplier's delivery. We have replaced the food items with fresh supplies and 
implemented stricter quality checks. You are eligible for a partial refund through 
our compensation process.
```

---

### ⏰ DELAY

**Required Keywords:**

1. **APOLOGY** (weight: 2) - Required ✅
   - "sorry", "apologize", "regret", "apologise", "inconvenience", "delayed"

2. **REASON** (weight: 3) - Required ✅
   - "due to", "caused by", "because of", "reason", "technical", "maintenance", "signal", "track", "weather"

3. **COMPENSATION** (weight: 2) - Optional
   - "refund", "compensation", "reimburse", "eligible", "claim", "entitled"

4. **FUTURE_ASSURANCE** (weight: 1) - Optional
   - "prevent", "avoid", "improve", "working on", "measures", "steps"

**Example:**
```
We sincerely apologize for the delay in your journey. The delay was caused by 
unexpected signal maintenance on the route. You are eligible for a partial refund, 
which you can claim through our portal. We are taking measures to improve schedule 
adherence and minimize future delays.
```

---

### 👤 STAFF BEHAVIOR

**Required Keywords:**

1. **APOLOGY** (weight: 3) - Required ✅
   - "sorry", "apologize", "regret", "apologise", "unacceptable"

2. **ACKNOWLEDGMENT** (weight: 2) - Required ✅
   - "understand", "acknowledge", "concern", "behavior", "conduct"

3. **SOLUTION** (weight: 3) - Required ✅
   - "counseled", "trained", "disciplinary", "action taken", "addressed", "warned"

**Example:**
```
We sincerely apologize for the unacceptable behavior of our staff member. We 
acknowledge your concern about their conduct. The employee has been counseled, 
and appropriate disciplinary action has been taken. All staff will receive 
additional customer service training.
```

---

## Tips for Writing High-Quality Resolutions

### ✅ DO:
1. **Use multiple keywords** from each category to increase your score
2. **Write 50+ words** for better context
3. **Be specific** about what was done
4. **Include timelines** if applicable
5. **Check ALL relevant boxes** in the checklist
6. **Add reference IDs** (ticket numbers, maintenance IDs) when available
7. **Provide evidence** of work done

### ❌ DON'T:
1. **Use generic text** - System detects copy-paste patterns
2. **Check boxes without including keywords** - System validates this
3. **Rush through** - Spend adequate time (system tracks this)
4. **Skip required fields** - "Action Taken" must be detailed
5. **Ignore the checklist** - It contributes 30% to your score

---

## Checklist Items (30% of Score)

When writing your resolution, make sure you can honestly check:

- ✅ **Reason** - Did you explain WHY the issue occurred?
- ✅ **Apology** - Did you apologize for the inconvenience?
- ✅ **Solution** - Did you explain WHAT you did to fix it?
- ✅ **Future Steps** - Did you mention prevention measures?
- ✅ **Compensation** - Did you mention refund/compensation if applicable?

**Important:** The system validates that checked items actually appear in your text!

---

## Action Taken Field

This field is separate from the resolution text and must be:
- **Minimum 20 characters**
- **Specific actions you took**
- **Concrete steps, not generic statements**

**Good Examples:**
- ✅ "Inspected AC unit, replaced faulty compressor, tested cooling"
- ✅ "Cleaned coach A3, sanitized all surfaces, replaced floor mats"
- ✅ "Spoke with passenger, issued refund of ₹500, sent apology letter"

**Bad Examples:**
- ❌ "Fixed the issue"
- ❌ "Resolved complaint"
- ❌ "Took necessary action"

---

## Common Mistakes

### Mistake 1: Checking boxes without keywords
```
❌ BAD: "The issue has been fixed." + Checked all boxes
```
**Problem:** Text doesn't contain keywords, system detects false claims

### Mistake 2: Generic resolution
```
❌ BAD: "Your complaint has been resolved. Thank you."
```
**Problem:** No specific keywords, too short, not detailed

### Mistake 3: Missing required elements
```
❌ BAD: "Sorry, we fixed it."
```
**Problem:** Only has apology, missing reason and solution details

---

## Need Help?

If you're getting low scores:
1. Review the keywords for your complaint category
2. Make sure ALL required keywords are in your text
3. Write detailed, specific resolutions (50+ words)
4. Only check boxes that you've actually addressed
5. Fill in the "Action Taken" field with specific details

**Remember:** The quality checker is designed to ensure passengers receive thorough, 
professional responses. Take time to write good resolutions!
