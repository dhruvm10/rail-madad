# 📊 Performance Tracking Feature - Complete Documentation

## Overview

The Performance Tracking feature provides comprehensive real-time analytics and metrics for monitoring the Rail Madad complaint resolution system. It offers detailed insights into staff performance, department efficiency, complaint trends, and quality metrics.

---

## 🎯 Features

### 1. **Real-Time Metrics Dashboard**
- Live complaint counts updated every minute
- Today's resolution statistics
- Pending assignments tracker
- Active inspections monitor
- Auto-refresh toggle for continuous monitoring

### 2. **Overall Performance Metrics**
- Total complaints processed
- System-wide resolution rate
- Average resolution time
- Pending complaint count
- Quality inspection scores

### 3. **Staff Performance Analysis**
- Top performing staff members leaderboard
- Individual resolution rates
- Complaints assigned vs resolved
- Average resolution times per staff
- Inspection reports submitted
- Department assignment tracking

### 4. **Department Performance**
- Department-wise resolution rates
- Total complaints per department
- Staff count per department
- Average resolution times
- Inspection quality metrics

### 5. **Category & Priority Analysis**
- Performance breakdown by complaint category
- Resolution rates by priority level
- Average resolution times per category
- Visual progress indicators
- Critical vs non-critical handling metrics

### 6. **Inspection Quality Metrics**
- Total inspection reports submitted
- Approval vs rejection rates
- Pending inspections requiring review
- Average quality scores
- Complaints resolved through inspections

### 7. **Task Assignment Metrics**
- Task completion rates
- Tasks in progress
- Assigned but not started tasks
- Average task completion times
- Task distribution analytics

### 8. **Daily Trend Analysis**
- 14-day complaint trend visualization
- New complaints vs resolved comparison
- Daily performance patterns
- Workload distribution insights

---

## 🚀 How to Access

### For Admin Users:

1. **Login as Admin**
   ```
   URL: http://localhost:3000/auth/login
   Email: admin@railmadad.com
   Password: [your admin password]
   ```

2. **Navigate to Performance Tab**
   - From Admin Dashboard, click on the **"Performance"** tab
   - Located between "Users" and "Logs" tabs

3. **Select Time Range**
   - Use dropdown to select: 7, 30, 60, or 90 days
   - Default view: Last 30 days

4. **Enable Auto-Refresh**
   - Toggle "Auto-Refresh" badge in top-right
   - Refreshes data every 60 seconds when enabled

---

## 📊 API Endpoint Details

### Endpoint: `/api/admin/performance`

**Method:** `GET`

**Authentication:** Required (Admin only)

**Query Parameters:**
- `timeRange` (optional): Number of days to analyze (default: 30)
  - Values: `7`, `30`, `60`, `90`
- `departmentId` (optional): Filter by specific department

**Example Request:**
```bash
GET /api/admin/performance?timeRange=30
Cookie: auth-token=<jwt-token>
```

**Response Structure:**
```json
{
  "timeRange": 30,
  "overallMetrics": {
    "totalComplaints": 150,
    "resolvedComplaints": 120,
    "pendingComplaints": 30,
    "avgResolutionHours": 24.5,
    "resolutionRate": 80.0
  },
  "realtime": {
    "totalComplaintsToday": 12,
    "resolvedToday": 8,
    "pendingAssignments": 15,
    "activeInspections": 5,
    "lastUpdated": "2025-10-12T10:30:00.000Z"
  },
  "staffPerformance": [
    {
      "staffId": "staff-uuid-1",
      "staffName": "John Doe",
      "staffEmail": "john@railmadad.com",
      "departmentName": "Customer Service",
      "totalAssigned": 25,
      "resolved": 22,
      "inProgress": 3,
      "avgResolutionHours": 18.5,
      "resolutionRate": 88.0,
      "inspectionReportsCount": 5
    }
  ],
  "departmentMetrics": [
    {
      "departmentId": "dept-uuid-1",
      "departmentName": "Cleanliness",
      "totalComplaints": 45,
      "resolvedComplaints": 40,
      "avgResolutionHours": 20.2,
      "resolutionRate": 88.89,
      "staffCount": 8,
      "inspectionReportsCount": 12
    }
  ],
  "dailyTrend": [
    {
      "date": "2025-10-01",
      "newComplaints": 8,
      "resolvedComplaints": 6,
      "totalComplaints": 8
    }
  ],
  "categoryMetrics": [
    {
      "category": "cleanliness",
      "totalComplaints": 35,
      "resolvedComplaints": 30,
      "avgResolutionHours": 22.5,
      "resolutionRate": 85.71
    }
  ],
  "priorityMetrics": [
    {
      "priority": "critical",
      "totalComplaints": 15,
      "resolvedComplaints": 14,
      "avgResolutionHours": 12.3,
      "resolutionRate": 93.33
    }
  ],
  "inspectionMetrics": {
    "totalReports": 45,
    "approvedReports": 38,
    "rejectedReports": 5,
    "pendingReports": 2,
    "avgScore": 85.5,
    "approvalRate": 84.44,
    "complaintsResolved": 36
  },
  "taskMetrics": {
    "totalTasks": 120,
    "completedTasks": 95,
    "inProgressTasks": 20,
    "assignedTasks": 5,
    "completionRate": 79.17,
    "avgCompletionHours": 18.7
  }
}
```

