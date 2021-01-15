const mongoose = require("mongoose"); 
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("../../models/tempchannels.js");

module.exports = {
	name: 'delete',
    description: 'Deleta um canal temporário.',
    args: true,
    guildOnly: true,
    usage: ["[apelido da categoria]"],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        // Lista de Maps: client.tempChannels

        if(!message.client.tempChannels.size) 
            return message.reply("não existe nenhum canal temporário.");

        let tempChannel = args[0].toLowerCase();

        if(!message.client.tempChannels.get(tempChannel))
            return message.reply("não existe nenhum canal temporário com este apelido.");

        let tempChannelId = tempChannel;
        
        let categoryId = message.client.tempChannels.get(tempChannelId).categoryId;
        let voiceId = message.client.tempChannels.get(tempChannelId).voiceId;

        Data.findOne({
            tempChannelId: tempChannelId.toString()
        }, async (err, data) => {
            if(err) console.log(err);
            if(!data) {
                return message.channel.send(`Erro ao achar canal.`);
            } else {
                Data.deleteOne({
                    tempChannelId: tempChannelId.toString()
                }, (err, data) => {
                    if(err) console.log(err);
                    if(!data) return message.channel.send(`Erro ao deletar.`);
                    else {
                        const fetchedCategory = message.guild.channels.cache.get(categoryId);
                        const fetchedVoice = message.guild.channels.cache.get(voiceId);

                        try {
                            fetchedCategory.delete();
                            fetchedVoice.delete();

                            message.client.tempChannels.delete(tempChannel);
                        } catch (error) {
                            console.error(error);
                            return message.channel.send(`Erro ao deletar o canal temporário.`);
                        }
                    }
                });

                return message.channel.send(`O canal temporário ${tempChannelId} foi deletado.`);
            }
        });

    }

}