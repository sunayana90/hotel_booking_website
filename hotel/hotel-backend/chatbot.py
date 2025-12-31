import requests
import re

OLLAMA_URL = "http://localhost:11434/api/generate"

# ✅ COMPREHENSIVE PREDEFINED HOTEL KNOWLEDGE
HOTEL_KNOWLEDGE = [
    {
        "keywords": ["book", "booking", "reservation", "reserve"],
        "response": "📅 You can book a room directly from our 'Book Now' page. We offer:\n• Standard Rooms: ₹8,000/night\n• Deluxe Rooms: ₹12,000/night\n• Executive Suites: ₹20,000/night\n• Presidential Suites: ₹40,000/night\nBooking confirmation is instant!"
    },
    {
        "keywords": ["price", "cost", "rate", "how much"],
        "response": "💰 Our Room Rates:\n• Standard: ₹8,000/night\n• Deluxe: ₹12,000/night\n• Executive: ₹20,000/night\n• Presidential: ₹40,000/night\nGST will be added at checkout. Extra guests: ₹1,500/night"
    },
    {
        "keywords": ["check-in", "check out", "timing", "time"],
        "response": "⏰ Hotel Timings:\n• Check-in: 12:00 PM\n• Check-out: 11:00 AM\n• Early check-in or late check-out available on request (subject to availability)"
    },
    {
        "keywords": ["location", "address", "where"],
        "response": "📍 Location:\nLuxe Haven Hotel\n123 Luxury Boulevard\nMumbai, Maharashtra 400001\nIndia\n\nConveniently located near major attractions and business districts."
    },
    {
        "keywords": ["contact", "phone", "email", "call", "reach"],
        "response": "📞 Contact Us:\n• Phone: +91 (22) 1234-5678\n• Email: info@luxehaven.com\n• Available 24/7 for assistance"
    },
    {
        "keywords": ["food", "restaurant", "menu", "dining", "eat"],
        "response": "🍽️ Dining Options:\n• Multi-cuisine restaurant\n• Vegetarian & non-vegetarian options\n• Room service available 24/7\n• Special dietary requirements accommodated\n• In-room dining menu available"
    },
    {
        "keywords": ["amenities", "facility", "facilities"],
        "response": "✨ Our Amenities:\n• Free WiFi throughout\n• Swimming pool\n• Business center\n• Spa & wellness center\n• Conference rooms\n• Concierge service\n• Car rental assistance"
    },
    {
        "keywords": ["room", "rooms", "suite"],
        "response": "🏨 Room Types:\n• Standard: Cozy rooms with city views\n• Deluxe: Spacious with premium bedding & balcony\n• Executive: Full-service suites with workspace\n• Presidential: Luxury suites with private amenities"
    },
    {
        "keywords": ["wifi", "internet", "connection"],
        "response": "📶 Internet:\nComplimentary high-speed WiFi available in all rooms and common areas."
    },
    {
        "keywords": ["pool", "swimming", "gym", "fitness"],
        "response": "🏊 Recreation:\n• Olympic-size swimming pool\n• Modern fitness center\n• Yoga classes\n• Spa treatments available"
    },
    {
        "keywords": ["payment", "card", "credit"],
        "response": "💳 Payment Methods:\n• Credit/Debit Cards\n• Net Banking\n• Digital Wallets\n• Cash payments\nAll transactions are secure and encrypted."
    },
    {
        "keywords": ["cancel", "cancellation", "refund"],
        "response": "❌ Cancellation Policy:\n• Free cancellation up to 24 hours before check-in\n• 50% refund if cancelled 12-24 hours before\n• No refund for cancellations within 12 hours\nContact our team for specific situations."
    },
    {
        "keywords": ["pet", "dog", "cat", "animal"],
        "response": "🐾 Pet Policy:\nPets are welcome at Luxe Haven!\n• Per-night charge: ₹500\n• Pet-friendly rooms available\n• Pet amenities provided\nPlease inform during booking."
    },
    {
        "keywords": ["couple", "honeymoon", "romantic"],
        "response": "💑 Romantic Getaway:\nWe offer special honeymoon packages with:\n• Champagne welcome\n• Couple spa treatments\n• Romantic dinner arrangements\nBook our Romantic Honeymoon Suite!"
    },
    {
        "keywords": ["family", "kids", "children"],
        "response": "👨‍👩‍👧‍👦 Family-Friendly:\n• Family Connecting Rooms available\n• Kids activities & games\n• Family dining options\n• Safe play areas\nPerfect for family vacations!"
    }
]

def find_predefined_answer(user_message):
    """Find answer from predefined knowledge base"""
    text = user_message.lower().strip()
    
    # Check for exact matches first (higher priority)
    best_match = None
    best_score = 0
    
    for item in HOTEL_KNOWLEDGE:
        for keyword in item["keywords"]:
            if keyword in text:
                # Give higher score if keyword matches more completely
                score = len(keyword)
                if score > best_score:
                    best_score = score
                    best_match = item["response"]
    
    return best_match

def ask_ollama(prompt):
    """Get response from Ollama AI"""
    try:
        hotel_context = """You are a helpful and professional hotel assistant for Luxe Haven, a luxury hotel in Mumbai. 
        You should:
        - Be friendly and professional
        - Provide accurate information about the hotel
        - Answer questions about rooms, amenities, pricing, booking, and hotel policies
        - If asked about something not related to the hotel, politely redirect to hotel services
        - Keep responses concise and helpful
        - Use emojis when appropriate to make responses engaging"""
        
        payload = {
            "model": "llama2",  # Changed to llama2 for better compatibility
            "prompt": f"{hotel_context}\n\nUser Question: {prompt}\nAssistant:",
            "stream": False,
            "temperature": 0.7
        }

        response = requests.post(OLLAMA_URL, json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if "response" in result:
                return result["response"].strip()
        
        return "I apologize, but I'm having trouble processing your request. Please try again or contact us directly."
        
    except requests.exceptions.ConnectionError:
        return "⚠️ I'm temporarily unavailable. Please try again later or contact us at +91 (22) 1234-5678."
    except Exception as e:
        print(f"Ollama error: {e}")
        return "Sorry, I encountered an issue. Please contact our support team."
