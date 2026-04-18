import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
  formCard, formTitle, formGroup, labelClass, 
  inputClass, submitBtn, errorClass, pageBackground 
} from "../styles/common";

function Articles() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { currentUser } = useAuth();

  const onArticleSubmit = async (articleData) => {
    try {
      // Attach author details from current user state
      const payload = {
        ...articleData,
        author: currentUser.username,
        email: currentUser.email,
        date: new Date().toLocaleDateString()
      };

      // Ensure this URL matches your backend route in server.js
      const res = await axios.post("http://blog-app-4eug.onrender.com/author-api/article", payload, {
        withCredentials: true
      });

      if (res.status === 201) {
        toast.success("Article published successfully!");
        reset(); // Clear form on success
      }
    } catch (err) {
      console.error("Article upload error:", err);
      toast.error(err.response?.data?.message || "Failed to publish article");
    }
  };

  return (
    <div className={`${pageBackground} min-h-screen py-10 px-4`}>
      <div className={`${formCard} max-w-3xl mx-auto`}>
        <h2 className={formTitle}>Create New Article</h2>
        
        <form onSubmit={handleSubmit(onArticleSubmit)}>
          {/* Title */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Enter article title..."
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select className={inputClass} {...register("category", { required: "Select a category" })}>
              <option value="">Select Category</option>
              <option value="programming">Programming</option>
              <option value="fashion">Fashion</option>
              <option value="fitness">Fitness</option>
            </select>
            {errors.category && <p className={errorClass}>{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea
              rows="8"
              className={inputClass}
              placeholder="Write your article here..."
              {...register("content", { required: "Content cannot be empty" })}
            ></textarea>
            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>

          <button type="submit" className={submitBtn}>
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
}

export default Articles;
