const conf = require("../../../../src/configs/sunucuayar.json")
const { red, ramal_Yes} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../../../Global/Settings/Bot-Commands")
const { PermissionsBitField } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["boost"],
      name: "zengin",
      help: "zengin",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    
    if (!message.member.manag) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
  
    let booster = conf.boosterRolu || undefined;
    if(!booster) 
    {
    message.react(red)
    message.reply({ content:"Booster Rolu Bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!message.member.roles.cache.has(booster)) 
    {
    message.react(red)
    message.reply({ content:"Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if(!isim) 
    {
    message.react(red)
    message.reply({ content:"Geçerli bir isim belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    message.react(ramal_Yes)
let ramal = new EmbedBuilder()
.setDescription(`Başarıyla ismini \`${yazilacakIsim}\` olarak değiştirdim! ${ramal_Yes}`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })

message.channel.send({ embeds: [ramal] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
},
  };
  
  