const Discord = require("discord.js");
const bannedCmd = require("../../../../../../Global/schemas/bannedCmd");
const settings = require("../../../../../../Global/BotSettings/Settings");
const emojis = require('../../../../src/configs/emojis.json')
module.exports = {
  conf: {
    aliases: ['cmd'],
    name: "cmd",
    help: "cmd yasakla @kevzyy/ID",
    owner: true,
    category: "owner"
  },

  run: async (client, message, args, embed) => {
if(args[0] == "yasakla" || args[0] == "banned") {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
if(!member) return message.reply({embeds: [embed.setDescription(`Bir Kullanıcı Belirt.`)]}).sil(15)  
var veri = await bannedCmd.findOne({
      guildID: message.guild.id
    }) || {
      "kullanici": []
    };                                             
if (veri.kullanici.includes(member.id)) {
          await bannedCmd.updateOne({ guildID: message.guild.id }, { $pull: { kullanici: member.id } }, { upsert: true });

message.reply({embeds: [embed.setDescription(`Başarıyla ${member} kullanıcısının yasağı kaldırıldı.`)]})  
        } else {
          await bannedCmd.updateOne({ guildID: message.guild.id }, { $push: { kullanici: member.id } }, { upsert: true });

message.reply({embeds: [embed.setDescription(`Başarıyla ${member} kullanıcısı yasaklıya eklendi.`)]})  
        } }  
  }
}