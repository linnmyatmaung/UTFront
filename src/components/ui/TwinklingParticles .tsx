
const TwinklingParticles = () => {
  const particles = Array.from({ length: 70 }); // Adjust the number of particles

  return (
    <div className="relative w-[400px] h-screen overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 5 + 2; // Random size between 2px and 7px
        const xPos = Math.random() * 100; // Random X position
        const delay = Math.random() * 2; // Random animation delay

        return (
          <div
            key={i}
            className="bg-violet-600 rounded-full absolute animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${xPos}%`,
              animationDelay: `${delay}s`,
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default TwinklingParticles;
