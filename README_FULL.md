# QuickHire - Full Stack Service Marketplace

A complete web application connecting customers with service professionals (pros) in Pakistan. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

### For Customers
- ✅ Browse all pros or filter by service and location
- ✅ View detailed pro profiles with reviews
- ✅ Contact pros through the platform (requires login)
- ✅ Create and manage contracts
- ✅ Leave reviews after service completion
- ✅ Dashboard to track all contracts

### For Professionals (Pros)
- ✅ Create and manage pro profile
- ✅ Receive contact requests from customers
- ✅ Accept/reject contracts
- ✅ Manage contract status
- ✅ View reviews and ratings
- ✅ Dashboard to manage all contracts

### Core Features
- ✅ User authentication (Login/Register)
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Contract management system
- ✅ Review and rating system
- ✅ Location-based filtering
- ✅ Service-based filtering
- ✅ Responsive design
- ✅ Dark mode support

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Icons**: React Icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/quickhire
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickhire?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Set Up MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to `.env.local`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/quickhire` in `.env.local`

### 4. Seed the Database

After setting up MongoDB, seed the database:

```bash
# Using curl
curl -X POST http://localhost:3000/api/seed

# Or using Postman/Thunder Client
# POST http://localhost:3000/api/seed
```

This will create:
- 9 services
- 100+ pros across different cities and services

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
quick-hire/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── pros/           # Pro listing and filtering
│   │   ├── contacts/       # Contact/contract creation
│   │   ├── contracts/      # Contract management
│   │   ├── reviews/        # Review system
│   │   └── seed/           # Database seeding
│   ├── dashboard/          # User dashboard
│   ├── hire/               # Browse pros page
│   ├── join/               # Login/Register page
│   ├── pro/[id]/           # Pro profile page
│   └── services/           # Services listing
├── components/              # React components
├── contexts/               # React contexts (AuthContext)
├── lib/                    # Utilities (MongoDB, auth)
├── models/                 # Mongoose models
│   ├── User.js            # User model
│   ├── Pro.js             # Pro model
│   ├── Contract.js        # Contract model
│   ├── Review.js          # Review model
│   └── Service.js         # Service model
└── public/                 # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Pros
- `GET /api/pros` - Get pros with filters (location, service, search, sortBy)
- `GET /api/pros/[id]` - Get single pro details

### Contracts
- `POST /api/contacts` - Create contact request/contract (requires auth)
- `GET /api/contacts` - Get user's contracts (requires auth)
- `GET /api/contracts/[id]` - Get contract details (requires auth)
- `PATCH /api/contracts/[id]` - Update contract (pro only, requires auth)

### Reviews
- `POST /api/reviews` - Create review (requires auth)
- `GET /api/reviews?proId=[id]` - Get reviews for a pro

### Seed
- `POST /api/seed` - Seed database with sample data

## User Flow

### Customer Flow
1. Browse pros on `/hire` page
2. Click on a service to filter pros by service and location
3. View pro profile on `/pro/[id]`
4. Click "Contact Pro" (requires login)
5. Fill contact form to create contract
6. Track contracts in `/dashboard`
7. Leave review after service completion

### Pro Flow
1. Register as pro (or convert customer account)
2. Create/update pro profile
3. View contact requests in `/dashboard`
4. Accept/reject contracts
5. Update contract status
6. View reviews and ratings

## Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Tokens expire after 7 days
- Protected routes check for valid token
- AuthContext provides global auth state

## Database Models

### User
- Customer and pro accounts
- Password hashing with bcrypt
- Role-based access (customer/pro)

### Pro
- Professional profiles
- Services offered
- Location and contact info
- Ratings and reviews

### Contract
- Links customer and pro
- Status workflow (pending → accepted → completed)
- Quote and scheduling
- Message history

### Review
- Customer reviews for pros
- Rating (1-5 stars)
- Verified reviews (from completed contracts)

## Development Notes

- All API routes are in `app/api/`
- Client components use `"use client"` directive
- Server components can directly access database
- AuthContext provides global authentication state
- Protected routes check authentication before rendering

## Production Checklist

- [ ] Change JWT_SECRET to a secure random string
- [ ] Set up MongoDB Atlas production cluster
- [ ] Configure environment variables
- [ ] Set up error logging
- [ ] Add rate limiting to API routes
- [ ] Implement email verification
- [ ] Add payment integration
- [ ] Set up file upload for pro images
- [ ] Configure CORS if needed
- [ ] Add analytics
- [ ] Set up monitoring

## Next Steps

1. Add email notifications for contracts
2. Implement real-time messaging
3. Add payment processing
4. Create pro onboarding flow
5. Add admin dashboard
6. Implement search functionality
7. Add image uploads
8. Create mobile app

## Support

For issues or questions, check the code comments or create an issue in the repository.

