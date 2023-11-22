const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const conf = require("../../../../../../Global/BotSettings/Settings")
const conff = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;

let roleCreateLimit = {};
module.exports = async (role) => {
let entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());
if (!entry || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= conf.Guard.Limit.RoleCreate) {
roleCreateLimit[entry.executor.id] = 0;
const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **[ROLE-CREATE]**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${role.name} adında bir rol oluşturdu.**
\`•\` Yapılan İşlem: **Kişi sunucudan Kicklendi, oluşturduğu rol silindi...**`)
role.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed] });
role.delete({reason: "RoleCreate Guard"})
client.cezaVer(client, entry.executor.id, "kick");
return;};
roleCreateLimit[entry.executor.id] += 1;
setTimeout(() => { roleCreateLimit[entry.executor.id] = 0;}, 1000 * 60 * 3);

const Embed2 = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`
\`•\` Uygulanan İşlem: **[ROLE-CREATE]**
\`•\` İşlem Uygulayan: ${entry.executor} (\`${entry.executor.id}\`)
\`•\` İşlem Detayı: **${entry.executor} adlı üye ${role.name} adında bir rol oluşturdu.**
\`•\` Yapılan İşlem: **Kişi Role_Create Limitini aşmadığı için herhangi bir işlem yapmadım. Limit: **1/1**`)
role.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed2] });
};

module.exports.conf = {
  name: "roleCreate",
};