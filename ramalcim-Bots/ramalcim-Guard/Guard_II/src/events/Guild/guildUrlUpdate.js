const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
        client.cezaVer(client, entry.executor.id, "ban");
        client.allPermissionClose();
}; 

module.exports.conf = {
  name: "guildUpdate",
};