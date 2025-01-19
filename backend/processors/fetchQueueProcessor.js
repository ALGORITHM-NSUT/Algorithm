import {
  extractHandle,
  extractCodeforcesRank,
  extractLeetCodeRank,
} from "../controllers/leaderboardController.js";

export const validateLeetcodeProfile = async (leetcodeProfile) => {
  try {
    if (!leetcodeProfile) {
      throw new Error('LeetCode profile is empty.');
    }

    const leetcodeHandle = await extractHandle(leetcodeProfile);
    if (!leetcodeHandle) {
      throw new Error('Invalid LeetCode handle extracted.');
    }

    const rankData = await extractLeetCodeRank(leetcodeHandle);

    if (rankData && rankData.error && rankData.error.includes('Max retries')) {
      return { error: 'LeetCode rate limit hit, please try again later.', rateLimitError: true };
    }
    if (!rankData || !rankData.rank) {
      throw new Error('LeetCode rank not found.');
    }

    return { handle: leetcodeHandle, rank: rankData.rank }; 
  } catch (error) {
    console.error(`Error validating LeetCode profile: ${error.message}`);
    return { error: `Error fetching LeetCode rank: ${error.message}` }; 
  }
};

export const validateCodeforcesProfile = async (codeforcesProfile) => {
  try {
    if (!codeforcesProfile) {
      throw new Error('Codeforces profile is empty.');
    }

    const codeforcesHandle = await extractHandle(codeforcesProfile);
    if (!codeforcesHandle) {
      throw new Error('Invalid Codeforces handle extracted.');
    }

    const rankData = await extractCodeforcesRank(codeforcesHandle);
    if (!rankData || !rankData.rank) {
      throw new Error('Codeforces rank not found.');
    }

    return { handle: codeforcesHandle, rank: rankData.rank }; 
  } catch (error) {
    console.error(`Error validating Codeforces profile: ${error.message}`);
    return { error: `Error fetching Codeforces rank: ${error.message}` }; 
  }
};

