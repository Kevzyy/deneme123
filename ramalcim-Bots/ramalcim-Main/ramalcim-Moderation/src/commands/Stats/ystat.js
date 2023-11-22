const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const conf = require("../../../../src/configs/sunucuayar.json");
const voiceUserParent = require("../../../../../../Global/schemas/voiceUserParent");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const voiceUser = require("../../../../../../Global/schemas/voiceUser");
const cezapuan = require("../../../../../../Global/schemas/cezapuan");
const coin = require("../../../../../../Global/schemas/coin");
const taggeds = require("../../../../../../Global/schemas/taggeds");
const yetkis = require("../../../../../../Global/schemas/yetkis");
const ceza = require("../../../../../../Global/schemas/ceza");
const toplams = require("../../../../../../Global/schemas/toplams");
const inviterSchema = require("../../../../../../Global/schemas/inviter");
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillStart, emptyEnd, fillEnd, red , ramal_Yes} = require("../../../../src/configs/emojis.json");
const { ButtonStyle, TeamMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim",
    category: "stat",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    
    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 

    const maxValue = client.ranks[client.ranks.indexOf(client.ranks.find(x => x.coin >= (coinData ? coinData.coin : 0)))] || client.ranks[client.ranks.length-1];
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });


const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;

        const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika]");
      };
      
      let currentRank = client.ranks.filter(x => (coinData ? coinData.coin : 0) >= x.coin);
      currentRank = currentRank[currentRank.length-1];

      const coinStatus = message.member.hasRole(conf.staffs, false) && client.ranks.length > 0 ?
      `${currentRank ?`
      ${currentRank !== client.ranks[client.ranks.length-1] ? `Şu an ${Array.isArray(currentRank.role) ? currentRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${currentRank.role}>`} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin-coinData.coin}\` puan daha kazanmanız gerekiyor!` : "Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz. :)"}` : ` 
      Şuan ${message.member.roles.highest} rolündesiniz. ${Array.isArray(maxValue.role) ? maxValue.role.length > 1 ? maxValue.role.slice(0, -1).map(x => `<@&${x}>`).join(', ') + ' ve ' + maxValue.role.map(x => `<@&${x}>`).slice(-1) : maxValue.role.map(x => `<@&${x}>`).join("") : `<@&${maxValue.role}>`} rolüne ulaşmak için \`${maxValue.coin - (coinData ? coinData.coin : 0)}\`  Puan daha kazanmanız gerekiyor!`}` : ""
      
    var PuanDetaylari = new ButtonBuilder()
    .setLabel("Yetki Puan")
    .setCustomId("puan_detaylari")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("907014785386840075")

    var GenelPuanDetaylari = new ButtonBuilder()
    .setLabel("Ceza Puan")
    .setCustomId("ceza_puan_detaylari")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("943107807312482304")

    var Iptal = new ButtonBuilder()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle(ButtonStyle.Danger)
    .setEmoji("920412153712889877")

    const row = new ActionRowBuilder()
    .addComponents([PuanDetaylari, GenelPuanDetaylari, Iptal])

embed.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
{ name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
)
.addFields(
{ name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
{ name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
{ name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
)
embed.addFields({ name: `${mesaj2} **Sesli Sohbet İstatistiği**`, value: `
${ramal_Yes} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${ramal_Yes} Public Odalar: \`${await category(conf.publicParents)}\`
${ramal_Yes} Secret Odalar: \`${await category(conf.privateParents)}\`
${ramal_Yes} Alone Odalar: \`${await category(conf.aloneParents)}\`
${ramal_Yes} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${ramal_Yes} Kayıt Odaları: \`${await category(conf.registerParents)}\`
`, inline: false },
{ name:`${mesaj2} **Mesaj İstatistiği**`,value: `
${ramal_Yes} Toplam: \`${messageData ? messageData.topStat : 0}\`
${ramal_Yes} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${ramal_Yes} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, inline: false })

   

    let msg = await message.channel.send({ embeds: [embed], components: [row] });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

    collector.on("collect", async (button) => {
      if(button.customId === "puan_detaylari") {
        await button.deferUpdate();

const puan = new EmbedBuilder()
.setDescription(`${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.`) 

.addFields({ name:`${mesaj2} **Puan Detayları:**`, value:`
${ramal_Yes} Kayıt: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
${ramal_Yes} Taglı: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
${ramal_Yes} Davet: (\`Puan Etkisi: +${total*15}\`)
${ramal_Yes} Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
${ramal_Yes} Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240}\`)
${ramal_Yes} Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
${ramal_Yes} Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
`, inline: false },
{ name:`${mesaj2} **Net Puanlama Bilgisi**`, value:`
${ramal_Yes} Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
${ramal_Yes} Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
${ramal_Yes} İnsanları davet ederek, \`+15\` puan kazanırsın.
${ramal_Yes} İnsanları yetkili yaparak, \`+30\` puan kazanırsın.
${ramal_Yes} Seste kalarak, ortalama olarak \`+4\` puan kazanırsınız.
${ramal_Yes} Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
`, inline: false },
{ name:`${mesaj2} **Puan Durumu:**`, value:`
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${mesaj2} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds : [puan],
  components : [row]
})
      
      }

  if(button.customId === "ceza_puan_detaylari") {
    await button.deferUpdate();
    const ceza = new EmbedBuilder()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.addFields({ name:`${mesaj2} **Ceza Kullanımı**`, value: `\`\`\`fix
( Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0} )\`\`\`
`, inline: false },
{ name:`${mesaj2} **Ceza Puan Detayları:**`, value: `
${ramal_Yes} (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
${ramal_Yes} (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
${ramal_Yes} (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
${ramal_Yes} (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
`, inline: false },
{ name:`${mesaj2} **Ceza Puan Detayları:**`, value:`
${ramal_Yes} (\` Ban işlemi \`) yerseniz, \`-100\` puan kaybedersiniz.
${ramal_Yes} (\` Underworld \`) işlemi yerseniz, \`-75\` puan kaybedersiniz.
${ramal_Yes} (\` Karantina/Jail \`) işlemi yerseniz, \`-50\` puan kaybedersiniz.
${ramal_Yes} (\` Ses/Yazı \`) Mute işlemi yerseniz, \`-20\` puan kaybedersiniz.
\`\`\`fix
Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (Toplam ${cezaData ? cezaData.ceza.length : 0})
\`\`\`
`, inline: false },
{ name:`${mesaj2} **Puan Durumu:**`, value: `
Puanınız: \`${coinData ? Math.floor(coinData.coin) : 0}\`, Gereken Puan: \`${maxValue.coin}\`
${progressBar(coinData ? coinData.coin : 0, maxValue.coin, 9)} \`${coinData ? coinData.coin : 0} / ${maxValue.coin}\`
`, inline: false },
{ name:`${mesaj2} **Yetki Durumu:**`, value:`
${coinStatus}
`, inline: false })

msg.edit({
  embeds: [ceza],
  components : [row]
})  
    }

      if(button.customId === "iptal_button") {
        await button.deferUpdate();
        const iptal = new EmbedBuilder()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.
`)

.addFields(
  { name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
  { name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
  { name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  )
  .addFields(
  { name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
  )
  
.addFields({ name:`${mesaj2} **Sesli Sohbet İstatistiği**`, value:`
${ramal_Yes} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
${ramal_Yes} Public Odalar: \`${await category(conf.publicParents)}\`
${ramal_Yes} Secret Odalar: \`${await category(conf.privateParents)}\`
${ramal_Yes} Alone Odalar: \`${await category(conf.aloneParents)}\`
${ramal_Yes} Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
${ramal_Yes} Kayıt Odaları: \`${await category(conf.registerParents)}\`
`, inline: false },
{ name:`${mesaj2} **Mesaj İstatistiği**`, value:`
${ramal_Yes} Toplam: \`${messageData ? messageData.topStat : 0}\`
${ramal_Yes} Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
${ramal_Yes} Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`, inline: false });

   row.components[0].setDisabled(true) 
   row.components[1].setDisabled(true) 
   row.components[2].setDisabled(true)
   
    msg.edit({
      embeds: [iptal],
      components : [row]
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
