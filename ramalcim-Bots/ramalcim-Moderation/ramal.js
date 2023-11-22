const { Client, Collection, GatewayIntentBits, Partials, InteractionType } = require("discord.js");
const client = global.bot = new Client({ fetchAllMembers: true, intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});

const Discord = require('discord.js');
const conf = require("../src/configs/sunucuayar.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
const moment = global.moment = require("moment");
const { Database } = require("ark.db");
const ramaldb = (global.ramalsetupxd = new Database("../src/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("../src/configs/emojis.json"));
const rankdb = (global.rankdb = new Database("../src/configs/ranks.json"));
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
const ramalcim = require("../../../Global/BotSettings/Settings")
const Seens = require("../../../Global/schemas/seens")
const system = global.system = require("../../../Global/BotSettings/Settings");
const settings = global.settings = require("../../../Global/BotSettings/Settings");
const mongoose = require("mongoose");
const ramalcik = require("../../../Global/BotSettings/Settings")

const sorunlog = client.channels.cache.find(x => x.name == "sorun_log");
const onerilog = client.channels.cache.find(x => x.name == "öneri_log");
const ytbasvuru = client.channels.cache.find(x => x.name == "yetkili_başvuru_log");


//MONGO BAGLANMA NOKTASI
mongoose.set('strictQuery', true);
mongoose.connect(ramalcik.DatabaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});
mongoose.connection.on("error", () => {
  console.error("Error Databaseye Bağlanamadı!");
});


// KOMUT ÇALIŞTIRMA BEBEİM
const commandDirectory = './src/commands/';

fs.readdir(commandDirectory, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`[ramal] Toplam ${files.length} klasör bulundu.`);

  files.forEach(directory => {
    fs.readdir(`${commandDirectory}${directory}`, (err2, files2) => {
      if (err2) {
        console.error(err2);
        return;
      }

      files2.forEach(file => {
        const commandPath = `${commandDirectory}${directory}/${file}`;
        const command = require(commandPath);

        console.log(`[Moderation] ${command.conf.name} komutu yüklendi!`);

        client.commands.set(command.conf.name, command);

        command.conf.aliases.forEach(alias => {
          client.aliases.set(alias, command.conf.name);
        });
      });
    });
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(ramalcim.Main.ModerationToken)
  .then(() => console.log("Moderation Online!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


  
  ///// slash commands
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync('./src/Slashcommands/').forEach(async category => {
		const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for (const command of commands) {
		const Command = require(`./src/Slashcommands/${category}/${command}`);
    client.slashcommands.set(Command.data.name, Command);
    slashcommands.push(Command.data.toJSON());
		}
	});
  
	const rest = new REST({ version: '10' }).setToken(ramalcim.Main.ModerationToken);
  (async () => {
	try {
		console.log('[ramal] Slash ve Komutlar yükleniyor.');
		await rest.put(
			Routes.applicationGuildCommands(ramalcim.Main.BotClientID, ramalcim.GuildID),
			{ body: slashcommands },
		).then(() => {
			console.log('[ramal] Slash ve Context Komutlar yüklendi.');
		});
	}
	catch (e) {
		console.error(e);
	}
})();


client.setMaxListeners(0)

client.on('interactionCreate', (interaction) => {
if (interaction.type == InteractionType.ApplicationCommand) {
if(interaction.user.bot) return;
try {
const command = client.slashcommands.get(interaction.commandName)
command.execute(interaction, client)
if (!interaction.inGuild() && interaction.isCommand()) return x.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
} catch {
interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
}}
});

const bots = global.allbots = [];
let tkn = []

const xd = [
    ramalcim.Main.ModerationToken,
    ramalcim.Main.RegisterToken,
    ramalcim.Main.StatsToken,
    ramalcim.Guard.Token.Guard_I,
    ramalcim.Guard.Token.Guard_II,
    ramalcim.Guard.Token.Guard_III
];
xd.forEach(xxx => 
tkn.push(xxx)
)
ramalcim.Guard.Token.Dağıtıcı.forEach(xx => 
tkn.push(xx)
)

if(ramalcim.Welcome.Active) {
ramalcim.Welcome.Tokens.forEach(x => 
tkn.push(x)
)
}
tkn.forEach(async (token) => {
  const botClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
      presence: {
          status: "invisible",
      },
  });

  botClient.on("ready", async () => {
      bots.push(botClient);
  });

  await botClient.login(token);

  client.on("messageCreate", async (message) => {
    if(message.webhookId || message.author.bot || message.channel.type === "dm" || !message.guild || ramalcim.Main.prefix.some(x => message.content.startsWith(x))) return;
    await Seens.updateOne({userID: message.author.id}, {$set: {
        "lastSeen": Date.now(),
        "lastMessage": Date.now(),
        "last": {
            type: "MESSAGE",
            date: Date.now(),
            channel: message.channel.id,
            text: message.content ? message.content : "İçerik Bulunamadı!",
        }
      }
    }
    )
  }
  )
}
)

///////////////Fonksiyon//////////////
Discord.Collection.prototype.array = function () {
  return [...this.values()]
}

Discord.Collection.prototype.array = function () {
  return [...this.values()]
};

Discord.Guild.prototype.findChannel = function (chanelName) {
  let channel = this.channels.cache.find(k => k.name === chanelName)
  return channel;
}

Array.prototype.random = function() {
  return this[(Math.floor(Math.random()*this.length))];
};  

Discord.Guild.prototype.emojiGöster = function(content) {
  let emoji = client.emojis.cache.find(e => e.name === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.name === content)
  if(!emoji) return;
  return emoji;
}
Discord.Guild.prototype.kanalBul = function(content) {
  let kanal = client.channels.cache.find(e => e.name === content) || client.channels.cache.find(e => e.id === content) || client.channels.cache.find(e => e.id === content) || client.channels.cache.find(e => e.name === content)
  if(!kanal) return;
  return kanal;
}

Promise.prototype.sil = function (time) {
  if (this) this.then(s => {
      if (s.deletable) {
          setTimeout(async () => {
              s.delete().catch(e => { });
          }, time * 1000)
      }
  });
};  

Discord.GuildMember.prototype.hasRole = function (role, every = true) {
return (Array.isArray(role) && (every && role.every((x) => this.roles.cache.has(x)) || !every && role.some((x) => this.roles.cache.has(x))) || !Array.isArray(role) && this.roles.cache.has(role))
};

const closeYt = global.closeYt = async function () {
  const { guildPerms } = require("../../../Global/schemas/guildPerms");
  let arr = [];
  let sunucu = client.guilds.cache.get(ramalcim.GuildID);
  if (!sunucu) return;
  const yetkiPermleri = [Discord.PermissionsBitField.Flags.Administrator, Discord.PermissionsBitField.Flags.ManageRoles, Discord.PermissionsBitField.Flags.ManageChannels, Discord.PermissionsBitField.Flags.ManageGuild, Discord.PermissionsBitField.Flags.BanMembers, Discord.PermissionsBitField.Flags.KickMembers]
  sunucu.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => {
    arr.push({ rol: rol.id, perm: rol.permissions.bitfield.toString().replace('n', '') });
  });

  //Bu Ayarlanacak Daha Yetki Acma Kapama
  try {
    const existingData = await guildPerms.findOne({ guildID: ramalcim.GuildID }).exec();
    if (existingData) {
      existingData.roller = arr;
      await existingData.save();
    } else {
      const newData = new guildPerms({ guildID: ramalcim.GuildID, roller: arr });
      await newData.save();
    }

    sunucu.roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => {
      await rol.setPermissions(0n);
    });
  } catch (err) {
    console.error("Veritabanı hatası:", err);
  }
}

let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;

const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
    return tarihci;
};

const kalanzaman = global.kalanzaman = function(tarih) {
    return moment.duration((tarih - Date.now())).format('H [Saat,] m [Dakika,] s [Saniye]');
}

const timeTag = global.timeTag = function(date) {
    date = String(date)
    date = date.replace("000", "")
    return `<t:${Number(date)}:R>`;
}

const tarihhesapla = global.tarihHesapla = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
    string = string.trim();
    return `\`${string} önce\``;
};

