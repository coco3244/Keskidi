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
      description: "le texte à traduire",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    const txt = args.getString("texte").toLowerCase();
    if (txt.lenght < 2)
      return message.reply({ content: "C'est ptète un peu court là, non ?" });

    translate(txt, { to: "fr" })
      .then((res) => {
        if (res.from.language.iso.toLowerCase() == "fr") {
            return message.reply({
            content: `Texte à traduire :\`${txt}\` \nRéponse: C'est déja du français, trous de balle !`,
          });
        }
        if (res.from.autoCorrected) {
            return message.reply({
            content: `Apparement du sais pas écrire ou t'as copié/collé de la merde du coup j'ai corrigé le texte en : \n 
                \`${res.from.text.value}\` \n
                Et je l'ai traduit en : \n
                \`${res.text}\`
                `,
          });
        } else {
            return message.reply({ content: `Texte à traduire :\`${txt}\` \nRéponse : \`${res.text}\`` });
        }
      })
      .catch((err) => {
        return message.reply({
          content: `Une erreur est survenue: \`${err}\``,
          ephemeral: true,
        });
        console.error(err);
      });
  },
};
