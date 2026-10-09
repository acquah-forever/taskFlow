import { InferSchemaType, Schema, model } from "mongoose";

const titleSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Users", required: true, unique: true },
    title:{type: String, required: true},
    description:{type: String, required: true}
},
{
    timestamps: true
});

type Title = InferSchemaType<typeof titleSchema>;

export default model<Title>("Title", titleSchema);