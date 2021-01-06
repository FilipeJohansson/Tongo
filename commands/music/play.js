const ytdl = require('ytdl-core');

const queue = new Map();

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

        const serverQueue = queue.get(message.guild.id);
        const songInfo = await ytdl.getInfo(args.toString());

        // para ficar na fila se necessário
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
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

            queue.set(message.guild.id, queueContruct);

            queueContruct.songs.push(song);

            try{
                var connection = await channelVoice.join();
                //.then(async connection => {
                    //const dispatcher = connection.play(ytdl(`${args.toString()}`, { volume: 0.2, filter: 'audioonly' }));
                    //dispatcher.pause();
                //});

                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);

                message.channel.send(`Tocando **${songInfo.videoDetails.title}**`); 

            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send("Não foi possível tocar");
            }
        } else {
            serverQueue.songs.push(song);
            message.channel.send(`**${songInfo.videoDetails.title}** adicionado a fila!`);
        }

        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            console.log(serverQueue);
        
            if (!song) {
              serverQueue.channelVoice.leave();
              queue.delete(guild.id);
              return;
            }
        
            const dispatcher = serverQueue.connection
            .play(ytdl(`${args.toString()}`, { volume: 0.2, filter: 'audioonly' }))
            .on("finish", () => {
              serverQueue.songs.pop();
              play(guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));

            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Começando a tocar: **${songInfo.videoDetails.title}**`);
        }
        


    }
}