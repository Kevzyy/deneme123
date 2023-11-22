const { PermissionsBitField } = require("discord.js");
const moment = require("moment");
const cezapuan = require("../../../../../../Global/schemas/cezapuan")
const ceza = require("../../../../../../Global/schemas/ceza")
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../../../Global/schemas/messageUserChannel");
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
  conf: {
    aliases: ["cezapuan","cp","ceza"],
    name: "cezapuan",
    help: "cezapuan <kevzyy/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return 
}

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return 
}
const cezaData = await ceza.findOne({ guildID: ramalcim.GuildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
message.react(ramal_Yes)
message.reply({ content:`${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`})
},
};

