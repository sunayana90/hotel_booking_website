# Luxe Haven Hotel - Backend API Endpoints

## Overview
This guide describes all the API endpoints needed for the enhanced frontend to work properly.

## Base URL
```
http://localhost:5000/api
```

---

## Endpoints

### 1. Contact Form Submission
**POST** `/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Room Inquiry",
  "message": "I would like to know more about your rooms"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

### 2. Booking Submission
**POST** `/bookings`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "checkIn": "2025-12-20",
  "checkOut": "2025-12-25",
  "guests": 2,
  "roomType": "deluxe",
  "specialRequests": "Early check-in preferred"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "bookingId": "BK123456",
  "message": "Booking confirmed",
  "confirmationEmail": "sent to john@example.com"
}
```

---

### 3. User Registration
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "USER123"
}
```

---

### 4. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "USER123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 5. Get User Profile (Protected)
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "user": {
    "id": "USER123",
    "name": "John Doe",
    "email": "john@example.com",
    "bookings": []
  }
}
```

---

### 6. Get All Rooms
**GET** `/rooms`

**Query Parameters:**
- `category`: (optional) "DELUXE", "EXECUTIVE", "PRESIDENTIAL", "STANDARD"
- `minPrice`: (optional) minimum price
- `maxPrice`: (optional) maximum price

**Response:** (200 OK)
```json
{
  "success": true,
  "rooms": [
    {
      "id": "ROOM001",
      "title": "Deluxe King Suite",
      "price": 150,
      "category": "DELUXE",
      "image": "url",
      "rating": 4.8,
      "reviews": 156,
      "features": ["Free WiFi", "City View"],
      "beds": "1 King Bed",
      "size": "35 m²"
    }
  ]
}
```

---

### 7. Get Bookings for User (Protected)
**GET** `/bookings/user`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "bookings": [
    {
      "id": "BK123456",
      "roomType": "deluxe",
      "checkIn": "2025-12-20",
      "checkOut": "2025-12-25",
      "guests": 2,
      "totalPrice": 750,
      "status": "confirmed"
    }
  ]
}
```

---

### 8. Cancel Booking (Protected)
**DELETE** `/bookings/{bookingId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input data",
  "details": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required",
  "message": "Invalid token or not logged in"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

---

## Implementation Notes

### Authentication
- Use JWT tokens for authentication
- Include token in Authorization header: `Bearer {token}`
- Tokens should expire after 24 hours

### Validation
- Validate all inputs on the backend
- Return meaningful error messages
- Check for duplicate emails during registration

### Email Notifications
- Send confirmation email after booking
- Send contact form submission confirmation
- Send password reset emails

### Database
- Store bookings with all details
- Maintain user accounts securely
- Keep contact form submissions for follow-up

### CORS
Configure CORS to allow requests from:
```
http://localhost:5173 (Vite dev server)
http://localhost:3000 (Production)
```

---

## Testing the Endpoints

Use tools like Postman or cURL to test:

```bash
# Test contact endpoint
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "subject": "Test",
    "message": "Testing the API"
  }'
```

---

## Implementation Priority

1. **High Priority:**
   - Contact form endpoint
   - Booking endpoint
   - User registration & login

2. **Medium Priority:**
   - Get rooms endpoint
   - User profile endpoint
   - Get bookings endpoint

3. **Nice to Have:**
   - Cancel booking endpoint
   - Email notifications
   - Advanced filtering for rooms

---

## Notes for Backend Developer

- The frontend uses localStorage for temporary user data
- Real authentication should use secure JWT tokens
- All forms have client-side validation but backend validation is essential
- Consider implementing rate limiting for contact/booking endpoints
- Log all booking submissions for analytics
