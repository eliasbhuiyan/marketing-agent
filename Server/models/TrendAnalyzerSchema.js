import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  hashtags: [{ type: String, trim: true }],
});

const IndustrySchema = new mongoose.Schema(
  {
    industry: { type: String, required: true, index: true },
    description: { type: String, required: true, trim: true },
    trends: [TrendSchema],
  },
  { timestamps: true }
);

export default mongoose.model("IndustryTrend", IndustrySchema);
