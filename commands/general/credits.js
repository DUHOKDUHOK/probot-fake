const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "credits",
  async execute(message, args, client) {
    const data = client.db;
    
    let user = message.author;
    if (args[0]) user = client.users.cache.get(args[0].toUserId()) || client.users.cache.find(u => u.username.toLowerCase() === args[0].toLocaleLowerCase())
    if (!user) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`**⁉️ | ${message.author.username}, I can't find ${args[0]}!**`)], allowedMentions: { repliedUser: false}});                      
    if (user.bot) return message.reply({content: "can't get info from bot", allowedMentions: {repliedUser: false }}); 
    const amount = args[1];
    let credits = data.get(`credits_${user.id}`);
    if(!amount) {
    if (!credits) {
      data.add(`credits_${message.author.id}`, 0);
      return message.reply({ content: `:bank: | ** ${user.username}, your account balance is \`0\`.**`, allowedMentions: { repliedUser: false },});
    } else {
      return message.reply({ content: `:bank: | ** ${user.username}, your account balance is \`${credits}\`.**`, allowedMentions: { repliedUser: false },
      });
      }
     } else {
       credits = data.get(`credits_${message.author.id}`);
       let number = (Math.random() * 9999);
       if(credits < amount) return message.reply({content: `** :thinking: | ${message.author.username}, Your balance is not enough for that!**`, allowedMentions: { replieduser: false }})	
       message.reply({content: `** ${message.author.username}, Transfer Fees: \`0\`, Amount :\`$1\`** \n  type these numbers to confirm :`, files: [await require('../../src/managers/createCaptcha')(number)], allowedMentions: { replieduser: false }})
      } 
    } 
 } 