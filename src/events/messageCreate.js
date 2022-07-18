const { prefix, owners } = require('../../src/config');

module.exports.messageCreate = (client, pull) => {
  
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
};
