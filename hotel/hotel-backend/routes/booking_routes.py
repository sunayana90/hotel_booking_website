from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from config import MONGO_URI
from models.booking_model import booking_schema

booking_bp = Blueprint("booking", __name__)

client = MongoClient(MONGO_URI)
db = client["luxe_haven"]
bookings = db["bookings"]

@booking_bp.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.json
    booking = booking_schema(data)
    bookings.insert_one(booking)
    return jsonify({"message": "Booking successful"}), 201

@booking_bp.route("/api/bookings/<email>", methods=["GET"])
def get_bookings(email):
    user_bookings = list(bookings.find({"email": email}, {"_id": 0}))
    return jsonify(user_bookings), 200
