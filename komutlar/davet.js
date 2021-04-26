const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const devtr = new Discord.MessageEmbed()
  .setTitle("Davet Linkleri Altta Belirtilmiştir")
  .setColor("RANDOM")
  .setThumbnail('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fb4b6052a1d4c2a17a53a5d77c5945c1c.png?v=1618560560952')
    .addField("» **Botun Sahibi**", "<@!545651586559377410>| FunsT#7126 ")
    .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/TQnNm2UuB4)", )
    .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=761475156487962625&scope=bot&permissions=805314622)", )
   .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
  message.channel.send(devtr);   //DevTR
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
};