import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique:true, select: true, lowercase: true},
    password: {type: String, required:true, select: false}
},
{
    timestamps: true
})

type Users = InferSchemaType<typeof userSchema>;

export default model <Users>("Users", userSchema)