const discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./database.json");
exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')
    if(!args[0]) return message.channel.send(`Merhaba komutlar için lütfen .reklam-engel yardım yazınız!`)    
    if(args[0] == "log") {
let enginar = message.mentions.channels.first()
if(!enginar) return message.channel.send('Lütfen reklam engel log kanalını belirtiniz!')
db.set(`reklamengellog_${message.guild.id}`, enginar.id)
const embed2 = new discord.MessageEmbed()
.setTitle('Reklam engel log')
.setDescription(`<@${message.author.id}> bu kanalı başarı ile reklam engel log kanalı olarak ayarladı! \n \n Bundan sonra biri reklam edince bu kanala bildirimde bulunacağım!`)
client.channels.cache.get(enginar.id).send(embed2)
const embed = new discord.MessageEmbed()
.setTitle('Başarı ile reklam engel log kanalı ayarlandı!')
.setDescription(`reklam engel log kanalını <#${enginar.id}> olarak ayarladım.`)
return message.channel.send(embed);
    };
    //
   if(args[0] == "mesaj"){
        let enginar = args.slice(1).join(' ');
        if(!enginar) return message.channel.send('Lütfen bir mesaj yaz!')
db.set(`reklamengelmesaj_${message.guild.id}`, enginar)
const embed = new discord.MessageEmbed()
.setTitle('reklam engel mesajı ayarlandı!')
.setDescription(`Bundan sonra biri reklam eder ise <@${message.author.id}>, ${enginar} şeklinde cevap vereceğim!`)
.setColor('RANDOM')
return message.channel.send(embed)
    }
    //
    if(args[0] == "aç") {
        let kontrol = db.fetch(`reklamengellog_${message.guild.id}`)
        if(!kontrol) return message.channel.send('Reklam engel log kanalı ayarlanmamış!')
        let enginar = db.fetch(`reklamengelmesaj_${message.guild.id}`)
        if(!enginar) return message.channel.send('Reklam engel mesajı ayarlanmamış')
db.set(`reklamengel_${message.guild.id}`, 'aktif')
const embed = new discord.MessageEmbed()
.setTitle('Reklam engel sistemi açıldı!')
.setDescription(`<@${message.author.id}> bu sunucuda reklam engel sistemini aktifleştirdi!`)
.setColor('RANDOM')
client.channels.cache.get(kontrol).send(embed)
return message.channel.send('Reklam engel sistemi aktifleştirildi!')
    }
//
if(args[0] == "sıfırla") {
    let engin = db.fetch(`reklamengellog_${message.guild.id}`)
    const embed = new discord.MessageEmbed()
    .setTitle('Reklam engel sistemi kapatıldı!')
    .setDescription(`<@${message.author.id}> reklam engel sistemini kapattı!`)
    client.channels.cache.get(engin).send(embed)
db.delete(`reklamengellog_${message.guild.id}`)
db.delete(`reklamengelmesaj_${message.guild.id}`)
db.delete(`reklamengel_${message.guild.id}`)
return message.channel.send('Sistem başarı ile sıfırlandı!')
};
//
if(args[0] == "yardım") {
   const embed = new discord.MessageEmbed()
    .setTitle(`**reklam engel komutları**`)
   .setThumbnail('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fb4b6052a1d4c2a17a53a5d77c5945c1c.png?v=1618560560952')
       .addField('.reklam-engel yardım', 'Reklam Engel yardım menüsü', true)
    .addField('.reklam-engel log', 'Reklam-engel log kanalını ayarlarsınız', true)
    .addField('.reklam-engel aç', 'Reklam engel sistemini açarsınız', true)
    .addField('.reklam-engel sıfırla', 'Reklam engel sistemini sıfırlarsınız', true)
    .addField('.reklam-engel mesaj', 'Reklam engel mesaj ayarlarsınız.', true)
.setColor('BLUE')
   .setImage('https://cdn.glitch.com/2fa30168-89cc-4986-b626-93d09bc61fbe%2Fstandard.gif?v=1618560688199')
    message.channel.send(embed)



}
};
exports.conf = {
    enabled: true, 
    guildOnly: false,
    aliases: [],
    permLevel: 0
    };
    exports.help = {
        name : "reklam-engel"
        };