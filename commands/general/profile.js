const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'profile',
  async execute(message, args, client) {
    
    await message.channel.sendTyping()
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d')
    const background = await loadImage(`https://api.probot.io/profile/${message.author.id}`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    const attach = new MessageAttachment(canvas.toBuffer(), 'profile.png');
    message.channel.send({ files: [attach] })
  },
};
