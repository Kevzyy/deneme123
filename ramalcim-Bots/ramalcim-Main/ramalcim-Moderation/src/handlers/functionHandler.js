const penals = require("../../../../../Global/schemas/penals");
const { GuildMember, TextChannel, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const client = global.bot;
const ramalcim = require("../../../../../Global/BotSettings/Settings")
const tasks = require("../../../../../Global/schemas/task")
module.exports = function (client) {
  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.bans.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  TextChannel.prototype.sendEmbed = function (embed) {
    if (!embed || !embed.description) return;
    const text = embed.description;
    for (var i = 0; i < Math.floor(text.length / 2048) + 1; i++) {
      this.send(embed.setDescription(text.slice(i * 2048, (i + 1) * 2048)));
    }
  };
  
  TextChannel.prototype.wsend = async function (message) {
    const hooks = await this.fetchWebhooks();
    let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
    if (webhook) return webhook.send(message);
    webhook = await this.createWebhook({ name: client.user.username, avatar: client.user.avatarURL() });
    return webhook.send(message);
  };

  TextChannel.prototype.error = async function (message, text) {
    const ramal = await client.users.fetch("962417173043753022");
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setFooter({ text: "ramalcim & " + message.guild.name, iconURL: ramal.avatarURL({ dynamic: true })});
    this.send(embed.setDescription(text)).then((x) => { if (x.deletable) x.delete({ timeout: 10000 }); });
  };

  Discord.GuildMember.prototype.updateTask = async function (guildID, type, data, channel = null) {
    const coins = require('../../../../../Global/schemas/coin')
    const taskData = await tasks.find({ guildID, userID: this.user.id, type, active: true });
    taskData.forEach(async (x) => {
      if (channel && x.channels && x.channels.some((x) => x !== channel.id)) return; x.completedCount += data;
      if (x.completedCount >= x.count) {
        x.active = false; x.completed = true;
        await coins.updateOne({ guildID, userID: this.user.id }, { $inc: { coin: x.prizeCount } }, { upsert: true })
        const guilds = client.guilds.cache.get(guildID)
  guilds.channels.cache.find(x => x.name == 'gorev-log').send({content: `${this.toString()} Tebrikler! ${type.charAt(0).toLocaleUpperCase() + type.slice(1)} görevini başarılı bir şekilde tamamladın!\n\nGörev: ${x.message}\nKazanılan Puan : **${x.prizeCount}**`})
      }
      await x.save();
    });
  };      


  client.penalize = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
    let id = await penals.find({ guildID });
    id = id ? id.length + 1 : 1;
    return await new penals({ id, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
  };

  GuildMember.prototype.hasRole = function (role, every = true) {
    return (Array.isArray(role) && (every && role.every((x) => this.roles.cache.has(x)) || !every && role.some((x) => this.roles.cache.has(x))) || !Array.isArray(role) && this.roles.cache.has(role))
  };

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };

  const Bots = require("../../../../ramalcim-Guard/Backup")

  client.giveBot = async (length) => {
    if (length > Bots.length) length = Bots.length;
    let availableBots = Bots.filter(e => !e.Busy);
    if (availableBots.length <= 0) availableBots = Bots.sort((x, y) => x.Uj - y.Uj).slice(0, length);

    return availableBots;
  };

  client.processBot = async (bot, busy, job, equal = false) => {
    bot.Busy = busy;
    if (equal) bot.Uj = job;
    else bot.Uj += job;

    let index = Bots.findIndex(e => e.user.id == bot.user.id);
    Bots[index] = bot;
  };

  client.getClients = async (count) => {
    return Bots.slice(0, count);
  };

  client.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
};
