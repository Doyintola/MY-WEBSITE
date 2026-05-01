export default function SectionLabel({
  index,
  label,
  align = "left",
}: {
  index: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      <span className="text-gold">[{index}]</span>
      <span className="h-px w-10 bg-ink/30" />
      <span>{label}</span>
    </div>
  );
}
