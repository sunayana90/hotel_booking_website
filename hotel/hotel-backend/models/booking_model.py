from datetime import datetime

def booking_schema(data):
    return {
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "roomType": data["roomType"],
        "guests": data["guests"],
        "checkIn": data["checkIn"],
        "checkOut": data["checkOut"],
        "nights": data["nights"],
        "pricePerNight": data["pricePerNight"],
        "extraGuestCost": data["extraGuestCost"],
        "gst": data["gst"],
        "totalAmount": data["totalAmount"],
        "createdAt": datetime.utcnow()
    }
