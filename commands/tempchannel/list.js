const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'list',
    description: 'Listas as categorias de canais temporários.',
    guildOnly: true,
    aliases: ["lista", "listar"],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        // Lista de Maps: client.tempChannels

        const tempChannels = message.client.tempChannels;

        if(!tempChannels.size) 
            return message.reply("não existe nenhum canal temporário.");

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setTitle("Lista de Canais Temporários")
            .setDescription(`${tempChannels.map(channels => `- ${channels.tempChannelId}`).join('\n')}`)
            .setThumbnail("https://media.tenor.com/images/4683e91aed773c36f4b7c8e2e2027601/tenor.gif");

        if(message.client.allowTempChannel) {
            embed.setFooter(`A criação de novos canais temporários está: Ativada`, "https://upload.wikimedia.org/wikipedia/commons/2/2d/Basic_green_dot.png");
        } else {
            embed.setFooter(`A criação de novos canais temporários está: Desativada`, "https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png");
        }
        
        return message.channel.send(embed);

    }

}