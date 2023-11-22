const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder,} = require("discord.js");
const veri = require("../../../../../../Global/BotSettings/Settings")
const taggeds = require("../../../../../../Global/schemas/taggeds")
module.exports = {
  conf: {
    aliases: ["tt"],
    name: "taglilarim",
    help: "taglilarim",
    category: "kullanıcı",
},

  run: async (client, message, args, embed, interaction) => {
if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
{
    }

    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    const uyeler = taggedData.taggeds.slice(0,5).map(x => `<@${x}>`).join(", ")


    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('taglı menüsü')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
            label: "Taglılarım",
            value: "full",
            description: "çektiğin taglıları gösterir.",
            emoji: "1161745163928993872"

          },
          { 
            label: "Top Taglı",
            value: "rolkanal",
            description: "Sunucuda kim ne kadar taglı çekmiş ise gösterir",
            emoji: "1161745163928993872"

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
.setDescription(`Merhabalar ${message.author} **Ramalin Ask Botu** Sunucusunda Toplam
Taglı Kazandırdığın Üye \`${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\`

**Detaylı Bilgilere** Bamak İçin Aşağıda Oluşan Menüyü Kullanabilirsin Bol **Taglı Üye** Çekmeler Dilerim!`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [Ramal], components : [ row],})
            message.react(`${client.emojis.cache.find(x => x.name === "ramal_Yes")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

              if(interaction.values[0] == "full") {
                const ilgi = new EmbedBuilder()
                .setDescription(`${message.author} Kullanıcısı taglı çektiği kullanıcılar
                

            \`\`\`Taglıların\`\`\`
                ${uyeler}`)             

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
        