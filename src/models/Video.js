import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 20},
    createdAt: { type: Date, required: true, default: Date.now},
    hashtags: [{ type: String }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

videoSchema.pre("save", async function () {
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//this 우리가 저장하고자 하는 문서

const Video = mongoose.model("Video", videoSchema);
export default Video;
