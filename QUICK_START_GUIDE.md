# 🚀 Quick Start Guide - Rail Madad Project

## ⚠️ Important: Correct Directory

The project is located at:
```
C:\Users\daksh\Downloads\rail-madad\rail-madad
```

**Always make sure you're in the correct directory before running npm commands!**

---

## 📁 Project Structure

```
C:\Users\daksh\Downloads\
└── rail-madad/                    ← Parent folder
    └── rail-madad/                ← PROJECT ROOT (You need to be here!)
        ├── package.json           ← npm looks for this file
        ├── app/
        ├── components/
        ├── db/
        ├── lib/
        └── ... (other project files)
```

---

## ✅ How to Navigate to Project Directory

### Method 1: PowerShell Command
```powershell
cd C:\Users\daksh\Downloads\rail-madad\rail-madad
```

### Method 2: Step by Step
```powershell
cd C:\Users\daksh\Downloads
cd rail-madad
cd rail-madad
```

### Method 3: Verify Current Directory
```powershell
# Check where you are
pwd

# Should output:
# C:\Users\daksh\Downloads\rail-madad\rail-madad
```

---

## 🔍 Common Error: "Cannot find package.json"

### Error Message:
```
npm error code ENOENT
npm error syscall open
npm error path C:\Users\daksh\Downloads\rail-madad\package.json
npm error errno -4058
npm error enoent Could not read package.json
```

### Cause:
You're in the wrong directory! You're in:
```
C:\Users\daksh\Downloads\rail-madad  ❌ WRONG
```

But you need to be in:
```
C:\Users\daksh\Downloads\rail-madad\rail-madad  ✅ CORRECT
```

### Solution:
```powershell
# Navigate to the correct directory
cd C:\Users\daksh\Downloads\rail-madad\rail-madad

# Verify you're in the right place
Test-Path package.json
# Should return: True

# Now you can run npm commands
npm run dev
```

---

## 🎯 Essential Commands

### Start Development Server
```powershell
# Make sure you're in the project root first!
cd C:\Users\daksh\Downloads\rail-madad\rail-madad

# Start the dev server
npm run dev

# Server will start at: http://localhost:3000
```

### Build for Production
```powershell
npm run build
```

### Start Production Server
```powershell
npm run start
```

### Install Dependencies (if needed)
```powershell
npm install
```

---

## 🔧 Quick Troubleshooting

### Problem: "npm: command not found"
**Solution:** Node.js is not installed or not in PATH
```powershell
# Check if Node.js is installed
node --version

# Check if npm is installed
npm --version

# If not installed, download from: https://nodejs.org/
```

### Problem: "Cannot find module"
**Solution:** Dependencies not installed
```powershell
npm install
```

### Problem: Port 3000 already in use
**Solution:** Another process is using port 3000
```powershell
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
# Note the PID from the last column
taskkill /PID <PID> /F

# Or use a different port
$env:PORT=3001; npm run dev
```

### Problem: "Module not found" errors
**Solution:** Clear cache and reinstall
```powershell
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall dependencies
npm install
```

---

## 📂 How to Always Stay in Correct Directory

### Option 1: Create a Shortcut Script
Create a file named `start-dev.ps1` in the project root:
```powershell
# start-dev.ps1
Set-Location C:\Users\daksh\Downloads\rail-madad\rail-madad
npm run dev
```

Then run:
```powershell
.\start-dev.ps1
```

