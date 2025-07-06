// server/generateUsernameAndSave.ts

import { db } from '@/db/db'; // adjust path as needed
import { generateUsernameFromNumber } from '@/utils/generateUsername';

export const generateUsernameAndSave = async (): Promise<string> => {
  // Fetch or create the counter doc
  let counterDoc = await db.collection('counters').findOne({ for: 'user' });

  if (!counterDoc) {
    await db.collection('counters').insertOne({
      for: 'user',
      sequenceValue: 10000000,
    });
    counterDoc = await db.collection('counters').findOne({ for: 'user' });
  }

  // Increment the counter
  const updatedCounter = await db.collection('counters').findOneAndUpdate(
    { for: 'user' },
    { $inc: { sequenceValue: 1 } },
    { returnDocument: 'after', upsert: true }
  );

  if (!updatedCounter?.value?.sequenceValue) {
    throw new Error('Failed to increment counter');
  }

  const newCounterValue = updatedCounter.value.sequenceValue;
  return generateUsernameFromNumber(newCounterValue);
};
