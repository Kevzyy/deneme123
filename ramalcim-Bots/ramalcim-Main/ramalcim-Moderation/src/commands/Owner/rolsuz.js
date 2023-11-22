const Discord = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const conf = require("../../../../src/configs/sunucuayar.json")

module.exports = {
  conf: {
    aliases: ["rolsuz","rolsüz"],
    name: "rolsuz",
    help: "rolsüz ver",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    let ramalcim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      ramalcim.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send({ embeds: [embed.setDescription("Sunucuda rolü olmayan \`"+ ramalcim.size +"\` kişiye kayıtsız rolü verildi!")] });
    } else if(!args[0]) {
    message.channel.send({ embeds: [embed.setDescription("Sunucumuzda rolü olmayan \`"+ ramalcim.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")] });   
}
  },
};
 