### Option 2: Use VS Code Terminal
1. Open VS Code
2. File → Open Folder
3. Select: `C:\Users\daksh\Downloads\rail-madad\rail-madad`
4. Open Terminal (Ctrl + `)
5. Terminal automatically opens in project root!

### Option 3: Add to Windows Terminal Profile
Add to Windows Terminal settings:
```json
{
    "name": "Rail Madad Dev",
    "commandline": "powershell.exe -NoExit -Command \"cd C:\\Users\\daksh\\Downloads\\rail-madad\\rail-madad\"",
    "startingDirectory": "C:\\Users\\daksh\\Downloads\\rail-madad\\rail-madad"
}
```

---

## 🌐 Access URLs

Once the server is running:

| Feature | URL |
|---------|-----|
| Homepage | http://localhost:3000 |
| Login | http://localhost:3000/auth/login |
| Register | http://localhost:3000/auth/register |
| Forgot Password | http://localhost:3000/auth/forgot-password |
| Admin Dashboard | http://localhost:3000/dashboard/admin |
| Staff Dashboard | http://localhost:3000/staff-dashboard |
| Passenger Dashboard | http://localhost:3000/dashboard/passenger |
| Submit Complaint | http://localhost:3000/complaints/new |

---

## 👥 Test Accounts

### Admin Account
```
Email: admin@railmadad.com
Password: [your admin password]
```

### Staff Account
```
Email: staff1@railmadad.com
Password: [your staff password]
```

### Passenger Account
```
Email: passenger@railmadad.com
Password: [your passenger password]
```

---

## 📊 Project Status Check

### Verify Everything is Set Up
```powershell
# 1. Check you're in the right directory
pwd
# Should show: C:\Users\daksh\Downloads\rail-madad\rail-madad

# 2. Check package.json exists
Test-Path package.json
# Should return: True

# 3. Check node_modules exists
Test-Path node_modules
# Should return: True (if not, run: npm install)

# 4. Check database exists
Test-Path sqlite.db
# Should return: True

# 5. Check environment file
Test-Path .env
# Should return: True
```

---

## 🎯 Quick Command Reference

```powershell
# Navigate to project
cd C:\Users\daksh\Downloads\rail-madad\rail-madad

# Verify location
pwd
Test-Path package.json

# Start development
npm run dev

# Build for production
npm run build

# Check for errors
npm run build 2>&1

# View running processes
Get-Process | Where-Object {$_.ProcessName -like "*node*"}

# Stop all Node processes (use with caution!)
Stop-Process -Name node -Force
```

---

## 📝 Common Workflows

### Starting Fresh Each Day
```powershell
# 1. Navigate to project
cd C:\Users\daksh\Downloads\rail-madad\rail-madad

# 2. Pull latest changes (if using git)
git pull

# 3. Install any new dependencies
npm install

# 4. Start dev server
npm run dev
```

### Making Changes
```powershell
# 1. Make code changes in your editor

# 2. Server auto-reloads (no restart needed)

# 3. Check for TypeScript errors
npm run build

# 4. Test in browser
# Visit: http://localhost:3000
```

### Before Committing Code
```powershell
# 1. Ensure no errors
npm run build

# 2. Check code format (if using prettier)
npm run format

# 3. Run tests (if available)
npm test

# 4. Commit changes
git add .
git commit -m "Your message"
git push
```

---

## 🆘 Emergency Fixes

### Everything is Broken!
```powershell
# Nuclear option - full reset
cd C:\Users\daksh\Downloads\rail-madad\rail-madad

# Remove all generated files
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json

# Reinstall everything
npm install

# Rebuild
npm run build

# Start fresh
npm run dev
```

### Port Issues
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID 12345 /F

# Or use different port
$env:PORT=3001; npm run dev
```

### Database Issues
```powershell
# Backup current database
Copy-Item sqlite.db sqlite.db.backup

# Reset database (if you have seed scripts)
node scripts/reset-db.ts
node scripts/seed.ts

# Or use your specific scripts
npm run db:reset
npm run db:seed
```

---

## ✅ Success Checklist

Before you start working:
- [ ] Navigate to correct directory: `cd C:\Users\daksh\Downloads\rail-madad\rail-madad`
- [ ] Verify with: `Test-Path package.json` (should return True)
- [ ] Check Node.js: `node --version`
- [ ] Check npm: `npm --version`
- [ ] Dependencies installed: `Test-Path node_modules`
- [ ] Database exists: `Test-Path sqlite.db`
- [ ] Environment file: `Test-Path .env`

Ready to start:
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000
- [ ] Check console for errors

---

## 🎓 Pro Tips

1. **Always use `pwd` to check your location** before running npm commands
2. **Use VS Code's integrated terminal** - it opens in the project root automatically
3. **Bookmark http://localhost:3000** for quick access
4. **Keep the terminal open** while developing - you'll see live compilation feedback
5. **Watch for errors in the terminal** - they appear as you code
6. **Use Ctrl+C to stop the server** gracefully

---

## 📞 Need Help?

### Common Issues:
1. **Wrong directory** → Use `cd C:\Users\daksh\Downloads\rail-madad\rail-madad`
2. **Port in use** → Kill process or use different port
3. **Module errors** → Run `npm install`
4. **Build errors** → Check console output, fix TypeScript errors
5. **Database errors** → Check if sqlite.db exists

### Useful Commands:
```powershell
# Where am I?
pwd

# Is package.json here?
Test-Path package.json

# What's running on port 3000?
netstat -ano | findstr :3000

# Clear npm cache
npm cache clean --force

# Check for outdated packages
npm outdated
```

---

**Remember: Always be in `C:\Users\daksh\Downloads\rail-madad\rail-madad` before running npm commands!** ✅

---

*Last updated: October 12, 2025*
