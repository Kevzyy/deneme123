const { EmbedBuilder } = require("discord.js");
const client = global.bot;
let sended = false;
const ramalcim = require("../../../../../Global/BotSettings/Settings")
const conf = require("../../../src/configs/sunucuayar.json")
const bannedCmd = require("../../../../../Global/schemas/bannedCmd")
setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  }); 
}, 8000);

module.exports = async (message) => {
  let prefix = ramalcim.Main.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix || conf.unregRoles.some(x => message.member.roles.cache.has(x)) || conf.jailRole.some(x => message.member.roles.cache.has(x))) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const embed = new EmbedBuilder().setFooter({ text: ramalcim.AltBaşlık}).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true })});

  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let komutLog = client.channels.cache.find(x => x.name == "komut_log");

  if (cmd) {
    if (cmd.conf.owner && !ramalcim.owners.includes(message.author.id)) return;

    const veri = await bannedCmd.findOne({
      guildID: message.guild.id
    }) || {
      "kullanici": []
    };                                             
if (veri.kullanici.includes(message.member.id)) return message.reply({embeds: [embed.setDescription(`${message.member} Komut kullanımınız yasaklanmış.`)]})

    const cooldown = cmd.conf.cooldown || 3000;
    const cd = client.cooldown.get(message.author.id);
    if (cd) {
      const diff = Date.now() - cd.lastUsage;
      if (diff < cooldown)
        if (!sended) {
          sended = true;
          return message.channel.send({ content:`${message.author}, Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`}).then((x) => x.delete({ timeout: (cooldown - diff) }));
        }
    } else client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    cmd.run(client, message, args, embed, prefix);
    const ramal = new EmbedBuilder()
    .setTimestamp()
    .setFooter({ text: `Komut Geçmişi.`})
    .setDescription(` ${message.author} tarafından ${message.channel} kanalında \`${prefix}${commandName}\` komutu kullanıldı.
    `)
    if(komutLog) komutLog.wsend({ embeds: [ramal]})
  }
};

module.exports.conf = {
  name: "messageCreate",
};
