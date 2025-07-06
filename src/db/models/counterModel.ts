// models/Counter.ts
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  for: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, required: true },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);
export default Counter;
