import mongoose from "mongoose";
import Massage from "../../../db/models/massage.model.js";
import User from "../../../db/models/user.model.js";

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            console.error(err);
            res.status(500).json({ msg: "catch error", err: err.message });
        });
    };
};
/////////////////////////////////////////////////////////////////////////////////////
// add massage
export const addMessage = asyncHandler( async (req, res,next) => {
        const { content, receiverId } = req.body;
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return next(new Error("receiver not found"))
        }
        const newMessage = new Massage({ content, receiverId });
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", messageData: newMessage });
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
//get all messages for the authenticated user
export const getMessages = asyncHandler(async (req, res,next) => {
        const userId = req.user._id;
        const messages = await Massage.find({ receiverId: userId }).populate('receiverId', 'email');
        res.status(200).json({ messages });
})
//////////////////////////////////////////////////////////////////////////////////////
//deleteMessages
export const deleteMessage = asyncHandler(async (req, res,next) => {
    const userId = req.user._id;
    const { messageId } = req.params;
    const message = await Massage.findById(messageId);
    if (!message || message.receiverId.toString() !== userId.toString()) {
        return next(new Error("Message not found or you do not have permission to delete this message"))
    }
    await Massage.deleteOne({ _id: messageId });
    res.status(200).json({ message: "Message deleted successfully" });
});
