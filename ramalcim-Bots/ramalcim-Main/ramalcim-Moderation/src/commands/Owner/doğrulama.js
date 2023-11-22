const { Discord } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json");
const { ramal_Yes, red, Jail } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["hızlıgrş","doğrulamak"],
    name: "doğrulama",
    help: "doğrulama (Botun Rol Vermediği Kişilerin Rol Alabilmesini Sağlar)",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    message.channel.send({ content: `
**Merhaba Kullanıcı;**

Sunucumuza Şuan Çok Hızlı Giriş İşlemi Yapıldığı İçin Rol Dağıtımı Durduruldu.Aşşağıdaki Burona Tıklayarak Bot Hesap Olmadığını Doğrulayıp Sunucuda Gerekli Rollerini Alabilirsin.Eğer Yanlış Bir Durum Olduğunu Düşünüyorsan Sağ Taraftaki Yetkililere Yazmaktan Çekinme!

Eğer Bu Kanalı Anlık Olarak Gördüysen Kayıt İşlemine **Register** Bu Kanaldan Devam Edebilirsin

İyi Günler Dileriz.

**${message.guild.name}**
`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 3, "custom_id": "Doğrula", "label": "Doğrula"},

          ]
        }]
      }
    )
  }
}

client.on('interactionCreate', async interaction => {

  if (interaction.customId === "Doğrula") {
    await interaction.reply({ content: `Doğrulama Başarılı Teyit Kanallarına Yönlendiriliyorsunuz.`, ephemeral: true });
    await interaction.member.roles.set(conf.unregRoles)
}
})