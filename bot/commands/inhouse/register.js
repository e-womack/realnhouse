const commando = require("discord.js-commando");
const fileIO = require("../../savedFiles/fileIO");
const trueskill = require("ts-trueskill");
trueskill.TrueSkill();

class RegisterCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "register",
            group: "inhouse",
            memberName: "register",
            description: "Register yourself to play, !register <name> <na/eu>",
            args: [
                {
                    key: "sn",
                    prompt: "Please type your battlerite username",
                    type: "string"
                }, {
                    key: "region",
                    prompt: "Please type your battlerite region",
                    type: "string"
                }
            ]
        })
        this.users = fileIO.data.users;
    }

    async run(message, args) {
        if (message.channel.id == '398946565831655424') {
            if (args.region.toUpperCase() !== "NA" && args.region.toUpperCase() !== "EU") {
                message
                    .channel
                    .send("Please provide a correct region. !register <username> <EU/NA>");
            } else {
                const users = this.users;
                const discordID = message.author.id;
                const name = args
                    .sn
                    .trim();
                const region = args
                    .region
                    .toUpperCase();
                if (!this.users.find(u => u.discordID === discordID) && !this.users.find(u => u.name === name)) {
                    const newUser = {
                        discordID,
                        name,
                        region,
                        rating: new trueskill.Rating(25, 1.618),
                        wins: 0,
                        losses: 0
                    }
                    this
                        .users
                        .push(newUser);
                    message
                        .channel
                        .send(`Registered ${discordID} as ${name} in ${region}`)
                    fileIO.writeUsers(this.users);
                } else {
                    message
                        .channel
                        .send(`${discordID} or ${name} is already registered.`);
                }
            }
            message.delete();
        }
    }
}

module.exports = RegisterCommand