const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
    if (!entry || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    if (newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
    if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
    if (oldGuild.banner !== newGuild.banner) await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
};

module.exports.conf = {
  name: "guildUpdate",
};