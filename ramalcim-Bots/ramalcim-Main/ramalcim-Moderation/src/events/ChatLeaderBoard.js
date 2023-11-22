const ramalcim = require("../../../../../Global/BotSettings/Settings")
const messageUser = require("../../../../../Global/schemas/messageUser");
const sex = require("../../../../../Global/schemas/leaderboard");
const moment = require("moment");
const { EmbedBuilder } = require("discord.js");
const client = global.bot;

module.exports = async () => {
  const messageUsersData = await messageUser.find({ guildID: ramalcim.GuildID }).sort({ topStat: -1 });
  const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\` ${index+1} \` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
  
  let data = await sex.findOne({ guildID: ramalcim.GuildID })
  if (!data || data && !data.messageListID.length) return

const sunucuisim = client.guilds.cache.get(ramalcim.GuildID).name
let LeaderBoard = await client.channels.cache.find(x => x.name == "leaderboard").messages.fetch(data.messageListID);
 setInterval(() => {
 ChatLeaderBoard()
 }, 600000);
 function ChatLeaderBoard() {  

 const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)

 let MessageEdit = new EmbedBuilder()
 .setAuthor({ name: client.guilds.cache.get(ramalcim.GuildID).name, iconURL: client.guilds.cache.get(ramalcim.GuildID).iconURL({dynamic:true})})
 .setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${msgList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
 LeaderBoard.edit({ embeds: [MessageEdit]})

}
}
module.exports.conf = {
 name: "ready",
};