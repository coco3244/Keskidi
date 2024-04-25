const Discord = require("discord.js");
const { Pagination, ExtraRowPosition } = require('pagination.djs');
let pagination
module.exports = {
    name: "help",
    description: "Donne la liste de toutes les commandes",
    permissions:"Aucune",
    dm:true,
    category: "Information",
    options:[
        {
            type:"string",
            name: "commande",
            description: "Commande a afficher",
            required: false,
            autocomplete: true
        }
    ],
    run(bot, message,args) {
        pagination=new Pagination(message,{
            ephemeral: true
        });
        let command;
        if(args.getString("commande")){
            command = bot.commands.get(args.getString("commande"))
            if(!command) return message.reply("Cette commande n'existe pas")
        }
        
        if(!command){ //si aucun argument spécifié => aide générale
            
            const embeds = [];          
            
            let categories = []            
            bot.commands.forEach(command =>{
                if(!categories.includes(command.category)) categories.push(command.category)
            })    
            let desc="1 <=> Sommaire \n";
            let index = 2;
            categories.sort().forEach(cat=>{
                let subcategories =[];
                let commands = bot.commands.filter(cmd => cmd.category === cat)
                commands.forEach(cmd=>{
                    if(cmd.subcategory && !subcategories.includes(cmd.subcategory)) subcategories.push(cmd.subcategory)
                })
                if(subcategories.length>0){
                    let subindex = 1;
                    for(let i = 0;i<subcategories.length;i++){
                        desc += `${index} <=> ${cat} Part.${subindex}\n`
                        subindex++;
                        index++;                       
                    }
                }else{
                    desc += `${index} <=> ${cat} \n`
                    index++;
                }
                
            })  
            let sommaire = new Discord.EmbedBuilder()
            .setColor(0xff0000)
            .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            .setTitle("Sommaire")                    
            .setDescription(desc)         
            embeds.push(sommaire);
            
            /*---------------------------------------------------------------------*/  
            
            categories.sort().forEach(cat =>{
                
                let commands = bot.commands.filter(cmd => cmd.category === cat)    
                let subcategories =[];
                let noSubcategories =[];
                
                commands.forEach(cmd=>{
                    if(cmd.subcategory && !subcategories.includes(cmd.subcategory)) subcategories.push(cmd.subcategory)
                    if(!cmd.subcategory) noSubcategories.push(cmd)
                })
                
                let desc="";
                
                if(subcategories.length>0){ //s'il y a des sous catégories 
                    
                    noSubcategories.forEach(cmd=>{//ajout des commande sans sous catégories
                        desc+= `\`${cmd.name}\` : ${cmd.description} \n`
                    })        
                    let index=1;
                    subcategories.sort().forEach(subcat=>{                       
                        
                        const subcom = commands.filter(cmd => cmd.subcategory === subcat)
                        let subSubCategories =[];
                        let notSubSubCategories =[];
                        
                        subcom.forEach(cmd=>{
                            if(cmd.subsubcategory && !subSubCategories.includes(cmd.subsubcategory)){
                                subSubCategories.push(cmd.subsubcategory)
                            }
                            if(!cmd.subsubcategory){
                                notSubSubCategories.push(cmd)
                            }
                        })
                        
                        if(notSubSubCategories.length>0){
                            desc+=`\n__**${subcat}**__\n\n`;
                            notSubSubCategories.forEach(cmd=>{
                                desc+= `|- \`${cmd.name}\` : ${cmd.description} \n`
                            })
                        }
                        else desc+=`**${subcat}**`;   
                        
                        if(subSubCategories.length>0){ //s'il y a des sous sous catégories                            
                            
                            subSubCategories.sort().forEach(subSubCat=>{
                                const subsubcom = commands.filter(cmd => cmd.subsubcategory === subSubCat && cmd.subcategory === subcat)
                                desc+=`\n|- **${subSubCat}**\n`;  
                                subsubcom.forEach(cmd=>{
                                    desc+= `|-- \`${cmd.name}\` : ${cmd.description} \n`
                                })                                                                                             
                                
                            })                          
                            
                        }   
                        let Embed = new Discord.EmbedBuilder()
                        .setColor(0x0000)
                        .setTitle(`${cat} Part.${index}`)
                        .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
                        .setDescription(desc)
                        embeds.push(Embed) 
                        index++;
                        desc="";
                    })

                }else{ //si pas de sous catégories                 
                    commands.forEach(cmd=>{
                        desc+= `\`${cmd.name}\` : ${cmd.description} \n`
                    })
                    let Embed = new Discord.EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle(cat)
                    .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
                    .setDescription(desc)
                    embeds.push(Embed)
                }               
                
            })
            
            pagination.setEmbeds(embeds);
            
            pagination.setEmbeds(embeds, (embed, index, array) => {
                return embed.setFooter({ text: `Page: ${index + 1}/${array.length}` });
            });           
            pagination.render();
            
        }else{ //si un argument command a été spécifié
            let Embed = new Discord.EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Commandes ${command.name}}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise : \`${typeof command.permissions !== "bigint" ? command.permissions : new Discord.PermissionsBitField(command.permissions).toArray(false)}\` \n Commande en DM : \`${command.dm ? "Oui":"False"}\` \n Catégorie : \`${command.category}\` `)
            .setTimestamp()
            .setFooter({text: "Commandes du robot"})          
            message.reply({embeds:[Embed],ephemeral: true})
            
        }
    }
}