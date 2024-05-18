const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
let Channels = [];
let Started = false;

module.exports = {
  name: "autotrad",
  description: "Auto-traduction du canal dans le quel la commande a été exécutée",
  permissions: "Aucune",
  dm: false,
  category: "Action",

  run(bot, message) {
    const listener = async (msg) => {
      if (
        msg.author.id != bot.user.id &&
        Channels.includes(msg.channel.id) &&
        msg.content.length <= 2000
      ) {
        let Thread
        await translate(msg.content, { to: "fr" })
          .then(async (res) => {
            if (res.from.language.iso.toLowerCase() == "fr") {
              return;
            } else {
              Thread = await msg.startThread({
                name: "Traduction",
                autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneHour,
              });
              await Thread.send({ content: `${res.text}`});
              return;
            }
          })
          .catch( async(err) => {
            if(Thread==null){
              Thread = await msg.startThread({
                name: "Traduction (Erreur)",
                autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneHour,
              });
            }else{
              await Thread.setName("Traduction (Erreur)")
            }
            if(err.code==50035 && err.rawError.errors.content._errors[0].code == "BASE_TYPE_MAX_LENGTH"){
              await Thread.send({ content: `\`\`\`Le message fait plus de 2000 caractères et n'a donc pas pu être traduit\nUtilises /tmc et découpe le message en 2 parties (ou plus au besoin) si tu veux connaitre sa traduction\`\`\`` });
            }else{
              await Thread.send({ content: `\`\`\`${err}\`\`\`` });
            }
            return;
          });
      }
    };

    if (!Channels.includes(message.channel.id)) {
      Channels.push(message.channel.id);
      if (!Started) {
        bot.on("messageCreate", listener);
        Started = true;
      }
      return message.reply({ content: "Auto trad activée sur ce canal" });
    } else {
      console.log(Channels);
      Channels.splice(Channels.indexOf(message.channel.id));
      return message.reply({ content: "Auto trad désactivée sur ce canal" });
    }
  },
};
