import { useState } from "react";
import { Mail } from "lucide-react";

export default function BannerOffering() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      // Here you would typically handle the submission to your backend
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="container mx-auto relative bg-black text-white p-16 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="banner-title">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide">
            Stay up to date about
          </h2>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide">
            our latest offers
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-3 pl-10 pr-10 bg-white text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            Subscribe to Newsletter
          </button>
        </div>
        {isSubmitted && (
          <div className="mt-2 text-green-400">Thank you for subscribing!</div>
        )}
      </div>
    </div>
  );
}
