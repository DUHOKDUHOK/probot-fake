const express = require('express');
const app = express();

module.exports = (client) => ({
  name: "ready",
  once: false,
  async execute() {
    
    console.log(`${client.user.username} Ready !!`);
    app.listen(3000);
  },
});
