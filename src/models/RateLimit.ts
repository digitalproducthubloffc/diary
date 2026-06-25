import mongoose, { Schema, Document } from 'mongoose';

export interface IRateLimit extends Document {
  ip: string;
  action: string;
  count: number;
  expireAt: Date;
}

const RateLimitSchema: Schema = new Schema(
  {
    ip: { type: String, required: true },
    action: { type: String, required: true },
    count: { type: Number, default: 1 },
    expireAt: { type: Date, required: true, expires: 0 }, // TTL index
  }
);

// Compound index for quick lookups
RateLimitSchema.index({ ip: 1, action: 1 }, { unique: true });

export default mongoose.models.RateLimit || mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);
