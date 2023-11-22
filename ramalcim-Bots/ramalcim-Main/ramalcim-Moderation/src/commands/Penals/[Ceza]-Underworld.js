const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const coin = require("../../../../../../Global/schemas/coin");
const moment = require("moment");
const ceza = require("../../../../../../Global/schemas/ceza");
const cezapuan = require("../../../../../../Global/schemas/cezapuan")
const jailLimit = new Map();
const ms = require("ms")
moment.locale("tr");
const conf = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const { red, ramal_Yes, Revuu, kirmiziok, revusome } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
module.exports = {
  conf: {
    aliases: ["doom","Doom","underworld","Underworld"],
    name: "underworld",
    help: "underworld <kevzyy/ID> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.banHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    if (conf.doomRole.some(x => member.roles.cache.has(x))) { message.channel.send({ content:"Bu üye zaten Underworld'da!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red) 
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ content: "Kendinle aynı yetkide ya da daha yetkili olan birini Underworld'a atamazsın!"});
    if (!member.manageable) return message.channel.send({ content:"Bu üyeyi Underworld'a atamıyorum!"});
    if (ramalcim.Main.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == ramalcim.Main.jaillimit) 
    {
    message.react(red)
    message.channel.send({ content:"Saatlik Underworld sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

  const reason = args.slice(1).join(" ") || "Belirtilmedi!";

  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
  await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -75 } }, { upsert: true });
  await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 50 } }, { upsert: true });
  const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
  if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`Underworld\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
  member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.doomRole[0]]) : member.roles.set(conf.doomRole)
  message.react(ramal_Yes) 
  const penal = await client.penalize(message.guild.id, member.user.id, "Doom", true, message.author.id, reason);

  await message.channel.send({ content:`${ramal_Yes} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle Underworld'a atıldı! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
  if (ramalcim.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle Underworld'a atıldınız.`}).catch(() => {});
  
  const log = new EmbedBuilder()
  .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcı **${message.author.tag}** tarafından Underworld atıldı.`)
  .addFields(
    { name: "Cezalandırılan",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
    { name: "Cezalandıran",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
    { name: "Ceza Sebebi",  value: `\`\`\`fix\n${reason}\n\`\`\``, inline: false },
    )
  .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })

  message.guild.channels.cache.get(conf.doomLogChannel).wsend({ embeds: [log]});

  if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.sahipRolu.some(x => message.member.roles.cache.has(x))) {
  if (ramalcim.Main.jaillimit > 0) {
    if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
    else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }}
  },
};

