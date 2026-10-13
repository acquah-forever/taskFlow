import { model, InferSchemaType, Schema } from "mongoose";

const profileSchema = new Schema({
    position: { type: String, required: true },
    bio: { type: String, require: true }
},
    {
        timestamps: true
    });

type Profile = InferSchemaType<typeof profileSchema>;
export default model<Profile>("Profile", profileSchema)