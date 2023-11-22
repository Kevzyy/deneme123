const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["p"],
      name: "p",
      help: "p <@kevzyy/ID>",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed) => {
    if(!ayar.rolverici.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    { 
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);        
const row = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('row')
        .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
        .addOptions([
            {
                label: 'Vip',
                value: 'yt',
            },
            {
                label: 'Sponsor',
                value: 'yt2',
            },
            {
                label: 'Tasarımcı',
                value: 'yt3',
            },
            {
                label: 'Kamera',
                value: 'yt4',
            },
            {
                label: 'Streamer',
                value: 'yt5',
            },
            {
                label: 'Müzisyen',
                value: 'yt6',
            },
        ]),
);

const msg = await message.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [row] });

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
collector.on("collect", async (interaction) => {

     if (interaction.values[0] === "yt") {
        uye.roles.cache.has(ayar.vipp) ? uye.roles.remove(ayar.vipp) : uye.roles.add(ayar.vipp);
        if(!uye.roles.cache.has(ayar.vipp)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip Rolü** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Vip Rolü** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip Rolü** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Vip Rolü** rolü geri alındı.`, components: [] });
     }

     if (interaction.values[0] === "yt2") {
        uye.roles.cache.has(ayar.sponsorr) ? uye.roles.remove(ayar.sponsorr) : uye.roles.add(ayar.sponsorr);
        if(!uye.roles.cache.has(ayar.sponsorr)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Sponsor** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Sponsor** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Sponsor* adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Sponsor** rolü geri alındı.`, components: [] });

          if (interaction.values[0] === "yt3") {
        uye.roles.cache.has(ayar.tasarimci) ? uye.roles.remove(ayar.tasarimci) : uye.roles.add(ayar.tasarimci);
        if(!uye.roles.cache.has(ayar.tasarimci)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Tasarımcı** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Tasarımcı** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Tasarımcı** rolü geri alındı.`, components: [] });
     }


     if (interaction.values[0] === "yt4") {
        uye.roles.cache.has(ayar.kameraa) ? uye.roles.remove(ayar.kameraa) : uye.roles.add(ayar.kameraa);
        if(!uye.roles.cache.has(ayar.kameraa)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Kamera** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Kamera** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Kamera** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Kamera** rolü geri alındı.`, components: [] });
     }

     if (interaction.values[0] === "yt5") {
        uye.roles.cache.has(ayar.streamer) ? uye.roles.remove(ayar.streamer) : uye.roles.add(ayar.streamer);
        if(!uye.roles.cache.has(ayar.streamer)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Streamer** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Streamer** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Streamer** rolü geri alındı.`, components: [] });
     }

     if (interaction.values[0] === "yt6") {
        uye.roles.cache.has(ayar.müzisyen) ? uye.roles.remove(ayar.müzisyen) : uye.roles.add(ayar.müzisyen);
        if(!uye.roles.cache.has(ayar.müzisyen)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Müzisyen** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [] });
     }

    }
}

    }
     }
}
   }
   }}
)   }}
