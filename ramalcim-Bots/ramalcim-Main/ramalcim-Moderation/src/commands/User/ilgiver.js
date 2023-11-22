const moment = require("moment")
require("moment-duration-format");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes } = require("../../../../src/configs/emojis.json");
const { PermissionsBitField, ComponentType, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, Client, Message, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["ilgiver","ilgi"],
    name: "ilgiver",
    help: "ilgiver"
  },

  run: async (client, message, args, embed) => {
    
    let kanallar = "bot-commands";
    if (!kanallar.includes(message.channel.name)) return message.reply({ content: `Bot Komut kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (!member) {
        return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
    }


    const girlNames = ['Seni gören kelebekler, narinliğin karşısında mest olur','Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.'];
    const boyNames = ['Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.'];

    const gender = Math.random() < 0.5 ? 'Kız' : 'Erkek'; // Rastgele bir cinsiyet seçimi

    let randomName;
 
 if (gender === 'Kız') {
   randomName = girlNames[Math.floor(Math.random() * girlNames.length)];
   // Kız çocuğu isteği mesajı
 } else {
   randomName = boyNames[Math.floor(Math.random() * boyNames.length)];
   // Erkek çocuğu isteği mesajı
 }
    const row = new ActionRowBuilder()
    
    .addComponents(
        new StringSelectMenuBuilder()
          .setPlaceholder('İlgi/Süründür/Öp/Tokat')
          .setCustomId('kurulumselect')
          .addOptions([
          { 
                label: "İlgi Ver!",
                value: "ilgi",
                description: "İlgi sevgi verir azıcıkdaa götünü kaldırır",
                emoji: "1166909996622168104"
  
          },
          { 
            label: "Süründür!",
            value: "süründür",
            description: "İlgi vermez trip atarak süründürür",
            emoji: "1166909996622168104"

          },
          { 
            label: "Öp!",
            value: "öp",
            description: "Tatlışş bi öpücükk verir",
            emoji: "1166909996622168104"

          },
          { 
            label: "Tokat!",
            value: "tokat",
            description: "Koydun mu oturtur yerden yere vurursun.",
            emoji: "1166909996622168104"

          },
          { 
            label: "Kapat",
            description: "Menüyü kapatır.",
            value: "closeMenu",
            emoji: "1166909958743404624"
          }
        ])
        );


      
       

const ramal = new EmbedBuilder()
.setDescription(`Birileri bişeyler mi yapmak istiyormuşş nE
Heyy ${member} ${message.author} senden hoşlaşıyormuşşş gibi hissediyorum ben.

Ayrıca aşağıdaki menüden istediğiniz diğer istekleri de uygulayabilirsiniz.`)

.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
let msg = await message.channel.send({ embeds: [ramal], components : [row],})
            message.react(`${client.emojis.cache.find(x => x.name === "ramal_Yes")}`);
            const filter = i => i.user.id == message.author.id 
            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });

            collector.on("collect", async (interaction) => {

             if(interaction.values[0] == "ilgi") {
            
    
    const ilgi = new EmbedBuilder()
    .setDescription(`${member} **${randomName}**`) 

            interaction.update({ embeds: [ilgi], ephemaral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		
                if(interaction.values[0] == "süründür") {
                
    const süründür = new EmbedBuilder()
    .setDescription(`${member} git konuşmuyom senlee, tripliyim sanaa burnun sürünsün biraz.`) 
    .setImage("https://i0.wp.com/img-11.onedio.com/img/719/bound/2r0/55968c08c8b0db794be6b599.gif")
    interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


    if(interaction.values[0] == "öp") {
        const öp = new EmbedBuilder()
        .setDescription(`${member} gell gell yaklaşş yanıma öpücüklere boğayım seni.`)
        .setImage("https://i.pinimg.com/originals/50/6a/c6/506ac6f6a45d6b43cf545451940507bf.gif")      
        interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  


        if(interaction.values[0] == "tokat") {
            const öp = new EmbedBuilder()
            .setDescription(`${member} haaağğkkk puu Allahına kavuşturdumm.`)
            .setImage("https://media.tenor.com/QTfoz_pIxXwAAAAC/recep-recepi%CC%87vedik6.gif") 
                            
            interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		  
                    if(interaction.values[0] == "closeMenu") {
                        interaction.message.delete()					
                    }
                
                    collector.on("collect", async (interaction) => {
                        if (interaction.customId === "msj") {
                            interaction.message.delete();
                            message.delete();
                          }

                    
                
                })

}
            )
}
}