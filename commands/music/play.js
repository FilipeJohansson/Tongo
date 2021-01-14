const { Util } = require("discord.js");

const ytdl = require('ytdl-core');
const yts = require("yt-search");

module.exports = {
    name: 'play',
    description: 'Procura uma música e adiciona na fila.',
    args: true,
    guildOnly: true,
    usage: ['[YT URL/Nome da Música]'],
    aliases: ['tocar'],
	async execute(message, args) {
        //Achar o canal de voz:
        const channelVoice = message.member.voice.channel;
        const serverQueue = message.client.queue.get(message.guild.id);

        if(!channelVoice)
            return message.reply("Você precisa estar em um canal de voz para usar esse comando");
        //console.log(channelVoice);

        if(serverQueue) {
            console.log(serverQueue.songs.length);
            if(serverQueue.songs.length > 14)
            return message.reply("o limite da fila são 15 músicas.");

            if(serverQueue.channelVoice != channelVoice)
                return message.reply("você está em um canal de voz diferente!");
        }
        
        //Ter acesso ao canal
        const permission = channelVoice.permissionsFor(message.client.user);
        if(!permission.has("CONNECT") || !permission.has("SPEAK")) {
            return message.reply("Eu não tenho permissão para entrar e falar nesse canal");
        }

        const searchString = args.join(" ");

        if (!searchString)
            return message.reply("Você não me disse o que devo tocar");

        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";

        let songInfo = null;
        let song = null;

        if (url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)) {
            try {
                searchedVideos = await yts.search(url);

                if(!searchedVideos)
                    return message.channel.send("Não consegui achar nenhuma música.");

                songInfo = searchedVideos.videos[0];

                song = {
                    title: Util.escapeMarkdown(songInfo.title),
                    url: songInfo.url,
                    time: songInfo.timestamp,
                    thumbnail: songInfo.thumbnail,
                    playing: true,
                };

            } catch (err) {
                console.error(err);
            }
            
        } else {
            if(url.match(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/))
                return message.reply("você precisa enviar um link do YouTube");

            try {
                message.channel.send(`:mag_right:  Procurando: **${searchString}**`);

                const searchedVideos = await yts.search(searchString);

                if(searchedVideos.videos.length === 0)
                    return message.channel.send("Não consegui achar esta música no YouTube");

                songInfo = searchedVideos.videos[0];

                song = {
                    title: Util.escapeMarkdown(songInfo.title),
                    url: songInfo.url,
                    time: songInfo.timestamp,
                    thumbnail: songInfo.thumbnail,
                    playing: true,
                };
            } catch(err) {
                console.error(err);
            }
        }

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
            message.channel.send(`**${songInfo.title}** adicionado a fila!`);
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
            serverQueue.textChannel.send(`:notes: Tocando agora: **${song.title}**`);
        }
        


    }
}