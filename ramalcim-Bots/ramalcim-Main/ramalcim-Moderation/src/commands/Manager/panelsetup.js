const { MessageEmbed, Discord } = require("discord.js");
const { ButtonStyle, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
let mongoose = require("mongoose");
const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');

module.exports = {
    conf: {
      aliases: ["pl"],
      name: "panelsetup",
      help: "panelsetup",
      category: "sahip",
      owner: true,
    },

    run: async (client, message, args) => {

    const One = new ButtonBuilder().setLabel("Sorun Bildir").setCustomId("sorun").setStyle(ButtonStyle.Danger).setEmoji("1028350952769605713")
    const Two = new ButtonBuilder().setLabel("Öneri İlet").setCustomId("oneri").setStyle(ButtonStyle.Secondary).setEmoji("1028350952769605713")
    const Three = new ButtonBuilder().setLabel("Bilgilerin").setCustomId("three").setStyle(ButtonStyle.Secondary).setEmoji("1028353947943051374")
    const Four = new ButtonBuilder().setLabel("Yetkili Başvurusu").setCustomId("ybasvuru").setStyle(ButtonStyle.Secondary).setEmoji("1028350952769605713")
    const Five = new ButtonBuilder().setLabel("Verilerim").setCustomId("five").setStyle(ButtonStyle.Secondary).setEmoji("1028353656665415700")
    const row = new ActionRowBuilder()
    .addComponents([One , Two , Four ,])


    let msg = await message.channel.send({ content:  `
**${message.guild.name}** Sunucusunda Hangi Kategoriyi Kullanacaksanız Butona Tıklayarak bu İşlemi Gerçekleştirebilirisniz

\` 1 \` *Sorunun Varsa Bildire Bilirsin.*
\` 2 \` *Önerin Varsa Bize İlete Bilirsin.*
\` 3 \` *Yetkili Başvurusu yapmanı sağlar.*
`, components: [row] });

  }
}