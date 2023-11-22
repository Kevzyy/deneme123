const { ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');
const { ramal_Yes, red } = require("../../../../src/configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
          if (args[0] && args[0] < 101 && args[0] > 0 && !isNaN(args[0])) {

            await message.delete();
            await message.channel.bulkDelete(args[0] === 100 ? 99 : args[0]);
            message.channel.send({ content: `<#${message.channel.id}> kanalından ${args[0]} adet mesaj silindi.` }).then((e) => setTimeout(() => { e.delete(); }, 3000));
      
      
          } else {
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("on").setLabel("10").setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId("yirmibes").setLabel("25").setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId("elli").setLabel("50").setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId("yüz").setLabel("100").setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId("iptal").setLabel("X").setStyle(ButtonStyle.Secondary)
            );
      
            let ramal = new EmbedBuilder()
              .setDescription(`
        \` ➥ \` **Kaç adet mesaj sileceğinizi butonlar ile seçiniz.**
        `)
              .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
      
            let msg = await message.channel.send({ embeds: [ramal], components: [row] })
      
            var filter = (button) => button.user.id === message.author.id;
            let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })
      
            collector.on("collect", async (button) => {
      
              if (button.customId === "on") {
                await message.delete();
                await message.channel.bulkDelete(10);
                message.channel.send({ content: `${ramal_Yes} 10 adet mesaj silindi!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
              }
              if (button.customId === "yirmibes") {
                await message.delete();
                await message.channel.bulkDelete(25);
                message.channel.send({ content: `${ramal_Yes} 25 adet mesaj silindi!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
              }
              if (button.customId === "elli") {
                await message.delete();
                await message.channel.bulkDelete(50);
                message.channel.send({ content: `${ramal_Yes} 50 adet mesaj silindi!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
              }
              if (button.customId === "yüz") {
                await message.delete();
                await message.channel.bulkDelete(99);
                message.channel.send({ content: `${ramal_Yes} 100 adet mesaj silindi!` }).then((e) => setTimeout(() => { e.delete(); }, 5000));
              }
              if (button.customId === "iptal") {
                await message.delete();
                msg.edit({ content: `${red} Mesaj silme işleminden vazgeçtiniz.`, embeds: [], components: [] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
              }
            })
          }
        },
      };