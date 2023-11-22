const { ApplicationCommandOptionType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const coin = require("../../../../../../Global/schemas/coin");
const taggeds = require("../../../../../../Global/schemas/taggeds");
const tagli = require("../../../../../../Global/schemas/taggorev");
const conf = require("../../../../src/configs/sunucuayar.json")
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const { red, ramal_Yes} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
    conf: {
      aliases: ["taglılarım"],
      name: "taglılar",
      help: "taglılar <kevzyy/ID>",
      category: "yetkili",
    },
  
    run: async (client, message, args, ramalembed) => {

        let kanallar = ayar.CommandChannel;
     if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

     if (!conf.staffs.some(x => message.member.roles.cache.has(x)))
        {
        message.react(red)
        message.reply({ content:`Yeterli yetkin yok!`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        return }
        var sayi = 1
        var currentPage = 1
        var taglılar = [];
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const taglilarim = await taggeds.findOne({ guildID: message.guild.id, userID: member.id });

if (taglilarim && taglilarim.users && taglilarim.users.length > 0) {
  for (let index = 0; index < taglilarim.users.length; index++) {
    sayi++;
    const info = taglilarim.users[index];
    taglılar.push({ UserID: info.memberId, Date: info.date });
  }
} else {
  // Eğer dizisi boşsa veya tanımlı değilse, burada bir işlem yapabilirsiniz.
  // Örneğin bir mesaj gönderebilir veya başka bir şey yapabilirsiniz.
}

        let pages = taglılar.chunk(10)
        let geri = new ButtonBuilder().setCustomId('geri').setEmoji("⏮️").setLabel("Önce ki Sayfa").setStyle(ButtonStyle.Secondary);
        let carpi = new ButtonBuilder().setCustomId('ileri').setEmoji("❌").setLabel("Sayfaları Kapat").setStyle(ButtonStyle.Danger)
        let ileri = new ButtonBuilder().setCustomId('cancel').setEmoji("⏭️").setLabel("Sonra ki Sayfa").setStyle(ButtonStyle.Secondary)
        if(sayi < 5){
    geri.setDisabled(true);
    ileri.setDisabled(true);
    }
    message.channel.send({ components: [new ActionRowBuilder()
      .addComponents(
          geri,
        carpi,
          ileri
    
      )],embeds:[
        ramalembed.setDescription(`${member}, toplamda **${taglilarim.count}** kişiyi taga davet etmişsin.`)
      .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).user.tag} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
    ]})
      .then(async msg =>{
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
        collector.on('collect', async (button, user) => {
            await button.deferUpdate();
        if (button.customId === "ileri") {
          if (currentPage == pages.length) return;
          currentPage++;
          await msg.edit({ components: [new ActionRowBuilder()
            .addComponents(
                geri,
               carpi,
                ileri
          
            )],embeds:[
                ramalembed.setDescription(`${member}, toplamda **${taglilarim.count}** kişiyi taga davet etmişsin.`)
            .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
          ]})
        }
        if (button.customId === "geri") {
          if (currentPage == pages.length) return;
          currentPage--;
          await msg.edit({ components: [new ActionRowBuilder()
            .addComponents(
                geri,
                carpi,
                ileri
          
            )],embeds:[
                ramalembed.setDescription(`${member}, toplamda **${taglilarim.count}** kişiyi taga davet etmişsin.`)
            .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
          ]})
        }
        if (button.customId === "geri"){
          if (button.customId === "cancel") {
            if (msg) msg.delete().catch(err => { });
            if (message) return message.delete().catch(err => { });
            await button.editReply({ content: `**Taglı Geçmişi Silindi!**`})
        }
        }
        })    
      })
     },

  };

  Array.prototype.chunk = function (chunk_size) {
    let myArray = Array.from(this);
    let tempArray = [];
    for (let index = 0; index < myArray.length; index += chunk_size) {
      let chunk = myArray.slice(index, index + chunk_size);
      tempArray.push(chunk);
    }
    return tempArray;
  };