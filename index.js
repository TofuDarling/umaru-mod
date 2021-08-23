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
    command(client, 'help', (message) =>{
        message.channel.send("My current commands are: ?ping, ?version, ?servers, ?cc/clearchannel), ?ban, ?kick")
    })
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
          message.channel.send(
            `${guild.name} has a total of ${guild.memberCount} members`
          )
        })
      }) 
    
      command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
         })
        }
      })
    
      command(client, 'status', (message) => {
        const content = message.content.replace('?status ', '')
    
        client.user.setPresence({
          activity: {
            name: content,
            type: 0,
          },
        })
      })
    })
    command(client, 'ban', (message) => {
      const { member, mentions } = message
  
      const tag = `<@${member.id}>`
  
      if (
        member.hasPermission('ADMINISTRATOR') ||
        member.hasPermission('BAN_MEMBERS')
      ) {
        const target = mentions.users.first()
        if (target) {
          const targetMember = message.guild.members.cache.get(target.id)
          targetMember.ban()
          message.channel.send(`${tag} The user has been banned.`)
        } else {
          message.channel.send(`${tag} Please choose someone to ban!`)
        }
      } else {
        message.channel.send(
          `${tag} You do not have permission to use this command.`
        )
      }
    })
  
    command(client, 'kick', (message) => {
      const { member, mentions } = message
  
      const tag = `<@${member.id}>`
  
      if (
        member.hasPermission('ADMINISTRATOR') ||
        member.hasPermission('KICK_MEMBERS')
      ) {
        const target = mentions.users.first()
        if (target) {
          const targetMember = message.guild.members.cache.get(target.id)
          targetMember.kick()
          message.channel.send(`${tag}, I've kicked that user`)
        } else {
          message.channel.send(`${tag} Please choose someone to kick.`)
        }
      } else {
        message.channel.send(
          `${tag} You do not have permission to use this command!`
        )
      }
    })


client.login(config.token)