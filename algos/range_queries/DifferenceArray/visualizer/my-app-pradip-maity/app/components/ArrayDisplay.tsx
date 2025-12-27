import { cn } from "./lib/utils";  // Relative path (same folder level)

interface ArrayDisplayProps {
  title: string;
  subtitle?: string;
  array: number[];
  highlights?: number[];
  colorScheme?: "gray" | "blue" | "green";
}

export default function ArrayDisplay({
  title,
  subtitle,
  array,
  highlights = [],
  colorScheme = "blue",
}: ArrayDisplayProps) {

  const colorMap = {
    gray: "border-slate-300/50 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-300",
    blue: "border-blue-400/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300",
    green: "border-emerald-400/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <div className={cn("card p-6 fade-in", colorMap[colorScheme])}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-element ${highlights.includes(index) ? 'highlight' : ''}`}
          >
            <span className="text-xs text-slate-400 dark:text-slate-500 mb-1">
              [{index}]
            </span>
            <span className="text-lg font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}