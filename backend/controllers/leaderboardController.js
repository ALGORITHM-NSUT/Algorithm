import axios from "axios";
import FormData from "../models/formDataModel.js";
import UserRanking from "../models/UserRanking.js";
import pLimit from "p-limit";
// import { initializeSocket, terminateSocket, check } from "../app.js";
// new sorting
export async function updatecalculateRankings(
  users,
  leetcodeWeight = 0.5,
  codeforcesWeight = 0.5
) {
  function calculateRanking(ratings) {
    const sorted = [...ratings].sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      return b - a;
    });
    const rankMap = new Map();

    sorted.forEach((rating, index) => {
      if (!rankMap.has(rating)) {
        rankMap.set(rating, rating === null ? sorted.length + 1 : index + 1);
      }
    });
    return ratings.map((rating) => rankMap.get(rating));
  }

  const leetcodeRatings = users.map((user) => user.leetcodeRank);
  const codeforcesRatings = users.map((user) => user.codeforcesRank);

  const leetcodeRanks = calculateRanking(leetcodeRatings);
  const codeforcesRanks = calculateRanking(codeforcesRatings);

  const rankings = await Promise.all(
    users.map(async (user, index) => {
      const leetcodeRank = leetcodeRanks[index];
      const codeforcesRank = codeforcesRanks[index];
      const combinedScore =
        (leetcodeRank !== null ? leetcodeRank : users.length + 1) *
          leetcodeWeight +
        (codeforcesRank !== null ? codeforcesRank : users.length + 1) *
          codeforcesWeight;
      let t = await UserRanking.updateOne(
        { _id: user._id },
        {
          // to sort in descending in function itself
          score: 100 - combinedScore,
        }
      );
      return {
        name: user.name,
        userId: user.userId,
        leetcodeRank: leetcodeRank,
        codeforcesRank: codeforcesRank,
        combinedScore: combinedScore,
      };
    })
  );
   return rankings.sort((a, b) => {
      if (a.combinedScore !== b.combinedScore) {
        return a.combinedScore - b.combinedScore; // Lower combined score first
      } else if (a.codeforcesRank !== b.codeforcesRank) {
        return a.codeforcesRank - b.codeforcesRank; // Higher Codeforces rating first
      } else if (a.leetcodeRank !== b.leetcodeRank) {
        return a.leetcodeRank - b.leetcodeRank; // Lower LeetCode rank first
      }

      return a.userId - b.userId; // Lower userId first
    });
}

function ogcalculateRankings(
  users,
  leetcodeWeight = 0.5,
  codeforcesWeight = 0.5
) {
  function calculateRanking(ratings) {
    const sorted = [...ratings].sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      return b - a;
    });
    const rankMap = new Map();

    sorted.forEach((rating, index) => {
      if (!rankMap.has(rating)) {
        rankMap.set(rating, rating === null ? sorted.length + 1 : index + 1);
      }
    });
    return ratings.map((rating) => rankMap.get(rating));
  }

  const leetcodeRatings = users.map((user) => user.leetcodeRating);
  const codeforcesRatings = users.map((user) => user.codeforcesRating);

  const leetcodeRanks = calculateRanking(leetcodeRatings);
  const codeforcesRanks = calculateRanking(codeforcesRatings);

  return users
    .map((user, index) => {
      const leetcodeRank = leetcodeRanks[index];
      const codeforcesRank = codeforcesRanks[index];
      const combinedScore =
        (leetcodeRank !== null ? leetcodeRank : users.length + 1) *
          leetcodeWeight +
        (codeforcesRank !== null ? codeforcesRank : users.length + 1) *
          codeforcesWeight;

      return {
        name: user.name,
        userId: user.userId,
        leetcodeRank: leetcodeRank,
        codeforcesRank: codeforcesRank,
        combinedScore: combinedScore,
      };
    })
    .sort((a, b) => {
      if (a.combinedScore !== b.combinedScore) {
        return a.combinedScore - b.combinedScore; // Lower combined score first
      } else if (a.codeforcesRank !== b.codeforcesRank) {
        return a.codeforcesRank - b.codeforcesRank; // Higher Codeforces rating first
      } else if (a.leetcodeRank !== b.leetcodeRank) {
        return a.leetcodeRank - b.leetcodeRank; // Lower LeetCode rank first
      }

      return a.userId - b.userId; // Lower userId first
    });
}

