let ramalcim = require('./Global/BotSettings/Settings');

module.exports = {
  apps: [
      {
        name: `${ramalcim.GuildName}_Moderation`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Main/ramalcim-Moderation"
      },
      {
        name: `${ramalcim.GuildName}_Voucher`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Main/ramalcim-Register"
      },
      {
        name: `${ramalcim.GuildName}_Statistics`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Main/ramalcim-Statistics"
      },
      /*{
        name: `${ramalcim.GuildName}_Guard_I`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Guard/Guard_I"
      },
        {
        name: `${ramalcim.GuildName}_Guard_II`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Guard/Guard_II"
      },
      {
        name: `${ramalcim.GuildName}_Guard_III`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Guard/Guard_III"
      }
  /*]

     if(ramalcim.Destek.Active) {
    botcuk.push(
      {
        name: `${ramalcim.GuildName}_Destek`,
        namespace: `${ramalcim.GuildName}`,
        script: 'ramal.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Destek"
      }
    )
  }
  if(ramalcim.Welcome.Active) {
    botcuk.push(
      {
        name: `${ramalcim.GuildName}_Welcomes`,
        namespace: `${ramalcim.GuildName}`,
        script: 'Start.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./ramalcim-Bots/ramalcim-Welcome"
      }
    )
  }*/

  

  
  
  ]
}  
