import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, select: true},
    email: {type: String, required: true, select: true, lowercase: true, unique: true},
    password: {type: String, required:true, select: false}
},
{
    timestamps: true
})

type Users = InferSchemaType<typeof userSchema>;

export default model <Users>("Users", userSchema)