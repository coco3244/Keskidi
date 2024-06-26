const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");


module.exports = {
  name: "autotrad_status",
  description: "Donne le status de la commande Autotrad",
  permissions: "Aucune",
  dm: false,
  category: "Action",

  run(bot, message) {
    let ids=""
    
      global.Channels.forEach(chanId => {
        if(message.guild.channels.cache.find(channel => channel.id === chanId)!=undefined){
          ids+=`${message.guild.channels.cache.find(channel => channel.id === chanId)}\n`
        }
      });
      
      if(global.Channels.length ===0 || ids==""){
        ids="Aucuns canaux actifs pour le moment !"
      }
    

    let Embed = new Discord.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Autotrad - Canaux actifs`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            .setDescription(ids)
            .setTimestamp()
            .setFooter({text: "Canaux surveillés par la commande Autotrad"})          
            message.reply({embeds:[Embed]})
  },
};
