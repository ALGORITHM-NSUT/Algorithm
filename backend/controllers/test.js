function calculateRankings(users, leetcodeWeight = 0.5, codeforcesWeight = 0.5) {
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
        return ratings.map(rating => rankMap.get(rating));
    }

    const leetcodeRatings = users.map(user => user.leetcodeRating);
    const codeforcesRatings = users.map(user => user.codeforcesRating);

    const leetcodeRanks = calculateRanking(leetcodeRatings);
    const codeforcesRanks = calculateRanking(codeforcesRatings);

    return users.map((user, index) => {
        const leetcodeRank = leetcodeRanks[index];
        const codeforcesRank = codeforcesRanks[index];
        const combinedScore = (leetcodeRank !== null ? leetcodeRank : (users.length + 1)) * leetcodeWeight + (codeforcesRank !== null ? codeforcesRank : (users.length + 1)) * codeforcesWeight;

        return {
            name:user.name,
            userId: user.userId,
            leetcodeRank: leetcodeRank,
            codeforcesRank: codeforcesRank,
            combinedScore: combinedScore
        };
    }).sort((a, b) => {
        if (a.combinedScore !== b.combinedScore) {
            return a.combinedScore - b.combinedScore; // Lower combined score first
        }
        else if (a. codeforcesRank !== b. codeforcesRank) {
            return a. codeforcesRank - b. codeforcesRank; // Higher Codeforces rating first
        }
        else if (a.leetcodeRank !== b.leetcodeRank) {
            return a.leetcodeRank - b.leetcodeRank; // Lower LeetCode rank first
        }
       
        return a.userId - b.userId; // Lower userId first
    });

    
}

// Example usage
const users = [
    { userId: 1, leetcodeRating: 1500, codeforcesRating: 1400 },
    { userId: 2, leetcodeRating: 1600, codeforcesRating: 1350 },
    { userId: 3, leetcodeRating: 1400, codeforcesRating: 1450 },
    { userId: 4, leetcodeRating: 1450, codeforcesRating: 1400 },
    { userId: 14, leetcodeRating: null, codeforcesRating: 1800 },
    
];


