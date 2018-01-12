const commando = require("discord.js-commando");
const sortBy = require("lodash").sortBy;
const fileIO = require("../../savedFiles/fileIO");
const discordFormatting = require("../../misc/discordFormatting");

class LeaderboardCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            group: "inhouse",
            memberName: "leaderboard",
            description: "Check the top 15 players"
        })
        this.users = fileIO.data.users;
    }

    async run(message) {
        const tmpUsers = [];
        const sortedUsers = sortBy(this.users, (user) => -1 * user.rating.mu);
        sortedUsers.forEach((user, index) => {
            if ((user.wins + user.losses >= 5)) {
                tmpUsers.push(`${index + 1}. ${user.name} ${user.wins} - ${user.losses} - ${Math.floor(100 * user.rating.mu)}`)
            }
        });
        message
            .channel
            .send(`Top 15 users with 5+ games played are:${discordFormatting.jsonFormat(JSON.stringify(tmpUsers.slice(0, 15), null, 4))}`);
    }
}

module.exports = LeaderboardCommand