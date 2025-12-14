# QuickHire Backend Setup Guide

## Prerequisites
- Node.js installed
- MongoDB database (local or MongoDB Atlas)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB

#### Option A: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickhire?retryWrites=true&w=majority
```

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/quickhire
```

### 3. Seed the Database

After setting up MongoDB, seed the database with sample pros:

```bash
# Make a POST request to the seed endpoint
curl -X POST http://localhost:3000/api/seed
```

Or visit: `http://localhost:3000/api/seed` in your browser (though POST requests work better with curl/Postman)

### 4. Run the Development Server

```bash
npm run dev
```

## API Endpoints

### GET `/api/pros`
Fetch pros with filters:
- `location` - Filter by city name
- `service` - Filter by service name
- `search` - Search by name or service
- `sortBy` - Sort by: `rating`, `distance`, `reviews`, `response`

Example:
```
GET /api/pros?location=Karachi&service=Home Cleaning&sortBy=rating
```

### POST `/api/pros`
Create a new pro (requires pro data in request body)

### GET `/api/location`
Get city name from coordinates:
- `lat` - Latitude
- `lng` - Longitude

Example:
```
GET /api/location?lat=24.8607&lng=67.0011
```

### POST `/api/seed`
Seed the database with sample pros (development only)

## Features

1. **Location Detection**: Automatically detects user location using browser geolocation API
2. **Service Filtering**: Click on a service to see pros offering that service in your area
3. **Dynamic Filtering**: Filter pros by location, service, and search query
4. **Sorting**: Sort pros by rating, reviews, distance, or response time

## Database Models

### Pro Model
- Basic info (name, email, phone, avatar)
- Location (city, coordinates)
- Services array
- Ratings and reviews
- Business details (years in business, employees, response time)
- Verification status

### Service Model
- Service title and description
- Category and icon
- Slug for URL-friendly identifiers

## Next Steps

1. Add authentication for pros to manage their profiles
2. Add booking/reservation system
3. Add payment integration
4. Add review and rating system
5. Add real-time notifications

