import React, { useState } from "react";
import { Star, Send, ShieldCheck } from "lucide-react";
import { createRating } from "../../service/ratingService";

const RatingToSystem = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            return alert("Please select a rating");
        }

        try {
            setLoading(true);

            const response = await createRating({
                rating,
                feedback,
            });

            alert(response || "Thank you for your feedback!");

            setRating(0);
            setFeedback("");

        } catch (error) {
            console.error("Rating Error:", error);
            alert(error?.message || "Failed to submit feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 bg-transparent">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">

                {/* Header */}
                <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
                    <ShieldCheck size={20} />
                    <h2 className="text-lg font-bold tracking-tight">
                        System Feedback
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-5">

                    {/* Star Rating */}
                    <div className="mb-5 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            Rate your experience
                        </p>

                        <div className="flex justify-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        size={28}
                                        className={`${
                                            star <= (hover || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-200"
                                        } transition-colors duration-150`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="mb-5">
                        <textarea
                            rows="3"
                            placeholder="Tell us more..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 resize-none transition-all"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        <Send size={16} />

                        {loading ? "Sending..." : "Send Feedback"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RatingToSystem;