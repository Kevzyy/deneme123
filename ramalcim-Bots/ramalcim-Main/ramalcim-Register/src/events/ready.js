const client = global.bot;
const conf = require("../../../src/configs/sunucuayar.json");
const ramalcim = require("../../../../../Global/BotSettings/Settings")
const penals = require("../../../../../Global/schemas/penals");
const bannedTag = require("../../../../../Global/schemas/bannedTag");
const regstats = require("../../../../../Global/schemas/registerStats");
const meetings = require("../../../../../Global/schemas/meeting");
const { EmbedBuilder, ActivityType } = require("discord.js")
const tasks = require("../../../../../Global/schemas/task")
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

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
        url: "https://www.twitch.tv/ramalcim"}), 10000);
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: ramalcim.GuildID })
  newData.save().catch(e => console.log(e))

  const newData2 = new regstats({ guildID: ramalcim.GuildID })
  newData2.save().catch(e => console.log(e))

  let MeetingData = await meetings.findOne({ guildID: ramalcim.GuildID })
  if(!MeetingData) {await meetings.updateOne({guildID: ramalcim.GuildID}, {$set: {Toplantı: false}}, {upsert: true})}


setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
setInterval(() => { TagBırakanKontrol(); }, 25 * 1000);
setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);


async function gorevKontrol() {
  client.guilds.cache.forEach(async (guild) =>
  await tasks.findOneAndUpdate({ guildID: guild.id, active: true, finishDate: { $lte: Date.now() } }, { active: false }))
  } 
  setInterval(() => { gorevKontrol(); }, 15* 1000)

async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma
const guild = client.guilds.cache.get(ramalcim.GuildID);
let ramal = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
   ramal.forEach(r => {
   if (conf.unregRoles) r.roles.add(conf.unregRoles)
   })
};

async function TagAlıncaKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(ramalcim.GuildID)
const members = [...guild.members.cache.filter(member => member.user.globalName && member.user.globalName.includes(conf.tag) && !member.roles.cache.has(conf.jailRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of members) {
if (conf.ekipRolu) await member.roles.add(conf.ekipRolu);
}
};

async function TagBırakanKontrol() { // Tagı olmayanın family rol çekme
  const tagModedata = await regstats.findOne({ guildID: ramalcim.GuildID })
  const guild = client.guilds.cache.get(ramalcim.GuildID)
  const memberss = [...guild.members.cache.filter(member => member.user.globalName && !member.user.globalName.includes(conf.tag) && member.roles.cache.has(conf.ekipRolu))];
  for await (const member of memberss) {
  if (conf.unregRoles) {
  if (tagModedata && tagModedata.tagMode === true) {
  if(!member.roles.cache.has(conf.vipRole) && !member.roles.cache.has(conf.boosterRolu)) {
  await member.roles.set(conf.unregRoles)
  return}
  }
  } 
  if (conf.ekipRolu) {
  await member.roles.remove(conf.ekipRolu);
  }
  }
  };
  };

module.exports.conf = {
  name: "ready",
};
