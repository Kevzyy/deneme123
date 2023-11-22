const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const snipe = require("../../../../../../Global/schemas/snipe");
const moment = require("moment");
require("moment-duration-format");
const { miniicon, mesaj2, ramal_Yes, red } = require("../../../../src/configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["snipe"],
    name: "snipe",
    help: "snipe",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      message.react(red)
      return
    }
    let hembed = new EmbedBuilder().setAuthor({name: message.member.displayName, iconURL: message.author.displayAvatarURL({dynamic: true})})
    message.react(ramal_Yes)

    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) 
    {
    message.react(red)
    message.channel.send({ content:"Bu kanalda silinmiş bir mesaj bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

const author = await client.user.fetch(data.author);
hembed.setDescription(`
${mesaj2} ${data.messageContent ? `__**Yazılan Mesaj:**__ **${data.messageContent}**` : ""}

__Mesaj Yazan kişi:__ <@${data.userID}> )

__Mesajın Silinme Tarihi:__ \`${moment.duration(Date.now() - data.deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]")}\` __önce__
`);
 message.channel.send({ embeds: [hembed] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
  
},
};

