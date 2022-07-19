const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'set',
  owners: true,
  async execute(message, args, client) {
    switch (args[0]) {
      case "credits":
        const data = client.db;
         let user = client.users.cache.get(args[1].toUserId()) || client.users.cache.find(u => u.username.toLowerCase() === args[1].toLocaleLowerCase())
         if (!user) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`**⁉️ | ${message.author.username}, I can't find ${args[1]}!**`)], allowedMentions: { repliedUser: false}});                      
         if (user.bot) return message.reply({content: `:thinking:  | **${message.author.username}**, bots do not have credits!`, allowedMentions: { repliedUser: false }});
         const credits = data.get(`credits_${user.id}`) || 0; 
         if(!args[1].includes("-") {
         const amount = args[2].replace("-", '')
          if (remove && credits < args[2]) return message.reply(`**❌ I Can't remove credits**`).catch(() => {});
          if (add) data.add(`credits_${user.id}`, 1);
          if (remove) data.subtract(`credits_${message.author.id}`, args[2]);            
         
        return message.channel.send("done..");
        break;
       } 
    }
  },
};
