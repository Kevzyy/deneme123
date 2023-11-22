const { ButtonStyle, ComponentType, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { ramal_Yes, red, ses, mesaj,info , nokta } = require("../../../../src/configs/emojis.json");
const messageUserChannel = require("../../../../../../Global/schemas/messageUserChannel");
const voiceUserChannel = require("../../../../../../Global/schemas/voiceUserChannel");
const streamerUserChannel = require("../../../../../../Global/schemas/streamerUserChannel");
const cameraUserChannel = require("../../../../../../Global/schemas/cameraUserChannel");
const messageUser = require("../../../../../../Global/schemas/messageUser");
const voiceUser = require("../../../../../../Global/schemas/voiceUser");
const voiceUserParent = require("../../../../../../Global/schemas/voiceUserParent");
const isimler = require("../../../../../../Global/schemas/names");
const register = require("../../../../../../Global/schemas/registerStats");
const inviterSchema = require("../../../../../../Global/schemas/inviter");
const inviterMember = require("../../../../../../Global/schemas/inviteMember");
const streamerUser = require("../../../../../../Global/schemas/streamerUser");
const cameraUser = require("../../../../../../Global/schemas/cameraUser");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const Seens = require("../../../../../../Global/schemas/seens")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const client = global.bot;
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
    conf: {
      aliases: ["mee","stats"],
      name: "stats",
      help: "stats",
      category: "stat",
    },
  
    run: async (client, message, args, prefix) => {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      await client.guilds.cache.get(ramalcim.GuildID).members.fetch(member.user.id)
      let kullArray = message.content.split(" ");
      let kullaniciId = kullArray.slice(1);
      let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;
      const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
      const total = inviterData ? inviterData.total : 0;
      const regular = inviterData ? inviterData.regular : 0;
      const bonus = inviterData ? inviterData.bonus : 0;
      const leave = inviterData ? inviterData.leave : 0;
      const fake = inviterData ? inviterData.fake : 0;
      const invMember = await inviterMember.find({ guildID: message.guild.id, inviter: member.user.id });
      const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
      const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
      let SonGörülme = await Seens.findOne({userID: uye.id})

      const category = async (parentsArray) => {
          const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
          const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
          let voiceStat = 0;
          for (var i = 0; i <= voiceUserParentData.length; i++) {
            voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
          }
          return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
        };
        
  
          const Active6 = await streamerUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
  
      if (Active6.length < 0) return;
      let page = 1;
      let liste = Active6.map((x, index) => `\` ${index+1} \` ${client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`}: \`${moment.duration(x.channelData).format("H [saat], m [dakika] s [saniye]")}\``)
    
  
        const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
        const Active3 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
        const Active4 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
        const Active5 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.user.id }).sort({ channelData: -1 });
  
        let messageTop2;
        Active3.length > 0 ? messageTop2 = Active3.splice(0, 3).map(x => client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID) ? `#${client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID).name}` : `Kanal Bulunamadı`).join("\n\n\n") : messageTop2 = ""
  
        let messageTop3;
        Active4.length > 0 ? messageTop3 = Active4.splice(0, 3).map(x => `${Number(x.channelData).toLocaleString()} mesaj`).join("\n\n\n") : messageTop3 = ""
  
        let voiceTop;
        Active2.length > 0 ? voiceTop = Active2.splice(0, 3).map(x => client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID) ? client.guilds.cache.get(ramalcim.GuildID).channels.cache.get(x.channelID).name : `Kanal Bulunamadı`).join("\n\n\n") : voiceTop = ""
  
        let voiceTop2;
        Active5.length > 0 ? voiceTop2 = Active5.splice(0, 3).map(x => `${moment.duration(x.channelData).format("H [sa], m [dk]")}`).join("\n\n\n") : voiceTop2 = ""
  /////////////
  
        const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
        const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
        const messageWeekly = messageData ? messageData.weeklyStat : 0;
        const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
        const messageDaily = messageData ? messageData.dailyStat : 0;
        const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
    
        const yayındata = await streamerUser.findOne({ guildID: message.guild.id, userID: member.user.id });
        const kameradata = await cameraUser.findOne({ guildID: message.guild.id, userID: member.user.id });
  
        const yazı = [] 
        if(member.user.username.length > 15) {
        let yarrak = member.user.username.slice(0, 15)
           yazı.push(`${yarrak}...`)  
          } else {
          yazı.push(`${member.user.tag}`)
          }
  
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
  
    let fontSize = 70;
  
    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);
  
    return ctx.font;
  };
  const canvas = Canvas.createCanvas(930, 295);
    const ctx = canvas.getContext('2d');
  
    let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1009804086293565501/1156475008013565992/ramal.png?ex=65151ac8&is=6513c948&hm=29d79df92727bfc75154fc0b9e4bd5d712c30c22c12f8865e3b08a4fd7942b7d&");
    ctx.save();
    roundedImage(ctx, 0, 0, 930, 295, 20);
    ctx.clip();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
  
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  
  const yazı2 = [] 
  if(member.user.username.length > 8) {
    let yarrak = member.user.username.slice(0, 8)
     yazı2.push(`${yarrak}...`)  
        } else {
    yazı2.push(`${member.user.tag}`)
            }
  
    ctx.font = '28px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${yazı2}`, canvas.width / 7.9, canvas.height / 4.5);
  
    ctx.font = '22px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${moment(member.user.createdAt).format("LL")}`, canvas.width / 1.67, canvas.height / 4.1);
  
    ctx.font = '22px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${moment(member.joinedAt).format("LL")}`, canvas.width / 1.24, canvas.height / 4.1);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Ses Süresi`, canvas.width / 11.1, canvas.height / 1.94);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Mesaj Sayısı`, canvas.width / 12.1, canvas.height / 1.57);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Yayın Süresi`, canvas.width / 12.1, canvas.height / 1.32);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Kamera Süresi`, canvas.width / 12.3, canvas.height / 1.13);
  ///
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [sa], m [dk]")}`, canvas.width / 4.7, canvas.height / 1.94);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${messageData ? messageData.topStat : 0} mesaj`, canvas.width / 4.7, canvas.height / 1.57);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${moment.duration(yayındata ? yayındata.topStat : 0).format("H [sa], m [dk]")}`, canvas.width / 4.7, canvas.height / 1.32);
  
    ctx.font = '12px "Marlin Geo Black"',
    ctx.fillStyle = '#020202';
    ctx.fillText(`${moment.duration(kameradata ? kameradata.topStat : 0).format("H [sa], m [dk]")}`, canvas.width / 4.7, canvas.height / 1.13);
  ////
  ctx.font = '12px "Marlin Geo Black"',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${messageTop2}`, canvas.width / 2.7, canvas.height / 1.84);
  
  ctx.font = '12px "Marlin Geo Black"',
  ctx.fillStyle = '#020202';
  ctx.fillText(`${messageTop3}`, canvas.width / 1.9, canvas.height / 1.84);
  ////
  ctx.font = '12px "Marlin Geo Black"',
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${voiceTop}`, canvas.width / 1.4, canvas.height / 1.84);
  
  ctx.font = '12px "Marlin Geo Black"',
  ctx.fillStyle = '#020202';
  ctx.fillText(`${voiceTop2}`, canvas.width / 1.15, canvas.height / 1.84);
  ////////////////bitiş////////////////////////////////////////////////  
  const avatar = await Canvas.loadImage(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`);
  ctx.save();
  roundedImage(ctx, 13, 19, 70, 70, 15);
  ctx.clip();
  ctx.drawImage(avatar, 13, 19, 70, 70);
  ctx.closePath();
  
  // Clip off the region you drew on
  ctx.clip();
  
  function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  }
  
  let sonMesaj = SonGörülme.lastMessage
  if(SonGörülme.last) {
    let type = SonGörülme.last.type
    if(type == "ONLINE") txt = `En son <t:${String(sonAktif).slice(0, 10)}:R> çevrim-içi oldu veya cihaz değiştirdi.`
    if(type == "OFFLINE") txt = `En son <t:${String(sonDeAktif).slice(0, 10)}:R> çevrim-dışı oldu.`
    if(type == "VOICE") txt = `En son <t:${String(sonSes).slice(0, 10)}:R> <#${SonGörülme.last.channel}> isimli ses kanalında görüldü.`
    if(type == "MESSAGE") txt = `Son etkinliği <t:${String(sonMesaj).slice(0, 10)}:R> <#${SonGörülme.last.channel}> isimli kanala \`${SonGörülme.last.text}\` mesajını gönderdi.`
    if(type == "AVATAR") txt = `Son etkinliği <t:${String(sonResim).slice(0, 10)}:R> profil resmini değiştirdi.`
    if(type == "USERNAME") txt = `Son etkinliği <t:${String(sonKullanıcıAdı).slice(0, 10)}:R> ${SonGörülme.last.old} olan kullanıcı adını ${SonGörülme.last.new} olarak değiştirdi.`
    if(type == "DISCRIMINATOR") txt = `Son etkinliği <t:${String(sonEtiket).slice(0, 10)}:R> #${SonGörülme.last.old} olan etiketini #${SonGörülme.last.new} olarak değiştirdi.`
  }
  
  const embeds = new EmbedBuilder()
    .setDescription(`${member} (\`${member.id}\`) adlı kullanıcının yapmış olduğu aktivitelerin genel bilgileri listelenmiştir.
  ${nokta} __**Sesli Kategori İstatistiği**__
  
  Son Görülme: <t:${String(SonGörülme.lastSeen).slice(0, 10)}:R> (\`${SonGörülme.last.type}\`)
  ${sonAktif ? `Çevrim-İçi: <t:${String(sonAktif).slice(0, 10)}:R>` : `Çevrim-İçi: ~`}
  ${sonDeAktif ? `Çevrim-Dışı: <t:${String(sonDeAktif).slice(0, 10)}:R>` : `Çevrim-Dışı: ~`}
  ${sonMesaj ? `Sohbetde Görülme: <t:${String(sonMesaj).slice(0, 10)}:R>` : `Sohbetde Görülme: ~`}
  ${sonSes ? `Seste Görülme: <t:${String(sonSes).slice(0, 10)}:R>` : `Seste Görülme: ~`}
  ${sonResim ? `Resim Güncelleme: <t:${String(sonResim).slice(0, 10)}:R>` : `Resim Güncelleme: ~`}
  ${sonKullanıcıAdı ? `Kullanıcı Adı Güncelleme: <t:${String(sonKullanıcıAdı).slice(0, 10)}:R>` : `Kullanıcı Adı Güncelleme: ~`}
  ${sonEtiket ? `Etiket Güncelleme: <t:${String(sonEtiket).slice(0, 10)}:R>` : `Etiket Güncelleme: ~`}

  ${info} __Public Odalar__ \`${await category(conf.publicParents)}\`
  ${info} __Secret Odalar__ \`${await category(conf.privateParents)}\`
  ${info} __Alone Odalar__ \`${await category(conf.aloneParents)}\`
  ${info} __Yönetim Yetkili Odaları__ \`${await category(conf.funParents)}\`
  ${info} __Kayıt Odaları__ \`${await category(conf.registerParents)}\`
  
  ${nokta} Sunucusunun genel sohbet ( \`ses\` ) sıralaması listelenmektedir.
  
  ${ses} __Toplam Ses__ \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")} Ses İstatistiği\`
  ${ses} __Haftalık Ses__ \`${voiceWeekly} Ses İstatistiği\`
  ${ses} __Günlük Ses__ \`${voiceDaily} Ses İstatistiği\`
  
  ${nokta} Sunucusunun genel sohbet ( \`mesaj\`) sıralaması listelenmektedir
  
  ${mesaj} __Toplam Mesaj__ \`${messageData ? messageData.topStat : 0} Mesaj İstatistiği\`
  ${mesaj} __Haftalık Mesaj__ \`${Number(messageWeekly).toLocaleString()} Mesaj İstatistiği\`
  ${mesaj} __Günlük Mesaj__ \`${Number(messageDaily).toLocaleString()} Mesaj İstatistiği\`
  
  ${nokta} Aşağıda ${member} kullanıcısının detaylı ( \`Yayın\`) bilgileri. 
  
  **❯ Detaylı Yayın Bilgisi**
  ${Active6.length ? `${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}` : 'Yayın bilgisi bulunmamaktadır.'}`)
  .setImage('attachment://ramal.png'); // Embed'e görseli ekliyoruz ve dosya adını belirtiyoruz
  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ramal.png'});
  
  ////////////////
      message.reply({ embeds: [embeds], files: [attachment], })
  }
  }