---

## 🎨 UI Components

### 1. **Real-Time Metrics Card** (Blue Highlight)
Shows 4 live metrics:
- Complaints Today
- Resolved Today
- Pending Assignments
- Active Inspections

**Features:**
- Auto-updates every 60 seconds
- Displays last update timestamp
- Color-coded indicators

### 2. **Overall Performance Cards** (5 Cards)
Displays key system metrics:
- Total Complaints
- Resolution Rate (with trending indicator)
- Average Resolution Time
- Pending Count
- Inspection Quality Score

### 3. **Top Performers Section**

**Left Panel: Top Staff**
- Ranked 1-5 by resolution rate
- Gold/Silver/Bronze medals for top 3
- Shows department affiliation
- Resolution percentage and count

**Right Panel: Top Departments**
- Top 3 departments by performance
- Total, resolved, and staff count
- Resolution rate percentage

### 4. **Category Performance**
- All complaint categories listed
- Color-coded progress bars:
  - 🟢 Green: ≥80% resolution rate
  - 🟡 Yellow: 60-79% resolution rate
  - 🔴 Red: <60% resolution rate
- Average resolution time per category

### 5. **Priority Performance**
- Critical, High, Medium, Low priorities
- Badge colors match priority levels
- Resolution rates and times
- Visual progress indicators

### 6. **Inspection Metrics Card**
- Approved vs Rejected counts
- Pending review count
- Approval rate percentage
- Total complaints resolved via inspections

### 7. **Task Metrics Card**
- Completed, In Progress, Assigned counts
- Completion rate percentage
- Average completion time
- Visual completion progress bar

### 8. **Daily Trend Chart**
- Last 14 days of activity
- Side-by-side comparison of new vs resolved
- Blue bars: New complaints
- Green bars: Resolved complaints
- Responsive bar sizing based on max values

---

## 🔍 Performance Indicators

### Resolution Rate Colors:
- **Green (≥80%)**: Excellent performance
- **Yellow (60-79%)**: Acceptable performance
- **Red (<60%)**: Needs improvement

### Priority Badges:
- **Critical**: Red destructive badge
- **High**: Default blue badge
- **Medium/Low**: Secondary gray badge

### Staff Ranking Medals:
- **🥇 1st Place**: Yellow/Gold background
- **🥈 2nd Place**: Gray/Silver background
- **🥉 3rd Place**: Orange/Bronze background
- **4th-5th**: Blue background

---

## 📈 Performance Metrics Calculation

### Resolution Rate
```
Resolution Rate = (Resolved Complaints / Total Complaints) × 100
```

### Average Resolution Time
```
Avg Resolution Time = Σ(Resolved At - Created At) / Count of Resolved
(Displayed in hours)
```

### Completion Rate
```
Completion Rate = (Completed Tasks / Total Tasks) × 100
```

### Approval Rate
```
Approval Rate = (Approved Reports / Total Reports) × 100
```

---

## 🔄 Auto-Refresh Feature

### How It Works:
1. Toggle the "Auto-Refresh" badge in the top-right corner
2. When enabled (blue badge):
   - Fetches fresh data every 60 seconds
   - Updates all metrics automatically
   - Shows "last updated" timestamp
3. When disabled (gray outline):
   - Data remains static
   - Manual refresh by toggling time range

### Use Cases:
- **Enable** for monitoring live operations
- **Disable** for analyzing historical data
- **Disable** to reduce API calls during detailed review

---

## 📊 Time Range Options

