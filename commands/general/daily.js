module.exports = {
  name: 'daily',
  cooldown: 20,
  async execute(message, args, client) {
    message.channel.send({content: "Daily has been moved to https://probot.io/daily", allowedMentions: { replieduser: false }});
  },
};
