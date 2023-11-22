const { ComponentType, EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
module.exports = {
  conf: {
    aliases: ["rolverr"],
    name: "rolverr",
    help: "rolverr <kevzyy/ID> <Role/ID>",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if(!conf.rolverici.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.reply({ content:`Malesef yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return }
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    const selectMenu = new ActionRowBuilder()
    .addComponents([
      new RoleSelectMenuBuilder()
      .setCustomId("test")
      .setMaxValues(10)
    ]);
    
    let msg = await message.channel.send({ content: `Aşağıdaki menüden kurmak istediğiniz seçiniz.`, components: [selectMenu] })
    
    const filter = i => i.user.id == message.member.id 
    let xxx = await msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 })
    
    xxx.on("collect", async (interaction) => {
        const test = interaction.customId.split('_')[0]
        const uye = await interaction.guild.members.fetch(test)
        if(interaction.customId === "test") {
        await interaction.deferUpdate();
        if (!uye.roles.cache.has(interaction.values[0]))
        await uye.roles.add(`${interaction.values[0]}`)
        
        msg.edit({ content: `olarak  başarıyla eklendi.` , components: [] });
      }
      }
    )
  }
}