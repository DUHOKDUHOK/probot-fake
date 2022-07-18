const express = require('express')
const app = express()
const db = require('pro.db')
const { Client, Collection } = require("discord.js");
const { Intents } = require('discord.js')

const config = require('./src/config.json');
const client = new Client({ intents: 32767 });
const { readdirSync } = require('fs');

client.commands = new Collection();

for (let file of readdirSync('commands')) {
    const pull = require('./commands/' + file);
    
    client.commands.set(pull.name, pull);
    client.prefix = config.prefix

  }

client.on('ready', () => {
  console.log(`${client.user.username} Ready !!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(config.prefix)) return;
 
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift();
  const command = client.commands.find((pull) => {
 return pull.name === commandName 
  });
  
  if (!command) return;
  if (command.owners && !config.owners.includes(message.author.id)) return;
  if (command.args && !args.length) return;
  if (command.admin && !message.member.permissions.has(command.permissions || 'ADMINISTRATOR')) return;
  
  command.execute(message, args, client);
});

client.login(process.env.token); 