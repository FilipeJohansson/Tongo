module.exports = {
	name: 'play',
    description: 'Toca a música.',
    args: false,
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        console.log("Pause alcançado");
    }
}