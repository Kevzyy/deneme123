const { EmbedBuilder, AuditLogEvent, ChannelType } = require("discord.js");
const CategoryChannels = require("../../../../src/Models/CategoryChannels");
const TextChannels = require("../../../../src/Models/TextChannels");
const VoiceChannels = require("../../../../src/Models/VoiceChannels");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (channel) => {
let entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "channel") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;

const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **Kanal Kaldırma**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Bilgisi: **${entry.executor} adlı üye ${channel.name} isimli kanalı sildi.**
\`•\` Yapılan İşlem: **Kişi sunucudan Atıldı Kanal Ayarları yapılıyor.**
`)
channel.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed2] });

let member = await channel.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
await client.cezaVer(client, member.id, "ban");
client.allPermissionClose();
};

module.exports.conf = {
  name: "channelDelete",
};