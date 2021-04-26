const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle('Roliz Yardım')
    .setColor('BLUE')
    .setThumbnail('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fb4b6052a1d4c2a17a53a5d77c5945c1c.png?v=1618560560952')
     .addField('.espri', 'espri yapar', true)
         .addField('.1vs1', 'etiketlediğin kişiyle 1vs1 atarsın', true)
           .addField('.yazankazanır', 'yazan kazanır oyunu', true)
    .addField('.snipe', 'silinen bir mesajı gösterir', true)
        .addField('.mcskin', 'minecraft skini', true)
            .addField('.spotify', 'spotify bilgi', true)
    .setImage('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fstandard.gif?v=1618560688199')

message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['eglence']



};
exports.help = {
name: "eğlence"
};