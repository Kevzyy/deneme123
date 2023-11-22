const { EmbedBuilder, AuditLogEvent } = require("discord.js")
const { red, ramal_Yes } = require("../../../src/configs/emojis.json")
const Log = require("../../../src/configs/sunucuayar.json")
const roller = require("../../../../../Global/schemas/rolveridb")
var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  await newMember?.guild.fetchAuditLogs({
    type: AuditLogEvent.MemberRoleUpdate
  }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    if (yapan.bot) return
    newMember.roles.cache.forEach(async role => {
      if (!oldMember.roles.cache.has(role.id)) {
        const emed = new EmbedBuilder()
          .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
          .setDescription(`
          ${ramal_Yes} __Rolü Eklenen Kişi__ ${hedef} - \`${hedef.id}\` 

          ${ramal_Yes} __Rolü Ekleyen Kişi__ ${yapan} - \`${yapan.id}\` 
  
          ${ramal_Yes} __Kişiye Eklenen Rol__  ${role} - \`${role.id}\``)
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name == "rol_log").wsend({ embeds: [emed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
    oldMember.roles.cache.forEach(async role => {
      if (!newMember.roles.cache.has(role.id)) {
        const emeed = new EmbedBuilder()
        .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
          .setDescription(`
          ${red} __ Rolü Alınan Kişi__  ${hedef}  - \`${hedef.id}\` 

          ${red} __ Rolü Alan Kişi____  ${yapan} - \`${yapan.id}\` 
          
          ${red} __ Kişiden Alınan Rol__  ${role} - \`${role.id}\`
          `)
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name == "rol_log").wsend({ embeds: [emeed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
  })
}
module.exports.conf = {
  name: "guildMemberUpdate",
};