import { InferSchemaType, model, Schema } from "mongoose";

const newUsers = new Schema({
    userName: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique:true, trim: true},
    password: {type: String, required:true, uinque:true}
})

type Users = InferSchemaType<typeof newUsers>;

export default model <Users>("Users", newUsers)