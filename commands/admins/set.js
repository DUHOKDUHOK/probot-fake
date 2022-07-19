module.exports = {
  name: 'set',
  owners: true,
  async execute(message, args, client) {
    switch (args[0]) {
      case "credits":
        return message.channel.send("..");
        break;
    }
  },
};
