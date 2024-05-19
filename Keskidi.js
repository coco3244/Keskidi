const Discord = require('discord.js');
require('dotenv').config();
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
global.Channels = [];

bot.commands = new Discord.Collection()
bot.color="#ffff"
bot.connection =[]

bot.login(process.env.TOKEN);
loadCommands(bot)
loadEvents(bot)