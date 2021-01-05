module.exports = {
	name: 'pause',
    description: 'Pausa a música.',
    args: false,
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        console.log("Pause alcançado");

        //Verificar se o bot está tocando no canal
        if(true){
            //console.log(message.client.bot);
            //console.debug(client.bot);
            console.debug(user.bot);
        }
    }
}