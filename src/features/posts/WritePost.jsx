import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";
import { getTemplate } from "../../utils/getTemplate";
import useWritePost from "./useWritePost";
import useEditPostById from "./useEditPostById";
import CoverImageSection from "./CoverImageSection";
import StoryDetailsSection from "./StoryDetailsSection";
import StoryEditor from "./StoryEditor";
import ActionBar from "./ActionBar";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

function WritePost() {
    const { user } = useAuth();
    const { postId, templateId } = useParams();
    const navigate = useNavigate();

    const { writePost, isPublishing, isSaving } = useWritePost(user);
    const { post, fetchPost } = useEditPostById();

    const isEditMode = Boolean(postId);

    const [form, setForm] = useState({
        title: "",
        summary: "",
        content: "",
        tags: "",
        cover_image_url: "",
    });

    const [errors, setErrors] = useState({});

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

      //clear errors dynamically
      if (errors[name]) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
      }

      if (type === "file") {
        const file = files[0];
        if (file && file.size > MAX_IMAGE_SIZE) {
            alert("File size exceeds the 5MB limit. Please choose a smaller file.");
            return;
        }
        setForm((prev) => ({ ...prev, [name]: file }));
    } else {
        setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

    const handleSubmit = (published = false) => {
      // Validate input fields on execution trigger
      const newErrors = {};
      if (!form.title.trim()) newErrors.title = "Title is required";
      if (!form.summary.trim()) newErrors.summary = "Summary is required";
      if (!form.content.trim()) newErrors.content = "Story content cannot be empty";
      if (!form.cover_image_url) newErrors.cover_image_url = "A cover image is required";

      // If there are errors, update state and block submission execution
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          toast.error("Please fill in required fields")
          return;
      }

      const fileObj =
          typeof form.cover_image_url === "string" ? null : form.cover_image_url;
      if (fileObj && fileObj.size > MAX_IMAGE_SIZE) {
          alert("Image must be under 5MB");
          return;
      }

      const coverImage = form.cover_image_url;

      const normalizedTags = form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
        .join(",");

        console.log(normalizedTags)
        console.log(coverImage)

      writePost(
          {
              ...form,
            coverImageUrl: coverImage,
            tags: normalizedTags,
            published,
            template: templateId,
        },
        postId
    );
  };

    const goBack = () => navigate(-1);

    // ── Effects ───────────────────────────────────────────────────────────────

    useEffect(() => {
        if (!isEditMode) return;
      fetchPost(postId);
  }, [postId]);

    useEffect(() => {
      if (post) setForm(post);
  }, [post]);

    useEffect(() => {
        if (templateId) {
            const template = getTemplate(templateId);
            setForm({
                title: template.placeholderTitle,
                summary: template.placeholderSummary,
                content: template.content,
                tags: template.defaultTags.join(", "),
          cover_image_url: "",
      });
    }
  }, [templateId]);

    // ── Early returns ─────────────────────────────────────────────────────────

    if (isEditMode && !post) return <Spinner />;

    // ── Render ────────────────────────────────────────────────────────────────


    console.log(post)
    return (
      <div className="min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-8 pb-32">

              {/* ── Page header ───────────────────────────────────────────────── */}
              <div className="mb-8 space-y-4">
                  <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors group"
                  >
                      <IoArrowBackCircleOutline className="text-xl group-hover:-translate-x-0.5 transition-transform" />
                      Back
                  </button>

                  <div className="space-y-1">
                      {templateId && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-2">
                              ✦ Using {templateId}
                          </span>
                      )}
                      <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                          {isEditMode ? "Edit post" : "Write a new post"}
                      </h1>
                      <p className="text-sm text-stone-400">
                          {isEditMode
                              ? "Make your changes, then save or republish."
                              : "Start with a cover image, then fill in the details below."}
                      </p>
                  </div>
              </div>

              {/* ── Editor card ───────────────────────────────────────────────── */}
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(false);
                  }}
                  className="overflow-hidden"
              >
                  <CoverImageSection
                      coverImageUrl={form.cover_image_url}
                      onChange={handleChange}
                      error={errors.cover_image_url}
                  />

                  <div className="px-3 md:px-6 py-8 md:py-10 space-y-5 md:space-y-10">
                      <StoryDetailsSection
                          title={form.title}
                          summary={form.summary}
                          tags={form.tags}
                          onChange={handleChange}
                          errors={errors}
                      />

                      {/* <div className="border-t border-stone-100" /> */}

                      <StoryEditor
                          content={form.content}
                          onChange={handleChange}
                          error={errors.content} />
                  </div>
              </form>
          </div>

          {/* ── Sticky action bar ─────────────────────────────────────────────── */}
          <ActionBar
              isPublishing={isPublishing}
              isSaving={isSaving}
              isEditMode={isEditMode}
              onSaveDraft={() => handleSubmit(false)}
              onPublish={() => handleSubmit(true)}
          />
      </div>
  );
}

export default WritePost;