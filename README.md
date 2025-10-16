# 🚂 Rail Madad AI - Complaint Management System

A revolutionary AI-powered complaint management system for Indian Railways, featuring intelligent classification, real-time tracking, and automated resolution workflows.

## ✨ Features

- **🤖 AI-Powered Classification**: Automatic categorization using Google Gemini AI
- **🔍 Real-time Tracking**: Live complaint status updates and notifications
- **🎯 Role-based Dashboards**: Specialized interfaces for passengers, staff, and administrators
- **💬 AI Chatbot**: 24/7 intelligent assistant for user support
- **📊 Advanced Analytics**: Comprehensive reporting and insights
- **🔐 Secure & Scalable**: Enterprise-grade security with audit logging

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, ShadCN/UI
- **Backend**: Next.js API Routes, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **AI**: Google Gemini AI
- **Authentication**: JWT with bcrypt

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rail-madad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/rail_madad"
   JWT_SECRET="your-super-secret-jwt-key"
   GEMINI_API_KEY="your-google-gemini-api-key"
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000 to access the application.

## 🗄 Database Setup

### Run Migrations

```bash
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Open Drizzle Studio (GUI)
npm run db:studio
```

### Seed Categories

The seed script automatically creates:
- Default categories (Cleanliness, Food Quality, etc.)
- Admin user: `admin@railmadad.com` / `admin123!@#`
- Sample staff and passenger accounts

## 🔧 API Usage & Testing

### Authentication

```bash
# Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "passenger"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@railmadad.com",
    "password": "admin123!@#"
  }'
```

### Complaint Management

```bash
# Submit complaint (requires authentication)
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Dirty coach on train 12345",
    "description": "The coach was extremely dirty with garbage everywhere",
    "categoryId": 1,
    "trainNumber": "12345",
    "location": "New Delhi Station"
  }'

# Get complaints with filters
curl "http://localhost:3000/api/complaints?status=new&category=1&page=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Admin override complaint
curl -X POST http://localhost:3000/api/admin/override \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{
    "complaintId": "complaint-uuid",
    "overrides": {
      "priority": "high",
      "status": "in_progress"
    },
    "reason": "Escalated due to safety concerns"
  }'
```

### Chatbot Integration

```bash
# Send message to AI chatbot
curl -X POST http://localhost:3000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I file a complaint?",
    "context": "user: hello"
  }'
```

### Analytics (Admin Only)

```bash
# Get admin analytics
curl "http://localhost:3000/api/admin/analytics?days=30" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

## 🎭 User Roles & Permissions

### Passenger
- Submit complaints
- Track own complaints
- Use AI chatbot
- Update profile

### Staff
- View assigned complaints
- Update complaint status
- Add internal notes
- Access departmental dashboard

### Admin
- Full complaint access with filters
- Override AI classifications
- View analytics and reports
- Manage users and categories
- Access audit logs

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for secure password storage  
- **Role-based Access**: Granular permissions system
- **Audit Logging**: Complete action tracking
- **Input Validation**: Zod schema validation
- **Rate Limiting**: API protection (configurable)

## 🤖 AI Integration

### Google Gemini Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`: `GEMINI_API_KEY="your-key-here"`

### AI Features

- **Complaint Classification**: Auto-categorization and priority
- **Sentiment Analysis**: Emotional tone detection
- **Chatbot Support**: 24/7 intelligent assistance
- **Fallback Handling**: Graceful degradation when AI unavailable

### Testing AI Connection

```bash
# Test Gemini API key
node -e "
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
model.generateContent('Hello').then(result => 
  console.log('✅ Gemini API working:', result.response.text())
).catch(err => console.error('❌ Gemini API error:', err));
"
```

## 📊 Monitoring & Analytics

### Available Metrics

- Total complaints by status/category/priority
- Resolution times and rates
- AI classification accuracy
- User activity and engagement
- System performance metrics

### Database Indexes

Key indexes for performance:
- `complaints(status, created_at)`
- `complaints(user_id, created_at)`
- `complaints(category_id)`
- `complaints(assigned_user_id)`

## 🚀 Deployment

### Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing
- `GEMINI_API_KEY` - Google Gemini API key

**Optional:**
- `STORAGE_BUCKET_URL` - Cloud storage for attachments
- `SMS_PROVIDER_KEY` - SMS notifications
- `CORS_ALLOWED_ORIGINS` - CORS configuration

### Production Checklist

- [ ] Set strong JWT secret
- [ ] Configure PostgreSQL with SSL
- [ ] Set up file storage (S3/CloudStorage)
- [ ] Configure monitoring and logging
- [ ] Set up backup strategy
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up SSL certificate

