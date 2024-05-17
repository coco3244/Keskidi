const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
let Channels = [];
let Started = false;

module.exports = {
  name: "autotrad",
  description: "Autotrad du channel",
  permissions: "Aucune",
  dm: false,
  category: "Action",

  run(bot, message) {
    const listener =  (msg) => {
      if (
        msg.author.id != bot.user.id &&
        Channels.includes(msg.channel.id) &&
        msg.content.length <= 2000
      ) {
        translate(msg.content, { to: "fr" })
          .then(async (res) => {
            if (res.from.language.iso.toLowerCase() == "fr") {
              return;
            } else {
              const thread = await msg.startThread({
                name:'Traduction',
                autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneHour,
              })
              thread.send({content: `Réponse : \`\`\`${res.text}\`\`\``})
              return
            }
          })
          .catch(async (err) => {
            const thread = await msg.startThread({
              name:'Traduction (Erreur)',
              autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneHour,
            })
            thread.send({content: `Réponse : \`\`\`${err}\`\`\``})
              return
          });
      }
    };
    
    if (!Channels.includes(message.channel.id)) {
      Channels.push(message.channel.id);
      if (!Started) {
        bot.on("messageCreate", listener);
        Started=true;
      }
      return message.reply({ content: "Auto trad activée sur ce cannal" });
    } else {
      console.log(Channels);
      Channels.splice(Channels.indexOf(message.channel.id));
      return message.reply({ content: "Auto trad désactivée sur ce cannal" });
    }
  },
};
