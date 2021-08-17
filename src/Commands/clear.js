module.exports={
    name: 'clear',
    description: 'Clears A Certain Amount Of Messages',
    
    async execute(message, args) {
        
        if(!args[0]) return message.reply("Please Enter The Required Amount Of Messages You Want To Clear!");
        if(isNaN(args[0])) return message.reply("Please Enter A Real Number!");

        if(args[0] > 100) return message.reply("You can't delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You can't delete less than 1 message!"); {
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages);
            
        
        });
    }

}}