module.exports = {
	name: 'play',
    description: 'Toca a música.',
    args: true,
    guildOnly: true,
    usage: ['<URL>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        console.log("Play alcançado");
    }
}