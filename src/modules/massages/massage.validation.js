import joi from "joi"


export const massage = {
    body:joi.object({
    content: joi.string()
        .min(3)
        .max(5000)
        .required(),
    receiverId: joi.string()
        .required(),
})
}