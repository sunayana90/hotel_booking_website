from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from chatbot import find_predefined_answer, ask_ollama
from routes.auth import auth_bp
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register auth blueprint
app.register_blueprint(auth_bp, url_prefix="/api/auth")

client = MongoClient(os.getenv("MONGO_URI"))
db = client["luxehaven"]
bookings = db["bookings"]

# -------------------------------
# CREATE BOOKING
# -------------------------------
@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.json
    bookings.insert_one(data)
    return jsonify({"message": "Booking saved"}), 201

#chatbot
@app.route("/api/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    # 1️⃣ Try predefined knowledge
    predefined = find_predefined_answer(user_message)
    if predefined:
        return jsonify({"reply": predefined})

    # 2️⃣ Fallback to Ollama
    ai_reply = ask_ollama(user_message)
    return jsonify({"reply": ai_reply})
# -------------------------------
# GET BOOKINGS BY EMAIL (PROFILE)
# -------------------------------
@app.route("/api/bookings/<email>", methods=["GET"])
def get_bookings(email):
    user_bookings = list(bookings.find(
        {"email": email},
        {"_id": 0}
    ))
    return jsonify(user_bookings)


@app.route("/")
def home():
    return {"message": "Backend running"}


if __name__ == "__main__":
    app.run(port=5000, debug=True)