const data={
    "message": "Rankings retrieved successfully.",
    "data": [
        {
            "_id": "676bba62a1db669f2294ef51",
            "userId": "672cc6c28816a92c12abd069",
            "__v": 0,
            "codeforcesHandle": "neatshit",
            "codeforcesRank": 1179,
            "leetcodeHandle": "attitude king",
            "leetcodeRank": null,
            "timestamp": "2025-01-11T05:31:47.966Z",
            "score": 0.35574031231925973,
            "name": "nitish"
        },
        {
            "_id": "676bba62a1db669f2294ef52",
            "userId": "672cd7dcc6141feb4c8ddfb5",
            "__v": 0,
            "codeforcesHandle": "mohitmongia2005",
            "codeforcesRank": 979,
            "leetcodeHandle": "mohitmongia2005",
            "leetcodeRank": 1671.1636688566239,
            "timestamp": "2025-01-20T17:50:24.678Z",
            "score": 0.16429423247188885,
            "name": "Mohit Mongia"
        },
        {
            "_id": "676bba62a1db669f2294ef53",
            "userId": "672cd88b40cc615d0ff6e18f",
            "__v": 0,
            "codeforcesHandle": "Sparsh_7637",
            "codeforcesRank": 1172,
            "leetcodeHandle": "Sparsh_7637",
            "leetcodeRank": 1619.9105583161283,
            "timestamp": "2025-01-20T17:50:22.820Z",
            "score": 0.18500281689846787,
            "name": "Sparsh Gulati"
        },
        {
            "_id": "676bba62a1db669f2294ef54",
            "userId": "672cf9219d014a002b87bfda",
            "__v": 0,
            "codeforcesHandle": "Raj_Soni",
            "codeforcesRank": 1041,
            "leetcodeHandle": "StringyRaj",
            "leetcodeRank": 1576.7413691470497,
            "timestamp": "2025-01-20T17:50:23.628Z",
            "score": 0.15575414079152397,
            "name": "Raj Soni"
        },
        {
            "_id": "676bba62a1db669f2294ef55",
            "userId": "672dba9c585a46714069544e",
            "__v": 0,
            "codeforcesHandle": "prthmmkhija1",
            "codeforcesRank": 1241,
            "leetcodeHandle": "prthmmkhija1",
            "leetcodeRank": 1614.9067461811042,
            "timestamp": "2025-01-20T17:50:24.451Z",
            "score": 0.19500221169150658,
            "name": "Pratham Makhija"
        },
        {
            "_id": "676bba62a1db669f2294ef56",
            "userId": "672dbb28344828016dd92054",
            "__v": 0,
            "codeforcesHandle": "kakasuarez",
            "codeforcesRank": 1291,
            "leetcodeHandle": "kakasuarez",
            "leetcodeRank": 1659.358,
            "timestamp": "2025-01-20T17:50:24.063Z",
            "score": 0.21161757069825068,
            "name": "Vatsal Veerwal"
        },
        {
            "_id": "676bba62a1db669f2294ef57",
            "userId": "672dbd23f8a42c9c8b9942e0",
            "__v": 0,
            "codeforcesHandle": "4yu5h_",
            "codeforcesRank": 1233,
            "leetcodeHandle": "4yu5h_",
            "leetcodeRank": 1631.8366855162337,
            "timestamp": "2025-01-20T17:50:24.029Z",
            "score": 0.1970291540482792,
            "name": "Ayush Gangwar"
        },
        {
            "_id": "676bba62a1db669f2294ef58",
            "userId": "672e2fb1d3b287cf381690f6",
            "__v": 0,
            "codeforcesHandle": "vivekanand.rai.ug23",
            "codeforcesRank": 357,
            "leetcodeHandle": "Eren_the_coding_titan",
            "leetcodeRank": null,
            "timestamp": "2024-12-28T05:47:26.804Z",
            "score": 0.225,
            "name": "Vivekanand Rai "
        },
        {
            "_id": "676bba62a1db669f2294ef59",
            "userId": "672f6e25a6e6b090ed8ce11a",
            "__v": 0,
            "codeforcesHandle": "MKS_Rajput",
            "codeforcesRank": 1036,
            "leetcodeHandle": "MKS_RAJPUT",
            "leetcodeRank": 1417.6133724352385,
            "timestamp": "2025-01-20T17:50:26.430Z",
            "score": 0.12394757222389247,
            "name": "Shivam"
        },
        {
            "_id": "676bba62a1db669f2294ef5a",
            "userId": "672f701e2d446a87c4a81a6e",
            "__v": 0,
            "codeforcesHandle": "bhumidahiya7",
            "codeforcesRank": 512,
            "leetcodeHandle": "6hum1_",
            "leetcodeRank": 1335.7609977493003,
            "timestamp": "2025-01-20T17:50:23.905Z",
            "score": 0.024652978600347025,
            "name": "Bhumi "
        },
        {
            "_id": "676bba62a1db669f2294ef5b",
            "userId": "673060fb02d3a740ba8fa652",
            "__v": 0,
            "codeforcesHandle": "vasuNSUT",
            "codeforcesRank": 957,
            "leetcodeHandle": "vasunsut",
            "leetcodeRank": 1694.4661859320831,
            "timestamp": "2025-01-20T17:50:29.584Z",
            "score": 0.16533636003965152,
            "name": "Vasu Reena Kush Varshneya"
        },
        {
            "_id": "676bba62a1db669f2294ef5c",
            "userId": "673c6694e815820b3d91f2b1",
            "__v": 0,
            "codeforcesHandle": "Svsiv_Gamingmood",
            "codeforcesRank": 838,
            "leetcodeHandle": "shreshthvarshney2017",
            "leetcodeRank": 1477.916,
            "timestamp": "2025-01-20T17:50:29.577Z",
            "score": 0.10420732573247447,
            "name": "shreshth varshney"
        },
        {
            "_id": "676d4537a1db669f2294ef61",
            "userId": "672de5ae4b669b009eee4d2e",
            "__v": 0,
            "codeforcesHandle": "b4758744-e20b-4cba-be82-2624aed7ca4a",
            "codeforcesRank": null,
            "leetcodeHandle": "tanishka_r123",
            "leetcodeRank": 1479.7067642211914,
            "score": 0.30305255549795296,
            "timestamp": "2025-01-20T17:50:28.430Z",
            "name": "Tanishka"
        },
        {
            "_id": "676d4537a1db669f2294ef62",
            "userId": "672e5958e2b8c0655fe70fe0",
            "__v": 0,
            "codeforcesHandle": "N/A",
            "codeforcesRank": null,
            "leetcodeHandle": "himalayajindal",
            "leetcodeRank": 1595.138,
            "score": 0.3255481191206222,
            "timestamp": "2025-01-20T17:50:27.746Z",
            "name": "Himalaya Jindal"
        },
        {
            "_id": "676d4537a1db669f2294ef63",
            "userId": "6736b2c975fe7082f206ca24",
            "__v": 0,
            "codeforcesHandle": "N/A",
            "codeforcesRank": null,
            "leetcodeHandle": "AradhyA_s",
            "leetcodeRank": 1449.727,
            "score": 0.2972100147949949,
            "timestamp": "2025-01-20T17:50:29.018Z",
            "name": "Aradhya Sharma"
        },
        {
            "_id": "676d4537a1db669f2294ef64",
            "userId": "673b42aad688727082c6e91f",
            "__v": 0,
            "codeforcesHandle": "N/A",
            "codeforcesRank": null,
            "leetcodeHandle": "R83",
            "leetcodeRank": 1397.962,
            "score": 0.2871219061208499,
            "timestamp": "2025-01-20T17:50:29.554Z",
            "name": "Raj Raman"
        },
        {
            "_id": "676d4537a1db669f2294ef65",
            "userId": "675b12869330b05e77cdc299",
            "__v": 0,
            "codeforcesHandle": "nikhilsingh8265",
            "codeforcesRank": null,
            "leetcodeHandle": "nikhilsingh8265",
            "leetcodeRank": 1445.6113514147307,
            "score": 0.29640794563257267,
            "timestamp": "2025-01-20T17:50:29.917Z",
            "name": "Nikhil"
        },
        {
            "_id": "6789558dbd2e6b591a4963d7",
            "userId": "672ca0a114a2f645659cb3cf",
            "__v": 0,
            "codeforcesHandle": "tourist",
            "codeforcesRank": 3815,
            "leetcodeHandle": null,
            "leetcodeRank": null,
            "name": "Sarthak Sharma",
            "score": 0.775,
            "timestamp": "2025-01-16T18:53:01.516Z"
        },
        {
            "_id": "678ca17c00f995a57f7a0773",
            "userId": "672d176d03742520bcfe8a62",
            "__v": 0,
            "codeforcesHandle": "Benq",
            "codeforcesRank": 3482,
            "leetcodeHandle": "fjzzq2002",
            "leetcodeRank": null,
            "name": "Jagrit Jain",
            "score": 0.7220358588779642,
            "timestamp": "2025-01-20T17:19:27.036Z"
        },
        {
            "_id": "678d557b00f995a57f7a07cd",
            "userId": "678d41dc1bb85301e0cd8ffe",
            "__v": 0,
            "codeforcesHandle": "tourist",
            "codeforcesRank": 3815,
            "leetcodeHandle": "Yawn_Sean",
            "leetcodeRank": 3644.841,
            "name": "test",
            "score": 1,
            "timestamp": "2025-01-20T18:55:26.456Z"
        }
    ]
}
const data2=data.data.map((user)=>{
    return {
         name:user.name,
        userId: user.userId,
        leetcodeRating: user.leetcodeRank,
        codeforcesRating: user.codeforcesRank
    }
})
console.log("sample data ",data2)

const results = calculateRankings(data2, 0.4, 0.6);
console.log(results) // Example weights: 60% for leetcode, 40% for codeforces
function getUsersWithSameCombinedScore(results) {
    const scoreMap = new Map();
    const sameScoreUsers = [];
    for (const result of results) {
        if (scoreMap.has(result.combinedScore)) {
            sameScoreUsers.push(result);
            sameScoreUsers.push(scoreMap.get(result.combinedScore));
        } else {
            scoreMap.set(result.combinedScore, result);
        }
    }
    return sameScoreUsers;
}

console.log("Users with same combined score:", getUsersWithSameCombinedScore(results));
