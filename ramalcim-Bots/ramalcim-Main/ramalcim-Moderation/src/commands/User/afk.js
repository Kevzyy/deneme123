const afk = require("../../../../../../Global/schemas/afk");
const { ramal_Yes, red} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
const { PermissionsBitField } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["afk"],
      name: "afk",
      help: "afk <Sebep>",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.CommandChannel;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));   
if (message.member.displayName.includes("[AFK]")) return
const reason = args.join(" ") || "Belirtilmedi!";
await afk.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true });
message.react(ramal_Yes)
message.reply({ content:"__Başarıyla afk moduna girdiniz! Bir şey yazana kadar [AFK] kalacaksınız.__"}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`);
}
  };
  
