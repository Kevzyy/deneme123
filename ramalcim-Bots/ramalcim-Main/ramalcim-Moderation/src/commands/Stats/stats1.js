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
const { loadImage } = require("canvas")
const { join } = require("path")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const client = global.bot;
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
const Seens = require("../../../../../../Global/schemas/seens")
module.exports = {
    conf: {
      aliases: ["me1","stat11"],
      name: "stat1",
      help: "stat1",
      category: "stat",
    },
  
    run: async (client, message, args, prefix) => {
        
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      await client.guilds.cache.get(ramalcim.GuildID).members.fetch(member.user.id)
      let background = await loadImage("https://cdn.discordapp.com/attachments/1009804086293565501/1173063521941078016/canvasramal.jpg?ex=6562978a&is=6550228a&hm=3c5260c696fa228c6ed78dd87ed1e419e14f867a8022072dfe18456450551811&");
      let loading = await message.reply(`**${target.user.tag}** isimli kullanıcının verileri yükleniyor. Lütfen bekleyin!`)
      
      const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
      const total = inviterData ? inviterData.total : 0;
      const regular = inviterData ? inviterData.regular : 0;
      const bonus = inviterData ? inviterData.bonus : 0;
      const leave = inviterData ? inviterData.leave : 0;
      const fake = inviterData ? inviterData.fake : 0;
      const invMember = await inviterMember.find({ guildID: message.guild.id, inviter: member.user.id });
      const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
      const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
  
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


          let avatar = await loadImage(target.user.displayAvatarURL({ extension: "jpg"  }));

          let canvas = Canvas.createCanvas(1190, 666),
          
          
          kart_resim = canvas.getContext("2d");""
          kart_resim.drawImage(background, 0, 0, 1190, 666)
          kart_resim.drawImage(avatar, 23, 15, 198, 198)
          
          kart_resim.font = '45px "Marlin Geo Black"';
          let uname = target.user.username;
          if (uname.length > 5) {
            uname = uname.slice(0, 5);
          }
          kart_resim.fillText(`${target.user.tag.replace("ş","s").replace("Ş","S").replace("İ","I").replace("ı","i").replace("Ç","C").replace("ç","c").replace("Ğ","G").replace("ğ","g").replace("Ö","O").replace("ö","ö")}`, String(target.user.tag).length > 9 ? String(target.user.tag).length > 12 ? 240 :  260 : 280 , 110, 350)
          
          let baslangic = 315

          let status = target?.presence?.status ? target?.presence?.status?.toString().replace("dnd", `DND Etmeyin`).replace("online", `ONLİNE`).replace("idle", `IDLE`).replace("offline", `OFFLİNE`) : `OFFLİNE`

  
          const members = message.guild.members.cache.filter(x => !x.user.bot).sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
          const joinPos = members.map((u) => u.id).indexOf(target.id);
    

    kart_resim.font = '20px Bold';
    kart_resim.fillText(`Veri Alınamadı.`, 675, 80, 200)
   kart_resim.fillText(`Veri Alınamadı.`, 675, 143, 200)
   kart_resim.fillText(`0 Beğeni.`, 955, 80, 200)
   kart_resim.fillText(`0 Takipçi.`, 955, 143, 200)
   kart_resim.font = '20px Bold';
   kart_resim.fillText(`${messageData ? messageData.topStat : 0} MESAJ`, 80, 345, 200)
   kart_resim.fillText(`${moment.duration(yayındata ? yayındata.topStat : 0).format("H [sa], m [dk]")}`, 80, 410, 200)
   kart_resim.fillText(`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}`, 80 * 4 + 45, 345, 200)
   kart_resim.fillText(`Ayarlancak AFK`, 80 * 4 + 45, 410, 200)
   kart_resim.fillText(`${Number(messageWeekly).toLocaleString()} MESAJ`, 670, 345, 200)
   kart_resim.fillText(`Veri Bulunmadı.`, 670, 410, 200)
   kart_resim.fillText(`${voiceWeekly}`, 955, 345, 200)
   kart_resim.fillText(`Ayarlanıcak AFK`, 955, 410, 200)
   kart_resim.font = '20px Bold';
   kart_resim.fillText(`KATILIM: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <=target.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}`, 670, 567, 180)
   kart_resim.font = '20px Bold';
   kart_resim.fillText(`Veri Alınamadı.`, 670, 632, 200)
   kart_resim.font = '20px Bold';
   kart_resim.fillText(`vericikk`, 955, 567, 200)
   kart_resim.fillText(`veriiilaa`, 955, 632, 200)
   kart_resim.font = '20px Bold';
   kart_resim.font = '20px Bold';
   kart_resim.fillText(``, 80, 345 + 222, 200)
   kart_resim.fillText(`Veri Alınamadı.`, 80, 410 + 223, 200)
   kart_resim.fillText(`Ses Ayarlancak`, 80 * 4 + 45, 345 + 222, 200)
   kart_resim.fillText(`Tip: ${status}`, 80 * 4 + 45, 410 + 223, 200)

  const yazı2 = [] 
  if(member.user.username.length > 8) {
    let yarrak = member.user.username.slice(0, 8)
     yazı2.push(`${yarrak}...`)  
        } else {
    yazı2.push(`${member.user.tag}`)
            }



  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ramal.png'});
  
  ////////////////
  message.channel.send({ files: [attachment] })  }
  
        }
    