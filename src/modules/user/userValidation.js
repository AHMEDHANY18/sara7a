import joi from "joi"


export const signupvalidation = {
    body:joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$'))
        .required(),
    // repeat_password: joi.ref('password'),
})
}



export const signinvalidation = joi.object({

    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$'))
        .required(),
});
