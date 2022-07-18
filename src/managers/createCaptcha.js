const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = async function createCaptcha(number) {
  const canvas = createCanvas(300, 110);
  const ctx = canvas.getContext('2d')
  const background = await loadImage(`https://api.probot.io/captcha?code=${number}.png`);
  
  const attach = new MessageAttachment(canvas.toBuffer(), 'captcha.png');
  return attach;
 } 