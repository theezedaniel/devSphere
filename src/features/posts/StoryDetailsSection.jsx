/**
 * StoryDetailsSection
 *
 * Props:
 *   title    — string
 *   summary  — string
 *   tags     — string
 *   onChange — handleChange from WritePost
 */

// Shared input classes — defined once, used consistently
const inputBase = `
  w-full rounded-lg border-l border-l-stone-200
  bg-white/50 text-stone-900 placeholder:text-stone-300
  px-4 py-3 outline-none
  focus:border-l-stone-400
  transition-all duration-150
  resize-none
`.replace(/\s+/g, " ").trim();

function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2"
    >
      {children}
    </label>
  );
}

function StoryDetailsSection({ title, summary, tags, onChange, errors }) {
  return (
    <div className="space-y-8">

      {/* ── Section eyebrow ────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-300">
          Story Details
        </p>
      </div>

      {/* ── Title ─────────────────────────────────────────────────────── */}
      <div>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Give your story a title…"
          value={title}
          onChange={onChange}
          className={`
            ${inputBase}
            text-lg md:text-xl font-bold tracking-tight
            placeholder:font-bold placeholder:tracking-tight
            leading-snug py-4 px-4
          `}
        />
        {errors?.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* ── Summary ───────────────────────────────────────────────────── */}
      <div>
        <FieldLabel htmlFor="summary">Summary</FieldLabel>
        <textarea
          id="summary"
          name="summary"
          placeholder="A short description of what this post is about…"
          value={summary}
          onChange={onChange}
          rows={3}
          className={`
            ${inputBase}
            text-sm leading-relaxed text-stone-600
            placeholder:text-stone-300
          `}
        />
        {errors?.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
        <p className="mt-1.5 text-xs text-stone-400">
          This appears in previews and search results.
        </p>
      </div>

      {/* ── Tags ──────────────────────────────────────────────────────── */}
      <div>
        <FieldLabel htmlFor="tags">Tags</FieldLabel>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="React, Supabase, Authentication"
          value={tags}
          onChange={onChange}
          className={`${inputBase} text-sm`}
        />
        {errors?.tags && <p className="text-xs text-red-500 mt-1">{errors.tags}</p>}
        <p className="mt-1.5 text-xs text-stone-400">
          Separate tags with commas. Example:{" "}
          <span className="text-stone-500 font-medium">
            React, Supabase, Authentication
          </span>
        </p>
      </div>

    </div>
  );
}

export default StoryDetailsSection;
