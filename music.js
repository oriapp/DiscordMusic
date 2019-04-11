const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const kk = require("./token.json");
 
const client = new Client({ disableEveryone: true });
 
const youtube = new YouTube(GOOGLE_API_KEY);
 
const queue = new Map();
 
client.on('warn', console.warn);
 
client.on('error', console.error);
 
client.on('ready', () => console.log('The music are ready!'));
 
client.on('disconnect', () => console.log('Leave the channel!'));
 
client.on('reconnecting', () => console.log('Reconnecting'));
 
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
 
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(PREFIX.length)
 
    if (command === 'search') {
 
    }
  
    if (command === 'p') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('You must to be in the same channel!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I need some perms to join your voice channel');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I need perms to talk!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(` Playlist: **${playlist.title}** Has been added to the queue! <a:FriendZoneMusic:565682564275109901>`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    const songselection = new Discord.RichEmbed()
                    .setAuthor(`Please select a song`, "https://i.imgur.com/K4x9sbM.png")
                    .setColor("RED")
                    .addField("Send message number between 1 - 10 to select a song!" ,`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
                    .setFooter(`Owner: R C N#0001`)
                    msg.channel.send(songselection)
 
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send(' :x: You have selected an incorrect number or you have not selected a number, the command has been canceled');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(':x: I cant find this song. sorry');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    }else if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send(':x: You must to be in the same channel!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I need some perms to join your voice channel');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I need perms to talk!');
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(` Playlist: **${playlist.title}** Has been added to the queue! <a:FriendZoneMusic:565682564275109901>
`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    const songselection = new Discord.RichEmbed()
                    .setAuthor(`Please select a song`, "https://i.imgur.com/K4x9sbM.png")
                    .setColor("RED")
                    .addField("Send message number between 1 - 10 to select a song!" ,`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
                    .setFooter(`R C N#0001`)
                    msg.channel.send(songselection)
 
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('You have selected an incorrect number or you have not selected a number, the command has been canceled');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                  serverQueue.volume = args[1];
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('I cant find this song. sorry');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
        if (!msg.member.voiceChannel) return msg.channel.send('You must to be in the sime voice channel!');
        if (!serverQueue) return msg.channel.send('There is no running song that can be skipped!');
        serverQueue.connection.dispatcher.end(':fast_forward: **Skipped** :thumbsup:');
        return undefined;
    }else if (command === 's') {
        if (!msg.member.voiceChannel) return msg.channel.send('You must to be in the sime voice channel!');
        if (!serverQueue) return msg.channel.send('There is no running song that can be skipped!');
        serverQueue.connection.dispatcher.end(':fast_forward: **Skipped** :thumbsup:');
        return undefined; 
    }else if (command === 'stop') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: You are not in the voice channel!');
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server!');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Paused :pause_button:');
        return undefined;
          }else if (command === 'st') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: You are not in the voice channel!');
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server!');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Paused :pause_button:');
        return undefined;
    } else if (command === 'volume') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: **You have to be in a voice channel to use this command.**');
        if (!serverQueue) return msg.channel.send(':x: There is no song played!');
        if (!args[1]) return msg.channel.send(`The current volume: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
          } else if (command === 'vl') {
        if (!msg.member.voiceChannel) return msg.channel.send(':x: **You have to be in a voice channel to use this command.**');
        if (!serverQueue) return msg.channel.send(':x: There is no song played!');
        if (!args[1]) return msg.channel.send(`The current volume: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return msg.channel.send(`I set the volume to: **${args[1]}**`);
    } else if (command === 'np') {
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server');
        return msg.channel.send(` Now playing: **${serverQueue.songs[0].title}**`);
          } else if (command === 'nowplay') {
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server');
        return msg.channel.send(` Now playing: **${serverQueue.songs[0].title}**`);
    } else if (command === 'queue') {
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server');
        return msg.channel.send(`

__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
        `);
          } else if (command === 'q') {
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server');
        return msg.channel.send(`

__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
        `);
         } else if (command === 'qu') {
        if (!serverQueue) return msg.channel.send(':x: Nothing playing in this server');
        return msg.channel.send(`

__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
        `);
           
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('Paused :pause_button:');
          
        }
        return msg.channel.send(':x: Nothing playing in this server');
          } else if (command === 'pa') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('Paused :pause_button:');
          
        }
        return msg.channel.send(':x: Nothing playing in this server');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('I renewed the music player');
        }
        return msg.channel.send('Nothing is played');
    }
 
  
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(` **${song.title}** Has been added to the queue! <a:FriendZoneMusic:565682564275109901>`);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
if (!song) {
setTimeout(() => {
  serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
}, 900900)
}
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 6.5);
 
    serverQueue.textChannel.send(` Start playing: **${song.title}** <a:FriendZoneMusic:565682564275109901>`);
}
client.login(kk.token)