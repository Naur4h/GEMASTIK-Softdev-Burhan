type CircularGaugeProps = {
  value: number; // 0-100
  label: string;
  sublabel: string;
};

export default function CircularGauge({ value, label, sublabel }: CircularGaugeProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0 -rotate-90">
        <circle cx="40" cy="40" r={radius} stroke="#E7E2CC" strokeWidth="8" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#3E4A2D"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="font-display text-2xl font-bold text-forest-dark">{value}%</p>
        <p className="text-sm font-semibold text-forest-dark">{label}</p>
        <p className="text-xs text-forest-dark/70">{sublabel}</p>
      </div>
    </div>
  );
}