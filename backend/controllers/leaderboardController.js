import axios from "axios";
import FormData from "../models/formDataModel.js";
import UserRanking from "../models/UserRanking.js";

//TODO:  CONSTRUCT LEADERBOARD - here the formula to calculate score will come
export const fetchLeaderboardData = async (req, res) => {};

//TODO: FETCH AND RETURN RANKINGS
async function fetchAndSaveRankings(req, res) {
  try {
    const users = await FormData.find({
      leetcodeProfile: { $exists: true, $ne: null },
      codeforcesProfile: { $exists: true, $ne: null },
    });

    const batchSize = 10;
    const result = [];

    async function processBatch(batch) {
      return Promise.all(
        batch.map(async (user) => {
          const { leetcodeProfile, codeforcesProfile, _id, name } = user;

          let leetcodeRank = "N/A",
            codeforcesRank = "N/A";
          let leetcodeHandle = null,
            codeforcesHandle = null;

          if (leetcodeProfile) {
            leetcodeHandle = extractHandle(leetcodeProfile);
          }

          if (codeforcesProfile) {
            codeforcesHandle = extractHandle(codeforcesProfile);
          }

          const isLeetCodeHandleValid =
            leetcodeHandle && isValidHandle(leetcodeHandle);
          const isCodeforcesHandleValid =
            codeforcesHandle && isValidHandle(codeforcesHandle);

          if (isLeetCodeHandleValid) {
            try {
              const { rank } = await extractLeetCodeRank(leetcodeHandle);
              leetcodeRank = rank || "N/A";
            } catch (error) {
              console.error(
                `Error fetching LeetCode rank for ${leetcodeHandle}:`,
                error.message
              );
              leetcodeRank = "N/A";
            }
          }

          if (isCodeforcesHandleValid) {
            try {
              const { rank } = await extractCodeforcesRank(codeforcesHandle);
              codeforcesRank = rank || "N/A";
            } catch (error) {
              console.error(
                `Error fetching Codeforces rank for ${codeforcesHandle}:`,
                error.message
              );
              codeforcesRank = "N/A";
            }
          }

          if (leetcodeRank !== "N/A" || codeforcesRank !== "N/A") {
            return {
              userId: _id,
              name,
              leetcodeHandle: leetcodeHandle || "N/A",
              leetcodeRank,
              codeforcesHandle: codeforcesHandle || "N/A",
              codeforcesRank,
            };
          }
          return null;
        })
      ).then((results) => results.filter(Boolean));
    }

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      const batchResults = await processBatch(batch);
      result.push(...batchResults);
    }
    return result;
    // return res.status(200).json({
    //   message: "Rankings fetched successfully.",
    //   data: result,
    // });
  } catch (error) {
    console.error("Error fetching rankings:", error.message);
    // return res.status(500).json({
    //   message: "An error occurred while fetching rankings.",
    //   error: error.message,
    // });
    throw new Error("An error occurred while fetching rankings.");
  }
}

// four functions used in fetchAndSaveRankings() - extractHandle, isValidHandle, extractLCRank, extractCFRank
function extractHandle(profile) {
  if (!profile) return null;
  profile = profile.trim();

  if (!profile) {
    return null;
  }
  if (!profile.startsWith("http")) return profile;

  try {
    const url = new URL(profile);
    const pathParts = url.pathname.split("/").filter(Boolean);
    return pathParts[pathParts.length - 1] || null;
  } catch (err) {
    console.error(`Error parsing URL: ${profile}`, err.message);
    return null;
  }
}

function isValidHandle(handle) {
  return handle && handle.trim().toLowerCase() !== "na";
}

