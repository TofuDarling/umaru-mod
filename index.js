const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

console.clear()

client.on('ready', ()=> {
    console.log('Umaru Is Online!')
})

client.login(config.token)