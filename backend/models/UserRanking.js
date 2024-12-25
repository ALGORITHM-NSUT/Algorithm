import mongoose from "mongoose";

const userRankingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "FormData", required: true },
    leetcodeHandle: { type: String, default: null },
    leetcodeRank: { type: Number, default: null },
    codeforcesHandle: { type: String, default: null },
    codeforcesRank: { type: Number, default: null },
    timestamp: { type: Date, default: Date.now }
});

const UserRanking = mongoose.model('UserRanking', userRankingSchema, 'User_Rankings');
export default UserRanking;
