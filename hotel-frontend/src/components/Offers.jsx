export default function Offers() {
  return (
    <section className="bg-black py-20 text-center">
      <h2 className="text-4xl font-serif text-yellow-400 mb-4">
        Exclusive Offers
      </h2>
      <p className="text-gray-400 mb-12">
        Curated packages for unforgettable experiences
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {[
          { title: "Romantic Getaway", off: "20% OFF" },
          { title: "Business Executive Suite", off: "15% OFF" },
          { title: "Weekend Luxury Escape", off: "25% OFF" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-neutral-900 rounded-xl p-8 border border-neutral-800"
          >
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
              {item.off}
            </span>
            <h3 className="text-yellow-400 text-xl mt-6">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
