import Counter from './models/counterModel';
import { generateUsernameFromNumber } from '@/utils/generateUsername';

export const generateUsernameAndSave = async (): Promise<string> => {
  let counterDoc = await Counter.findOne({ for: 'user' });
  if (!counterDoc) {
    counterDoc = await Counter.create({
      for: 'user',
      sequenceValue: 10000000,
    });
  }

  const updatedCounter = await Counter.findOneAndUpdate(
    { for: 'user' },
    { $inc: { sequenceValue: 1 } },
    { new: true }
  );

  if (!updatedCounter?.sequenceValue) {
    console.error('[generateUsernameAndSave] Updated counter is null:', updatedCounter);
    throw new Error('Failed to increment counter');
  }

  return generateUsernameFromNumber(updatedCounter.sequenceValue);
};
