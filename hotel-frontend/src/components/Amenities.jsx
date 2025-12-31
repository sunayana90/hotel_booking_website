export default function Amenities() {
  return (
    <section className="bg-black py-20 text-center">
      <h2 className="text-4xl font-serif text-yellow-400 mb-4">
        World-Class Amenities
      </h2>
      <p className="text-gray-400 mb-12">
        Experience luxury at every turn with our exceptional facilities
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {[
          { title: "Luxury Suites", desc: "Spacious rooms with premium amenities" },
          { title: "Fine Dining", desc: "Michelin-starred cuisine" },
          { title: "Spa & Wellness", desc: "World-class spa treatments" },
          { title: "Concierge Service", desc: "24/7 personalized service" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-neutral-900 rounded-xl p-8 border border-neutral-800 hover:border-yellow-400 transition"
          >
            <h3 className="text-yellow-400 text-xl mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
