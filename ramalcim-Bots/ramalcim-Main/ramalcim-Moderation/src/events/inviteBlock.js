const moment = require("moment");
moment.locale("tr");
const { Discord, EmbedBuilder } = require("discord.js");
const snipe = require("../../../../../Global/schemas/snipe");
const conf = require("../../../src/configs/sunucuayar.json");
const client = global.bot;

module.exports = async (message) => {
  if (message.author.bot) return;

        const inviteEngel = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;


            if (message.content.match(inviteEngel)) {
                const invites = await message.guild.invites.fetch();
                if ((message.guild.vanityURLCode && message.content.match(inviteEngel).some((i) => i === message.guild.vanityURLCode)) || invites.some((x) => message.content.match(inviteEngel).some((i) => i === x))) return;
                if (message.deletable) message.delete().catch(err => { })
                message.channel.send({ content: `${message.member} Reklam Yapamazsın Dostum!` }).sil(3)
                if (message.guild.channels.cache.find(x => x.name == "chat-log")) message.guild.findChannel("chat-log").send({
                    embeds: [new EmbedBuilder().setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true, size: 1024 }) }).setThumbnail(message.author.avatarURL()).setDescription(`
Sunucuda bir reklam tespit edildi ve mesaj ${message.deletable ? "başarıyla silindi!" : "malesef silinemedi!"}

Reklamı atan kişi: ${message.member} [${message.author.tag}] (\`${message.member.id}\`)
Reklamın atıldığı kanal: ${message.channel} [${message.channel.name}] (\`${message.channel.id}\`)
Reklam içeriği ;
\`\`\`${message.content}\`\`\`
                `)]
                })
            }

        }
    


module.exports.conf = {
    name: "messageCreate",
  };

