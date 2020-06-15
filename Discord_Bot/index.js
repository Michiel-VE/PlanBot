const Discord = require('discord.js');
const Bot = new Discord.Client();

const token = "NzIxMzQyNjk3MTA5MDYxNjUz.XuYbeA.E9NvQJihtjc7vzmML8N-3v9bDUM";
const prefix = '!!';

var events = [];

Bot.on('ready', () =>{
    console.log('Bot online');
    Bot.user.setActivity('Planning stuff')
})

Bot.on('message', message =>{

    var args = message.content.substring(prefix.length).split(" ");
    

    switch(args[0]){
        case 'help':
            const help = new Discord.MessageEmbed()
            .setTitle('Help').setDescription('Here you will find all commands:')
            .addField('!!help', 'Show help', true)
            .addField('!!link', 'Link to my page', true)
            .addField('!!new', 'Add a new event do !!new date eventname')
            .addField('!!show events', 'this commands shows you all planned events', true)
            .addField('!!remove', 'remove an event do !!remove date eventname', true)
            .setColor(0x21e114)
            .setThumbnail(Bot.user.avatarURL());
            message.channel.send(help);
            break;
            
        case 'link':
            message.channel.send("https://michiel.sinners.be/");
            break;

        case 'new':
            var datum = parseInt(args[1]);
            if(!args[1] || !args[2] || isNaN(datum)) return message.reply(':x: This is not a complete command check !!help to see all commands')
            
            
            events.push({
                date: args[1],
                event: args[2]
            });

            message.channel.send('Event ' + args[2] + ' is made on ' + args[1]);
            for(var i = 0; i < events.length; i++){
                console.log(events[i]);
            } 
        
            break;

        case 'show':
            if(args[1] === 'events'){   
                console.log(events);
                for(var i = 0; i < events.length; i++){
                    message.channel.send('Your plans on ' + events[i].date + ' are ' + events[i].event)
                }   
            }
            break;

        case 'remove':
            if(!args[1] || !args[2]) return message.reply(':x: This is not a complete command check !!help to see all commands')
            events.splice(args[1],1);
            message.channel.send('Event: ' + args[2] + ' on ' + args[1] + ' was deleted')
            break;
    }
})

Bot.login(token);
