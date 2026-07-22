/**
 * ActionBar
 *
 * Sticky bottom bar — always visible while scrolling.
 *
 * Props:
 *   loading      — boolean (from useWritePost)
 *   isEditMode   — boolean
 *   onSaveDraft  — () => void
 *   onPublish    — () => void
 */
function ActionBar({ isEditMode, onSaveDraft, onPublish, isPublishing, isSaving }) {
  const publishLabel = isEditMode ? "Update post" : "Publish";
  const isAnyLoading = isPublishing || isSaving;


  return (
    <div className="
      fixed bottom-0 w-full z-50
      bg-white/90 backdrop-blur-md
      border-t border-stone-200
    ">
      <div className="md:max-w-4xl md:mx-auto w-full px-10 lg:px-4 py-4 flex items-center justify-between gap-4">

        {/* ── Left: hint text ───────────────────────────────────────── */}
        <p className="text-xs text-stone-400 truncate">
          "All fields are required before publishing."
        </p>

        {/* ── Right: actions ────────────────────────────────────────── */}
        <div className="flex items-center gap-3">

          {/* Save draft */}
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={onSaveDraft}
            className="
              inline-flex items-center gap-2
              px-2 lg:px-5 py-1.5 lg:py-2.5 rounded-xl
              text-sm font-medium text-stone-700
              border border-stone-200 cursor-pointer bg-white
              hover:bg-stone-50 hover:border-stone-300
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-200
            "
          >
            {isSaving ? (
              <>
                <Spinner size="sm" />
                Saving…
              </>
            ) : (
              <>
                {/* Draft icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5v9A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5V7.5M3 7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5M3 7.5l9 6.75 9-6.75"
                  />
                </svg>
                Save draft
              </>
            )}
          </button>

          {/* Publish */}
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={onPublish}
            className="
              inline-flex items-center gap-1
              px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-xl
              text-sm font-semibold text-white cursor-pointer
              bg-primary hover:bg-primary/90 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
              shadow-sm hover:shadow-md
            "
          >
            {isPublishing ? (
              "Publishing…"
            ) : (
              <>
                {/* Publish icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                  />
                </svg>
                {publishLabel}
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

/**
 * Inline micro-spinner used inside the Save draft button while loading.
 * Self-contained to avoid importing a heavier component.
 */
function Spinner({ size = "sm" }) {
  const dim = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <svg
      className={`${dim} animate-spin text-stone-400`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

export default ActionBar;
