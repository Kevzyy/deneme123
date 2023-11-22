const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const SafeMember = require("../../../../../ramalcim-Guard/src/Models/Safe")
const veri = require("../../../../../../Global/BotSettings/Settings")
module.exports = {
  conf: {
    aliases: ["gwsil","kevzyykaldır","gkaldır"],
    name: "kevzyysil",
    help: "kevzyysil",
    category: "kullanıcı",
    owner: true,
},

  run: async (client, message, args, embed, interaction) => {
let ramalGuardiSikiyor = await SafeMember.findOne({ guildID: message.guild.id });
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) {
        return message.reply({ content: "Güvenli Listeden Kaldırmak İçin bir kullanıcı etiketle!" });
    }



    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('Güvenli Menüsü!')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
            label: "Full Güvenli",
            value: "full",
            description: "full ekleyince kullanıcıyı bot asla engellemez",
            emoji: "1150872679449116743"

          },
          { 
            label: "Rol-Channel",
            value: "rolkanal",
            description: "Rol ve Kanal erisişimine izin verir.",
            emoji: "1150872679449116743"

          },
          { 
            label: "Role",
            value: "rol",
            description: "Rol erişimine izin verir",
            emoji: "1150872679449116743"

          },
          { 
            label: "Channel",
            value: "kanal",
            description: "Kanal erişimine izin verir",
            emoji: "1150872679449116743"

          },
          { 
            label: "Chat Guard",
            value: "chat",
            description: "metin kanallarında küfüre izin verilir",
            emoji: "1150872679449116743"

          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",
            emoji: "1161306729074663445"
          }
        ])
        );


      
       

const Ramal = new EmbedBuilder()
.setDescription(`${member} Kullanıcıyı güvenli den kalıdırmak İstiyorsanız menüye tıklayın.

**Not:** Full güvenlisini sadece güvendiğiniz kişileri alın!`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [Ramal], components : [ row],})
            message.react(`${client.emojis.cache.find(x => x.name === "ramal_Yes")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

              if(interaction.values[0] == "full") {
                await SafeMember.findOneAndDelete({ guildID: message.guild.id }, {$pull: {Full: member.id}}, { upsert: true });
                const ilgi = new EmbedBuilder()
                .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Full\` listesinden kaldırıldı`)             

            interaction.update({ embeds: [ilgi], ephemaral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		
                if(interaction.values[0] == "rolkanal") {
                    await SafeMember.findOneAndDelete({ guildID: message.guild.id }, {$pull: {RoleAndChannel: member.id}}, { upsert: true });           
    const süründür = new EmbedBuilder()
    .setDescription(`${member} Kullanıcısı başarıyla güvenli \`RoleAndChannel\` listesinden kaldırıldı`) 

    interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


    if(interaction.values[0] == "rol") {
        await SafeMember.findOneAndDelete({ guildID: message.guild.id }, {$pull: {Role: member.id}}, { upsert: true });
        const öp = new EmbedBuilder()
        .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Role\` listesinden kaldırıldı`)

        interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "kanal") {
            await SafeMember.findOneAndDelete({ guildID: message.guild.id }, {$pull: {Channel: member.id}}, { upsert: true });
            const öp = new EmbedBuilder()
            .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Channel\` listesinden kaldırıldı`)
                            
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
            
            
            if(interaction.values[0] == "chat") {
              await SafeMember.findOneAndUpdate({ guildID: message.guild.id }, {$pull: {ChatG: member.id}}, { upsert: true });
              const ramalcokseksi = new EmbedBuilder()
                .setDescription(`${member} Kullanıcısı başarıyla güvenli \`Chat\` listesinden kaldırıldı`)
                                
                interaction.update({ embeds: [ramalcokseksi], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}

                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                    }
                
                        

                    
                
                }
            )
              }
            }
