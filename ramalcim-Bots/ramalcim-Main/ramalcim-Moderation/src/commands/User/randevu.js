const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")

module.exports = {
  conf: {
    aliases: ["randevu","rd"],
    name: "randevu",
    help: "randevu",
    category: "owner"    
},
run: async (client, message, args, embed) => {


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

if (!member) {
    return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
}

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("onay")
.setLabel("Davet ET")
.setStyle(Discord.ButtonStyle.Success)
.setEmoji("1161308441525092404"),
new Discord.ButtonBuilder()
.setCustomId("red")
.setLabel("İptal")
.setStyle(Discord.ButtonStyle.Danger)
.setEmoji("920412153712889877"),
);
const mesaj = await message.reply({embeds: [embed.setDescription(`${member} Randevu ya Davet Etmek İstiyorsan Butona Tıkla!`).setFooter({text: 'Not: Aşağıdaki Button Yardımıyla İşlemi Seçiniz'})], components: [row]})
var filter = (button) => button.user.id === message.member.id;
let collector = await mesaj.createMessageComponentCollector({ filter })

collector.on("collect", async (button) => {
if (button.customId == "onay") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
client.channels.cache.find(x => x.name == "randevu_log").send({ content:`Hey ${member}  ${message.author} Adlı kullanıcı seni randevuya davet ediyor. `});
}
if (button.customId == "red") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`Başarıyla İşlem İptal Edildi.`)], components: [row]})
 } 
  })
 }
}