const getusername = async (user) => {
  try {
    const target = await FormData.findOne({ _id: user.userId });

    return target.name;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//TODO:  CONSTRUCT LEADERBOARD - here the formula to calculate score will come

export const fetchLeaderboardData = async (req, res) => {
  try {
    // console.log("hello");
    const updatedRankings = await fetchNewRanks();
    const rankings = await UserRanking.find({}).lean();
    // update the useranking model in mongodb
    /* form   {
    name: 'Vivekanand Rai ',
    userId: '672e2fb1d3b287cf381690f6',
    leetcodeRank: 21,
    codeforcesRank: 15,
    combinedScore: 17.4
  }*/
    let data = await updatecalculateRankings(rankings, 0.6, 0.4);
    console.log("normalised ranks: ", data);
   
    // initializeSocket();
    // const io = req.app.get("socketIO");
    // if (!io) {
    //   console.error("SocketIO instance not found");
    //   return res.status(500).json({ error: "SocketIO instance not found" });
    // }
    // io.emit("refresh-standings", { message: "Refresh standings" });
    // // check();
    // setTimeout(() => terminateSocket(), 500);

    return res.status(200).json({
      message: "the normalised ranks",
      data: data,
    });
  } catch (error) {
    // terminateSocket();
    console.log("couldn't fetch useranks", error);
    res.status(400).json({
      error: "couldn't normalised",
    });
  }
};

//TODO: FETCH AND SAVE IN DB_2 - only updates the users in UserRankingSchema
export const fetchNewRanks = async (req, res) => {
  try {
    // console.log("hello hello");
    const users = await UserRanking.find();

    if (!users || users.length === 0) {
      console.log("No users found in UserRanking.");
      return [];
    }

    const batchSize = 10;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const limit = pLimit(5);
    const updatedRankings = [];

    async function fetchAndUpdateUser(user) {
      const {
        leetcodeHandle,
        codeforcesHandle,
        userId,
        name,
        leetcodeRank,
        codeforcesRank,
      } = user;

      let newLeetcodeRank = leetcodeRank;
      let newCodeforcesRank = codeforcesRank;

      if (
        leetcodeHandle &&
        isValidHandle(leetcodeHandle) &&
        leetcodeRank !== null
      ) {
        await limit(async () => {
          try {
            await delay(500);
            const { rank } = await extractLeetCodeRank(leetcodeHandle);
            if (!isNaN(Number(rank))) {
              newLeetcodeRank = Number(rank);
            }
          } catch (error) {
            console.error(
              `Error fetching LeetCode rank for ${leetcodeHandle}:`,
              error.message
            );
          }
        });
      }

      if (
        codeforcesHandle &&
        isValidHandle(codeforcesHandle) &&
        codeforcesRank !== null
      ) {
        try {
          await delay(500);
          const { rank } = await extractCodeforcesRank(codeforcesHandle);
          if (rank !== null) {
            newCodeforcesRank = rank;
          }
        } catch (error) {
          console.error(
            `Error fetching Codeforces rank for ${codeforcesHandle}:`,
            error.message
          );
        }
      }

      const shouldUpdateLeetcode =
        newLeetcodeRank !== null && newLeetcodeRank !== leetcodeRank;
      const shouldUpdateCodeforces =
        newCodeforcesRank !== null && newCodeforcesRank !== codeforcesRank;

      if (shouldUpdateLeetcode || shouldUpdateCodeforces) {
        const updatedUser = {
          userId,
          name,
          leetcodeHandle,
          leetcodeRank: shouldUpdateLeetcode ? newLeetcodeRank : leetcodeRank,
          codeforcesHandle,
          codeforcesRank: shouldUpdateCodeforces
            ? newCodeforcesRank
            : codeforcesRank,
          timestamp: new Date(),
        };

        updatedRankings.push(updatedUser);

        try {
          await UserRanking.updateOne(
            { userId },
            { $set: updatedUser },
            { upsert: true }
          );
          console.log(
            `Rankings updated successfully for ${name || "Unknown"}.`
          );
        } catch (error) {
          console.error(
            `Error updating user ranking for ${name || "Unknown"}:`,
            error.message
          );
        }
      }
    }

    async function processBatch(batch) {
      return Promise.all(batch.map(fetchAndUpdateUser));
    }

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await processBatch(batch);
    }

    // return res.status(200).json({
    //   message: "Rankings updated successfully.",
    //   data: updatedRankings,
    // });
    return updatedRankings;
  } catch (error) {
    console.error("Error in fetchNewRanks():", error);
    // return res.status(500).json({
    //   message: "An error occurred while updating rankings.",
    //   error: error.message || "Unknown error occurred.",
    // });
    throw error;
  }
};

//TODO: FETCH AND RETURN RANKINGS - fetches all rankings
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
export const extractHandle = function (profile) {
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
};

function isValidHandle(handle) {
  return handle && handle.trim().toLowerCase() !== "na";
}
const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3, delayMs = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn(`Rate limit hit. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw error; // Rethrow other errors
      }
    }
  }
  throw new Error("Max retries reached");
}

export const extractLeetCodeRank = async (handle) => {
  const url = `https://alfa-leetcode-api.onrender.com/${handle}/contest`;

  try {
    const response = await fetchWithRetry(url);

    // const response = await axios.get(url);
    // console.log("response.data :", response.data);

    if (response && response.data && response.data.contestRating) {
      return { rank: response.data.contestRating };
    } else {
      console.error("No rank data available for user:", handle);
      return { rank: null, error: "No rank data available" };
    }
  } catch (error) {
    console.error(`Error fetching LeetCode rank for ${handle}:`, error.message);
    return { rank: null, error: error.message };
  }
};

export const extractCodeforcesRank = async (handle) => {
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
      const rating = response.data.result[0].rating || null;
      return { rank: rating };
    }

    return { rank: null, error: "No result found for user" };
  } catch (error) {
    console.error(
      "Error fetching Codeforces rank:",
      error.response ? error.response.data : error.message
    );
    return { rank: null, error: error.message };
  }
};
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
          name: userData.name || null,
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

    console.log("Processed Rankings:", processedRankings);

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

