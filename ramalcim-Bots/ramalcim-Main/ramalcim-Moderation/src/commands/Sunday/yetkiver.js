const { PermissionsBitField, ComponentType, EmbedBuilder, Client, Message, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { red, ramal_Yes } = require("../../../../src/configs/emojis.json")
let ayar = require("../../../../src/configs/sunucuayar.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["ytver"],
      name: "ytver",
      help: "ytver <@kevzyy/ID>",
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
                label: 'Yetki 1',
                value: 'yt',
            },
            {
                label: 'Yetki 2',
                value: 'yt2',
            },
            {
                label: 'Yetki 3',
                value: 'yt3',
            },
            {
                label: 'Yetki 4',
                value: 'yt4',
            },
            {
                label: 'Yetki 5',
                value: 'yt5',
            },
            {
                label: 'Yetki 6',
                value: 'yt6',
            },
            {
                label: 'Yetki 7',
                value: 'yt7',
            },
            {
                label: 'Yetki 8',
                value: 'yt8',
            },
            {
                label: 'Yetki 9',
                value: 'yt9',
            },
            {
                label: 'Yetki 10',
                value: 'yt10',
            },
        ]),
);

const msg = await message.reply({ content : `${uye} kullanıcısına perm eklemek için aşağıdaki menüyü kullanınız`, components: [row] });

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
collector.on("collect", async (interaction) => {

     if (interaction.values[0] === "yt") {
        uye.roles.cache.has(ayar.yetki1) ? uye.roles.remove(ayar.yetki1) : uye.roles.add(ayar.yetki1);
        if(!uye.roles.cache.has(ayar.yetki1)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 1ci** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Yetkinin 1ci** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 1ci** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Yetkinin 1ci** rolü geri alındı.`, components: [] });
     }

     if (interaction.values[0] === "yt2") {
        uye.roles.cache.has(ayar.yetki2) ? uye.roles.remove(ayar.yetki2) : uye.roles.add(ayar.yetki2);
        if(!uye.roles.cache.has(ayar.yetki2)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 2ci** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Yetkinin 2ci** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 2ci** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Yetkinin 2ci** rolü geri alındı.`, components: [] });

          if (interaction.values[0] === "yt3") {
        uye.roles.cache.has(ayar.yetki2) ? uye.roles.remove(ayar.yetki3) : uye.roles.add(ayar.yetki3);
        if(!uye.roles.cache.has(ayar.yetki3)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 3ci** adlı rol verildi.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişiye **Yetkinin 3ci** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Yetkinin 3ci** adlı rol geri alındı.`)]})
          msg.edit({ content:`${ramal_Yes} Başarıyla ${uye}, isimli kişinin **Yetkinin 3ci** rolü geri alındı.`, components: [] });
     }





    }
}

    }
     }
})
    }
}