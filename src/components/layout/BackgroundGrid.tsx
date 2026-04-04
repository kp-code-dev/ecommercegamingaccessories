export default function BackgroundGrid() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,87,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,34,0.06) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        transform: "perspective(500px) rotateX(20deg)",
        animation: "moveGrid 10s linear infinite",
      }}
    />
  );
}