client.on("guildMemberAdd", member => {
  let toplamüye = member.guild.memberCount
  const anansikerim = client.channels.cache.find(x => x.name == "giris_cikis_log");
  anansikerim.send(`:inbox_tray: ${member.user} (\`${member.user.id}\`) katıldı. (\`${toplamüye}\`) kişi olduk.`)
})

client.on("guildMemberRemove", member => {
  let toplamüye = member.guild.memberCount
  const ramalile31keyfi = client.channels.cache.find(x => x.name == "giris_cikis_log");
  ramalile31keyfi.send(`:outbox_tray: ${member.user} (\`${member.user.id}\`) ayrıldı. (\`${toplamüye}\`) kişi olduk.`)
})


const { EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ActionRow } = require("discord.js")
client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuruu') {
  
    const modal = new ModalBuilder()
    .setCustomId("ybasvuruu")
    .setTitle("Sorunları İlet")
    const sorunne = new TextInputBuilder()
    .setCustomId("sorunne")
    .setMinLength(10)
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: Kevzyy 20")
    .setStyle(TextInputStyle.Short);
    
    
    const AOne = new ActionRowBuilder().addComponents(sorunne);
    
    modal.addComponents(AOne);
    await interaction.showModal(modal);
    
    
      }
  


if (interaction.customId === 'sorun') {
  
  const modal = new ModalBuilder()
  .setCustomId("sorunilett")
  .setTitle("Sorunları İlet")
  const sorunne = new TextInputBuilder()
  .setCustomId("sorunne")
  .setMinLength(10)
  .setLabel(`Sorunu Anlatır Mısın?`)
  .setPlaceholder("İsim ve yaşınızı giriniz. Örn: Kevzyy 20")
  .setStyle(TextInputStyle.Paragraph);
  
  
  const AOne = new ActionRowBuilder().addComponents(sorunne);
  
  modal.addComponents(AOne);
  await interaction.showModal(modal);
  
  
    }



