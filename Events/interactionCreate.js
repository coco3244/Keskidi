const Discord = require('discord.js')
let tmcPrivacy = ['public', 'privé']

module.exports = async(bot,interaction)=>{      
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete){
        let entry = interaction.options.getFocused()       
        if(interaction.commandName === "help"){
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})): choices.map(choice => ({name : choice.name, value : choice.name})))
        }  
        if(interaction.commandName === "tmc"){
            let choices = tmcPrivacy.filter(tmcPrivacy => tmcPrivacy.includes(entry))
            await interaction.respond(entry === "" ? tmcPrivacy.map(ent => ({name:ent,value:ent})): choices.map(ent => ({name:ent,value:ent})))
        }       
                  
    }   
    if(interaction.type=== Discord.InteractionType.ApplicationCommand){
        let command = require(`../Commands/${interaction.commandName}`)
        command.run(bot,interaction,interaction.options)      
    }   
}