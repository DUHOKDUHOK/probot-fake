const { Client, Collection } = require('discord.js');
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
    messageCreate(client, pull);
  }
}
client.login(process.env.token);
require('./src/util');