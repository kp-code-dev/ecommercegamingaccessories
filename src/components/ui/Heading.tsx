interface HeadingProps {
  title: string;
}

function Heading({ title }: HeadingProps) {
  return (
    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider text-center mb-8">
      {title}
      <div className="w-16 h-0.5 bg-primary mx-auto mt-3 shadow-[var(--glow-primary-sm)]" />
    </h2>
  );
}

export default Heading;
