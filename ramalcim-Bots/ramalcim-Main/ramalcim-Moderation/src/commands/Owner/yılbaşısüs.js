const Discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    conf: {
      aliases: ["süsle","susle"],
      name: "süsle",
      help: "süsle <Mesaj/Text>",
      category: "sahip",
      owner: true,
    },
  
    run: async (client, message, args) => {

const row = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId("süsle")
  .setLabel("SÜSLE")
  .setStyle(ButtonStyle.Primary),

  new ButtonBuilder()
  .setCustomId("süskaldır")
  .setLabel("SÜS KALDIR")
  .setStyle(ButtonStyle.Success),

  new ButtonBuilder()
  .setCustomId("İPTAL")
  .setLabel("İPTAL")
  .setStyle(ButtonStyle.Danger),
  );




  const row2 = new ActionRowBuilder()
  .addComponents(

  new ButtonBuilder()
  .setCustomId("süsle")
  .setLabel("Süsle")
  .setStyle(ButtonStyle.Primary)
  .setDisabled(true),

  new ButtonBuilder()
  .setCustomId("süskaldır")
  .setLabel("Süs Kaldır")
  .setStyle(ButtonStyle.Success)
  .setDisabled(true),

  new ButtonBuilder()
  .setCustomId("İPTAL")
  .setLabel("İptal")
  .setStyle(ButtonStyle.Danger)
  .setDisabled(true),
  );



let ramal = new EmbedBuilder() 
.setColor("#2f3136")
.setAuthor({ name: `YILBAŞI SÜS`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`Bu komut sunucu içerisindeki Kanalları Noel Ağacı İle Süslemeye Yarar
\`\`\`
Sunucuyu Süslemek İçin Aşşağıdaki Butonları Kullan
\`\`\``)

 let msg = await message.channel.send({ embeds: [ramal], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "süsle") {
      message.guild.channels.cache.forEach(st => {
        st.setName(`🎄│${st.name}`)})
  let süsle = new MessageEmbed() //V14 DE KOD YANIT VERMEDIGI ICIN BILEREK BURDA V13 MESSAGE EMBED YAZILMISTIR
  .setDescription(`Sunucu Kanalları Başarıyla Süslendi!`)

  msg.edit({ embeds: [süsle], components: [row2], ephemeral: true});
}  

if(button.customId === "süskaldır") {
        message.guild.channels.cache.forEach(st => {
        st.setName(`${st.name.replace("🎄│", "")}`)})

let süskaldır = new EmbedBuilder()
.setDescription(`Başarıyla Sunucu Süsleri Kaldırıldı!`)

msg.edit({ embeds: [süskaldır], components: [row2], ephemeral: true});

 }

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi`, embeds: [], components: [], ephemeral: true});

}

  

  
})}}