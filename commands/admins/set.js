module.exports = {
  name: 'set',
  owners: true,
  async execute(message, args, client) {
    switch (args[0]) {
      case "credits":
        const data = client.db;
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
