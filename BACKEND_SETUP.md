# Backend Development Guide

## Setup Instructions

### 1. Environment Setup

```bash
cd hotel-backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install flask flask-cors flask-sqlalchemy python-dotenv flask-jwt-extended python-dateutil
```

### 3. Create requirements.txt

```bash
pip freeze > requirements.txt
```

## Project Structure

```
hotel-backend/
├── app.py                  # Main Flask application
├── config.py              # Configuration settings
├── models.py              # Database models
├── routes/
│   ├── __init__.py
│   ├── auth.py           # Authentication routes
│   ├── bookings.py       # Booking management
│   ├── contact.py        # Contact form submission
│   └── rooms.py          # Room listing
├── utils/
│   ├── __init__.py
│   ├── decorators.py     # Custom decorators
│   └── email.py          # Email utilities
├── templates/            # Email templates
├── .env                  # Environment variables
├── .gitignore
└── requirements.txt
```

## Flask App Structure (app.py)

```python
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotel.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Register blueprints
from routes.auth import auth_bp
from routes.bookings import bookings_bp
from routes.contact import contact_bp
from routes.rooms import rooms_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
app.register_blueprint(contact_bp, url_prefix='/api/contact')
app.register_blueprint(rooms_bp, url_prefix='/api/rooms')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Database Models (models.py)

```python
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    special_requests = db.Column(db.Text)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('bookings', lazy=True))

class ContactSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='new')  # new, read, replied
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(500))
    description = db.Column(db.Text)
    rating = db.Column(db.Float, default=4.5)
    reviews = db.Column(db.Integer, default=0)
    beds = db.Column(db.String(100))
    size = db.Column(db.String(50))
    features = db.Column(db.JSON)  # List of features
    available = db.Column(db.Boolean, default=True)
```

## Authentication Routes (routes/auth.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from models import User
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validation
    if not all(k in data for k in ['name', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create user
    user = User(name=data['name'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'User registered successfully',
        'userId': user.id
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(hours=24)
    )
    
    return jsonify({
        'success': True,
        'token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'success': True,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 200
```

## Booking Routes (routes/bookings.py)

```python
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Booking, User
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('', methods=['POST'])
def create_booking():
    data = request.get_json()
    
    # Validation
    required_fields = ['name', 'email', 'phone', 'checkIn', 'checkOut', 'guests', 'roomType']
    if not all(k in data for k in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create booking
    booking = Booking(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        check_in=datetime.strptime(data['checkIn'], '%Y-%m-%d').date(),
        check_out=datetime.strptime(data['checkOut'], '%Y-%m-%d').date(),
        guests=int(data['guests']),
        room_type=data['roomType'],
        special_requests=data.get('specialRequests', ''),
        total_price=calculate_price(data['roomType'], data['checkIn'], data['checkOut']),
        user_id=1  # For now, assign to demo user
    )
    
    db.session.add(booking)
    db.session.commit()
    
    # TODO: Send confirmation email
    
    return jsonify({
        'success': True,
        'bookingId': f'BK{booking.id:06d}',
        'message': 'Booking confirmed'
    }), 201

def calculate_price(room_type, check_in, check_out):
    room_prices = {
        'deluxe': 150,
        'executive': 250,
        'presidential': 500,
        'standard': 100
    }
    
    check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
    check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
    nights = (check_out_date - check_in_date).days
    
    price_per_night = room_prices.get(room_type.lower(), 100)
    return price_per_night * nights

@bookings_bp.route('/user', methods=['GET'])
@jwt_required()
def user_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'success': True,
        'bookings': [{
            'id': f'BK{b.id:06d}',
            'roomType': b.room_type,
            'checkIn': b.check_in.isoformat(),
            'checkOut': b.check_out.isoformat(),
            'guests': b.guests,
            'totalPrice': b.total_price,
            'status': b.status
        } for b in bookings]
    }), 200

@bookings_bp.route('/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    booking = Booking.query.get(booking_id)
    
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    booking.status = 'cancelled'
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Booking cancelled successfully'
    }), 200
```

## Contact Routes (routes/contact.py)

```python
from flask import Blueprint, request, jsonify
from app import db
from models import ContactSubmission

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('', methods=['POST'])
def submit_contact():
    data = request.get_json()
    
    # Validation
    required_fields = ['name', 'email', 'phone', 'subject', 'message']
    if not all(k in data for k in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Create submission
    submission = ContactSubmission(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        subject=data['subject'],
        message=data['message']
    )
    
    db.session.add(submission)
    db.session.commit()
    
    # TODO: Send confirmation email
    
    return jsonify({
        'success': True,
        'message': 'Message sent successfully'
    }), 200
```

## Room Routes (routes/rooms.py)

```python
from flask import Blueprint, request, jsonify
from app import db
from models import Room

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('', methods=['GET'])
def get_rooms():
    category = request.args.get('category')
    
    query = Room.query.filter_by(available=True)
    
    if category:
        query = query.filter_by(category=category.upper())
    
    rooms = query.all()
    
    return jsonify({
        'success': True,
        'rooms': [{
            'id': room.id,
            'title': room.title,
            'price': room.price,
            'category': room.category,
            'image': room.image,
            'rating': room.rating,
            'reviews': room.reviews,
            'features': room.features,
            'beds': room.beds,
            'size': room.size
        } for room in rooms]
    }), 200
```

## Environment Variables (.env)

```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///hotel.db
JWT_SECRET_KEY=your-super-secret-key-change-this
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## Running the Backend

```bash
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Initialize database
python -c "from app import db; db.create_all()"

# Run Flask app
flask run

# Or
python app.py
```

The backend will run at `http://localhost:5000`

## Database Initialization

```python
from app import app, db
from models import User, Booking, ContactSubmission, Room

with app.app_context():
    db.create_all()
    print("Database tables created successfully!")
```

## Testing Endpoints

Use Postman or cURL to test:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Create Booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "checkIn": "2025-12-20",
    "checkOut": "2025-12-25",
    "guests": 2,
    "roomType": "deluxe"
  }'

# Submit Contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+91 9876543210",
    "subject": "Inquiry",
    "message": "I have a question"
  }'
```

## Common Issues & Solutions

### CORS Error
Make sure `flask-cors` is installed and CORS is configured:
```python
from flask_cors import CORS
CORS(app)
```

### Database Locked
Delete `hotel.db` and recreate:
```python
db.create_all()
```

### JWT Token Issues
Check that JWT_SECRET_KEY is set and tokens are properly formatted

## Next Steps

1. Add email notifications using Flask-Mail
2. Implement payment processing
3. Add database migrations using Alembic
4. Implement rate limiting
5. Add comprehensive error handling
6. Create admin dashboard routes
7. Add logging functionality

---

**Note**: This is a template. Customize as needed for your specific requirements.
