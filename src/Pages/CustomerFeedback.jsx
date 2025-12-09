

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
    }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Customers</span> Say
          </h2>
          <p className="mt-4 text-xl text-gray-400">বাংলাদেশের ৫০+ কারখানা GOTRACK-এর সাথে সফল</p>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="group relative bg-slate-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-4"
            >
              {/* Avatar + Name */}
              <div className="p-6 flex items-center gap-4">
                <img
                  src={feedback.avatar}
                  alt={feedback.name}
                  className="w-16 h-16 rounded-full border-2 border-amber-500/50 object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-amber-300">{feedback.name}</h3>
                  <p className="text-sm text-gray-400">{feedback.role}</p>
                </div>
              </div>

              {/* Review Text */}
              <div className="px-6 pb-6">
                <p className="text-gray-300 leading-relaxed italic">"{feedback.text}"</p>
              </div>

              {/* Rating Stars */}
              <div className="px-6 pb-6 flex justify-end">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < feedback.rating ? 'text-amber-400' : 'text-gray-600'}`}
                    >
                      ★
                    </span>
                  ))}
                  {feedback.rating % 1 !== 0 && (
                    <span className="text-xl text-amber-400">½</span>
                  )}
                </div>
              </div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-950/50 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 btn btn-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
          >
            Share Your Feedback
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;