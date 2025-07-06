// server/generateUsernameAndSave.ts

import { db } from '@/db/db';
import { generateUsernameFromNumber } from '@/utils/generateUsername';
// import type { WithId, Document } from 'mongodb';

export const generateUsernameAndSave = async (): Promise<string> => {
  const countersCollection = db.collection('counters');

  // Ensure an index exists to prevent concurrency issues
  await countersCollection.createIndex({ for: 1 }, { unique: true });

  // Initialize counter if not present
  await countersCollection.updateOne(
    { for: 'user' },
    { $setOnInsert: { sequenceValue: 10000000 } },
    { upsert: true }
  );

  // Atomically increment the counter and return the new value
  const result = await countersCollection.findOneAndUpdate(
    { for: 'user' },
    { $inc: { sequenceValue: 1 } },
    { returnDocument: 'after' }
  );

  const newCounterValue = result?.value?.sequenceValue;

  if (!newCounterValue) {
    console.error('[generateUsernameAndSave] Failed result:', result);
    throw new Error('Failed to increment counter');
  }

  return generateUsernameFromNumber(newCounterValue);
};
