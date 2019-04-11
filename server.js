  const botconfig = require("./botconfig.json");      
  const tokenfile = require("./token.json");
  const Discord = require("discord.js");
  const fs = require("fs");
  const music = require("./music");
  const bot = new Discord.Client();
  bot.commands = new Discord.Collection();
  
  let purple = botconfig.purple;
  let cooldown = new Set();
  let cdseconds = 5; 
  const { resolve, join } = require("path"); 
  const { Attachment } = require("discord.js"); 
  const { get } = require("snekfetch"); 
  let client = new Discord.Client;
  fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err); 
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(  `${f} loaded!`);
      bot.commands.set(props.help.name, props);

    });
  });

  bot.on("ready", async () => {

    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(`!Helpme | A CUSTOM BOT FOR FRIENDZONE`, {type: "PLAYING"});

  });

  
    bot.on("guildCreate", guild => {
    bot.user.setActivity(`!Helpme | A CUSTOM BOT FOR FRIENDZONE`, {type: "PLAYING"});
    });
    //${prefix}
    bot.on("guildDelete", guild => {
    bot.user.setActivity(`!Helpme | A CUSTOM BOT FOR FRIENDZONE`, {type: "PLAYING"});
    });




  bot.on("message", async message => {

   /*
    if(message.author.id === bot.user.id) return;
    else if(message.author.bot) return message.reply("砖转讜拽 讬讗驻住");  
  */
let prefix = botconfig.prefix

    if(message.content === `<@${bot.user.id}>`) return message.reply(`My prefix is ${prefix} . and if you need help type ${prefix}Helpme`)
    

    if(message.content == `${prefix}`+`helpme`) return message.reply(`**Need help!** (<@&502544879684026393>) <a:FriendZoneTimeOut:565194090761682974>`)
    

    
 if(message.content.toLowerCase() == `${prefix}`+`commands-list`){
    
  var embed = new Discord.RichEmbed()
  .setTitle("!helpme"+" !play (song url)"+" !skip"+" !pause"+" !Help")
  .setTimestamp()
  .setColor("#36393f")

  message.channel.send(embed)
  
  } 
    
    
    
    
  if(message.content == `${prefix}`+`helpme`) return message.reply(`server.`)
  
  

  /*
      if(message.content === `${bot.user.id}`){


          return message.reply("诇诪讛 诪讬 讗转讛 砖转转讬讬讙 讗讜转讬 讘讻诇诇")

      };


  */

if(message.content == `${prefix}`+`ser`) return message.reply(`${bot.guilds.size} server. if someone will add me to new server i'll the you (owner)`)
    




    if(message.channel.type === "dm") return ;


    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" s ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    /*if(message.content.startsWith(`write`)) {
      if(!msg[message.author.id]) msg[message.author.id] = {};
      if(!msg[message.author.id].message) msg[message.author.id].message = "";
      msg[message.author.id].message = args; 
      fs.writeFile("./msgs.json", JSON.stringify(msg), (err) => {
        if(err) console.err(err);
      });
    message.reply("I'm done");
    }*/ 


    // try now pls But the bot isnt runing.... stiil write test
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  });



  function clean(text) {
    if(typeof(text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
    else return text;
  }

  bot.login(tokenfile.token);