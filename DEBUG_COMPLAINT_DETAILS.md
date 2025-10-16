# 🔍 Complaint Details 404 Error - Debugging Guide

## Quick Testing Steps

### 1. Test Database Connection
Run this to check if complaints exist:
```bash
# In the project root
npm run db:studio
# This will open Drizzle Studio to view your database
```

### 2. Test API Endpoint Directly
Use these URLs in your browser (while app is running):

**Test endpoint (no auth required):**
```
http://localhost:3000/api/complaints/[COMPLAINT_ID]/test
```

**Original endpoint (requires auth):**
```
http://localhost:3000/api/complaints/[COMPLAINT_ID]
```

Replace `[COMPLAINT_ID]` with an actual complaint ID from your database.

### 3. Check Browser Console
1. Open your dashboard: http://localhost:3000/dashboard/passenger
2. Click "View Details" on any complaint
3. Open Browser Dev Tools (F12) → Console tab
4. Look for these debug logs:
   - "Fetching complaint details for ID: ..."
   - "Response status: ..."
   - "Response ok: ..."

### 4. Check Server Console
Look at your terminal where `npm run dev` is running for:
- "GET /api/complaints/[id] - Request received for ID: ..."
- "Authenticated user: ..."
- "Database query result: ..."

## Common Issues & Solutions

### Issue 1: Authentication Failure
**Symptoms:** 401 Unauthorized error
**Solution:** The user is not properly logged in
```bash
# Clear browser cookies and login again
# Or check if JWT token is valid
```

### Issue 2: Wrong Complaint ID Format
**Symptoms:** 404 with valid UUID
**Solution:** Check if the ID in URL matches database
```sql
-- Check your complaint IDs in the database
SELECT id, title FROM complaints LIMIT 5;
```

### Issue 3: Permission Issues
**Symptoms:** 403 Forbidden
**Solution:** User doesn't own the complaint
- Passengers can only see their own complaints
- Check if the logged-in user created the complaint

### Issue 4: Database Connection Issues
**Symptoms:** 500 Internal Server Error
**Solution:** Check database connection
```bash
# Restart the app
npm run dev
```

## Manual Testing Commands

### Test with curl (if server is running):
```bash
# Test the test endpoint (no auth)
curl -v "http://localhost:3000/api/complaints/[ID]/test"

# Test with authentication (replace [ID] with actual complaint ID)
curl -v "http://localhost:3000/api/complaints/[ID]" \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie"
```

### Test with PowerShell:
```powershell
# Test the test endpoint
Invoke-WebRequest -Uri "http://localhost:3000/api/complaints/[ID]/test" -Method GET

# Check complaints list first to get valid IDs
Invoke-WebRequest -Uri "http://localhost:3000/api/complaints" -Method GET
```

## Expected Behavior

### Working Flow:
1. User clicks "View Details" on complaint
2. Browser navigates to `/complaints/[ID]`
3. Frontend fetches `/api/complaints/[ID]`
4. API returns complaint data
5. Page displays complaint details

### Debug Output (when working):
```
Frontend Console:
✓ Fetching complaint details for ID: abc-123-def
✓ Full URL: /api/complaints/abc-123-def
✓ Response status: 200
✓ Response ok: true
✓ Received complaint data: {...}

Server Console:
✓ GET /api/complaints/[id] - Request received for ID: abc-123-def
✓ Authenticated user: {userId: "user-123", userRole: "passenger", complaintId: "abc-123-def"}
✓ Database query result: Found complaint
✓ Complaint details: {id: "abc-123-def", title: "...", userId: "user-123", status: "new"}
```

## Production-Ready Fixes Applied

1. **Fixed Authentication**: Changed from localStorage tokens to cookie-based auth
2. **Added Comprehensive Logging**: Both frontend and backend now log every step
3. **Created Test Endpoint**: `/api/complaints/[id]/test` for debugging without auth
4. **Improved Error Handling**: Better error messages with detailed debugging info

## Next Steps

1. **Start your app**: `npm run dev`
2. **Check the console logs** in both browser and terminal
3. **Test the test endpoint** first: `/api/complaints/[ID]/test`
4. **Compare with working complaints list** to verify IDs match
5. **Check user permissions** if auth is working but still getting 404

The debug information will pinpoint exactly where the issue is occurring.