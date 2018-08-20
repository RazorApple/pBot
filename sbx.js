
// CONSTS!
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const attachment = new Discord.Attachment('https://i.imgur.com/w3duR07.png');

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`evie.codes template i used and modified k boi??`); 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Write +help! | #BeingRecoded | disco.gg/grumpy`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	  client.user.setActivity(`yay new guild :) :) | #BeingRecorded | disco.gg/grumpy`);
	
    client.user.setActivity(`Write +help! | #BeingRecoded | disco.gg/grumpy`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	  client.user.setActivity(`I have been removed off an guild :( | #BeingRecoded | disco.gg/grumpy`);

    client.user.setActivity(`Write +help! | #BeingRecoded | disco.gg/grumpy`);
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
    m.edit(`PENG BITCH! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
   if(command === "invite") {
   message.reply("i've pmed the invite of this bot k?")
   message.author.send("Hey! If you wanted the :P server invite click on this link http://disco.gg/grumpy If you wanted PBot's invite click on this link http://firewall.co.nf/pbot/")
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
  
  
if(command === "remove") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["BanningAllowed"].includes(r.name)) )
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
      .catch(error => message.reply(`Sorry ${message.author} I couldn't remove because of : ${error}`));
    message.reply(`${member.user.tag} has been removed by ${message.author.tag} because: ${reason}`);
    message.channel.send(attachment);
  }
  if(command === "serverinfo") {
    let pic = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(pic)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
  message.channel.send(serverembed);
  }
  if(command === "help") {
const embed = {
  "title": "Command help with pBot",
  "description": "<:thonkang:219069250692841473>",
  "url": "https://disco.gg/grumpy",
  "color": 2955339,
  "timestamp": "2018-08-02T11:59:25.292Z",
  "footer": {
    "text": "Copyrighted by OwlsOwlAtNight"
  },
  "author": {
    "name": "pBot"
  },
  "fields": [
    {
      "name": "+purge",
      "value": "Removes messages!"
    },
    {
      "name": "+remove",
      "value": "Removes peopole."
    },
    {
      "name": "+help",
      "value": "You are looking at help :thinking::thinking::thinking:"
    },
    {
      "name": "+serverinfo",
      "value": "Check this servers info."
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
      "value": "Get invites!"
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
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});


client.login(config.token);
