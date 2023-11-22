const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const ramalcim = require("../../../../../Global/BotSettings/Settings")
const penals = require("../../../../../Global/schemas/penals");
const bannedTag = require("../../../../../Global/schemas/bannedTag");
const regstats = require("../../../../../Global/schemas/registerStats");
const { EmbedBuilder, ActivityType } = require("discord.js")
module.exports = async () => {

let guild = client.guilds.cache.get(ramalcim.GuildID);
await guild.members.fetch();

const { joinVoiceChannel, getVoiceConnection} = require("@discordjs/voice");

const connection = getVoiceConnection(ramalcim.GuildID);
if (connection) return;
setInterval(async () => {
const VoiceChannel = client.channels.cache.get(ramalcim.BotSesKanal);
if (VoiceChannel) { joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true
})}},
5000);

    let activities = ramalcim.BotDurum, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/papazxd"}), 10000);
 
};

module.exports.conf = {
  name: "ready",
};
