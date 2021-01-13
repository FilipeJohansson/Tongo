const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'np',
    description: 'Mostra a música que está tocando.',
    args: false,
    guildOnly: true,
    aliases: ['tocandoagora', 'ta'],
	async execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setTitle("Tocando agora")
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
            .setFooter(`Duração: ${serverQueue.songs[0].time}`, `https://media1.tenor.com/images/6af63d02d8781833b77d65c0ec051c4d/tenor.gif?itemid=17974316`)
            .setThumbnail(`${serverQueue.songs[0].thumbnail}`);
        return message.channel.send(embed);

    }
}