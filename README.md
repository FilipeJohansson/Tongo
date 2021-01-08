# Tongo

## Ambiente: 
- NodeJS v14.15.3 (https://nodejs.org/en/)
- DiscordJS (npm install discord.js)
- Mongoose (npm install mongoose)
- FFmpeg (npm install ffmpeg-static)
- opus encoder (npm install @discordjs/opus)
- ytdl-core (npm install ytdl-core)
- yt-search (npm install yt-search)


## Acesso:
https://discord.com/oauth2/authorize?client_id=794623908300980254&scope=bot

## Comandos:

### Musica:
Tongo!music play http://URL.com

Tongo!music pause

Tongo!music resume

Tongo!music queue

Tongo!music next

Tongo!music stop

### Welcome
setchannel <#canal>

setruleschannel <#canal>

setdoubtschannel <#canal>

setgeralchannel <#canal>

setmemeschannel <#canal>

setpartnershipchannel <#canal>

setlinkchannel <#canal>



## Futuras Alterações?

Jogar o codigo que conecta com o banco nos sets do welcome para um arquivo separado. 
Chamar este arquivo nos sets e enviar os dados via parâmetro.

Possibilidade de criar mais de um canal temporário?
- tempchannel new [nome do canal]
- tempchannel delete [nome do canal]
- tempchannel true 
- - somente permite a criação dos canais temporários, não cria um canal.
- Trocar o deleteMany() por delete()
- Trocar a busca de channelName para channelID

Rádio

