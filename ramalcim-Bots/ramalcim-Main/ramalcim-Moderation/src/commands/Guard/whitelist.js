const { EmbedBuilder } = require('discord.js');
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const children = require("child_process");
const client = global.bot;
const { ramal_Yes, red } = require("../../../../src/configs/emojis.json")
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Safe")

module.exports = {
  conf: {
    aliases: ["wh", "Full"],
    name: "güvenli",
    help: "güvenli",
    category: "sahip",
    owner: true,
  },

run: async (client, message, args, embed) => {

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
let ramalGuardiSikiyor = await SafeMember.findOne({ guildID: message.guild.id });
if(!member){
const embed = new EmbedBuilder()
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setTitle("Güvenli Liste")
.setDescription(`${ramalGuardiSikiyor && ramalGuardiSikiyor.Full && ramalGuardiSikiyor.Full.length > 0 ? `Güvenli Listede \`${ramalGuardiSikiyor.Full.length}\` Adet Kişi / Rol Bulunmakta.\n\n`+ramalGuardiSikiyor.Full.map((data,index) => `${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\``).join("\n") :`Herhangi bir üye & rol güvenliye eklenmemiş!`}`)
return message.reply({embeds:[embed]})
}
if(ramalGuardiSikiyor && ramalGuardiSikiyor.Full && ramalGuardiSikiyor.Full.includes(member.id)){
await SafeMember.findOneAndDelete({ guildID: message.guild.id }, {$push: {Full: member.id}}, { upsert: true }); 
message.reply({embeds:[ new EmbedBuilder().setDescription(`${member} Başarıyla Güvenli Listeden Çıkartıldı!`).setColor("#ff0000")]})
}else{
await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$push: {Full: member.id}}, { upsert: true });
message.reply({embeds:[ new EmbedBuilder().setDescription(`${member} Başarıyla Güvenli Listeye Eklendi!`).setColor("#00ff00")]})
    }}

    }