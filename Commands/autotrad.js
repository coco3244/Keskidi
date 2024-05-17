const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
let Channels = [];

module.exports = {
  name: "autotrad",
  description: "Autotrad du channel",
  permissions: "Aucune",
  dm: false,
  category: "Action",

  run(bot, message) {
    const listener = (msg) => {
      if (
        msg.author.id != bot.user.id &&
        Channels.includes(msg.channel.id) &&
        msg.content.length <= 2000
      ) {
        
        translate(msg.content, { to: "fr" })
          .then((res) => {
            if (res.from.language.iso.toLowerCase() == "fr") {
              return;
            } else {
              return msg.reply({
                content: `Réponse : \`\`\`${res.text}\`\`\``,
              });
            }
          })
          .catch((err) => {
            return msg.reply({
              content: `Une erreur est survenue : \`\`\`${err}\`\`\``,
            });
          });
      }
    };

    if (!Channels.includes(message.channel.id)) {
      Channels.push(message.channel.id);
      if (Channels.length == 1) {
        bot.on("messageCreate", listener);
      }
      return message.reply({ content: "Auto trad activée sur ce cannal" });
    } else {
      Channels.splice(Channels.indexOf(message.channel.id));
      return message.reply({ content: "Auto trad désactivée sur ce cannal" });
    }
  },
};
