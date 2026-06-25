import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional for OAuth
  avatar?: string;
  role: string;
  streak: number;
  lastEntryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Hashed
    avatar: { type: String },
    bio: { type: String, default: '' },
    theme: { type: String, default: 'dark' },
    role: { type: String, default: 'user' },
    streak: { type: Number, default: 0 },
    lastEntryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
