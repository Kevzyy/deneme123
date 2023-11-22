const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const registerData  = require("../../../../../../Global/schemas/registerStats");
const conf = require("../../../../src/configs/sunucuayar.json")

module.exports = {
    conf: {
      aliases: ["otokayot","otoreg"],
      name: "oto-kayıt",
      help: "oto-kayıt",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  

    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, otoreg: false}).save();

    const ac = new ButtonBuilder()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle(ButtonStyle.Secondary)

    const kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle(ButtonStyle.Secondary)

    if (data && data.otoreg === true) {
      ac.setStyle('Secondary').setDisabled(true);
    } else {
      ac.setStyle('Success');
    }

    if (data && data.otoreg === false) {
      kapa.setStyle('Secondary').setDisabled(true);
    } else {
      kapa.setStyle('Danger');
    }

    const taglialimrow = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let taglialimembed = new EmbedBuilder()  
    .setDescription(`
${message.author} Otoreg Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.

**Oto Kayıt Modu Şu Anda :**  ${data.otoreg ? `Açık` : `kapalı`}

`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

  let msg = await message.channel.send({ embeds: [taglialimembed], components: [taglialimrow] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.otoreg = true;
      data.save();
      msg.edit({ content: `Otoreg modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
    }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.otoreg = false;
      data.save();
      msg.edit({ content: `Otoreg modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
}
}
