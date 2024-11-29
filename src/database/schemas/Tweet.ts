import mongoose, { Schema, Document } from 'mongoose';

// Interface para o documento do Tweet no Mongoose
export interface ITweetDocument extends Document {
  author: string;
  description: string;
  likes: number;
  createAt?: Date;
  updateAt?: Date;
}

// Interface para o Tweet no TypeGraphQL
export interface ITweet {
  _id?: string; // Alterado para string (assumindo ObjectId)
  author: string;
  description: string;
  likes: number;
  createAt?: Date;
  updateAt?: Date;
}

// Schema do Tweet no Mongoose
const TweetSchema = new Schema<ITweetDocument>(
  {
    author: String,
    description: String,
    likes: {
      type: Number,
      default: 0,
      required: false,
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

// Modelo do Tweet no Mongoose
const model = mongoose.model<ITweetDocument>('Tweet', TweetSchema);
export default model;
