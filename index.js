const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
const { readdirSync } = require('fs');
const EventEmitter = require('events');

const events = readdirSync('events');
client.events = new EventEmitter();
client.commands = new Collection();

events.filter(e => e.endsWith('.js')).forEach(event => {
  event = require(`./src/events/${event}`)(client);
  event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
});

events.filter(e => !e.endsWith('.js')).forEach(folder => {
  //readdirSync('src/events/' + folder).forEach(event => {
    event = require(`./src/events/${folder}/${event}`)(client);
    event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
  });
//});

for (let folder of readdirSync('commands').filter(folder => !folder.includes('.'))) {
  for (let file of readdirSync('commands/' + folder).filter(f => f.endsWith('.js'))) {
    let command = require(`./commands/${folder}/${file}`);
    command.category = folder;
    try {
      let { helps } = client.replys[command.name];
      if (helps.description) command.description = helps.description;
      if (helps.aliases) command.aliases = helps.aliases;
    } catch {}
    client.commands.set(command.name, command);
  }
}

client.login(process.env.token);
require('./src/util');