if(interaction.customId === 'sorunilett'){
  const s1 = interaction.fields.getTextInputValue('sorunne');
  await interaction.reply({ content: `Sorunun Başarıyla kurucularımıza iletildi.`, ephemeral: true });
  let embed = new EmbedBuilder()
  .setDescription(`hey ${interaction.member} adlı üye bir sorununu belirtti.\n`)
  embed.addFields([{name: `Üye Bilgileri;`,value: `${interaction.member} - (\`${interaction.member.id}\`)`,}])  
  embed.addFields([{name: `Sorunu;`,value: `${s1}`,}])  

  await client.channels.cache.get("1171937080067231764").send({embeds: [embed]})

  if(interaction.customId === 'ybasvuru'){
    const s1 = interaction.fields.getTextInputValue('soru1');
    const s2 = interaction.fields.getTextInputValue('soru2');
    const s3 = interaction.fields.getTextInputValue('soru3');
    const s4 = interaction.fields.getTextInputValue('soru4');
    const s5 = interaction.fields.getTextInputValue('soru5');
    await interaction.reply({ content: `Sorunun Başarıyla kurucularımıza iletildi.`, ephemeral: true });
    let embed = new EmbedBuilder()
    .setDescription(`hey ${interaction.member} adlı üye bir sorununu belirtti.\n`)
    embed.addFields([{name: `Üye Bilgileri;`,value: `${interaction.member} - (\`${interaction.member.id}\`)`,}])  
    embed.addFields([{name: `İsim Yaş`,value: `${s1}`,}])
    embed.addFields([{name: `Discorda ne kadar süre ayıyabilirsin?`,value: `${s2}`,}])  
    embed.addFields([{name: `Okuma Çalışma durumun?`,value: `${s3}`,}])  
    embed.addFields([{name: `Sunucumuza neler katabilirsin?`,value: `${s4}`,}])  
    embed.addFields([{name: `Sunucumuzda daha önceden yetkili oldun mu?`,value: `${s5}`,}])  
  
    await sorunlog.send({embeds: [embed]})
}
}
}
)

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuru') {
  
    const modal = new ModalBuilder()
    .setCustomId("sorunilettt")
    .setTitle("Sorunları İlet")
    const soru1 = new TextInputBuilder()
    .setCustomId("soru1")
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: Kevzyy 20ss")
    .setStyle(TextInputStyle.Short);
    const soru2 = new TextInputBuilder()
    .setCustomId("soru2")
    .setLabel(`Discorda ne kadar süre ayıyabilirsin?`)
    .setPlaceholder(`Örnek: Günlük 3 Saat`)
    .setStyle(TextInputStyle.Short);
    const soru3 = new TextInputBuilder()
    .setCustomId("soru3")
    .setLabel(`Daha önce yetkili oldunuz mu?`)
    .setPlaceholder(`Evet Veya Hayır`)
    .setStyle(TextInputStyle.Short);
    const soru4 = new TextInputBuilder()
    .setCustomId("soru4")
    .setMinLength(10)
    .setLabel(`Neden Yetkili Olmak?`)
    .setPlaceholder(`Bize Neler Kata Bilirsin`)
    .setStyle(TextInputStyle.Paragraph);
    
    
    const AOne = new ActionRowBuilder().addComponents(soru1);
    const soru22 = new ActionRowBuilder().addComponents(soru2);
    const soru33 = new ActionRowBuilder().addComponents(soru3);
    const soru44 = new ActionRowBuilder().addComponents(soru4);
    
    modal.addComponents(AOne, soru22, soru33, soru44);
    await interaction.showModal(modal);
    
    
      }
  
  
  
  if(interaction.customId === 'sorunilettt'){
    const s1 = interaction.fields.getTextInputValue('soru1');
    const s2 = interaction.fields.getTextInputValue('soru2');
    const s3 = interaction.fields.getTextInputValue('soru3');
    const s4 = interaction.fields.getTextInputValue('soru4');
    await interaction.reply({ content: `Yetkili Başvurunuz yöneticilere iletildi.`, ephemeral: true });
    let embed = new EmbedBuilder()
    .setDescription(`:tada: **Yeni Yetkili Başvurusu** :tada:
    \`❯\` **__Kullanıcı Hakkında__**
    \`•\` **Kullanıcı:** ${interaction.member}
    \`•\` **ID:** (\`${interaction.member.id}\`)
    
    \`❯\` **__Başvuru Detayı__**

    \`•\` **İsim Ve Yaş:** ${s1}
    
    \`•\` **Discordda ne kadar aktifsin:** ${s2}
    
    \`•\` **Daha önce yetkili oldun mu:** ${s3}
    
    \`•\` **Neden Yetkili Olmak istiyorsun:**
    
    ${s4}`)

  
    await ytbasvuru.send({embeds: [embed]})
  }
}
)

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.customId === 'ybasvuruu') {
  
    const modal = new ModalBuilder()
    .setCustomId("ybasvuruu")
    .setTitle("Sorunları İlet")
    const sorunne = new TextInputBuilder()
    .setCustomId("sorunne")
    .setMinLength(10)
    .setLabel(`Sorunu Anlatır Mısın?`)
    .setPlaceholder("İsim ve yaşınızı giriniz. Örn: Ramal 20")
    .setStyle(TextInputStyle.Short);
    
    
    const AOne = new ActionRowBuilder().addComponents(sorunne);
    
    modal.addComponents(AOne);
    await interaction.showModal(modal);
    
    
      }
  


if (interaction.customId === 'oneri') {
  
  const modal = new ModalBuilder()
  .setCustomId("onerilet")
  .setTitle("Önerini İlet")
  const sorunnee = new TextInputBuilder()
  .setCustomId("sorunnee")
  .setMinLength(10)
  .setLabel(`Önerini İlete Bilirsin`)
  .setPlaceholder("Örn: Sunucunun Banneri değişin")
  .setStyle(TextInputStyle.Paragraph);
  
  
  const AOne = new ActionRowBuilder().addComponents(sorunnee);
  
  modal.addComponents(AOne);
  await interaction.showModal(modal);
  
  
    }



if(interaction.customId === 'onerilet'){
  const s1 = interaction.fields.getTextInputValue('sorunnee');
  await interaction.reply({ content: `Öneriniz Başarıyla kurucularımıza iletildi.`, ephemeral: true });
  let embed = new EmbedBuilder()
  .setDescription(`:tada: **Yeni Bir Öneri İletildi** :tada:

  **__Kullanıcı Hakkında__**
  **Kullanıcı:** ${interaction.member}
  **ID:** (\`${interaction.member.id}\`)
  
  **Önerisi:** ${s1}`)


  await onerilog.send({embeds: [embed]})
}
}
)