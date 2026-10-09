import { InferSchemaType, Schema, model } from "mongoose";

const titleSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true}
},
{
    timestamps: true
});

type Title = InferSchemaType<typeof titleSchema>;

export default model<Title>("Title", titleSchema);