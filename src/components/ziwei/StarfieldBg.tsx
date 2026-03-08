import ziweiBackground from "@/assets/ziwei-bg.jpg";

const StarfieldBg = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <img
      src={ziweiBackground}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-ziwei-bg/70" />
    {/* Animated gold particles */}
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-ziwei-gold opacity-30 animate-twinkle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      />
    ))}
  </div>
);

export default StarfieldBg;
