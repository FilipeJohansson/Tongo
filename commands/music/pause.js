module.exports = {
	name: 'pause',
    description: 'Pausa a música.',
    args: false,
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        //Verificar se o bot está tocando no canal
        
        const channelVoice = message.member.voice.channel;
        //console.log(channelVoice);
        const connection = channelVoice.join();
        const dispatcher = connection.play();
        dispatcher.pause();
        console.log(connection);
    }
}