const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "tmc",
  description: "Traduit Moi Ça - Prend du texte et le traduit en français",
  permissions: "Aucune",
  dm: true,
  category: "Action",
  options: [
    {
      type: "string",
      name: "texte",
      description: "Le texte à traduire inférieur à 2000 caractères",
      required: true,
      autocomplete: false,
    },
  ],

  run(bot, message, args) {
    const txt = args.getString("texte").toLowerCase();
    if (txt.length < 2)
      return message.reply({ content: "C'est ptète un peu court là, non ?" });
    if (txt.length > 2000)
      return message.reply({
        content: "C'est limité à 2000 caractères par trad, c'est con :/",
      });

    translate(txt, { to: "fr" })
      .then((res) => {
        if (res.from.language.iso.toLowerCase() == "fr") {
          return message.reply({
            content: `C'est déja du français, Andouille !!`,
          });
        }
        if (res.from.autoCorrected) {
          return message
            .reply({
              content: `Apparement tu sais pas écrire ou t'as copié/collé de la merde du coup j'ai corrigé le texte en : \n 
                \`\`\`${res.from.text.value}\`\`\`              
                `,
            })
            .then(() => {
              message.followUp({
                content: `Et je l'ai traduit en : \n
                  \`\`\`${res.text}\`\`\``,
              });
            });
        } else {
          return message
            .reply({
              content: `Texte à traduire : \`\`\`${txt}\`\`\``,
            })
            .then(() => {
              message.followUp({
                content: `Réponse : \`\`\`${res.text}\`\`\``,
              });
            });
        }
      })
      .catch((err) => {
        return message.reply({
          content: `Une erreur est survenue : \`\`\`${err}\`\`\``,
        });
      });
  },
};
