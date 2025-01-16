import fetchQueue from "./queue.js";
import { Worker } from "bull";
import {
  extractHandle,
  extractCodeforcesRank,
  extractLeetCodeRank,
  normalizeranks,
} from "../controllers/leaderboardController";
import UserRanking from "../models/UserRanking";

const worker = new Worker('fetch', async (job) => {
  console.log("Processing job with data..", job.data);

  try {
    const { user } = job.data;
    const leetcodeHandle = user.leetcodeProfile
      ? await extractHandle(user.leetcodeProfile)
      : null;
    const codeforcesHandle = user.codeforcesProfile
      ? await extractHandle(user.codeforcesProfile)
      : null;

    const leetcodeRank = leetcodeHandle
      ? await extractLeetCodeRank(leetcodeHandle)
      : null;
    const codeforcesRank = codeforcesHandle
      ? await extractCodeforcesRank(codeforcesHandle)
      : null;

    if (leetcodeRank || codeforcesRank) {
      await UserRanking.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            name: user.name,
            leetcodeHandle,
            leetcodeRank,
            codeforcesHandle,
            codeforcesRank,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      await normalizeranks(user._id);
    }

    console.log(`Job completed for user: ${user.name}`);
        return `Processed rankings for user: ${user.name}`;
    } catch (error) {
        console.error(`Error processing job: ${error.message}`);
        throw error; 
    }
});

worker.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result: ${result}`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
});


export default worker;