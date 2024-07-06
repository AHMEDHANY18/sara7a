import { Schema, model } from "mongoose";

const massageSchema = new Schema({
    content: { type: String, required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const massage = model('massage', massageSchema);

export default massage;
