const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const setup = require("../../../../../ramalcim-Main/src/configs/sunucuayar.json");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const request = require('request');
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const client = global.bot;
module.exports = async (oldGuild, newGuild) => {
    let entry = await newGuild.guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate }).then(audit => audit.entries.first());
    if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;   

    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
    request({
    method: "PATCH",
    url: `https://discord.com/api/v9/guilds/${ramalcim.GuildID}/vanity-url`,
    headers: { 
      "Authorization": `${ramalcim.Guard.Token.UrlGuardToken}`,
      "User-Agent": `ramal Url Guard`,
      "Content-Type": `application/json`,
      "X-Audit-Log-Reason": `Hello i am under the watter`
    },
    body: { "code": setup.serverUrl },
    json: true
    });
    }
};

module.exports.conf = {
  name: "guildUpdate",
};