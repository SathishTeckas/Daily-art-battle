// models/Battle.ts

import mongoose, { Document, model } from 'mongoose';

interface Battle extends Document {
  artAId:string;
  artBId:string;
  startTime:Date;
  endTime:Date;
  isBattleEnded:Boolean;
  isNftMinted:Boolean;
  artAVotes:Number;
  artBVotes:Number;
  artAgrayScale: string;
  artBgrayScale: string;
  winningArt?: 'ArtA' | 'ArtB';
  specialWinner?: string;
}

const BattleSchema = new mongoose.Schema({
  artAId: { type: String, required: true },
  artBId: { type: String, required: true },
  artAgrayScale: { type: String, required: true },
  artBgrayScale: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBattleEnded: { type: Boolean, default: false },
  isNftMinted: { type: Boolean, default: false },
  winningArt: { type: String, enum: ['ArtA', 'ArtB'], required: false },
  artAVotes: { type: Number, default: 0 },
  artBVotes: { type: Number, default: 0 },
  specialWinner: { type: String, required: false },
});

export default mongoose.models.Battle || model<Battle>('Battle', BattleSchema);
