const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: "profile",
  async execute(message, args, client) {
    
    await message.channel.sendTyping()
    setTimeout(() => 3000, message.channel.stopTyping()) 
    const canvas = createCanvas(300, 110);
    const ctx = canvas.getContext('2d')
    const background = await loadImage(`https://api.probot.io/profile/${message.author.id}`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    const attach = new MessageAttachment(canvas.toBuffer(), 'profile.png');
    return attach;
  },
};
