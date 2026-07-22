/**
 * StoryEditor
 *
 * Props:
 *   content  — string
 *   onChange — handleChange from WritePost
 */
function StoryEditor({ content, onChange, error }) {
  return (
    <div className="mt-10">
      {/* ── Section eyebrow ────────────────────────────────────────────── */}
      {/* <p className="text-xs font-semibold uppercase tracking-widest text-stone-300 mb-6">
        Story
      </p> */}

      <label
        htmlFor="content"
        className="block text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2"
      >
        Content
      </label>

      <textarea
        id="content"
        name="content"
        value={content}
        onChange={onChange}
        placeholder="Start writing your story here…&#10;&#10;Tell your reader what you built, how you built it, and what you learned. Be specific — the more concrete detail you share, the more useful and memorable your post will be."
        className="
          w-full min-h-[70vh]
          rounded-lg border-l border-l-stone-200 bg-white/50
          text-sm text-stone-800 leading-8
          placeholder:text-stone-300 placeholder:leading-8
          px-5 py-5 outline-none
          focus:border-l-stone-400
          transition-all duration-150
          resize-none font-normal overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-full
        "
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      <p className="mt-2 text-xs text-stone-400">
        Markdown is supported. Use{" "}
        <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-500">
          **bold**
        </code>
        ,{" "}
        <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-500">
          _italic_
        </code>
        , and{" "}
        <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-500">
          ## headings
        </code>{" "}
        to format your post.
      </p>
    </div>
  );
}

export default StoryEditor;
