import { Link } from "react-router-dom";

function EmptyStories({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionTo,  
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center select-none flex-1, w-full, min-h-[60vh]">

      {/* ── Icon with radiating rings ────────────────────────────────────── */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outermost ring */}
        <span
          aria-hidden="true"
          className="absolute w-36 h-36 rounded-full border border-stone-200/70"
        />
        {/* Middle ring */}
        <span
          aria-hidden="true"
          className="absolute w-24 h-24 rounded-full border border-stone-200"
        />
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200">
          {Icon && (
            <Icon
              aria-hidden="true"
              className="text-2xl text-stone-400"
            />
          )}
        </div>
      </div>

      {/* ── Copy ──────────────────────────────────────────────────────────── */}
      <h2 className="text-xl font-bold tracking-tight text-stone-800 mb-2">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
          {description}
        </p>
      )}

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      {(actionLabel) && (
        <div className="flex flex-col items-center gap-3 mt-8">

          {/* Primary action */}
          {actionLabel && (
            actionTo ? (
              <Link
                to={actionTo}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                {actionLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                {actionLabel}
              </button>
            )
          )}         

        </div>
      )}

    </div>
  );
}

export default EmptyStories;