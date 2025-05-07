import React from "react";

function ClientSection() {
  const clients = [
    {
      name: "The Body Shop Logo",
      logoUrl: "/src/assets/images/the-body-shop.webp",
    },
    { name: "BCA Logo", logoUrl: "/src/assets/images/BCA.webp" },
    { name: "Telkomsel Logo", logoUrl: "/src/assets/images/Telkomsel.webp" },
    { name: "Lotte Mart Logo", logoUrl: "/src/assets/images/lotte-mart.webp" },
    { name: "Olsera Logo", logoUrl: "/src/assets/images/Olsera.webp" },
    // Duplicate logos to ensure continuous scrolling
    {
      name: "The Body Shop Logo",
      logoUrl: "/src/assets/images/the-body-shop.webp",
    },
    { name: "BCA Logo", logoUrl: "/src/assets/images/BCA.webp" },
    { name: "Telkomsel Logo", logoUrl: "/src/assets/images/Telkomsel.webp" },
    { name: "Lotte Mart Logo", logoUrl: "/src/assets/images/lotte-mart.webp" },
    { name: "Olsera Logo", logoUrl: "/src/assets/images/Olsera.webp" },
  ];

  return (
    <div className="w-full bg-black py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-4 flex items-center justify-center"
            >
              <img
                src={client.logoUrl}
                alt={`${client.name} logo`}
                className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain transition-all duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ClientSection;
