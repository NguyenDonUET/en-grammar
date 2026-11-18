interface ProgressCircleProps {
  percent: number
  label: string
}

export function ProgressCircle({ percent, label }: ProgressCircleProps) {
  const size = 148
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative"
        role="progressbar"
        aria-label={`${label} unit completion`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-success-foreground"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold tabular-nums">
          {percent}%
        </span>
      </div>
      <p className="text-sm font-semibold tracking-wide">{label}</p>
    </div>
  )
}
