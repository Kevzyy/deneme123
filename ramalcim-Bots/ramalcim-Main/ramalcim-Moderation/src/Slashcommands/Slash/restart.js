const { SlashCommandBuilder, hyperlink, EmbedBuilder, IntegrationApplication } = require("discord.js");
const ramalcim = require("../../../../../../Global/BotSettings/Settings")
const children = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Moderasyon Botunu yeniden başlatmaya yarar."),

  async execute(interaction, client) {
   if(!ramalcim.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kullanamazsın.", ephemeral: true })
    }
await interaction.reply({ content: `__**Bot**__ yeniden başlatılıyor!`, ephemeral: true });
children.exec(`pm2 restart ${ramalcim.GuildName}_Voucher ${ramalcim.GuildName}_Statistics ${ramalcim.GuildName}_Guard_I ${ramalcim.GuildName}_Guard_II ${ramalcim.GuildName}_Guard_III ${ramalcim.GuildName}_Moderation`);
}
};