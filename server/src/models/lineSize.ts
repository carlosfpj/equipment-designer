import { InferSchemaType, Schema, model } from "mongoose";

const lineSizeSchema = new Schema({
  title: { type: String, required: true},
  flow: {type: Number, required: true}
}, { timestamps: true});

type lineSize = InferSchemaType<typeof lineSizeSchema>;

export default model<lineSize>("lineSize", lineSizeSchema);