
module.exports = async (oldState, newState) => {
    // newState.channelID tem o ID do canal que a pessoa entrou
    // newState.id tem o ID da pessoa que entrou no canal
    // newState.guild.client.tempChannels tem o MAP dos canais temporários
    const tempChannels = newState.guild.client.tempChannels

    var isTempChannel = false;
    var categoryId = null;

    for (const channelKey of tempChannels.keys()) {
        console.log(channelKey);
        if(newState.channelID == tempChannels.get(channelKey).voiceId) {
            isTempChannel = true;
            categoryId = tempChannels.get(channelKey).categoryId;
            break;
        }
    }

    //console.log(newState);

    if(oldState === undefined && newState !== undefined) {
        // User Joins a voice channel

        if(isTempChannel) {
            newState.guild.channels.create("Canal Temporário", {
                type: 'voice',
            }).then(async (channel) => {
                channel.setParent(categoryId);

                newState.guild.member(newState.id).voice.setChannel(channel);
            });
        }
   
     } else if(newState === undefined){
        // User leaves a voice channel

        if(!isTempChannel) {
            // --> Verificar se está dentro de alguma cateroria temporária
            const channel = newState.guild.channels.cache.get()
        }
   
     }

    // --> Verificar se o canal de voz que o usuário entrou é um canal de voz temporário
    
    
    // --> Criar um novo canal de voz, filho da categoria, com o nome do usuário
    // --> Setar as devidas permissões

    // --> Criar um novo canal de texto, filho da categoria, com o nome do usuário
    // --> Setar as devidas permissões

    // --> Passar o usuário para dentro do canal de voz





    /*
    --> Quando for verificar quantas pessoas tem no voice
    https://stackoverflow.com/questions/59804968/discord-js-how-to-read-all-users-in-a-voice-channel-and-send-a-private-message

    let channelID = 'your voice channel id';
    message.guild.channels.get(channelID).members.forEach((member) => {
        member.send('Your role is villager!');
    });
    */

}