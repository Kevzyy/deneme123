const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionsBitField, ComponentType } = require('discord.js');
const ayar = require("../../../../../../Global/Settings/Bot-Commands")

module.exports = {
    conf: {
      aliases: ["ysay","yetkilises","sesteolmayan"],
      name: "ysay",
      help: "ysay",
      category: "yönetim",
    },
  
    run: async (client, message, args, embed, durum) => {
      let kanallar = ayar.CommandChannel;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.guild) return;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(red)

 let adamlar = message.guild.members.cache.filter(admin => admin.roles.cache.has("1148657230749642822")).filter(ses => !ses.voice.channel  && ses.presence && ses.presence.status != "offline")


   const row = new ActionRowBuilder()
   .addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('yetkilisay')
        .setPlaceholder('bir işlem seçin!')
            .addOptions([
                { label: 'Yetkili Say', description: 'Sunudaki Seste Olmayan Yetkilileri Listeler', value: '1', emoji: '1033072370593841232' },
                { label: 'Yetkili Dm At', description: 'Sunudaki Seste Olmayan Yetkililere Özelden Mesaj Atar', value: '2', emoji: '1033072859284770836' },
                { label: 'İşlemi İptal Et', description: 'Açılan Menüyü Kapatır', value: '3', emoji: '1033072911210270720' },
            ]),
    );    
      
  

let yy = new EmbedBuilder()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan yetkilileri bilgilendirmek için menüyü kullanabilirsin!
\` 1 \` __Yetkili Say__
\` 2 \` __Yetkili DM At__
\` 3 \` __İşlemi İptal Et!__   
`)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

let msg = await message.channel.send({ components: [row], embeds: [yy] })


const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 1, time: 20000 });
  
collector.on("collect", async (interaction) => {
if(interaction.values[0] === "1") {

    
 interaction.reply(`Sunucumuzda Aktif Olup Seste Olmayan **${adamlar.size}** Yetkili Bulunuyor!\n
\`Yetkililerin Listesi :\`\n${adamlar.map(member => member.toString()).join(`\n`)}`);

        }

if(interaction.values[0] === "2") {

interaction.reply({ content:`**${adamlar.size}** Adet Yetkiliye DM Aracılığı İle Haber Verilmeye Başlandı!`});
      
            let index = 0;
            adamlar.forEach(async member => {

                index += 1;
                await client.wait(index * 1000);
                member.send({ content:`Merhabalar ${member.toString()}! Sunucumuzun Ses Aktifliğini Arttırmak İçin Public Seslere Veya Özel Odalara Geçebilir misin?`}).catch(err => message.channel.send({ content:`${member.toString()} Adlı Yetkiliye DM Aracılığıyla Ulaşamadım,Müsaitsen Public Seslere Veya Özel Odalara Geçebilir misin?`}));
    
                });
        }
if(interaction.values[0] === "3") {
interaction.message.delete()	
message.delete()
   

        }
            
                             
  });
    }
}