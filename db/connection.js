import mongoose from "mongoose";

const connectiontDB=async()=>{
return await mongoose.connect("mongodb://127.0.0.1:27017/saraha")
.then(()=>{
    console.log("Connection");
}).catch((err)=>{
console.log({msg:"Error: ",err})
})
}

export default connectiontDB
