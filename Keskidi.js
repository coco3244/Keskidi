const Discord = require('discord.js');
require('dotenv').config();
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents});

bot.login(process.env.TOKEN);
loadCommands(bot)