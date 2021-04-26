const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let seyit = client.db.get(`level_${user.id}`) || 0;
  let hyperion = client.db.get(`exp_${user.id}`) || 0;
  let asunack = Math.floor(Math.pow(seyit / 0.1, 2));

  let herkes = client.db.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
  let seviye = herkes.map(x => x.ID).indexOf(`exp_${user.id}`) + 1;


  const card = new canvacord.Rank()          //burdan sonrasını canvacordun docsuna bakarak güzelleştirebilirsiniz.
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(seviye)
    .setLevel(seyit)
    .setCurrentXP(hyperion)
    .setRequiredXP(asunack)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

  const img = await card.build();
  
  return message.channel.send(new MessageAttachment(img, "rank.png"));
};

exports.conf = {
  aliases: ['seviye', 'rank'],
  guildOnly: true,
  enabled: true,
  permLevel: 0
};

module.exports.help = {
  name: "rankcard",
  usage: "@user",
  description: "Etiketlediğiniz kişinin veya sizin levelinizi gösterir"
};