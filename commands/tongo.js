module.exports = {
    name: 'tongo',
    description: 'Fala uma frase aleatória do Tongo',
    cooldown: 5,
    aliases: ['letongue'],
    execute(message, args) {
        const replies = [
            "Ay am... LETONGUÉ!", 
            "LETONGUÉ... YEAH YEAH", 
            "Batis comin for yu yeajis comin for yu", 
            "Yudeber ran deder ram", 
            "Faster dan may ballet", 
            "Robert gota cuik jands", 
            "Jisgota rolled cigarett",
            "Jayingot yismond jisa cowoy kid",
            "Chairod bin juatchu guan michubi",
            "Filing sa feifer lasander da serfes",
            "Don no guat yur expicting of mi",
            "Put anda preisho of walkin in yur chuuuuus",
            "Ebrister isa teiky sonoder misteik tu yoooo",
            "Ay bicam sonam",
            "Ay cam fill yuderrr",
            "Bicam sotair",
            "Somoch moraguerrr",
            "Ay bicam is des",
            "Alay guan tudu",
            "Is bi mor laykmi ambi slay yooooo"
            ];

		const index = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[index]);
	},
}