const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const { red , ramal_Yes } = require("../../../../src/configs/emojis.json")
const registerData  = require("../../../../../../Global/schemas/registerStats");
const Database  = require("../../../../../../Global/schemas/WelcomeMode");
const children = require("child_process");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  
    let taglialim = "./src/sesler/taglialim.mp3"

    let data = await registerData.findOne({ guildID: ramalcim.GuildID })
    if(!data) new registerData({guildID: ramalcim.GuildID, tagMode: false}).save();

    let ac = new ButtonBuilder()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("915754671728132126");

    let kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("920412153712889877");

    if (data && data.tagMode === true) {
      ac.setStyle(ButtonStyle.Success).setDisabled(true);
    } else {
      ac.setStyle(ButtonStyle.Success);
    }

    if (data && data.tagMode === false) {
      kapa.setStyle(ButtonStyle.Danger).setDisabled(true);
    } else {
      kapa.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let ramal = new EmbedBuilder()  
    .setDescription(`${message.author} Taglı Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [ramal], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: ramalcim.GuildID })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `${ramal_Yes} Taglı Alım modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
      if(data && data.SesMod === taglialim) return msg.edit({ content: `Zaten ses modu \` Taglı Alım \` olarak ayarlı`, components: [] });
        await Database.findOneAndUpdate({ guildID: ramalcim.GuildID }, {SesMod: taglialim}, { upsert: true })
        children.exec(`pm2 restart ${ramalcim.GuildName}_Welcomes`);
      }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: ramalcim.GuildID })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `${ramal_Yes} Taglı Alım modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
}
}
