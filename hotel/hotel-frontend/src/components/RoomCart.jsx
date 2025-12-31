export default function RoomCard({ room }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#1b1b1b] to-black text-white shadow-[0_0_40px_rgba(212,175,55,0.15)]">

      {/* Image */}
      <div className="relative">
        <img
          src={room.image}
          alt={room.title}
          className="h-56 w-full object-cover"
        />

        {/* Price */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#e6c56e] to-[#caa23d] text-black font-semibold px-5 py-2 rounded-full">
          ₹{room.price}/night
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-gold font-serif text-xl mb-2">
          {room.title}
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          {room.description}
        </p>

        {/* Info */}
        <div className="flex gap-6 text-gray-400 text-sm mb-4">
          <span>⬜ {room.size} sqm</span>
          <span>👤 {room.guests} Guests</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full border border-[#6b5a2a] text-xs text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Button */}
        <button className="w-full border-2 border-gold text-gold py-3 rounded-xl font-semibold tracking-widest hover:bg-gold hover:text-black transition">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
