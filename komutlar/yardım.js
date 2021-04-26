const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle('Roliz Yardım')
    .setColor('0x36393E')
    .setThumbnail('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fb4b6052a1d4c2a17a53a5d77c5945c1c.png?v=1618560560952')
    .addField('.istatistik', 'botun istatistikleri', true)
     .addField('.kullanıcı', 'kullanıcı menüsü', true)
    .addField('.moderasyon', 'moderasyon menüsü', true)
     .addField('.eğlence', 'eğlence menüsü', true)
     .addField('.sunucu-kur', 'oyun & sohbet temasında sunucu kurar', true)
    .setImage('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fstandard.gif?v=1618560688199')

message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['help']



};
exports.help = {
name: "yardım"
};