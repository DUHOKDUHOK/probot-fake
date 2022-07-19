const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'set',
  owners: true,
  async execute(message, args, client) {
    switch (args[0]) {
      case "credits":
        const data = client.db;
        let user = client.users.cache.get(args[0].toUserId()) || client.users.cache.find(u => u.username.toLowerCase() === args[0].toLocaleLowerCase())
         if (!user) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`**⁉️ | ${message.author.username}, I can't find ${args[0]}!**`)], allowedMentions: { repliedUser: false}});                      
         if (user.bot) return message.reply({content: `:thinking:  | **${message.author.username}**, bots do not have credits!`, allowedMentions: {repliedUser: false }});
        const credits = data.get(`credits_${message.author.id}`) || 0; 
        let remove = false, add = false
        if (args[1].startsWith('+')) {
          add = true;
          args[1] = args[1].replace('+', '');
        } else if (args[2].startsWith('-')) {
          remove = true;
          args[1] = args[1].replace('-', '');
          args[1] = parseInt(args[2]);

          if (remove && credits < args[2]) return message.reply(`**❌ I Can't remove credits**`).catch(() => {});
          if (add) data.add(`credits_${message.author.id}`, args[1]);
          if (remove) data.subtract(`credits_${message.author.id}`, args[1]);            
         } 
        return message.channel.send("..");
        break;
    }
  },
};
