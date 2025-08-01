const Discord = require("discord.js");

const headers = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (compatible; MyDiscordBot/1.0)",
};

const nomsFrancais = {
  en: "Anglais",
  fr: "Français",
  es: "Espagnol",
  it: "Italien",
  de: "Allemand",
};

module.exports = {
  name: "langues",
  description: "Liste des langues disponibles",
  permissions: "Aucune",
  dm: true,
  category: "Action",

  run(bot, message, args) {
    fetch("https://trad.nmgc.ovh/languages")
      .then((response) => response.json())
      .then((langs) => {
        let result = "";
        langs.forEach((lang) => {    
          if(lang.code!="fr") {
            result+=nomsFrancais[lang.code]||lang.name;
            result+=`\n`;
            console.log(result);
          }    
        });
        console.log("final : \n"+result);

        return message
          .reply({
            content: `Langues dispo: \`\`\`\n${result}\`\`\``,
            ephemeral: true,
          })
      })
      .catch((err) => {
        return message.reply({
          content: `Une erreur est survenue : \`\`\`${err}\`\`\``,
          ephemeral: true,
        });
      });
  },
};
