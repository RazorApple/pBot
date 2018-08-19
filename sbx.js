// CONSTS!
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Made by evie.codes/SmoothCreamDev`); 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Currentntly providing to ${client.users.size} users! | discord.io/smoothcream`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Currentntly providing to ${client.users.size} users! | discord.io/smoothcream`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Currentntly providing to ${client.users.size} users! | discord.io/smoothcream`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
   if(command === "invite") {
   message.reply("You have been PMed with the info about invites and SCM")
   message.author.send("Hello. We cannot give you the invite for SCM (SmoothCreamBot) bcs we are not devolping it for many servers. But if you want the SmoothCream invite here it is! https://discord.io/smoothcream")
  }
	if(command === "getpfp") {
    message.reply("Getting your profile picture!")
    message.reply(message.author.avatarURL);
  }
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
   if(command === "XDLOL") {
   const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('I was unable to ban the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
  }
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator","Owner"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
    if(command === "aembed") {
const embed = {
  "color": 13632027,
  "timestamp": "2018-08-03T12:51:50.421Z",
  "footer": {
    "icon_url": "https://a.doko.moe/nsbmrw.jpg",
    "text": "OwlsOwlAtNight @ adrians@disroot.org"
  },
  "fields": [
    {
      "name": "Rule 1",
      "value": "Do not swear hard. Like saying shit a few times should not hurt."
    },
    {
      "name": "Rule 2",
      "value": "No Nsfw! You will get perm  banned,or kicked!"
    },
    {
      "name": "Rule 3",
      "value": "Please do not talk about offtopic stuff in the arts and also bot channels!"
    },
    {
      "name": "Rule 4",
      "value": "Do not ask for roles🙄🙄"
    },
    {
      "name": "Rule 5",
      "value": "Do not play earrape or music like Despacito2"
    },
    {
      "name": ":angry: :anger:  :angry: (Rule 6)",
      "value": "Do not scream into your mic."
    },
    {
      "name": ":angel::skin-tone-2: :smile: (Rule 7)",
      "value": "Be chill!"
    }
  ]
};
message.channel.send({embed});
  }
  
  if(command === "help") {
const embed = {
  "title": "Command help with SmoothCreamBot",
  "description": "<:thonkang:219069250692841473>",
  "url": "https://discord.io/smoothcream",
  "color": 2955339,
  "timestamp": "2018-08-02T11:59:25.292Z",
  "footer": {
    "text": "Copyrighted by OwlsOwlAtNight"
  },
  "thumbnail": {
    "url": "https://a.doko.moe/nsbmrw.jpg"
  },
  "author": {
    "name": "SmoothCreamBot help!",
    "url": "https://discordapp.com"
  },
  "fields": [
    {
      "name": "+play",
      "value": "Play Music! (Currently working on an music player!)"
    },
    {
      "name": "+purge",
      "value": "Removes messages!"
    },
    {
      "name": "+kick",
      "value": "Kicks peopole off the server!"
    },
    {
      "name": "+help",
      "value": "You are looking at help :thinking::thinking::thinking:"
    },
    {
      "name": "+say",
      "value": "Ask the bot to say anything you want!"
    },
    {
      "name": "+ping",
      "value": "Check the latency of the bot! (Hosted in latvia)"
    },
	{
      "name": "+getpfp",
      "value": "Get your profile picture!"
    },
	{
      "name": "+invite",
      "value": "Get info about Invites 'This will PM you'"
    }
  ]
};
message.channel.send({embed});
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 1 || deleteCount > 250)
      return message.reply("Please provide a number between 1 and 250 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});


client.login(config.token);