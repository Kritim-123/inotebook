import mongoose, { mongo } from "mongoose";

const {Schema} = mongoose;

const UsersSchema = new Schema({
  name: { type: String },
  nested: {
    firstName: { type: String },
    lastName: { type: String },
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('user', UsersSchema);