## 🔧 Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── complaints/        # Complaint management
│   ├── dashboard/         # Role-based dashboards
│   └── (static pages)     # About, contact, privacy
├── components/            # React components
├── db/                    # Database schema & migrations
├── lib/                   # Utility functions
└── public/               # Static assets
```

### Database Schema

Key tables:
- `users` - User accounts and roles
- `categories` - Complaint categories
- `complaints` - Main complaints table
- `audit_logs` - Action tracking
- `ai_logs` - AI request/response logs

### Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For technical support or questions:

- **Email**: support@railmadad.gov.in
- **Phone**: 139 (Railway Helpline)
- **Documentation**: [Internal Wiki](link-to-docs)

## 📄 License

This project is proprietary software developed for Indian Railways.

---

**Rail Madad AI** - Transforming railway customer service through artificial intelligence. 🚂✨

# Rail Madad AI - Complaint Management System

An AI-powered complaint management system for Indian Railways built with Next.js, TypeScript, Drizzle ORM, and Neon PostgreSQL.

## 🚀 Features

- **AI-Powered Classification**: Intelligent complaint categorization and priority assignment
- **Real-time Tracking**: Monitor complaint status with live updates
- **Role-based Access**: Passenger, Staff, and Admin dashboards
- **Department Routing**: Automatic complaint routing to appropriate departments
- **File Attachments**: Support for images, PDFs, and other documents
- **Analytics & Reporting**: Comprehensive dashboard with trends and metrics
- **AI Feedback Loop**: Continuous model improvement through human feedback

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, ShadCN/UI
- **Backend**: Next.js API Routes, Drizzle ORM
- **Database**: Neon PostgreSQL
- **Authentication**: JWT with bcrypt password hashing
- **AI Integration**: Stub implementations (ready for ML model integration)
- **Styling**: TailwindCSS with custom Railway theme

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database (or any PostgreSQL instance)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rail-madad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database URL and other configuration:
   ```env
   DATABASE_URL="your-neon-postgresql-url"
   JWT_SECRET="your-jwt-secret-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Generate and run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📊 Database Schema

The system includes the following main entities:

- **Users**: Passengers, Staff, and Admins with role-based permissions
- **Complaints**: Main complaint records with AI classification
- **Departments**: Service departments (Cleanliness, Food, Technical, etc.)
- **Attachments**: File uploads linked to complaints
- **Updates**: Complaint status updates and comments
- **Notifications**: Real-time user notifications
- **AI Feedback**: Human corrections for model improvement
- **Analytics Events**: System usage tracking

## 🔑 Default Login Credentials

After running the seed script:

- **Admin**: admin@railmadad.com / admin123!@#
- **Staff**: staff1@railmadad.com / staff123
- **Passenger**: passenger1@example.com / passenger123

## 🤖 AI Integration

The system includes stub implementations for:

- **Complaint Classification**: Category, priority, and department assignment
- **Sentiment Analysis**: Emotional tone detection
- **Feedback Loop**: Human corrections for model improvement
- **Model Retraining**: Admin-triggered model updates

To integrate with actual ML models:
1. Replace stub implementations in `lib/ai.ts`
2. Update API endpoints to call your ML services
3. Configure model endpoints in environment variables

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Complaints
- `GET /api/complaints` - List complaints (filtered by user role)
- `POST /api/complaints` - Submit new complaint
- `GET /api/complaints/[id]` - Get complaint details
- `PUT /api/complaints/[id]` - Update complaint
- `POST /api/complaints/[id]/updates` - Add complaint update

### AI Services
- `POST /api/ai/classify` - Classify complaint text
- `POST /api/ai/feedback` - Submit AI feedback
- `POST /api/ai/retrain` - Trigger model retraining (Admin only)

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## 🎨 UI Components

Built with ShadCN/UI components for consistent, accessible design:

- Buttons, Cards, Forms, Tables
- Modals, Dropdowns, Navigation
- Custom Railway theme with brand colors
- Responsive design for mobile and desktop

## 📱 Responsive Design

- Mobile-first approach
- Optimized for phones, tablets, and desktop
- Touch-friendly interface
- Progressive Web App ready

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Input validation with Zod
- SQL injection prevention
- XSS protection
- CSRF protection

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- Docker support ready
- Compatible with Railway, Netlify, AWS, etc.
- Static export support for CDN deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check documentation wiki

## 🗺 Roadmap

- [ ] SMS notifications integration
- [ ] Email notifications
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Voice complaint submission
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with railway booking systems

---

**Made with ❤️ for Indian Railways**