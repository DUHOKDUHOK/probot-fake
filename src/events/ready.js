module.exports.ready = (client) => {
  client.on("ready", () => {
    console.log(`${client.user.username} Ready !!`);
  });
};
