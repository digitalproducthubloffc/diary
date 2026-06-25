import mongoose, { Schema, Document } from 'mongoose';

export interface IBackup extends Document {
  entryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const BackupSchema: Schema = new Schema(
  {
    entryId: { type: Schema.Types.ObjectId, ref: 'Entry', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Index to quickly fetch backups for a specific entry
BackupSchema.index({ entryId: 1, createdAt: -1 });

export default mongoose.models.Backup || mongoose.model<IBackup>('Backup', BackupSchema);
