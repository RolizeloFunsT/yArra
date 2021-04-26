const Discord = require('discord.js');
const qdb = require('quick.db');
module.exports.run = async(client, message, args) => {
  var arezreiz = args.slice(0).join(' ')
  if(!arezreiz) return message.channel.send('Bir isim belirt dostum!')
  qdb.set(`otoisim_${message.guild.id}`, arezreiz)
  return message.reply(`Oto İsim Ayarlandı!`)
};
module.exports.conf = {aliases: [], permLevel: 3};
module.exports.help = {name: "otoisim"}