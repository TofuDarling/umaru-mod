const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const antiad = require('./anti-ad')
const command = require('./command')
const mongo = require('./mongo')
const welcome = require('./welcome')
const messageCount = require('./message-counter')
const mute = require('./mute')
const path = require('path')
const fs = require('fs')



console.clear()

client.on('ready', async ()=> {
    console.log('Umaru Is Online!')
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          commandBase(client, option)
        }
      }
    }

    readCommands('commands')


    welcome(client)
    messageCount(client)
    mute(client)
    antiad(client)

    await mongo().then(mongoose => {
      try {
        console.log('Connected To MongoDB!')
      } finally {
      }

      
    })
  


    command(client, 'version', message => {
        message.channel.send("You are currently running version 0.3!")
    })
    command(client, 'help', message => {
      const embed = new Discord.MessageEmbed()
        .setTitle("Umaru's Commands!")
        .setFooter("Note: These are commands as of version 0.3!")
        .setColor(`#FFA500`)
        .addFields({
          name: 'Moderation Commands',
          value: '?kick, ?mute, ?unmute, ?ban, ?cc/clearchannel',
        },
        {
          name: 'Info Commands',
          value: '?ping, ?version, ?servers',
        },
        {
          name: 'Administrator Commands', 
          value:'?createvoicechannel, ?createtextchannel, ?setwelcome'
        })
        message.channel.send(embed)
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
    command(client, 'createtextchannel', (message) => {
      const name = message.content.replace('?createtextchannel ', '')
      if (message.member.hasPermission('ADMINISTRATOR')) {
      message.guild.channels
        .create(name, {
          type: 'text',
        })
        .then((channel) => {
          const categoryId = '719799253706342421'
          channel.setParent(categoryId)
        })
      } else {
        message.channel.send("Oi! Looks like you dont have perms!")
      }
    })
    command(client, 'createvoicechannel', (message) => {
      const name = message.content.replace('?createvoicechannel ', '')
      if (message.member.hasPermission('ADMINISTRATOR')) {
      message.guild.channels
        .create(name, {
          type: 'voice',
        })
        .then((channel) => {
          const categoryId = '719799253706342421'
          channel.setParent(categoryId)
          channel.setUserLimit(10)
        })
      } else {
        message.channel.send("Oi! Looks like you dont have perms!")
      }
    })
    command(client, 'whoiscurrynoodles', (message) => {
      message.channel.send("A very cracked player :3. ")
    })
    command(client, 'urmum', (message) => {
      message.channel.send("Your mums house ;)")
    }) 
    command(client, 'dev', (message) => {
      message.channel.send("Made in the dark depths of ✨atlantis✨ by aqxa#1705!")
    })
    command(client, 'whoisgod', (message) => {
      message.channel.send("The one and only homeozaho. (and femboys ofc uwu)")
    }) 
    command(client, 'ping', (message) => {
      const embed = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setColor(`#FFA500`)
        .addFields({
          name: 'Latency',
          value: `${Date.now() - message.createdTimestamp}ms 🏓`,
        },
        {
          name: 'API Latency',
          value: `${Math.round(client.ws.ping)}ms 📈`,
        })
        message.channel.send(embed)
    })
    command(client, 'test', (message) => {
      message.channel.send('Test!')
      .then(msg => msg.delete({timeout: 10000}))
    })
    
    
client.login(config.token)