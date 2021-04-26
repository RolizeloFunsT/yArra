//--------------------Bot Ana Dosya--------------------//
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("wio.db");
require("./util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");
require("./util/eventLoader")(client);
const qdb = require("quick.db");
const roldb = require("quick.db");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`); //
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//
client.login(process.env.token);
client.on("ready", () => {
  client.channels.cache.get("807162915449995314").join();
});
client.login(process.env.token);
client.on("ready", () => {
  client.channels.cache.get("833703826446876702").join();
});
//-------------------- Sa As Sistemi --------------------//

client.on("message", async msg => {
  const Database = require("plasma-db");
  const db = new Database("./database.json");
  const gereksiz = await db.fetch(`saas_${msg.guild.id}`);
  if (gereksiz === "aktif") {
    if (
      msg.content.toLowerCase() == "selam" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "selamm" ||
      msg.content.toLowerCase() == "saa" ||
      msg.content.toLowerCase() == "saaa"
    )
      return msg.reply("Aleyküm selam hoşgeldin nasılsın?");
  } else if (gereksiz === "deaktif") {
  }
  if (!gereksiz) return;
});

//-------------------- Sa As Sistemi --------------------//
//-------------------- Küfür Engel ---------------------//
client.on("message", async msg => {
  const Database = require("plasma-db");
  const db = new Database("./database.json");
  let engin = db.fetch(`küfürengellog_${msg.guild.id}`);
  let enginn = db.fetch(`küfürengelmesaj_${msg.guild.id}`);
  let enginar = db.fetch(`küfürengel_${msg.guild.id}`);
  if (enginar === "aktif") {
    const kufurler = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "sik",
      "yarrak",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "amq"
    ];
    if (kufurler.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          const embed = new Discord.MessageEmbed()
            .setTitle("Bir küfür yakaladım!")
            .setDescription(
              `<@${msg.author.id}> adlı kullanıcı küfürlü kelime kullandı! \n Kullanıcının ettiği küfür silindi!`
            );
          client.channels.cache.get(engin).send(embed);
          return msg.channel.send(`<@${msg.author.id}>, ${enginn}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else return;
});
//-------------------- Küfür Engel ---------------------//
//reklamengel

client.on("message", async msg => {
  const Database = require("plasma-db");
  const db = new Database("./database.json");
  let engin = db.fetch(`reklamengellog_${msg.guild.id}`);
  let enginn = db.fetch(`reklamengelmesaj_${msg.guild.id}`);
  let enginar = db.fetch(`reklamengel_${msg.guild.id}`);
  if (enginar === "aktif") {
    const kufurler = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "discord.gg"
    ];
    if (kufurler.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          const embed = new Discord.MessageEmbed()
            .setTitle("Bir reklam yakaladım!")
            .setDescription(
              `<@${msg.author.id}> adlı kullanıcı reklam yaptı! \n Kullanıcının yaptığı reklam silindi!`
            );
          client.channels.cache.get(engin).send(embed);
          return msg.channel.send(`<@${msg.author.id}>, ${enginn}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else return;
});

//reklamengel
//otoisim
client.on("guildMemberAdd", member => {
  var arezreiz = qdb.fetch(`otoisim_${member.guild.id}`);
  if (!arezreiz) return;
  member.setNickname(arezreiz);
});
//otoisim

//xp system
client.cooldown = new Discord.Collection();
client.config = {
  cooldown: 1 * 1000
};
client.db = require("quick.db");
client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  // XP
  exp(message);
  function exp(message) {
    if (
      !client.cooldown.has(`${message.author.id}`) ||
      Date.now() - client.cooldown.get(`${message.author.id}`) >
        client.config.cooldown
    ) {
      let exp = client.db.add(`exp_${message.author.id}`, 1);
      let level = Math.floor(0.3 * Math.sqrt(exp));
      let lvl =
        client.db.get(`level_${message.author.id}`) ||
        client.db.set(`level_${message.author.id}`, 1);
      if (level > lvl) {
        let newLevel = client.db.set(`level_${message.author.id}`, level);
        message.channel.send(
          `:tada: ${message.author.toString()}, Level atladın yeni levelin ${newLevel}!`
        );
      }
      client.cooldown.set(`${message.author.id}`, Date.now());
    }
  }
});
//xp system
//snipe

client.on("messageDelete", async message => {
  // can#0002
  if (message.author.bot || !message.content) return;
  require("quick.db").push(message.guild.id, {
    author: message.author,
    authorTAG: message.author.tag,
    authorID: message.author.id,
    authorUSERNAME: message.author.username,
    authorDISCRIMINATOR: message.author.discriminator,
    messageID: message.id,
    messageCHANNEL: message.channel,
    messageCHANNELID: message.channel.id,
    messageCONTENT: message.content,
    messageCREATEDAT: message.createdAt
  });
});

//snipe
//sayaç
//sayaç
client.on("guildMemberAdd", member => {
  var kanal = qdb.fetch(`sayackanali_${member.guild.id}`);
  if (!kanal) return;
  var hedef = qdb.fetch(`sayachedef_${member.guild.id}`);
  if (!hedef) return;
  client.channels.cache
    .get(kanal)
    .send(
      `<a:girdi:830003542726148156> **${member} Sunucuya katıldı! Hedefimize ulaşmamıza __${hedef -
        member.guild.memberCount}__ kişi kaldı!**`
    );
  if (hedef <= member.guild.memberCount) {
    client.channels.cache
      .get(kanal)
      .send(`Hedefimizi başardık! Sunucumuz ${hedef} kişiye ulaştı!`);
    qdb.delete(`sayackanali_${member.guild.id}`);
    qdb.delete(`sayachedef_${member.guild.id}`);
  }
});
client.on("guildMemberRemove", member => {
  var kanal = qdb.fetch(`sayackanali_${member.guild.id}`);
  if (!kanal) return;
  var hedef = qdb.fetch(`sayachedef_${member.guild.id}`);
  if (!hedef) return;
  client.channels.cache
    .get(kanal)
    .send(
      `<a:cikti:830003832419254313> **${
        member.user.tag
      } sunucudan ayrıldı! Hedefimize ulaşmamıza __${hedef -
        member.guild.memberCount}__ kişi kaldı!**`
    );
});

//sayaç
//otorol
client.on("guildMemberAdd", async member => {
  var rol = await db.fetch(`rol_${member.guild.id}`);

  member.roles.add(rol);
});
client.on("guildMemberAdd", async member => {
  var rol = await db.fetch(`rol_${member.guild.id}`);
  var kanal = await db.fetch(`kanal_${member.guild.id}`);

  var embed = new Discord.MessageEmbed()
    .setTitle(`Roliz Otorol`)
    .setDescription(
      `Otorol ${member.user} adlı kişiye, <@&${rol}> adında rol verildi!`
    )
    .setColor("RANDOM")
    .setTimestamp();
  client.channels.cache.get(kanal).send(embed);
});