### Available Ranges:
1. **Last 7 Days** - Recent short-term performance
2. **Last 30 Days** - Monthly overview (default)
3. **Last 60 Days** - Bi-monthly trends
4. **Last 90 Days** - Quarterly analysis

### Best Practices:
- Use 7 days for daily operations monitoring
- Use 30 days for monthly performance reviews
- Use 60-90 days for trend analysis and planning

---

## 🎯 Use Cases

### 1. **Daily Operations Monitoring**
- Enable auto-refresh
- Monitor real-time metrics
- Track pending assignments
- Identify bottlenecks quickly

### 2. **Staff Performance Reviews**
- Check top performers leaderboard
- Review individual resolution rates
- Compare staff efficiency
- Identify training needs

### 3. **Department Resource Allocation**
- Analyze department workload
- Compare resolution rates
- Identify understaffed departments
- Optimize staff distribution

### 4. **Quality Assurance**
- Monitor inspection approval rates
- Track quality scores
- Identify rejected inspections
- Improve resolution quality

### 5. **Trend Analysis**
- Review daily trends
- Identify peak complaint days
- Plan resource allocation
- Forecast future workload

### 6. **Strategic Planning**
- Use 60-90 day data
- Identify long-term patterns
- Plan improvements
- Set performance targets

---

## 🔧 Technical Implementation

### Components:
- **Component**: `components/Admin/PerformanceTracker.tsx`
- **API Route**: `app/api/admin/performance/route.ts`
- **Parent**: `app/dashboard/admin/page.tsx`

### Dependencies:
- Next.js 14.2.32
- React hooks (useState, useEffect)
- Drizzle ORM for database queries
- SQLite database
- Tailwind CSS for styling
- Shadcn/ui components

### Database Tables Used:
- `complaints` - Main complaint data
- `users` - Staff and user information
- `departments` - Department structure
- `departmentStaff` - Staff-department mapping
- `inspectionReports` - Quality inspection data
- `taskAssignments` - Task management data

### Key Features:
- Real-time data fetching
- Auto-refresh with 60-second interval
- Efficient SQL queries with aggregations
- Optimized rendering with React hooks
- Responsive design for all screen sizes

---

## 🚨 Error Handling

### Common Issues:

1. **"Failed to load performance data"**
   - **Cause**: API endpoint error or network issue
   - **Solution**: Check browser console, verify admin authentication

2. **"No Data Available"**
   - **Cause**: No complaints in selected time range
   - **Solution**: Adjust time range or add sample data

3. **Empty Staff/Department Lists**
   - **Cause**: No staff assigned or no activity
   - **Solution**: Assign staff to departments, create test complaints

4. **403 Forbidden Error**
   - **Cause**: Non-admin user attempting access
   - **Solution**: Login with admin account

---

## 📱 Responsive Design

### Desktop View:
- 8-column tab layout
- Side-by-side cards
- Full-width charts
- All metrics visible

### Tablet View:
- Stacked cards (2 columns)
- Responsive grid layouts
- Scrollable sections

### Mobile View:
- Single column layout
- Touch-friendly interactions
- Collapsible sections
- Optimized for small screens

---

## 🎨 Color Scheme

### Status Colors:
- **Blue**: General metrics, new complaints
- **Green**: Resolved, approved, success
- **Yellow/Orange**: In progress, medium priority
- **Red**: Critical, rejected, needs attention
- **Purple**: Special metrics (inspections)

### Theme Support:
- Light mode: Pastel backgrounds
- Dark mode: Deep color variants
- High contrast for accessibility

---

## 📝 Summary

The Performance Tracking feature provides a comprehensive view of the Rail Madad system's operational efficiency. With real-time updates, detailed analytics, and intuitive visualizations, administrators can:

✅ Monitor live operations
✅ Identify top performers
✅ Optimize resource allocation
✅ Track quality metrics
✅ Analyze trends
✅ Make data-driven decisions

**Access Level**: Admin Only
**Update Frequency**: Real-time (60-second refresh)
**Data Range**: Last 7-90 days
**Key Metrics**: 50+ performance indicators

---

## 🔗 Related Features

- **Admin Dashboard** (`/dashboard/admin`)
- **Staff Performance** (User Management tab)
- **Complaint Analytics** (Overview tab)
- **Inspection Reports** (Logs tab)
- **Feedback Analysis** (Feedback tab)

---

**Performance Tracking is now live and ready to monitor your Rail Madad system! 📊🚀**
