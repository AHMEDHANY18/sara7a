import nodemailer from "nodemailer";

export const sendMail = async (to,subject,html) => {
        const transporter = nodemailer.createTransport({

            service: "gmail",
            auth: {
                user: "ahmedhanysayed93@gmail.com",
                pass: "flhrjbmimgnfhppi",
            },
        });
        const mailOptions = await transporter.sendMail({
            
            from: '"Maddison Foo Koch 👻" <ahmedhanysayed93@gmail.com>',
            to:to?to:"",
            subject:subject?subject:"hi",
            html:html?html:"hello"
        });
        console.log(mailOptions);

};
