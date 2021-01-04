module.exports = {
	name: 'tempchannel',
    description: 'Cria um servidor.',
    alias: 'temp',
    args: true,
	async execute(message, args) {
        if (args[0] === 'true') {
            message.guild.channels.create("Canais Temporários", {
                type: 'category',
            }).then(async (channel) => {
                const category = await message.guild.channels.cache.find(c => c.name == "Canais Temporários" && c.type == "category");
                const categoryId = category.id;

                message.guild.channels.create("➕ Criar novo canal", {
                    type: 'voice',
                }).then((channel) => {
                    channel.setParent(categoryId);
                });

            /*message.guild.channels.create("New Category", {
                type: 'category',
            }).then(async (channel) => {
                const category = await message.guild.channels.cache.find(c => c.name == "New Category" && c.type == "category");
                const categoryId = category.id;

                message.guild.channels.create("New Text Channel", {
                    type: 'text',
                }).then((channel) => {
                    channel.setParent(categoryId);
                });

                message.guild.channels.create("New Voice Channel", {
                    type: 'voice',
                }).then((channel) => {
                    channel.setParent(categoryId);
                });*/
            });      
        } else if(args[0] === 'false') {
            message.channel.send("False");
        } else {
            message.channel.send("Você não digitou um argumento válido.");
        }
	},
};