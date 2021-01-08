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

Possibilidade de criar mais de um canal temporário?
- tempchannel new [nome do canal]
- tempchannel delete [nome do canal]
- tempchannel true 
- - somente permite a criação dos canais temporários, não cria um canal.
- Trocar o deleteMany() por delete()
- Trocar a busca de channelName para channelID

Canais Temporários
- Pegar somente o primeiro argumento (arg[0]) de tempchannel, music e welcome.
- - Hoje está pegando todos os argumentos, pode dar problema

Músicas
- Verificar usages

Welcome
- Validar sub-comandos (mensagem de erro usages)

Geral
- Verificar atributos dos comandos
- - name, description, args, guildOnly, usage, permissions, cooldown, aliases
- Rádio
- Checar a possibilidade de envio de logs de erro para um local centralizado
- Criar embeded para cada fala do bot
- Arquivo único com a lista de strings do bot