const Discord = require("discord.js");
const { translate } = require('../translate');
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
    const txt = args.getString("texte").toLowerCase().replace('<','').replace('>','');
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
    translate(txt, "fr")
      .then((res) => {
        if (res.alreadyFrench) {
          return message.reply({
            content: `C'est déjà du français, Andouille !!`,
            ephemeral: PrivBool,
          });
        }

        return message
          .reply({
            content: `Texte à traduire : \`\`\`${txt}\`\`\``,
            ephemeral: PrivBool,
          })
          .then(() => {
            message.followUp({
              content: `Réponse : \`\`\`${res.translatedText}\`\`\``,
              ephemeral: PrivBool,
            });
          });
      })
      .catch((err) => {
        return message.reply({
          content: `Une erreur est survenue : \`\`\`${err}\`\`\``,
          ephemeral: PrivBool,
        });
      });
  },
};
