type RecommendationCardProps = {
  rank: 1 | 2 | 3;
  name: string;
  latin: string;
  note: string;
  score: number;
  onClick?: () => void;
};

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
      className="w-full rounded-2xl bg-forest p-4 text-left text-white"
    >
      <div className="flex items-center gap-3">

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 font-bold">
          {rank}
        </div>

        <div className="flex-1">
          <p className="font-bold">
            {name} ({latin})
          </p>

          <p className="text-xs text-white/70">
            {note}
          </p>

          <div className="mt-2 h-1.5 rounded-full bg-white/30">
            <div
              className="h-1.5 rounded-full bg-white"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <span className="font-bold">
          {score}%
        </span>

      </div>
    </button>
  );
}