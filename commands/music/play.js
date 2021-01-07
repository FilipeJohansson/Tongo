const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  description: 'Toca a música.',
  args: true,
  guildOnly: true,
  usage: ['<URL>'],
	async execute(message, args) {
        //Achar o canal de voz:
        const channelVoice = message.member.voice.channel;
        if(!channelVoice)
            return message.reply("Você precisa estar em um canal de voz para usar esse comando");
        //console.log(channelVoice);
        
        //Ter acesso ao canal
        const permission = channelVoice.permissionsFor(message.client.user);
        if(!permission.has("CONNECT") || !permission.has("SPEAK")) {
            return message.reply("Eu não tenho permissão para entrar e falar nesse canal");
        }

        const serverQueue = message.client.queue.get(message.guild.id);
        const songInfo = await ytdl.getInfo(args.toString());

        // para ficar na fila se necessário
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            playing: true,
        };

        if(!serverQueue){
            const queueContruct = {
                textChannel: message.channel,
                channelVoice: channelVoice,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            message.client.queue.set(message.guild.id, queueContruct);

            queueContruct.songs.push(song);

            try{
                var connection = await channelVoice.join();
                //.then(async connection => {
                    //const dispatcher = connection.play(ytdl(`${args.toString()}`, { volume: 0.2, filter: 'audioonly' }));
                    //dispatcher.pause();
                //});

                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);

            } catch (err) {
                console.log(err);
                message.client.queue.delete(message.guild.id);
                return message.channel.send("Não foi possível tocar");
            }
        } else {
            serverQueue.songs.push(song);
            message.channel.send(`**${songInfo.videoDetails.title}** adicionado a fila!`);
        }

        async function play(guild, song) {
            const serverQueue = message.client.queue.get(guild.id);
        
            if (!song) {
              serverQueue.channelVoice.leave();
              message.client.queue.delete(guild.id);
              return;
            }
        
            const dispatcher = serverQueue.connection
            .play(ytdl(song.url, { volume: 0.2, filter: 'audioonly' }))
            .on("finish", async () => {
                await serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));

            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Começando a tocar: **${song.title}**`);
        }
        


    }
}