const Discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./database.json"); 
exports.run = async(client, message, args) => {

  if (args[0] === 'aç') {
    
    db.set(`saas_${message.guild.id}`, 'aktif')
    message.channel.send(`Artık Birisi **sa** dediğinde, Aleyküm Selam Şeklinde Cevap Vereceğim :white_check_mark:, Kapatmak istersen **.sa-as kapat**!`)
 
  }
  
  if (args[0] === 'kapat') {
    
    db.set(`saas_${message.guild.id}`, 'deaktif')
    message.channel.send(`Artık Birisi **sa** dediğinde, Aleyküm Selam Şeklinde Cevap Vermeyeceğim :x:`)

  }
 
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};
 
exports.help = {
  name: 'sa-as'
};