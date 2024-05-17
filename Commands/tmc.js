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
      name: "public",
      description: "Rendre les réponses visible Publiquement ou si ça reste Privé",
      required: true,
      autocomplete: true,
    },
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
    const public = args.getString("public").toLowerCase();
    if (public!="public" && public != "privé")
      return message.reply({ content: "Parametre privacy invalide"});
    let PrivBool
    if(public=="public")PrivBool=false
    if(public=="privé")PrivBool=true


    if (txt.length < 2)
      return message.reply({ content: "C'est ptète un peu court là, non ?",nephemeral:PrivBool});
    if (txt.length > 2000)
      return message.reply({
        content: "C'est limité à 2000 caractères par trad, c'est con :/",ephemeral:PrivBool
      });

    translate(txt, { to: "fr" })
      .then((res) => {
        if (res.from.language.iso.toLowerCase() == "fr") {
          return message.reply({
            content: `C'est déja du français, Andouille !!`,ephemeral:PrivBool
          });
        }
        if (res.from.autoCorrected) {
          return message
            .reply({
              content: `Apparement tu sais pas écrire ou t'as copié/collé de la merde du coup j'ai corrigé le texte en : \n 
                \`\`\`${res.from.text.value}\`\`\`              
                `,ephemeral:PrivBool
            })
            .then(() => {
              message.followUp({
                content: `Et je l'ai traduit en : \n
                  \`\`\`${res.text}\`\`\``,ephemeral:PrivBool
              });
            });
        } else {
          return message
            .reply({
              content: `Texte à traduire : \`\`\`${txt}\`\`\``,ephemeral:PrivBool
            })
            .then(() => {
              message.followUp({
                content: `Réponse : \`\`\`${res.text}\`\`\``,ephemeral:PrivBool
              });
            });
        }
      })
      .catch((err) => {
        return message.reply({
          content: `Une erreur est survenue : \`\`\`${err}\`\`\``,ephemeral:PrivBool
        });
      });
  },
};
