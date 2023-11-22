const Discord = require("discord.js");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["statsıfırla", "stat-sifirla", "statsifirla"],
    name: "stat-sıfırla",
    help: "stat-sıfırla",
    owner: true,
    category: "owner"    
},
run: async (client, message, args, embed) => {
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("onay")
.setLabel("Onayla")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("915754671728132126"),
new Discord.ButtonBuilder()
.setCustomId("red")
.setLabel("İptal")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("920412153712889877"),
);
const mesaj = await message.reply({embeds: [embed.setDescription(`${message.member}, Merhaba **${message.guild.name}** Sunucusunun Toplam Stat Verilerini Sıfırlamak İstediğine Emin Misin.?`).setFooter({text: 'Not: Aşağıdaki Button Yardımıyla İşlemi Seçiniz'})], components: [row]})
var filter = (button) => button.user.id === message.member.id;
let collector = await mesaj.createMessageComponentCollector({ filter })

collector.on("collect", async (button) => {
if (button.customId == "onay") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
await messageUser.deleteMany({guildID: message.guild.id})
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} Başarıyla Sunucunun Tüm Stat Verileri Sıfırlandı.`)], components: [row]})
}
if (button.customId == "red") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} Başarıyla İşlem İptal Edildi.`)], components: [row]})
 } 
  })
 }
}