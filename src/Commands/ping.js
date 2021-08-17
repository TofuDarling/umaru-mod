module.exports = {
    name: 'ping',
    description: 'This Is A Test Command!',
    execute(message, args){
        message.channel.send('Pong!')
    }

}