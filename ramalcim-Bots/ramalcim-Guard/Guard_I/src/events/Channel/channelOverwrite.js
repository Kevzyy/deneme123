const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const conf = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldChannel, newChannel) => {
  let entry = await newChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelOverwriteUpdate }).then(audit => audit.entries.first());
  if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
  client.cezaVer(client, entry.executor.id, "kick");
  await newChannel.edit({
    permissionOverwrites: oldChannel.permissionOverwrites.cache
  });
  
  const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setDescription(`
  \`•\` Gösterilen İşlem: **[CHANNEL-UPDATE]**
  \`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
  \`•\` İşlem Bilgisi: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
  \`•\` Yapılan İşlem: **Kişi sunucudan atıldı kanal ayarı yapılıyor..**
  `)
  newChannel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed2] });
  };

module.exports.conf = {
  name: "channelUpdate",
};