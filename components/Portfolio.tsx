import Image from "next/image";

const portfolioImages = [
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=250&h=200&fit=crop",
    alt: "House roof project 1",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=250&h=200&fit=crop",
    alt: "House roof project 2",
  },
  {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=250&h=200&fit=crop",
    alt: "House roof project 3",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=250&h=200&fit=crop",
    alt: "House roof project 4",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=250&h=200&fit=crop",
    alt: "House roof project 5",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=250&h=200&fit=crop",
    alt: "House roof project 6",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=250&h=200&fit=crop",
    alt: "House roof project 7",
  },
  {
    src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=250&h=200&fit=crop",
    alt: "House roof project 8",
  },
];

export default function Portfolio() {
  return (
    <section className="relative bg-[#f5f5f5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Curved White Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px]"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,0 Q720,60 1440,0 L1440,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-green-500 text-xs">&#9632;</span>
          <span className="text-sm tracking-widest text-gray-500 uppercase">
            Our Portfolio
          </span>
          <span className="text-green-500 text-xs">&#9632;</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-12">
          A Look At What We&apos;ve Nailed
        </h2>

        {/* Gallery Strip */}
        <div className="overflow-hidden rounded-lg mb-12">
          <div className="flex gap-3">
            {portfolioImages.map((img, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[200px] h-[160px] md:w-[250px] md:h-[200px] rounded-lg overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="250px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button className="bg-black text-white uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gray-800 transition-colors">
            View Projects
          </button>
          <button className="border-2 border-black text-black uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-black hover:text-white transition-colors">
            View Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
