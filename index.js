import connectiontDB from "./db/connection.js"
import express from "express"
import userRouter from "./src/modules/user/user.routes.js"
import massageRouter from "./src/modules/massages/massage.routes.js";

const app = express()
const port = 3000
connectiontDB()
app.use(express.json())

app.use("/user", userRouter)
app.use("/massage", massageRouter)


app.use('*', (req, res,next) => {
        // res.send('404 Not Found')
        const err = new Error(`invalid request${req.originalUrl}`)
        next(err)

})



//global error handler
app.use((err,req, res,next) =>{
    res.status(400).json({msg:"error",err: err.message})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))