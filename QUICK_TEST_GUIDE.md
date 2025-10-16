# Quick Testing Guide - Rail Madad System

## 🚀 Server is Running on http://localhost:3000

---

## 🔑 Test Accounts

### Admin Account
- **Email**: `admin@railmadad.com`
- **Password**: `admin123`
- **Dashboard**: `/dashboard/admin`

### Staff Account
- **Email**: `staff1@railmadad.com` (or staff2, staff3)
- **Password**: `staff123`
- **Dashboard**: `/staff-dashboard`

### Passenger Account
- **Email**: `user@railmadad.com`
- **Password**: `user123`
- **Dashboard**: `/dashboard/passenger`

---

## ✅ Quick Test Scenarios

### Scenario 1: Admin Assigns Complaint to Staff (2 mins)

1. **Login as Admin**
   - Go to: http://localhost:3000/auth/login
   - Email: `admin@railmadad.com`
   - Password: `admin123`

2. **Navigate to Admin Dashboard**
   - URL: http://localhost:3000/dashboard/admin
   - Click "Complaints" tab

3. **Assign Complaint**
   - Find a complaint with status "new" or "pending"
   - Look for "Assign to Staff" button
   - Click and select a staff member from dropdown
   - Click "Assign" or "Confirm"
   - ✅ **Expected**: Success toast message
   - ✅ **Verify**: Complaint status changes to "assigned"

---

### Scenario 2: Staff Resolves Complaint (2 mins)

1. **Logout and Login as Staff**
   - Logout from admin
   - Login with: `staff1@railmadad.com` / `staff123`

2. **Navigate to Staff Dashboard**
   - URL: http://localhost:3000/staff-dashboard
   - ✅ **Verify**: Only complaints assigned to THIS staff member appear

3. **Resolve Complaint**
   - Find the complaint you just assigned in Scenario 1
   - Click "Resolve" button
   - Enter resolution notes in the prompt (e.g., "Issue fixed successfully")
   - Click OK
   - ✅ **Expected**: Success toast "Complaint resolved successfully!"
   - ✅ **Verify**: Complaint status changes to "resolved"

---

### Scenario 3: Passenger Receives Notification & Gives Feedback (3 mins)

1. **Logout and Login as Passenger**
   - Logout from staff
   - Login with the original complaint submitter account
   - Or create a new passenger account

2. **Check Notifications**
   - Look for notification bell icon in header
   - ✅ **Verify**: Red badge shows unread count
   - Click bell icon
   - ✅ **Verify**: See "Complaint Resolved" notification
   - Click notification to go to complaint

3. **View Complaint Details**
   - Go to: http://localhost:3000/dashboard/passenger
   - Find the resolved complaint
   - ✅ **Verify**: Status badge shows "resolved"
   - ✅ **Verify**: "Give Feedback" button appears

4. **Submit Feedback**
   - Click "Give Feedback" button
   - Select star rating (1-5)
   - Enter comment (e.g., "Quick resolution, thank you!")
   - Click "Submit Feedback"
   - ✅ **Expected**: Success message
   - ✅ **Verify**: Button changes to "Feedback Submitted" badge

---

### Scenario 4: New Complaint with Images (3 mins)

1. **As Passenger**
   - Stay logged in as passenger
   - Click "New Complaint" button

2. **Fill Complaint Form**
   - URL: http://localhost:3000/complaints/new
   - Title: "Test complaint with images"
   - Description: "Testing image upload functionality"
   - Category: Select any (e.g., "Cleanliness")
   - Priority: "Medium"

3. **Upload Images**
   - Click "Choose Files" or upload area
   - Select 1-3 test images (JPG/PNG)
   - ✅ **Verify**: Image previews appear
   - Click "Submit Complaint"
   - ✅ **Expected**: Success message
   - Redirect to passenger dashboard

4. **Verify Complaint Visibility**
   - ✅ **Verify**: New complaint appears immediately in list
   - Click "View Details"
   - ✅ **Verify**: Images are visible in complaint details
   - ✅ **Verify**: Can click images to view full size

---

### Scenario 5: Password Reset Validation (1 min)

1. **Logout from System**
   - Click Logout button

2. **Test Invalid Email**
   - Go to: http://localhost:3000/auth/forgot-password
   - Enter: `notregistered@test.com`
   - Click "Send Reset Link"
   - ✅ **Expected**: Error message "This email is not registered"

3. **Test Valid Email**
   - Enter: `user@railmadad.com`
   - Click "Send Reset Link"
   - ✅ **Expected**: Success message

---

### Scenario 6: Admin Views Performance Metrics (2 mins)

