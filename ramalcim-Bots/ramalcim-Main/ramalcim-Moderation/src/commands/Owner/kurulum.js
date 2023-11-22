const { Database } = require("ark.db");
const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!ramalcim.owners.includes(message.author.id)) {
      return message.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    } else {

  const row = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId("rol")
  .setLabel("Menü Rol Kurulum")
  .setStyle(ButtonStyle.Primary),

  new ButtonBuilder()
  .setCustomId("kanal")
  .setLabel("Kanal Kurulum")
  .setStyle(ButtonStyle.Success),

  new ButtonBuilder()
  .setCustomId("emoji")
  .setLabel("Emoji Kurulum")
  .setStyle(ButtonStyle.Danger),
  );

      let msg = await message.channel.send({ content: `Lütfen **60 saniye** içerisinde hangi kurulum yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız.`, components: [row]})

      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button , max: 3, time: 60000 })


      collector.on("collect", async interaction => {

        if (interaction.customId === "rol") {
          await interaction.deferUpdate();

         await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });
  
          await interaction.guild.roles.create({
            name: "🍓",
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍊",
            color: "#ff8b00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍇",
            color: "#4f00ff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍑",
            color: "#ff00d1",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🥑",
            color: "#56ff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Alone 💔",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Couple 💍",
            color: "#e73084",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Çekiliş Katılımcısı 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Etkinlik Duyuru 🎉",
            color: "#f89292",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♏ Akrep",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♉ Boğa",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♍ Başak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♊ İkizler",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♒ Kova",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♈ Koç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♋ Yengeç",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♑ Oğlak",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♎ Terazi",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♌ Aslan",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♓ Balık",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♐ Yay",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 CS:GO",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 League of Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Valorant",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Gta V",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 PUBG",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Fortnite",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();
 
          const parent = await interaction.guild.channels.create({ name: 'SUNUCU LOGLAR',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.SendMessages],
            }]
          });
        
          await interaction.guild.channels.create({ name: 'message_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'voice_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'stream_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'camera_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'mute_deaf_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'taglı_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'register_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'yetkili_başvuru_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'öneri_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'sorun_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'name_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'rank_log', 
            type: ChannelType.GuildText,
            parent: parent.id

          });
          await interaction.guild.channels.create({ name: 'market_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'rol_log', 
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'yetki_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'komut_log',
            type: ChannelType.GuildText,
            parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'ban_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'jail_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'underworld_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });   
          await interaction.guild.channels.create({ name: 'mute_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'vmute_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'uyarı_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'ceza_puan_log',
          type: ChannelType.GuildText,
          parent: parent.id
          });
          await interaction.guild.channels.create({ name: 'bot_log',
          type: ChannelType.GuildText,
          parent: parent.id
        });
        await interaction.guild.channels.create({ name: 'boost_log',
        type: ChannelType.GuildText,
        parent: parent.id
      });
      await interaction.guild.channels.create({ name: 'protection_log',
      type: ChannelType.GuildText,
      parent: parent.id
      });
          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }



        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
              { name: "star", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
              { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
              { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
              { name: "miniicon", url: "https://cdn.discordapp.com/emojis/1093111822103625748.webp?size=96&quality=lossless" },
              { name: "red", url: "https://cdn.discordapp.com/emojis/1125422699049648218.gif?size=96&quality=lossless" },
              { name: "kevzyy_Yes", url: "https://cdn.discordapp.com/emojis/1161306682048127016.webp?size=96&quality=lossless"},
              { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
              { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
              { name: "galp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
              { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
              { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
              { name: "Mute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
              { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
              { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
              { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
              { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
              { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
              { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
              { name: "fill", url: "https://cdn.discordapp.com/emojis/1161302543129919569.webp?size=96&quality=lossless" },
              { name: "empty", url: "https://cdn.discordapp.com/emojis/1161305827475472485.webp?size=96&quality=lossless" },
              { name: "fillStart", url: "https://cdn.discordapp.com/emojis/1161302562029441075.webp?size=96&quality=lossless" },
              { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/1161306198017052742.webp?size=96&quality=lossless" },
              { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/1161302521604747374.webp?size=96&quality=lossless" },
              { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
              { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
              { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
              { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
              { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
              { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "kevzyyspotify", url: "https://cdn.discordapp.com/emojis/899337292840312912.png?size=44" },
              { name: "kevzyynetflix", url: "https://cdn.discordapp.com/emojis/941993358518284298.webp?size=96&quality=lossless" },
              { name: "kevzyyexxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44" },
              { name: "kevzyyblutv", url: "https://cdn.discordapp.com/emojis/900396707362246666.png?size=44" },
              { name: "kevzyynitro", url: "https://cdn.discordapp.com/emojis/941993742934614047.webp?size=96&quality=lossless" },
              { name: "kevzyyyoutube", url: "https://cdn.discordapp.com/emojis/941993963013935115.gif?size=96&quality=lossless" },
              { name: "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1" },
              { name: "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44" },
              { name: "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44" },
              { name: "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44" },
              { name: "partner", url: "https://cdn.discordapp.com/emojis/923691826374934618.webp?size=96&quality=lossless" },
              { name: "online", url: "https://cdn.discordapp.com/emojis/901829756603998269.webp?size=96&quality=lossless" },
              { name: "duyuru", url: "https://cdn.discordapp.com/emojis/935136070377553930.webp?size=96&quality=lossless" },
              { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" },
              { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" },
              { name: "start", url: "https://cdn.discordapp.com/emojis/1049421057842483313.png?size=32" },
              { name: "link", url: "https://cdn.discordapp.com/emojis/1049421063555129474.png?size=32" },
              { name: "mesaj", url: "https://media.discordapp.net/attachments/1133074433393836164/1139270067918479460/mesaj.png?width=53&height=52"},
              { name: "info", url: "https://media.discordapp.net/attachments/1133074433393836164/1139270255181570198/info.png?width=37&height=37"},
              { name: "ses", url: "https://media.discordapp.net/attachments/1133074433393836164/1139270354573983865/ses.png?width=53&height=53"},
              { name: "yes", url: "https://cdn.discordapp.com/emojis/1049421059234988042.png?size=32" },
              { name: "cekilis", url: "https://cdn.discordapp.com/emojis/1065735268524634122.webp?size=80&quality=lossless" },
              { name: "nokta", url: "https://media.discordapp.net/attachments/1133074433393836164/1139271027545878568/nokta.png?width=26&height=26"}
          ]
          const SayıEmojis = [
              { name: "sifir", url: "https://cdn.discordapp.com/emojis/1093091788404817930.webp?size=96&quality=lossless" },
              { name: "bir", url: "https://cdn.discordapp.com/emojis/1093091791198228490.webp?size=96&quality=lossless" },
              { name: "iki", url: "https://cdn.discordapp.com/emojis/1093091794138447902.webp?size=96&quality=lossless" },
              { name: "uc", url: "https://cdn.discordapp.com/emojis/1093091795715506276.webp?size=96&quality=lossless" },
              { name: "dort", url: "https://cdn.discordapp.com/emojis/1093091798936727582.webp?size=96&quality=lossless" },
              { name: "bes", url: "https://cdn.discordapp.com/emojis/1093091800731889674.webp?size=96&quality=lossless" },
              { name: "alti", url: "https://cdn.discordapp.com/emojis/1093091803298811935.webp?size=96&quality=lossless" },
              { name: "yedi", url: "https://cdn.discordapp.com/emojis/1093091805022658622.webp?size=96&quality=lossless" },
              { name: "sekiz", url: "https://cdn.discordapp.com/emojis/1093091808029974548.webp?size=96&quality=lossless" },
              { name: "dokuz", url: "https://cdn.discordapp.com/emojis/1093091810076794951.webp?size=96&quality=lossless" }
            ]
          
          emojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return global.emojidb.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

            SayıEmojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return global.emojidb.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create({ attachment: x.url, name: x.name });
              await global.emojidb.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

        }
  
      })

    }
  },
};