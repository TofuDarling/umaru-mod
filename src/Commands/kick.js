module.exports = {
    name: 'kick',
    description: 'Kicks The Targeted User',
    execute(message, args) {
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.kick();
            message.channel.send("User has been kicked!")
        } else {
            message.channel.send('You were unable to kick the user! Sorry :(');
            





        }
    }
}