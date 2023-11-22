const { EmbedBuilder, AuditLogEvent, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const conf = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
let KickLimit = {};

module.exports = async (member) => {
    let entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick }).then(audit => audit.entries.first());
    if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || entry.executor.bot || await client.checkPermission(client, entry.executor.id, "full") || await client.checkPermission(client, entry.executor.id, "banandkick") || await client.checkPermission(client, entry.executor.id, "roleandchannel")) return;
    if (entry.executor.id === member.id) return;
      let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (KickLimit[entry.executor.id] && KickLimit[entry.executor.id].Now + 1 > ramalcim.Guard.Limit.Kick) {
        if (victimMember) {
          await client.cezaVer(client, victimMember.id, "kick")
          const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
          .setDescription(`\`\`\`İZİNSİZ KICK İŞLEM\`\`\`
          **❯** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)
          **❯** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\` 
          **❯** İşlem Detayı: **[USER-KICK]** işlemi yaptığı için sunucudan atıldı.`)
          member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed] });
        
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }
        KickLimit[entry.executor.id].Now += 1;
    } else if (!KickLimit[entry.executor.id]) {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        };
    } else {
        KickLimit[entry.executor.id].Now += 1;
        const Embed = new EmbedBuilder().setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`\`\`\`İZİNSİZ İŞLEM\`\`\`
        **❯** Kullanıcı: (${entry.executor} - \`${entry.executor.id}\`)
        **❯** İşlem Tarihi: \`${moment(Date.now()).format("LLL")}\`
        **❯** **İzinsiz **[USER-KICK]** işlemi yaptı ve limiti doldu.
        **❯** KickLimit: ${1}/${ramalcim.kickLimit}`)
        member.guild.channels.cache.find(x => x.name == "protection_log").send({ embeds: [Embed] });
  
        setTimeout(() => {
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }, 1000 * 60 * 3);
    }
  
  
  
}

module.exports.conf = {
  name: "guildMemberRemove",
};