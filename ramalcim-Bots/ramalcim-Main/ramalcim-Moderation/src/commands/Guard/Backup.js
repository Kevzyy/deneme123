const Discord = require("discord.js");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const RoleModel = require("../../../../../ramalcim-Guard/src/Models/Role");
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Safe");
const CategoryChannels = require("../../../../../ramalcim-Guard/src/Models/CategoryChannels");
const TextChannels = require("../../../../../ramalcim-Guard/src/Models/TextChannels");
const VoiceChannels = require("../../../../../ramalcim-Guard/src/Models/VoiceChannels");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["backup","yedekal","yedekla"],
    name: "backup",
    help: "backup",
    owner: true,
    category: "owner"    
},
run: async (client, message, args, embed) => {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("rol")
.setLabel("Rolleri Yedekle")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("915754671728132126"),
new Discord.ButtonBuilder()
.setCustomId("kanal")
.setLabel("Kanalları Yedekle")
.setStyle(Discord.ButtonStyle.Secondary)
.setEmoji("920412153712889877"),
);
const mesaj = await message.reply({embeds: [embed.setDescription(`${message.member}, Merhaba **${message.guild.name}** Sunucusunun Rol ve Kanal Yedeğini almak için butona tıkla!`).setFooter({text: 'Not: Aşağıdaki Button Yardımıyla İşlemi Seçiniz'})], components: [row]})
var filter = (button) => button.user.id === message.member.id;
let collector = await mesaj.createMessageComponentCollector({ filter })

collector.on("collect", async (button) => {
if (button.customId == "rol") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
rolbackup();
client.channels.cache.find(x => x.name == "protection_log").send({ content:`Güvenlik Amaçlı Rollerin Yedekleri ${message.author} tarafından **${tarihsel(Date.now())}** tarihinde alındı.`});
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} Başarıyla rolleri yedeği Alındı`)], components: [row]})
}
if (button.customId == "kanal") {
await button.deferUpdate(); 
row.components[0].setDisabled(true);
row.components[1].setDisabled(true);
kanalbackup();
client.channels.cache.find(x => x.name == "protection_log").send({ content:`Güvenlik Amaçlı Kanalların Yedekleri ${message.author} tarafından **${tarihsel(Date.now())}** tarihinde alındı.`});
if(mesaj) mesaj.edit({embeds: [embed.setDescription(`${ramal_Yes} **${tarihsel(Date.now())}** Başarıyla kanalların yedeği Alındı.`)], components: [row]})
 } 
  })
 }
}


async function rolbackup() {
    if(RoleModel) {await RoleModel.deleteMany({});}
    
    const guild = bot.guilds.cache.get(ramalcim.GuildID);
    let members = await guild.members.fetch();
    guild.roles.cache.filter(e => e.name !== "@everyone" && !e.managed).forEach(async role => {
        let roleChannelOverwrites = [];
        await guild.channels.cache.filter(c => c.permissionOverwrites?.cache.has(role.id)).forEach(c => {
            let channelPerm = c.permissionOverwrites.cache.get(role.id);
            let pushlanacak = {
                id: c.id,
                allow: channelPerm.allow.toArray(),
                deny: channelPerm.deny.toArray()
            };
            roleChannelOverwrites.push(pushlanacak);
        });
    
          await RoleModel.updateOne({
              roleID: role.id
          }, {
              $set: {
                  guildID: guild.id,
                  roleID: role.id,
                  name: role.name,
                  color: role.hexColor,
                  hoist: role.hoist,
                  position: role.position,
                  permissions: role.permissions.bitfield,
                  mentionable: role.mentionable,
                  time: Date.now(),
                  members: role.members.map(m => m.id),
                  channelOverwrites: roleChannelOverwrites
              }
          }, {
              upsert: true
          });
      });
    
    console.log("Bütün Rol verileri başarı ile kayıt edildi.")
    };
    
    
    async function kanalbackup() {
    if(TextChannels) {await TextChannels.deleteMany({});}
    if(VoiceChannels) {await VoiceChannels.deleteMany({});}
    if(CategoryChannels) {await CategoryChannels.deleteMany({});}
    
      const guild = bot.guilds.cache.get(ramalcim.GuildID);
      if (guild) {
        const channels = [...guild.channels.cache.filter(kanal => kanal.deleted !== true).values()];
        for (let index = 0; index < channels.length; index++) {
              const channel = channels[index];
              let ChannelPermissions = []
              channel.permissionOverwrites?.cache.forEach(perm => {
                  ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
              });
            
              if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
                await TextChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        nsfw: channel.nsfw,
                        parentID: channel.parentId,
                        position: channel.position,
                        rateLimit: channel.rateLimitPerUser,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
              if (channel.type === ChannelType.GuildVoice) {
                await VoiceChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        bitrate: channel.bitrate,
                        userLimit: channel.userLimit,
                        parentID: channel.parentId,
                        position: channel.position,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
              if (channel.type === ChannelType.GuildCategory) {
                await CategoryChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        position: channel.position,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
          }
          console.log("Bütün Kanal verileri başarı ile kayıt edildi.")
      }}