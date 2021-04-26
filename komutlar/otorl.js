const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    var rolid = message.mentions.roles.first()
    var kanal = message.mentions.channels.first()

    if(args[0] == 'sıfırla') {
      db.delete(`rol_${message.guild.id}`)
      db.delete(`kanal_${message.guild.id}`)
      var embed = new Discord.MessageEmbed()
        .setDescription(`Otorol başarı ile sıfırlandı!`)
        .setColor("0x36393E")
       .setTimestamp()
  return message.channel.send(embed)
    }

    if(!rolid) {
      var embed = new Discord.MessageEmbed()
      .setDescription(`Lütfen bir rol etiketleyiniz.`)
      .setColor("0x36393E")
      .setTimestamp()
  return message.channel.send(embed)
    }
    if(!kanal) {
      var embed = new Discord.MessageEmbed()
     .setDescription(`Lütfen kanal etiketleyiniz`)
     .setColor("0x36393E")
     .setTimestamp()
  return message.channel.send(embed)
    }

    db.set(`rol_${message.guild.id}`, rolid.id)
    db.set(`kanal_${message.guild.id}`, kanal.id)
    var embed = new Discord.MessageEmbed()
      .setDescription(`Otorol başarı ile ${rolid} olarak ayarlandı, kanal ise ${kanal} olarak ayarlandı.!`)
      .setColor("0x36393E")
      .setTimestamp()
  return message.channel.send(embed)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [''],
    permLevel: 2
};
  
  exports.help = {
    name: 'otorol',
    description: '',
    usage: 'otorol'
};