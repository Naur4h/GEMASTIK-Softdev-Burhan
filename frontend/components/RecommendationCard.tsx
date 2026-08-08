type RecommendationCardProps = {
  rank: number;
  name: string;
  latin: string;
  note: string;
  score: number;
  onClick?: () => void;
};

function rankColor(rank: number) {
  if (rank === 1) return "bg-rank1";
  if (rank === 2) return "bg-rank2";
  return "bg-rank3";
}

export default function RecommendationCard({
  rank,
  name,
  latin,
  note,
  score,
  onClick,
}: RecommendationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl ${rankColor(rank)} p-4 text-left text-cream-light transition-transform hover:scale-[1.01]`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-light font-display text-sm font-bold text-forest-dark">
        {rank}
      </span>
      <span className="flex-1">
        <span className="block font-display text-base font-bold">
          {name} <span className="font-normal opacity-80">({latin})</span>
        </span>
        <span className="block text-xs leading-relaxed text-cream-light/85">
          {note}
        </span>
        <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-cream-light/25">
          <span
            className="block h-full rounded-full bg-cream-light"
            style={{ width: `${score}%` }}
          />
        </span>
      </span>
      <span className="shrink-0 font-display text-lg font-bold">
        {score}%
      </span>
    </button>
  );
}