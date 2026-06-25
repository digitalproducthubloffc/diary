import mongoose, { Schema, Document } from 'mongoose';

export interface IEntry extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  mood: string;
  tags: string[];
  pinned: boolean;
  favorite: boolean;
  wordCount: number;
  readingTime: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EntrySchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, default: '' },
    mood: { type: String, default: '😐 Normal' },
    tags: { type: [String], default: [] },
    pinned: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
    wordCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    status: { type: String, default: 'active' }, // active, archived, deleted
  },
  { timestamps: true }
);

// Text indexes for instant search
EntrySchema.index({ title: 'text', content: 'text', tags: 'text' });
// Compound indexes for querying a user's specific entries quickly
EntrySchema.index({ userId: 1, slug: 1 }, { unique: true });
EntrySchema.index({ userId: 1, createdAt: -1 });
EntrySchema.index({ userId: 1, pinned: 1 });

export default mongoose.models.Entry || mongoose.model<IEntry>('Entry', EntrySchema);