//  TODO: GRANT ADMIN ACCESS
export const grantAdminAccess = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const updatedMember = await FormData.findOneAndUpdate(
      { email },
      { admin: true },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res
        .status(404)
        .json({ error: `No member found with email: ${email}` });
    }

    res
      .status(200)
      .json({ message: "Admin access granted", member: updatedMember });
  } catch (error) {
    console.error(
      `Error granting admin access to email ${email}:`,
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//TODO: TO VIEW THE CONTENTS OF THE DATABASE
export const showAllRankings = async (req, res) => {
  try {
    const rankings = await UserRanking.find({});
    return res.status(200).json({
      message: "Rankings retrieved successfully.",
      // without update

      /* form   {
    name: 'Vivekanand Rai ',
    userId: '672e2fb1d3b287cf381690f6',
    leetcodeRank: 21,
    codeforcesRank: 15,
    combinedScore: 17.4
  }*/
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

export const deleteUser = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await UserRanking.deleteOne({ name });
    if (result.deletedCount > 0) {
      const rankings = await UserRanking.find({}).lean();
      await updatecalculateRankings(rankings, 0.6, 0.4);
      return res
        .status(200)
        .json({ message: `Record with name ${name} deleted successfully.` });
    } else {
      return res
        .status(404)
        .json({ message: `No record found with name ${name}.` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
