import {
  extractHandle,
  extractCodeforcesRank,
  extractLeetCodeRank,
  normalizeranks,
} from "../controllers/leaderboardController.js";
import UserRanking from "../models/UserRanking.js";


export const fetchUserRanking = async(user, updatedCodeforcesProfile, updatedLeetcodeProfile)=>{
  console.log("Fetching rankings for user...", user.name);
        try {
          // const { user } = user.data;
          const leetcodeHandle = updatedLeetcodeProfile
            ? await extractHandle(updatedLeetcodeProfile)
            : null;
          const codeforcesHandle = updatedCodeforcesProfile
            ? await extractHandle(updatedCodeforcesProfile)
            : null;
    
          const leetcodeRank = leetcodeHandle
            ? (await extractLeetCodeRank(leetcodeHandle)).rank
            : null;
          const codeforcesRank = codeforcesHandle
            ? (await extractCodeforcesRank(codeforcesHandle)).rank
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
    
            const rankings = await UserRanking.find({}).lean();
            await normalizeranks(rankings, 0.6, 0.4);
          }
    
          console.log(`Rankings updated for user: ${user.name}`);
          return `Rankings processed successfully for: ${user.name}`;
        } catch (error) {
          console.error("Error updating rankings:", error.message);
          throw error; 
        }
}


export default fetchUserRanking;