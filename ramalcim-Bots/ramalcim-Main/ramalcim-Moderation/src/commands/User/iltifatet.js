module.exports = {
    conf: {
      aliases: ["iltifatet","iltifat"],
      name: "iltifat",
      help: "iltifat"
    },
  
    run: async (client, message, args, embed) => {

        const girlNames = ['Seni gören kelebekler, narinliğin karşısında mest olur','Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.'];
        const boyNames = ['Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.'];
    
    
        const gender = Math.random() < 0.5 ? 'Kız' : 'Erkek'; // Rastgele bir cinsiyet seçimi
    
        let randomName;
     
     if (gender === 'Kız') {
       randomName = girlNames[Math.floor(Math.random() * girlNames.length)];
       // Kız çocuğu isteği mesajı
     } else {
       randomName = boyNames[Math.floor(Math.random() * boyNames.length)];
       // Erkek çocuğu isteği mesajı
     }

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!member) {
            return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
        }
    
if(!member) return message.reply({ content: 'Hangi Bebeğe İlgi Vereyim'})
message.reply({content:`${member} **${randomName}**`})
},
  };
