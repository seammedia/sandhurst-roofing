import Image from "next/image";

const blogPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    tag: "Tips",
    date: "June 22, 2025",
    title: "7 Easy Ways to Make Your Roof Last Longer",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    tag: "Guides",
    date: "July 5, 2025",
    title: "Choosing the Right Roofing Material: A Homeowner's Simple Guide",
  },
  {
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=300&fit=crop",
    tag: "Advice",
    date: "July 15, 2025",
    title: "Roof Repair vs. Replacement: How to Make the Right Call",
  },
];

export default function Blog() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-green-500">&#9632;</span>
          <span className="text-sm font-semibold tracking-widest uppercase">
            Blogs
          </span>
          <span className="text-green-500">&#9632;</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-heading text-3xl md:text-5xl text-center uppercase mb-12">
          THE ROOF FILES - STORIES, GUIDES &amp; GOOD ADVICE
        </h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {post.tag}
                  </span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <h3 className="font-bold text-lg">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors">
            READ ALL BLOGS
          </button>
        </div>
      </div>
    </section>
  );
}
