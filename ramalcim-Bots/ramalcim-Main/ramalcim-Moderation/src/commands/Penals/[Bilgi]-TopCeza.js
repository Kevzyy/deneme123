const { PermissionsBitField } = require("discord.js");
const { ramal_Yes , red } = require("../../../../src/configs/emojis.json")
const ceza = require("../../../../../../Global/schemas/ceza");
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
  conf: {
    aliases: ["topceza","tc"],
    name: "topceza",
    help: "topceza",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    let cezaTop = await ceza.find({ guildID: message.guild.id }).sort({ top: -1 });
    if (!cezaTop.length) 
    {
    message.react(red)
    message.channel.send({ content:"Herhangi bir ceza verisi bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    let list = cezaTop
    .filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}** **(Sen)**` : `\` ${i + 1} \` <@${x.userID}> Toplam **${x.top}**`}`)
    .join("\n");

    message.react(ramal_Yes)
    message.channel.send({ embeds: [embed.setDescription(list)] });

},
};


