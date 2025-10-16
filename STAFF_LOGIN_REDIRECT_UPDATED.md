# Staff Login Redirect Updated

## Summary
Successfully updated the login redirect logic to send staff users to `/staff-dashboard` instead of `/dashboard/admin`.

## Changes Made

### File: `app/auth/login/page.tsx`
**Location:** Lines 56-73

**Before:**
```typescript
// Role-based redirection
if (redirect) {
  console.log('🔄 Using redirect URL:', redirect);
  router.push(redirect);
} else {
  // Redirect based on user role
  if (data.user.role === 'admin' || data.user.role === 'staff') {
    console.log('👨‍💼 Redirecting admin/staff to /dashboard/admin');
    window.location.href = '/dashboard/admin';
  } else if (data.user.role === 'passenger') {
    console.log('🚂 Redirecting passenger to /dashboard/passenger');
    window.location.href = '/dashboard/passenger';
  } else {
    console.log('❓ Unknown role, redirecting to homepage');
    window.location.href = '/';
  }
}
```

**After:**
```typescript
// Role-based redirection
if (redirect) {
  console.log('🔄 Using redirect URL:', redirect);
  router.push(redirect);
} else {
  // Redirect based on user role
  if (data.user.role === 'admin') {
    console.log('👨‍💼 Redirecting admin to /dashboard/admin');
    window.location.href = '/dashboard/admin';
  } else if (data.user.role === 'staff') {
    console.log('👷 Redirecting staff to /staff-dashboard');
    window.location.href = '/staff-dashboard';
  } else if (data.user.role === 'passenger') {
    console.log('🚂 Redirecting passenger to /dashboard/passenger');
    window.location.href = '/dashboard/passenger';
  } else {
    console.log('❓ Unknown role, redirecting to homepage');
    window.location.href = '/';
  }
}
```

## What Changed?
1. **Separated admin and staff roles**: Previously both `admin` and `staff` were grouped together with `||` operator
2. **Added dedicated staff redirect**: Staff now redirect to `/staff-dashboard`
3. **Added clearer logging**: Console log now shows `👷 Redirecting staff to /staff-dashboard`

## Login Redirect Behavior

| User Role | Redirect URL |
|-----------|--------------|
| **Admin** | `/dashboard/admin` |
| **Staff** | `/staff-dashboard` |
| **Passenger** | `/dashboard/passenger` |
| **Unknown** | `/` (homepage) |

## Test Credentials

### Staff User
- **Email:** staff1@railmadad.com
- **Password:** Staff@123
- **Expected Redirect:** http://localhost:3000/staff-dashboard

### Admin User
- **Email:** admin@railmadad.com
- **Password:** Admin@123
- **Expected Redirect:** http://localhost:3000/dashboard/admin

### Passenger User
- **Email:** passenger@railmadad.com
- **Password:** Pass@123
- **Expected Redirect:** http://localhost:3000/dashboard/passenger

## Next Steps
1. Restart the development server: `npm run dev`
2. Test the login with staff credentials
3. Verify you're redirected to `/staff-dashboard`
4. Check that the staff dashboard loads correctly

## Additional Notes
- The change uses `window.location.href` for navigation to ensure a full page reload
- This helps refresh authentication state and ensure proper routing
- The redirect URL parameter is still respected if provided in the query string

---
**Date:** October 13, 2025
**Status:** ✅ Complete
