Rail-Madad-AI
Rail Madad AI is an AI-powered complaint management system for Indian Railways. Built with Next.js 14, TypeScript & PostgreSQL, it features intelligent complaint classification via Google Gemini AI, real-time tracking, role-based dashboards, automated routing, 24/7 chatbot support & analytics.

An AI-powered complaint management system for Indian Railways built with Next.js, TypeScript, and Drizzle ORM.

Features

AI-powered complaint classification and routing
Real-time complaint tracking and notifications
Role-based dashboards for passengers, staff, and admins
File upload support for complaint attachments
Analytics and reporting dashboard
AI chatbot for user assistance
Secure authentication with JWT


Tech Stack
Frontend: Next.js 14, TypeScript, TailwindCSS, ShadCN/UI
Backend: Next.js API Routes
Database: SQLite (development), PostgreSQL (production)
ORM: Drizzle ORM
AI: Google Gemini AI
Authentication: JWT with bcrypt


Installation
Clone the repository:

git clone <repository-url>
cd rail-madad
Install dependencies:

npm install
Set up environment variables: Create a .env file with:

DATABASE_URL="file:./sqlite.db"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
Run database migrations:

npm run db:migrate
Seed the database:

npm run db:seed
Start the development server:

npm run dev
Visit http://localhost:3000 to access the application.

Default Login Credentials
After running the seed script, you can use these default accounts:

Admin: admin@railmadad.com / password123
Staff: staff1@railmadad.com / password123
Passenger: passenger1@example.com / password123

Usage
Authentication
Register as a passenger, staff, or admin
Login with your credentials
Filing a Complaint
Navigate to the complaints page
Fill in the complaint details
Upload any relevant files
Submit the complaint
Managing Complaints (Staff/Admin)
View assigned complaints
Update complaint status
Add internal notes
Route to appropriate departments

API
The application provides RESTful API endpoints for:

Authentication (/api/auth)
Complaints (/api/complaints)
File uploads (/api/upload)
Analytics (/api/analytics)


Database
The project uses Drizzle ORM with SQLite for development and PostgreSQL for production.

To reset and seed the database:

npm run db:fresh

Scripts
npm run dev - Start development server
npm run build - Build for production
npm run start - Start production server
npm run db:migrate - Run database migrations
npm run db:seed - Seed database with sample data
npm run db:studio - Open Drizzle Studio
Contributing
Fork the repository
Create a feature branch
Make your changes
Submit a pull request


License
This project is licensed under the MIT License.
