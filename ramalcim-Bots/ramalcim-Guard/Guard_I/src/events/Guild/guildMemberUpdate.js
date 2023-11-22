const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const conf = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  let entry = await newMember.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate }).then(audit => audit.entries.first());
  if (!entry || !entry.executor || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "role") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
    let perms = [
      PermissionsBitField.Flags.Administrator,
      PermissionsBitField.Flags.ManageRoles,
      PermissionsBitField.Flags.ManageWebhooks,
      PermissionsBitField.Flags.ManageChannels,
      PermissionsBitField.Flags.ManageGuild,
      PermissionsBitField.Flags.BanMembers,
      PermissionsBitField.Flags.KickMembers,
      PermissionsBitField.Flags.MentionEveryone
  ] 
  let diffRoles = newMember.roles.cache.filter(o => !oldMember.roles.cache.has(o.id));
  if (!diffRoles.some(e => perms.some(perm => e.permissions.has(perm)))) {
      return;
  }
  await newMember.roles.set(oldMember.roles.cache.map(r => r.id))  

    let member = await oldMember.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (member) {
     await client.cezaVer(client, member.id, "kick")
     
  const otuzBİR = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true })).setDescription(`
  \`\`\`İZİNSİZ YAPILAN İŞLEM\`\`\`
  **❯** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)
  **❯** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`
  **❯** İşlemdeki Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)
  **❯** Yapılan İşlem: **[ROL-EKLEME]** işlemi yaptı ve sunucudan atıldı.`)
  newMember.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [otuzBİR] });

    }
}


module.exports.conf = {
  name: "guildMemberUpdate",
};