async function extractLeetCodeRank(handle) {
  const url = `https://alfa-leetcode-api.onrender.com/${handle}/contest`;

  try {
    const response = await axios.get(url);
    // console.log("response.data :", response.data);

    if (response.data.contestRating) {
      return { rank: response.data.contestRating };
    } else {
      console.error("No rank data available for user:", handle);
      return { rank: "N/A", error: "No rank data available" };
    }
  } catch (error) {
    console.error("Error fetching LeetCode rank:", error.message);
    return { rank: "N/A", error: error.message };
  }
}
async function extractCodeforcesRank(handle) {
  if (!handle) {
    console.log("Invalid Codeforces handle: ", handle);
    return { rank: "N/A", error: "Invalid handle" };
  }
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`,
      {
        timeout: 5000,
      }
    );

    if (response.data.status === "OK" && response.data.result.length > 0) {
      const rating = response.data.result[0].rating || "N/A";
      return { rank: rating };
    }

    return { rank: "No rating available", error: "No result found for user" };
  } catch (error) {
    console.error(
      "Error fetching Codeforces rank:",
      error.response ? error.response.data : error.message
    );
    return { rank: "N/A", error: error.message };
  }
}
export { fetchAndSaveRankings };
//------------------------------------------------------------------------------

//TODO: FUNCTION TO FETCH ALL USERS FROM user database
export const showAllUsers = async (req, res) => {
  try {
    const users = await FormData.find({});

    if (users.length === 0) {
      console.log("No users found in the database.");
    }
    const userData = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      githubProfile: user.githubProfile || "N/A",
      leetcodeProfile: user.leetcodeProfile || "N/A",
      codeforcesProfile: user.codeforcesProfile || "N/A",
      admin: user.admin || false,
      verified: user.verified || false,
    }));

    return res.status(200).json({ totalUsers: users.length, users: userData });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching users.",
      error: error.message,
    });
  }
};

//TODO: FUNCTION TO DELETE ALL DATA IN UserRanking Schema
export const deleteAllRankings = async (req, res) => {
  try {
    await UserRanking.deleteMany({});
    return res
      .status(200)
      .json({ message: "All records deleted from UserRankingSchema." });
  } catch (error) {
    console.error("Error deleting user rankings:", error.message);
    return res.status(500).json({
      message: "An error occurred while deleting user rankings.",
      error: error.message,
    });
  }
};

//TODO: FUNCTION TO CALL fetchAndSaveRankings() AND STORE DATA IN UserRankingSchema
export const fetchAndSaveInDB = async (req, res) => {
  try {
    const rankings = await fetchAndSaveRankings();
    // console.log("Rankings fetched:", rankings);

    if (!rankings || !Array.isArray(rankings)) {
      return res.status(400).json({
        message: "Invalid or empty rankings data received.",
      });
    }

    const processedRankings = [];

    for (const userData of rankings) {
      try {
        const processedUser = {
          //convert 'N/A' or undefined ranks to null
          userId: userData.userId || null,
          leetcodeHandle: userData.leetcodeHandle || null,
          leetcodeRank:
            userData.leetcodeRank === "N/A" ||
            userData.leetcodeRank === undefined
              ? null
              : userData.leetcodeRank,
          codeforcesHandle: userData.codeforcesHandle || null,
          codeforcesRank:
            userData.codeforcesRank === "N/A" ||
            userData.codeforcesRank === undefined
              ? null
              : userData.codeforcesRank,
          timestamp: new Date(),
        };
        processedRankings.push(processedUser);
      } catch (error) {
        console.error(
          `Error processing user data for ${userData.name || "Unknown"}:`,
          error.message
        );
      }
    }

    // console.log("Processed Rankings:", processedRankings);

    if (processedRankings.length > 0) {
      for (const processedUser of processedRankings) {
        await UserRanking.updateOne(
          { userId: processedUser.userId },
          { $set: processedUser },
          { upsert: true }
        );
      }
    }

    return res.status(200).json({
      message: "Rankings fetched and saved successfully.",
      data: processedRankings,
    });
  } catch (error) {
    console.error("Error fetching and saving rankings:", error.message);

    return res.status(500).json({
      message: "An error occurred while fetching and saving rankings.",
      error: error.message,
    });
  }
};

//TODO: TO VIEW THE CONTENTS OF THE DATABASE
export const showAllRankings = async (req, res) => {
  try {
    const rankings = await UserRanking.find({});
    return res.status(200).json({
      message: "Rankings retrieved successfully.",
      data: rankings,
    });
  } catch (error) {
    console.error("Error retrieving user rankings:", error.message);
    return res.status(500).json({
      message: "An error occurred while retrieving user rankings.",
      error: error.message,
    });
  }
};

//  TODO: GRANT ADMIN ACCESS
export const grantAdminAccess = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const updatedMember = await FormData.findOneAndUpdate(
            { email }, 
            { admin: true }, 
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ error: `No member found with email: ${email}` });
        }

        res.status(200).json({ message: 'Admin access granted', member: updatedMember });
    } catch (error) {
        console.error(`Error granting admin access to email ${email}:`, error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
