import Marquee from "react-fast-marquee";

const CustomerFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Rahim Khan",
      role: "Factory Manager, Dhaka RMG Ltd",
      text: "GOTRACK দিয়ে আমাদের প্রোডাকশন ট্র্যাকিং ৫০% দ্রুত হয়েছে। অর্ডার মিস হয় না, ইনভেন্টরি সবসময় আপডেট। সুপার সিস্টেম!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1552058544-f2b84fbe8308?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Fatima Begum",
      role: "Merchandiser, Chittagong Apparel",
      text: "ছোট কারখানার জন্য পারফেক্ট। কাটিং থেকে ডেলিভারি সব এক জায়গায় দেখি। বায়ার খুশি, আমরা লাভবান!",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Sohag Ahmed",
      role: "Owner, Sylhet Garments Co.",
      text: "রিয়েল-টাইম রিপোর্টিং দারুণ। স্টক ম্যানেজমেন্টে কোনো ভুল হয় না। ফ্রি ট্রায়াল নিয়ে শুরু করো!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    // আরো ফিডব্যাক যোগ করলে স্ক্রল আরো সুন্দর হবে
    {
      id: 4,
      name: "Karim Hossain",
      role: "Production Head, Gazipur Textiles",
      text: "আমাদের ৮০০+ ওয়ার্কারের কাজ এখন এক ক্লিকে দেখি। ডেলিভারি ৯৮% অন-টাইম!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
              Customers
            </span>{" "}
            Say
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            বাংলাদেশের ৫০+ কারখানা GOTRACK-এর সাথে সফল
          </p>
        </div>

        {/* Auto Scrolling Marquee */}
        <Marquee 
          gradient={false} 
          speed={40} 
          pauseOnHover={true}
          className="py-8"
        >
          <div className="flex gap-8 px-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="group relative bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 min-w-[380px] mx-4"
              >
                {/* Avatar + Name */}
                <div className="p-6 flex items-center gap-4 border-b border-white/5">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-16 h-16 rounded-full border-4 border-amber-500/40 object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-amber-300">{feedback.name}</h3>
                    <p className="text-sm text-gray-400">{feedback.role}</p>
                  </div>
                </div>

                {/* Review Text */}
                <div className="px-6 py-5">
                  <p className="text-gray-300 text-base leading-relaxed italic">
                    "{feedback.text}"
                  </p>
                </div>

                {/* Rating Stars */}
                <div className="px-6 pb-6 flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl drop-shadow-md ${
                          i < Math.floor(feedback.rating) 
                            ? "text-amber-400" 
                            : i < feedback.rating 
                              ? "text-amber-400" 
                              : "text-gray-700"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-amber-400 font-bold text-lg">
                    {feedback.rating} / 5
                  </span>
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </Marquee>

        {/* CTA Below */}
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 btn btn-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg shadow-2xl shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
          >
            Share Your Experience
          </a>
        </div>

      </div>
    </section>
  );
};

export default CustomerFeedback;