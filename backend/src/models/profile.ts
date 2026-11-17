import { model, InferSchemaType, Schema } from "mongoose";

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId , ref:"Users", required: true},
    position: { type: String, required: true },
    bio: { type: String, required: true }
},
    {
        timestamps: true
    });

type Profile = InferSchemaType<typeof profileSchema>;
export default model<Profile>("Profile", profileSchema)