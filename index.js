const { Client, Collection } = require('discord.js');
const { prefix, owners } = require('./src/config');
const { messageCreate } = require('./src/events/messageCreate');
const { ready } = require('./src/events/ready');
const { readdirSync } = require('fs');
const client = new Client({ intents: 32767 })

ready(client);

client.commands = new Collection();

const folders = readdirSync('commands');
for (let folder of folders) {
  const files = readdirSync('commands/' + folder);
    for (let file of files) {
    const pull = require('./commands/' + folder + '/' + file);
    client.commands.set(pull.name, pull);
  }
}

//messageCreate(client);
client.on('messageCreate', message => {
 
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift();
  const command = client.commands.find((pull) => {
    return pull.name === commandName 
  });
  
  if (!command) return;
  if (command.owner && !owners.includes(message.author.id)) return;
  if (command.args && !args.length) return;
  
  command.execute(message, args, client);
 });

client.login(process.env.token);
//require('./src/util');