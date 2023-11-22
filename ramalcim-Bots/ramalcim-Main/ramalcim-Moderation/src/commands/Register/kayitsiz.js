const { PermissionsBitField, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
const moment = require("moment")
moment.locale("tr")
const Reply = require("../../../../../../Global/BotSettings/AutoReply")
module.exports = {
  conf: {
    aliases: ["kayıtsız","ks","kayitsiz","unregister","unreg"],
    name: "kayitsiz",
    help: "kayitsiz  <kevzyy/ID>",
    category: "kayıt",
  },
  
  run: async (client, message, args, embed, prefix) => { 
    if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 

    {
    message.react(red)
    message.reply(Reply.YetersizYetki).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.reply({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red) 
    message.reply(Reply.AyniKullanici).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.reply({ content: "Bu üyeyi kayıtsıza atamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    message.react(ramal_Yes)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

 const logEmbed = new EmbedBuilder()
    .setAuthor({ name: uye.user.tag, iconURL: uye.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${uye} kullanıcısı ${message.member} tarafından **kayıtsız** atıldı.`)
    .addFields([
      { name: 'Kayıtsız Atılan Kullanıcı', value: `${uye.toString()}`, inline: true },
      { name: 'Kayıtsız Atan Kullanıcı', value: `${message.member.toString()}`, inline: true },
      { name: 'Atılma Tarihi', value: `<t:${Math.floor(Date.now() / 1000)}:R>` }
    ])
    .setFooter({ text: 'Üyenin geçmiş isimlerini görüntülemek için .isim komutunu kullanabilirsiniz.' })

  if (client.channels.cache.find(c => c.name === "register_log")) client.channels.cache.find(c => c.name === "register_log").send({ embeds: [logEmbed] })


    member.roles.set(conf.unregRoles);
    member.setNickname(`${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} İsim | Yaş`)
let ramal = new EmbedBuilder()
.setDescription(`${member} üyesi ${message.author} tarafından, kayıtsıza atıldı! ${ramal_Yes}`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

message.channel.send({ embeds: [ramal] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
   
  


  },
};