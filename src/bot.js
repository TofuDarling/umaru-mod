require('dotenv').config()
require('nodemon')
console.clear()

const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const { token } = require('./config.json');
const client = new Discord.Client({ intents });
const prefix = '?';
const fs = require('fs');
client.commands= new Discord.Collection();
const commandFiles = fs.readdirSync('./src/Commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    client.commands.set(command.name, command)
}
client.on("ready", () => {
    console.log("Umaru-Mod Is Online!")
});

const channelId = "877072921984638978";

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');

    guildMember.roles.add(welcomeRole);
});

client.on("message", message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

//remember to change Update number with each Update!
// first lines 30 - 37 use the Basic Command Handler. For simple commands and easter eggs!
    if (command === "version") {
        message.channel.send("You are currently running version Beta 0.1!");
    } else if (command == "dev"){
        message.channel.send("Made By aqxa#2045!");
    } else if (command == "ping"){
        client.commands.get('ping').execute(message, args);
    } else if (command == "whoisgod"){
        message.channel.send("The One And Only Homezaho o_o")


    } else if (command == "clear") 
    if(message.member.permissions.has("MANAGE_CHANNEL")) {
        client.commands.get('clear').execute(message, args);
    } else {
        message.reply("Insufficient Perms!");
    }
    
    else if (command == "kick") 
    if(message.member.permissions.has("KICK_MEMBERS")) {
        client.commands.get('kick').execute(message, args);
    } else {
        message.reply("Insufficient Perms!");
    }
    
    else if (command == "ban")
    if(message.member.permissions.has("BAN_MEMBERS")) {
        client.commands.get('ban').execute(message, args);
    } else {
        message.reply("Insufficient Perms!");
    } else if (command == "mute")
    if(message.member.permissions.has("MUTE_MEMBERS")) {
        client.commands.get('mute').execute(message, args);
    } else {
        message.reply("Insufficient Perms!");
    } else if (command == "unmute")
    if(message.member.permissions.has("MUTE_MEMBERS")) {
        client.commands.get('unmute').execute(message, args);
    } else {
        message.reply("Insufficient Perms!");
    } else if (command == "friends") {
        message.channel.send("Big Thanks To Jackotaz, Currynoodles, MixyplaysYT, Herbond, Lxght and Jamxy for supporting me on discord and some IRL :D - aqxa");
    } else if (command == "play") {
        client.commands.get('play').execute(message, args);
    } else if (command == "leave") {
        client.commands.get('leave').execute(message, args);
    } else if (command == "warn") {
        client.commands.get('warn').execute(message ,args);
    } else if (command == "help") {
        message.channel.send("Current Commands are: ?mute @user (seconds, minutes, hours etc), ?ban @user (reasons will be added in version 0.2), ?unmute , ?kick , ?clear (otherwise known as purge). MORE COMMANDS COMING IN THE FUTURE.")
    }


});

client.login(process.env.B0T_TOKEN)
