import { useState } from "react";
import toast from "react-hot-toast";

import { createTicket } from "../../services/support.service";

import {
  FaQuestion,
  FaBookmark,
  FaCommentAlt,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";

export function SupportForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a ticket title.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please describe your issue.");
      return;
    }

    setLoading(true);

    try {
      const res = await createTicket(formData);
      console.log(res);

      toast.success("Support ticket submitted successfully.");

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to submit support ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <FaBookmark size={16} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-text">
              Submit a Support Ticket
            </h1>

            <p className="mt-1 text-sm text-text-muted">
              We're here to help. Tell us about your issue and we'll find a
              solution.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-6">
        {/* Help Icon */}
        <div className="flex justify-center">
          <div
            className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/15
                        text-primary
                    "
          >
            <FaQuestion size={30} />
          </div>
        </div>

        {/* Ticket Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Ticket Title
          </label>

          <div className="relative">
            <FaBookmark
              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-text-muted
                            "
              size={15}
            />

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Briefly describe your issue"
              className="
                                w-full
                                rounded-xl
                                border
                                border-border
                                bg-surface-1
                                py-3
                                pl-11
                                pr-4
                                text-sm
                                text-text
                                outline-none
                                transition
                                placeholder:text-text-muted
                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary/20
                            "
            />
          </div>

          <p className="mt-2 text-xs text-text-muted">
            Be specific to help us understand your issue
          </p>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Describe Your Issue
          </label>

          <div className="relative">
            <FaCommentAlt
              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-4
                                text-text-muted
                            "
              size={15}
            />

            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide all relevant details about your issue so we can help you better"
              className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-border
                                bg-surface-1
                                px-11
                                py-3
                                text-sm
                                text-text
                                outline-none
                                transition
                                placeholder:text-text-muted
                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary/20
                            "
            />
          </div>

          <p className="mt-2 text-xs text-text-muted">
            Include any relevant details that might help us resolve your issue
          </p>
        </div>

        {/* Support Information */}
        <div
          className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-primary/30
                    bg-primary/10
                    px-4
                    py-4
                "
        >
          <FaInfoCircle className="mt-0.5 shrink-0 text-primary" size={18} />

          <div>
            <p className="text-sm font-semibold text-text">
              Support Information
            </p>

            <p className="mt-1 text-sm leading-5 text-text-muted">
              Our support team typically responds within 24 hours. For urgent
              matters, please provide as much detail as possible so we can
              assist you sooner.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:opacity-90
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
        >
          <FaPaperPlane size={14} />

          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
