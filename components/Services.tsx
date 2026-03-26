import Image from "next/image";

const services = [
  {
    title: "ROOF INSTALLATION",
    description:
      "Built strong from the start — because a solid roof starts with a solid install.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
  },
  {
    title: "ROOF REPAIR",
    description:
      "Leaks, cracks, or storm damage? We patch it up before it gets worse.",
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=300&fit=crop",
  },
  {
    title: "ROOF REPLACEMENT",
    description:
      "Out with the old, in with something way better (and leak-free).",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  },
  {
    title: "ROOF INSPECTIONS",
    description:
      "Spot problems early, fix them fast, and keep your roof happy.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
  {
    title: "ROOF COATING",
    description: "It's like sunscreen... but for your roof.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
  },
  {
    title: "COMMERCIAL ROOFING",
    description:
      "From the ground up to the top of the roof — we've got you covered.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-green-500 text-xs">&#9632;</span>
          <span className="text-sm tracking-widest text-gray-500 uppercase">
            Our Services
          </span>
          <span className="text-green-500 text-xs">&#9632;</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-12">
          We Climb So You Don&apos;t Have To
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="flex flex-1">
                {/* Text Side */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm uppercase mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  {/* Green Arrow Button */}
                  <div className="mt-4">
                    <button className="w-8 h-8 bg-green-500 rounded flex items-center justify-center hover:bg-green-600 transition-colors">
                      <span className="text-white text-sm font-bold">
                        &gt;
                      </span>
                    </button>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative w-[140px] min-h-[180px] flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="bg-black text-white uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gray-800 transition-colors flex items-center gap-2">
            View All Services
            <span className="text-lg">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
