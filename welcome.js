const mongoose = require("mongoose"); 
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("./models/welcomeModel.js");

const { MessageEmbed } = require("discord.js");

module.exports = async (client) => {
    client.on('guildMemberAdd', async (member) => {
        var welcomeChannelID;
        var rulesChannelID;
        var doubtsChannelID;
        var geralChannelID;
        var memesChannelID;
        var partnershipChannelID;
        var linkChannelID;

        await Data.findOne({
            channelName: "Boas-vindas"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                welcomeChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Regras"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                rulesChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Dúvidas"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                doubtsChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Chat Geral"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                geralChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Memes"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                memesChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Parcerias"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                partnershipChannelID = data.channelID;
            }
        });

        await Data.findOne({
            channelName: "Link"
        }, (err, data) => {
            if(err) console.log(err);
            else {
                linkChannelID = data.channelID;
            }
        });
       
        if (!welcomeChannelID) return;

        const welcomeChannel = client.channels.cache.get(welcomeChannelID);
        const rulesChannel = client.channels.cache.get(rulesChannelID);
        const doubtsChannel = client.channels.cache.get(doubtsChannelID);
        const geralChannel = client.channels.cache.get(geralChannelID);
        const memesChannel = client.channels.cache.get(memesChannelID);
        const partnershipChannel = client.channels.cache.get(partnershipChannelID);
        const linkChannel = client.channels.cache.get(linkChannelID);

        const userAvatar = member.user.displayAvatarURL({dynamic: true, size: 64});

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setDescription("Bem-vindo ao servidor **🕹 Jogar Jojinhos**, " + `${member}!`)
            .addField('Por favor, leia os canais abaixo', `${rulesChannel}` + " \u200B " + `${doubtsChannel}`)
            .addField('Veja também os canais úteis', `${geralChannel}` + " \u200B " + `${memesChannel}`)
            .addField('\u200B', '\u200B')
            .addField('Parceiros', `${partnershipChannel}`, true)
            .addField('Link do Discord', `${linkChannel}`, true)
            .setThumbnail(userAvatar);
        welcomeChannel.send(embed);
    });
}