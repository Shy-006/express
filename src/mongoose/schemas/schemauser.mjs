import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:mongoose.Schema.Types.String,
    username:{
      type:  mongoose.Schema.Types.String,
      required:true,
      unique:true,
    },
    pass:{
        type:mongoose.Schema.Types.String,
        required:true,
    }
});

export const modeluser = mongoose.model("modeluser",userschema);