import { useEffect } from "react";

/**
 * CoverImageSection
 *
 * Props:
 *   coverImageUrl  — string (existing URL) | File object | ""
 *   onChange       — handleChange from WritePost (e.target.name / type / files)
 *   error          — error message string if field validation fails
 */
function CoverImageSection({ coverImageUrl, onChange, error }) {
  const hasImage = Boolean(coverImageUrl);

  const imageSrc =
    typeof coverImageUrl === "string"
      ? coverImageUrl
      : coverImageUrl 
        ? URL.createObjectURL(coverImageUrl) 
        : "";

  // 1. Memory cleanup hook for temporary object URLs
  useEffect(() => {
    return () => {
      if (imageSrc && typeof coverImageUrl !== "string") {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [coverImageUrl, imageSrc]);

  return (
    <div className="relative">
      {hasImage ? (
        /* ── 16:9 image preview ──────────────────────────────────────── */
        <div className="relative w-full aspect-video overflow-hidden rounded-t-xl group">
          <img
            src={imageSrc}
            alt="Cover preview"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />

          {/* Overlay: change image button */}
          <label
            htmlFor="cover_image_url"
            className="
              absolute inset-0 flex flex-col items-center justify-center
              bg-black/0 group-hover:bg-black/40
              transition-colors duration-200 cursor-pointer
            "
          >
            <span className="
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              flex flex-col items-center gap-2 text-white
            ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V19a1 1 0 001 1h16a1 1 0 001-1v-2.5M16.5 3.5L12 2m0 0L7.5 3.5M12 2v13m-4.5-4.5l4.5 4.5 4.5-4.5"
                />
              </svg>
              <span className="text-sm font-medium">Change cover image</span>
            </span>
          </label>

          <input
            type="file"
            id="cover_image_url"
            name="cover_image_url"
            accept="image/*"
            className="sr-only"
            onChange={onChange}
          />
        </div>
      ) : (
        /* ── Upload card ─────────────────────────────────────────────── */
        <>
          <label
            htmlFor="cover_image_url"
            // 2. Dynamic class styling added inside backticks to handle the red alert layout
            className={`
              flex flex-col items-center justify-center gap-3
              w-full min-h-[200px] md:min-h-[260px]
              rounded-t-3xl
              border-b transition-colors duration-200
              cursor-pointer group
              ${error 
                ? "border-2 border-dashed border-red-400 bg-red-50/10 hover:bg-red-50/20" 
                : "border-stone-200 bg-stone-50 hover:bg-stone-100"
              }
            `}
          >
            {/* Upload icon wrapper */}
            <div className={`
              w-14 h-14 rounded-2xl
              bg-white border shadow-sm
              flex items-center justify-center
              group-hover:shadow-md group-hover:scale-105
              transition-all duration-200
              ${error ? "border-red-200" : "border-stone-200"}
            `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${error ? "text-red-400" : "text-stone-400"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M12 3v13.5m-3.75-3.75L12 16.5l3.75-3.75"
                />
              </svg>
            </div>

            <div className="text-center space-y-1 px-4">
              <p className={`text-sm font-semibold ${error ? "text-red-600" : "text-stone-700"}`}>
                Upload cover image
              </p>
              <p className="text-xs text-stone-400">
                Drag &amp; drop or{" "}
                <span className="text-primary underline underline-offset-2">
                  browse
                </span>{" "}
                · PNG, JPG, WebP · Max 5 MB
              </p>
            </div>

            <input
              type="file"
              id="cover_image_url"
              name="cover_image_url"
              accept="image/*"
              className="sr-only"
              onChange={onChange}
            />
          </label>
          
          {/* 3. Render error message text below the block container */}
          {error && (
            <p className="text-xs text-red-500 font-medium px-4 mt-2 animate-pulse">
              ⚠️ {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default CoverImageSection;
