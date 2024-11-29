import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createAt?: Date;
  updateAt?: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
    updateAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  { timestamps: {} }
);

const model = mongoose.model<IUserDocument>('User', UserSchema);
export default model;