1. **Login as Admin**
   - Email: `admin@railmadad.com` / `admin123`

2. **Navigate to Admin Dashboard**
   - URL: http://localhost:3000/dashboard/admin

3. **Check Overview Tab**
   - ✅ **Verify**: KPI cards show:
     - Total Complaints
     - Pending count
     - Resolved count
     - Critical count
     - Top Category
   - ✅ **Verify**: Charts render properly
   - ✅ **Verify**: Recent actions log visible

4. **Check Feedback Tab**
   - Click "Feedback" tab
   - ✅ **Verify**: Average rating displayed
   - ✅ **Verify**: Category ratings shown
   - ✅ **Verify**: Recent comments appear

5. **Export Report**
   - Click "Reports" tab
   - Click "Complaints Report" button
   - ✅ **Expected**: CSV file downloads
   - Open CSV in Excel/Sheets
   - ✅ **Verify**: Contains complaint data

---

## 🎯 Feature Checklist

### ✅ Admin Dashboard Features
- [ ] Can see all complaints
- [ ] Can assign complaints to staff
- [ ] Can view performance analytics
- [ ] Can export reports (CSV)
- [ ] Can view feedback summary
- [ ] Can configure settings
- [ ] Cannot resolve complaints directly

### ✅ Staff Dashboard Features
- [ ] Sees only assigned complaints
- [ ] Can resolve complaints
- [ ] Can add resolution notes
- [ ] Can view complaint details
- [ ] Cannot assign complaints
- [ ] Cannot see unassigned complaints

### ✅ Passenger Dashboard Features
- [ ] Sees only own complaints
- [ ] Can create new complaints
- [ ] Can upload images (up to 5)
- [ ] Can give feedback on resolved complaints
- [ ] Receives notifications
- [ ] Can search and filter complaints
- [ ] Notification bell shows unread count

---

## 🐛 Common Issues & Solutions

### Issue: "Port 3000 already in use"
**Solution:**
```powershell
Stop-Process -Name node -Force
npm run dev
```

### Issue: "Cannot read property of undefined"
**Solution:** Refresh the page or clear browser cache

### Issue: "Unauthorized" error
**Solution:** 
- Logout and login again
- Check browser console for JWT token
- Verify .env file has JWT_SECRET

### Issue: Images not uploading
**Solution:**
- Check file size (max 5MB per image)
- Check file format (JPG, PNG, GIF, WebP only)
- Verify `/public/uploads/complaints/` directory exists

### Issue: Staff cannot see complaints
**Solution:**
- Verify admin has assigned complaints to this staff member
- Check complaint assignedUserId matches staff's userId
- Refresh the page

---

## 🔍 What to Look For

### UI Elements Should Be Present

**Admin Dashboard:**
- Tabs: Overview, Complaints, Users, Logs, Feedback, Reports, Settings
- "Assign to Staff" buttons on complaints
- Staff selection dropdown
- Export buttons
- Settings toggles

**Staff Dashboard:**
- Only assigned complaints visible
- "Resolve" button on each complaint
- "Quick Actions" section
- Resolution prompt dialog

**Passenger Dashboard:**
- "New Complaint" button
- Notification bell icon (top right)
- "Give Feedback" button (resolved complaints only)
- "Feedback Submitted" badge (after feedback)
- Search and filter controls

---

## 📊 Success Criteria

All features working if:

1. ✅ Admin can assign complaints to staff
2. ✅ Staff sees only their assigned complaints
3. ✅ Staff can resolve complaints with notes
4. ✅ Passengers receive resolution notifications
5. ✅ Passengers can give feedback (once per complaint)
6. ✅ Images upload and display correctly
7. ✅ Password reset validates email registration
8. ✅ Performance metrics display in admin dashboard
9. ✅ Reports export successfully
10. ✅ No UI design changes visible

---

## 🎉 All Systems Ready!

**Server Status**: ✅ Running on http://localhost:3000

**Test the system and verify all features work as expected!**

---

## 📝 Quick Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Stop all Node processes
Stop-Process -Name node -Force

# Check database
node scripts/check-database.js

# Seed sample data (if needed)
node scripts/seed-minimal.ts
```

---

## 💡 Pro Tips

1. **Use Browser DevTools** (F12) to check:
   - Network tab for API calls
   - Console for errors
   - Application tab for JWT tokens

2. **Test in Incognito Mode** for clean session testing

3. **Use Multiple Browser Windows**:
   - Window 1: Admin dashboard
   - Window 2: Staff dashboard
   - Window 3: Passenger dashboard
   - Test workflows across all three simultaneously

4. **Check Database** after each action to verify data persistence

---

Happy Testing! 🚀
