const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')

console.clear()

client.on('ready', ()=> {
    console.log('Umaru Is Online!')

    command(client, 'ping', message =>{
        message.channel.send("Pong!")
    }) 
    command(client, 'version', message => {
        message.channel.send("You are currently running version 0.2!")
    })
})  

client.login(config.token)