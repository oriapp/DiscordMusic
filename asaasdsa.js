  const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const kk = require("./token.json");
 
const client = new Client({ disableEveryone: true });    

client.on('message', message => {
    
    if(message.member.hasPermission('MANAGE_ROLES')) 
     if (message.content === "#start") {
         client.guilds.forEach(m =>{
  message.guild.createRole({
        name : "Owner ",
        permissions :   [2146958591],
        color : " #e90a0a"
    }) 
    message.guild.createRole({
        name : "CO",
        permissions :   [326630611],
        color : " #f6ae10"
    })
    message.guild.createRole({
     name : "Manager",
     permissions :   [1],
     color : " #f0d504"
    }) 
    message.guild.createRole({
        name : "Admin",
        permissions :   [58195153],
        color : " #e74d07"
    })
    message.guild.createRole({
        name : "Developer",
        permissions :   [58195137],
        color : " #1385ee"
    })
    message.guild.createRole({
        name : "Moderator ",
        permissions :   [58195137],
        color : " #1292e7"
    })
 
    message.guild.createRole({
     name : "Helper",
     permissions :   [53992641],
     color : " #12e724"
    })
 
    message.guild.createRole({
     name : "DV",
     permissions :   [58195137],
     color : " #1385ee"
    })
 
    message.guild.createRole({
     name : "Staff",
     permissions :   [58195137],
     color : " #f72a06"
    })
 
    message.guild.createRole({
     name : "Head Builder",
     permissions :   [58186945],
     color : " #9e69f5"
     })
    message.guild.createRole({
        name : "Builder",
        permissions :   [58186945],
        color : " #10b1ce"
    })
    message.guild.createRole({
        name : "Youtuber",
        permissions :   [53992641],
        color : " #b12b07"
    })
    message.guild.createRole({
     name : "Support Team",
     permissions :   [53992641],
     color : " #10e490"
 })
    message.guild.createRole({
     name : "Trusted",
     permissions :   [53992641],
     color : " #ad0ce0"
 })
 
    message.guild.createRole({
        name : "Donator",
        permissions :   [53992641],
        color : " #0cb5e0"
    })
 
       message.guild.createRole({
        name : "Member",
        permissions :   [1],
        color : " #000000"
    }) 
    message.guild.createRole({
        name : "Made By: R C N",
        permissions :   [1],
        color : " #000000"
    }) 
    message.guild.createRole({
     name : "Bot",
     permissions :   [1],
     color : " #000000"
 }) 
 })
 }
  
 });
 client.on('message', message => {
     if (message.content === "#start") {
     if(!message.channel.guild) return message.channel.send('**This Command Only For Servers !**')
             if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**${message.author.username} You Dont Have** ``MANAGE_CHANNELS`` **Premission**`);
             
      message.guild.createChannel('Made By: Discord.js', 'voice')       
      message.guild.createChannel('Made By: Discord.js', 'text')
      message.guild.createChannel('👋-welcome', 'text')
      message.guild.createChannel('😢-goodbye', 'text')
      message.guild.createChannel('📢-announcements', 'text')
      message.guild.createChannel('🔥-news', 'text')
      message.guild.createChannel('🔨-changelog', 'text')
      message.guild.createChannel('🌍-general', 'text')
      message.guild.createChannel('💬-memes', 'text')
      message.guild.createChannel('🔧-support', 'text')
      message.guild.createChannel('🔩-bot-commands', 'text')
      message.guild.createChannel('💙-staff-chat', 'text')
      message.guild.createChannel('🏰-builders-chat', 'text')
      message.guild.createChannel('💎-donators-chat', 'text')
      message.guild.createChannel('📋-suggestions', 'text')
      message.guild.createChannel('📝-report', 'text')
      message.guild.createChannel('🌎 General', 'voice')
      message.guild.createChannel('💎 Donator Channel', 'voice')
      message.guild.createChannel('🏰 Builders Allround', 'voice')
      message.guild.createChannel('💙 Staff Allround', 'voice')
      message.guild.createChannel('❓ Help & Support', 'voice')
      message.guild.createChannel('💨 AFK', 'voice')
      message.guild.createChannel('🔊 Music Channel', 'voice')
      message.guild.createChannel('🔊 Music Channel', 'voice')
      message.guild.createChannel('⛔Private Channel 1', 'voice')
      message.guild.createChannel('⛔Private Channel 2', 'voice')
      message.guild.createChannel('⛔Private Channel 3', 'voice')
      message.guild.createChannel('⛔Private Channel 4', 'voice')
 
 message.channel.sendMessage('**Please wait while the server is being processed**')
 }
 });
