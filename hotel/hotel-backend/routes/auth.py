from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint("auth", __name__)

# 🔗 MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["luxehaven"]
users_col = db["users"]

# ========================
# 🔐 SIGN UP
# ========================
@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        
        # Check if user exists
        if users_col.find_one({"email": data["email"]}):
            return jsonify({"message": "User already exists"}), 400

        # Create user
        users_col.insert_one({
            "name": data["name"],
            "email": data["email"],
            "password": generate_password_hash(data["password"]),
            "role": "user"
        })

        return jsonify({"message": "Signup successful"}), 201
    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({"message": f"Signup failed: {str(e)}"}), 500


# ========================
# 🔐 LOGIN
# ========================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users_col.find_one({"email": data["email"]})

    # 👇 USER NOT FOUND
    if not user:
        return jsonify({
            "message": "User not found",
            "redirect": "signup"
        }), 404

    if not check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({
        "message": "Login successful",
        "role": user["role"],
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }), 200

