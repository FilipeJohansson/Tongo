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
	name: 'new',
    description: 'Cria um novo canal temporário.',
    args: true,
    guildOnly: true,
    usage: ["[apelido da categoria]"],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {        

        console.log("antes verf " + message.client.tempchannel);
        if(message.client.tempChannel == '0') {
            return message.reply(`a criação de canais temporários está desativada.`);
        }
        // Lista de Maps: client.tempChannels

        let tempChannelId = args[0];
        let categoryId = null;
        let voiceId = null;

        Data.findOne({
            tempChannelId: tempChannelId.toString()
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                message.guild.channels.create(tempChannelId + " Temp", {
                    type: 'category',
                }).then(async (channel) => {
                    categoryId = channel.id;
    
                    message.guild.channels.create("➕ Criar novo canal", {
                        type: 'voice',
                    }).then(async (channel) => {
                        channel.setParent(categoryId);
                        
                        voiceId = channel.id;

                        const tempChannelConstruct = {
                            categoryId: categoryId,
                            voiceId: voiceId,
                        };

                        message.client.tempChannels.set(tempChannelId, tempChannelConstruct);

                        const tempChannel = message.client.tempChannels.get(tempChannelId);

                        const newData = new Data({
                            tempChannelId: tempChannelId,
                            tempChannelMap: tempChannel,
                        })
                        newData.save().catch(err => console.log(err));
                    });

                    return message.channel.send(`A categoria de canais temporários ${tempChannelId} foi criada.`); 
                });

            } else {
                return message.channel.send(`Já existe uma categoria chamada ${tempChannelId}.`);
            }

        });

    }

}