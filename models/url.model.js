import { model, Schema } from "mongoose";

const urlSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        default: [],
    },
    clicks: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const UrlModel = model("Url", urlSchema);

export default UrlModel;