module.exports = {
  name: 'daily',
  async execute(message, args, client) {
    message.channel.send("Daily has been moved to https://probot.io/daily");
  },
};
