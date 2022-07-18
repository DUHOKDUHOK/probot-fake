module.exports = {
  name: 'credits', 
  async execute(message, args, client) {
    
   const data = client.db;
   const credits = data.get(`credits_${message.author.id}`);
   if(!credits) {
     return message.reply({content: `:bank: | ** ${message.author.username}, your account balance is \`0\`.**`, allowedMentions: { repliedUser: false }}) 
     } else {
     return message.reply({content: `:bank: | ** ${message.author.username}, your account balance is \`${credits}\`.**`, allowMentions: { repliedUser: false }}) 
    } 
   } 
 } 