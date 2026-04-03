const brands = [
  "RAZER", "LOGITECH", "CORSAIR", "STEELSERIES", "HyperX",
  "ASUS ROG", "MSI", "NVIDIA", "AMD", "COOLER MASTER",
  "RAZER", "LOGITECH", "CORSAIR", "STEELSERIES", "HyperX",
  "ASUS ROG", "MSI", "NVIDIA", "AMD", "COOLER MASTER",
];

function MarqueeContainer() {
  return (
    <div className="bg-muted/30 backdrop-blur-sm py-5 w-full overflow-hidden border-y border-border mb-5">
      <div className="flex gap-12 w-max animate-marquee hover:[animation-play-state:paused]">
        {brands.map((brand, i) => (
          <span key={i} className="text-muted-foreground font-heading font-bold text-xl whitespace-nowrap transition-colors duration-500 hover:text-secondary-foreground flex items-center gap-2">
            ⬡ {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeContainer;
