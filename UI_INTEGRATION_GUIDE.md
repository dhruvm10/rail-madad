# Quick UI Integration Guide

## Files That Need Updates

### 1. Admin Dashboard - Add Assignment UI
**File:** `app/admin/page.tsx`

**Add these features:**
- Button to "Assign to Staff" for each complaint
- Modal/Dialog to select staff member from department
- Display current assignee for each complaint
- Remove any "Resolve" buttons (staff only)

**Sample Code:**
```tsx
// Add to complaint card
<Button onClick={() => handleAssignComplaint(complaint.id)}>
  {complaint.assignedUserId ? 'Reassign' : 'Assign to Staff'}
</Button>

// Assignment function
const handleAssignComplaint = async (complaintId, staffId) => {
  const response = await fetch('/api/admin/assign-complaint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      complaintId,
      assignedToUserId: staffId,
      taskDescription: 'Resolve this complaint',
      priority: 'medium'
    })
  });
  // Handle response and refresh
};
```

---

### 2. Staff Dashboard - Show Only Assigned Complaints
**File:** `app/staff-dashboard/page.tsx`

**Changes needed:**
- Filter complaints to show only `complaint.assignedUserId === currentUserId`
- Add "Mark as Resolved" button for active complaints
- Remove any assignment capabilities
- Show task details and deadlines

**Sample Code:**
```tsx
// Fetch only assigned complaints
const fetchComplaints = async () => {
  const response = await fetch('/api/staff/resolve-complaint', {
    credentials: 'include'
  });
  const data = await response.json();
  setComplaints(data.activeComplaints);
};

// Resolve complaint function
const handleResolveComplaint = async (complaintId, notes) => {
  const response = await fetch('/api/staff/resolve-complaint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      complaintId,
      resolutionNotes: notes
    })
  });
  // Handle response and refresh
};

// Add to complaint card
{complaint.status !== 'resolved' && (
  <Button onClick={() => openResolveDialog(complaint)}>
    Mark as Resolved
  </Button>
)}
```

---

### 3. Performance Dashboard Visualization
**File:** Create new file `app/admin/performance/page.tsx`

**Components needed:**
- Chart library: Use `recharts` or `chart.js`
- Performance cards with key metrics
- Staff performance table
- Department statistics
- Time range filter (7 days, 30 days, all time)

**Sample Code:**
```tsx
'use client';
import { LineChart, BarChart, ... } from 'recharts';

const PerformanceDashboard = () => {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetch(`/api/admin/performance?timeRange=${timeRange}`)
      .then(res => res.json())
      .then(setData);
  }, [timeRange]);

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>Average Resolution Time</CardHeader>
          <CardContent>
            {data?.summary?.avgResolutionTimeDays} days
          </CardContent>
        </Card>
        {/* More cards... */}
      </div>

      {/* Charts */}
      <LineChart data={data?.graphData}>
        {/* Chart config */}
      </LineChart>

      {/* Staff Performance Table */}
      <Table>
        {data?.staffPerformance.map(staff => (
          <TableRow key={staff.staffId}>
            <TableCell>{staff.staffName}</TableCell>
            <TableCell>{staff.resolved}/{staff.totalAssigned}</TableCell>
            <TableCell>{staff.resolutionRate}%</TableCell>
            <TableCell>{staff.avgResolutionTimeHours}h</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};
```

---

### 4. Inspection Submission UI
**File:** Create `app/inspection/submit/page.tsx`

**Features:**
- List of resolved complaints needing inspection
- Inspection form with checklist items
- Score calculation
- Submit button
- Inspector notes

**Sample Code:**
```tsx
const InspectionSubmit = () => {
  const [complaint, setComplaint] = useState(null);
  const [checklist, setChecklist] = useState(null);
  const [results, setResults] = useState({});
  
  const handleSubmit = async () => {
    const response = await fetch('/api/inspection/submit-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        complaintId: complaint.id,
        checklistId: checklist.id,
        inspectionResults: results,
        overallScore: calculateScore(results),
        inspectorNotes: notes
      })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{complaint.title}</h2>
      {checklist.checklistItems.map(item => (
        <div key={item.id}>
          <label>{item.question}</label>
          <select onChange={(e) => updateResult(item.id, e.target.value)}>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
            <option value="na">N/A</option>
          </select>
        </div>
      ))}
      <textarea placeholder="Inspector notes..." />
      <Button type="submit">Submit Inspection</Button>
    </form>
  );
};
```

---

### 5. Admin Inspection Review UI
**File:** Create `app/admin/inspections/page.tsx`

**Features:**
- List of pending inspection reports
- View inspection details and scores
- Approve/Reject buttons
- Admin notes input
- Show inspector details

**Sample Code:**
```tsx
const InspectionReview = () => {
  const [pendingReports, setPendingReports] = useState([]);

  const handleApprove = async (reportId, notes) => {
    const response = await fetch('/api/inspection/approve-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        reportId,
        approved: true,
        adminNotes: notes
      })
    });
  };

  return (
    <div>
      <h1>Pending Inspection Reports</h1>
      {pendingReports.map(report => (
        <Card key={report.id}>
          <CardHeader>
            <h3>Complaint: {report.complaintTitle}</h3>
            <Badge>Score: {report.overallScore}%</Badge>
          </CardHeader>
          <CardContent>
            <p>Inspector: {report.inspectorName}</p>
            <p>Notes: {report.inspectorNotes}</p>
            {/* Show inspection results */}
            <div className="flex gap-2">
              <Button onClick={() => handleApprove(report.id, '')}>
                Approve
              </Button>
              <Button variant="destructive" onClick={() => handleReject(report.id)}>
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
```

---

## Priority Order

1. **High Priority:** Staff Dashboard (Most critical for workflow)
2. **High Priority:** Admin Assignment UI (Enables core workflow)
3. **Medium Priority:** Performance Dashboard (Analytics)
4. **Medium Priority:** Inspection UI (Quality control)
5. **Low Priority:** Advanced features and refinements

---

## Testing Steps

1. **Create test accounts:**
   - Admin user
   - Staff user (2-3 in different departments)
   - Passenger user

2. **Test workflow:**
   ```
   Passenger -> Submit complaint with images
   Admin -> Assign to staff
   Staff -> View assigned, Mark as resolved
   Inspector -> Submit inspection
   Admin -> Approve inspection
   Passenger -> View closed complaint
   ```

3. **Verify:**
   - Images visible at all stages
   - Notifications sent properly
   - Role permissions enforced
   - Performance metrics accurate

---

## UI Components to Reuse

From `components/ui/`:
- `Button` - Primary actions
- `Card` - Content containers
- `Dialog` - Modals for forms
- `Badge` - Status indicators
- `Select` - Dropdowns
- `Textarea` - Multi-line input
- `Table` - Data tables

---

## Quick Commands

```bash
# Install chart library if needed
npm install recharts

# Run development server
npm run dev

# Check for TypeScript errors
npm run type-check

# Format code
npm run lint
```

---

## Common Patterns

### Fetch with Authentication
```typescript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important!
  body: JSON.stringify(data)
});
```

### Role Check
```typescript
const user = await fetch('/api/auth/me').then(r => r.json());
if (user.role !== 'admin') {
  router.push('/'); // Redirect
}
```

### Image Display
```typescript
<img 
  src={`/uploads/complaints/${complaintId}/${filename}`}
  alt="Complaint attachment"
/>
```

---

## Notes

- All APIs are ready and working
- Just need to connect UI to APIs
- Keep existing UI designs intact
- Use existing component library
- Add loading states
- Handle errors gracefully
- Show success toasts

