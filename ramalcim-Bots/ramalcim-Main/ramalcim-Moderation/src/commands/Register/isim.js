const { PermissionsBitField, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const ayar = require("../../../../src/configs/sunucuayar.json")
const Ayarlar = require("../../../../src/configs/sunucuayar.json");
const { red , ramal_Yes } = require("../../../../src/configs/emojis.json")
const isimler = require("../../../../../../Global/schemas/names");
const moment = require("moment")
moment.locale("tr")


module.exports = {
  conf: {
    aliases: ["isim", "i", "nick"],
    name: "isim",
    help: "isim <@kevzyy/ID> <Isim> <Yaş>",
    category: "kayıt",
  },

  run: async (client, message, args, perm, prefix) => {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}isim <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ content:`Kendi ismini değiştiremezsin. Booster isen \`${prefix}zengin\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) 
    {
    message.react(red)
    message.reply({ content:`Böyle birisinin ismini değiştiremiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
    message.react(red)
    message.reply({ content:`Senden yüksekte olan birisinin ismini değiştiremezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || "";
    if(!isim && !yaş) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}isim <ID> <Isim> <Yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!yaş) 
    { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
    } else { setName = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } uye.setNickname(`${setName}`).catch(err => message.reply({ content:`İsim çok uzun.`}))

    message.react(ramal_Yes)

    const row4 = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('kayit')
        .setPlaceholder('Kullanıcının Geçmiş İsimleri:')
        .addOptions([
          {
            label: `İsimler`,
            description: `Kullanıcının Geçmiş İsimleri:`,
            emoji: "1081531806710497340",
            value: "papaz-kayit",
          },
        ]),
    );

let ramal = new EmbedBuilder()
.setDescription(`${uye.toString()} üyesinin ismi \`${setName}\` olarak değiştirildi`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

let msg = await message.channel.send({ embeds: [ramal], components : [ row4],})
var filter = (button) => button.user.id === message.author.id;
let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (menu) => {
  if (menu.customId === "kayit") {
    if (menu.values[0] === "papaz-kayit") {
      await menu.deferUpdate();
      const embeds = new EmbedBuilder()
        .setDescription(`${data ? data.names.splice(0, 10).map((x, i) => `\` ${i + 1} \` [<t:${Math.floor(x.date / 1000)}:R>] - \` ${x.name} \`  - (${x.rol})`).join("\n") : "Bu kullanıcının isim geçmişi bulunmuyor!"}`)
      menu.followUp({ embeds: [embeds], ephemeral: true })
    }
  }
})


await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

}   }
