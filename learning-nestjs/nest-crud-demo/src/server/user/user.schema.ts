import { Schema } from "mongoose";

export const userSchema = new Schema({
  _id: { type: String, required: true}, //覆盖Mongoose生成的默认_id
  user_name: {type: String, required: true},
  password: { type: String, required: true}
})