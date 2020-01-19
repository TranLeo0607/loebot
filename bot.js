const Discord = require('discord.js')
const client = new Discord.Client()
const YTDL = require("ytdl-core");

//Discord Bot does something when it first joins the server.
client.on('ready', () => {
	console.log("Connected as " + client.user.tag);
	client.user.setActivity("with JavaScript");
	
	client.guilds.forEach((guild) => { //Information that is displayed in the console logs.
		console.log(guild.name) //Displays the Discord's Name.
		guild.channels.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
		})
		// General Channel Id: 532707111793328140
		// Test Channel Id: 532720167747190904
		//General Voice Id: 532707111793328142
	})
	
	let generalChannel = client.channels.get("532707111793328140");
	const attachment = new Discord.Attachment("https://data.whicdn.com/images/239600006/large.jpg");
	//generalChannel.send("Testing server")
	//generalChannel.send(attachment)
})

//Discord Bot responds to messages that it receieves and replies back in the same channel.
client.on('message', (receivedMessage) => {
	if(receivedMessage.author == client.user){
		return;
	}
	//receivedMessage.channel.send("Message received, " + receivedMessage.author.toString() + ": " + receivedMessage.content)
	
	if(receivedMessage.content.startsWith("!")){
		processCommand(receivedMessage);
	}
})

//Discord Bot reads commands and responds according.
function processCommand(receivedMessage){
	let fullCommand = receivedMessage.content.substr(1);
	let splitCommand = fullCommand.split(" ");
	let primaryCommand = splitCommand[0];
	let arguments = splitCommand.slice(1);
	
	if (primaryCommand == "help") {
		helpCommand(arguments, receivedMessage);
	} else if (primaryCommand == "multiply") {
		multiplyCommand(arguments, receivedMessage);
	} else if (primaryCommand == "divide") {
		divisionCommand(arguments, receivedMessage);
	} else if (primaryCommand == "add") {
		addCommand(arguments, receivedMessage);
	} else if (primaryCommand == "subtract") {
		subtractCommand(arguments, receivedMessage);
	} else if (primaryCommand == "convert") {
		convertCommand(arguments, receivedMessage);
	} else if (primaryCommand == "music") {
		musicCommand(arguments, receivedMessage);
	} else if (primaryCommand == "skip") {
		skipCommand(arguments, receivedMessage);
	} else if (primaryCommand == "stop") {
		stopCommand(arguments, receivedMessage);
	} else {
		receivedMessage.channel.send("Unknown command. Try `!help`, `!multiply`, or `!convert`");
	}
}


function multiplyCommand(arguments, receivedMessage) { //Multiply Function
	if (arguments.length < 2) {
		receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`");
		return;
	}
	let product = 1
	arguments.forEach((value) => {
		product = product * parseFloat(value);
	})
	receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}

function divisionCommand(arguments, receivedMessage) { //Duvide Function
	if (arguments.length < 2) {
		receivedMessage.channel.send("Not enough arguments. Try `!divide 2 10`");
		return;
	}
	let product = 1
	arguments.forEach((value) => {
		product = product / parseFloat(value);
	})
	receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());

}

function addCommand(arguments, receivedMessage) { //Add Function
	if (arguments.length < 2) {
		receivedMessage.channel.send("Not enough arguments. Try `!add 2 10`");
		return;
	}
	let product = 0
	arguments.forEach((value) => {
		product = product + parseFloat(value);
	})
	receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}

function subtractCommand(arguments, receivedMessage) { //Subtract Function
	if (arguments.length < 2) {
		receivedMessage.channel.send("Not enough arguments. Try `!subtract 2 10`");
		return;
	}
	let product = 0
	arguments.forEach((value) => {
		product = product - parseFloat(value);
	})
	receivedMessage.channel.send("The product of " + arguments + " is " + product.toString());
}

function convertCommand(arguments, receivedMessage) { //Convert Temperature Function
	if (arguments.length < 3) {
		receivedMessage.channel.send("Not enough arguments. Try `!convert [Desired Unit] [Current Unit] [value]`");
		return
	}
	if (arguments.length >= 4) {
		receivedMessage.channel.send("You have entered in too many arguments. Try `!convert [Desired Unit] [Current Unit] [value]`");
	}
	
	let temp = 0;
	let temp4 = ['',''];
	function CelciusToFahr(value){
		temp = (value * (9/5)) + 32;
		return temp;
	} 
	function FahrToCelcius(value){
		temp = (value - 32) * (5/9);
		return temp;
	}
	function KelvinToCelcius(value){
		temp = (value - 273.15);
		return temp;
	}
	
	//Celcius 1
	//Fahr 2
	//Kelvin 3
	
	//For loop is used to assign temp4 values that show the conversion from initial to end.
	for(i = 0; i < temp4.length; i++){
		if (arguments[i] == 1) {
			temp4[i] = "Celcius";
		} else if (arguments[i] == 2) {
			temp4[i] = "Fahrenheit";
		} else if (arguments[i] == 3) {
			temp4[i] = "Kelvin";
		}
	}
	
	if ((arguments[0] == 1) && (arguments[1] == 2)) { //Celcius To Fahr
		CelciusToFahr(arguments[2]);
	} else if ((arguments[0] == 1) && (arguments[1] == 3)) { //Celcius To Kelvin
		temp = (KelvinToCelcius(arguments[2] * -1)) * -1;
	} else if ((arguments[0] == 2) && (arguments[1] == 1)) { //Fahr To Celcius
		FahrToCelcius(arguments[2]);
	} else if ((arguments[0] == 2) && (arguments[1] == 3)) { //Fahr To Kelvin
		temp = (FahrToCelcius(arguments[2]) + 273.15);
	} else if ((arguments[0] == 3) && (arguments[1] == 2)) { //Kelvin To Fahr
		CelciusToFahr(KelvinToCelcius(arguments[2]))
	} else { //Kelvin To Celcius
		KelvinToCelcius(arguments[2]);
	}
	//receivedMessage.channel.send("Converting from " + temp4[0] + " to " + temp4[1])
	receivedMessage.channel.send("Converting from " + temp4[0] + " to " + temp4[1] + "\n" + "Original Value: " + arguments[2] + "\nNew Value: " + temp);
	
}

var servers = {};

function play(connection, receivedMessage){
	var server = servers[receivedMessage.guild.id];
	
	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
	
	server.queue.shift();
	
	server.dispatcher.on("end", function() {
		if(server.queue[0]) play(connection, receivedMessage);
		else connection.disconnect();
	});
}

//Discord Bot plays videos in the voice channel.	
function musicCommand(arguments, receivedMessage) {
	if(!arguments[0]){
		receivedMessage.channel.send("Please provide a link.");
		return;
	}
	if(!receivedMessage.member.voiceChannel){
		receivedMessage.channel.send("You must be in a voice channel:");
		return;
	}
	if(!servers[receivedMessage.guild.id]) servers[receivedMessage.guild.id] = {
		queue: []
		
	}
	
	var server = servers[receivedMessage.guild.id];
	
	server.queue.push(arguments[0]);
	
	if(!receivedMessage.guild.voiceConnection) receivedMessage.member.voiceChannel.join().then(function(connection) {
		play(connection, receivedMessage);
	});
}

function skipCommand(arguments, receivedMessage) {
	var server = servers[receivedMessage.guild.id];
	if(server.dispatcher) server.dispatcher.end();
}

function stopCommand(arguments, receivedMessage) {
	var server = servers[receivedMessage.guild.id];
	if(receivedMessage.channel.voiceConnection) { message.guild.voiceConnection.disconnect(); }
}



function helpCommand(arguments, receivedMessage){
	temp2 = ['multiply', 'divide', 'add', 'subtract'];
	if (arguments.length == 0) {
		receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`");
	} else {
		compareArgs = arguments[0].toLowerCase();
		if (temp2.includes(compareArgs)){
			receivedMessage.channel.send("Looks like you need help with the " + compareArgs + " command. Here is a quick guide:" + "\n" + "Enter in ''!" + compareArgs + " [Value 1] [Value 2]'' in order to " + compareArgs + ".");
		} else if (compareArgs == "convert"){
			receivedMessage.channel.send("Looks like you need help with the convert command. Here is a quick guide:" + "\n" + "```Celcius = 1, Fahrenheit = 2, Kelvin = 3```" + "\n" +"Enter in ''!convert [Current temp unit] [Desired temp unit] [Value]'' in order to multiply.");
		} else {
			receivedMessage.channel.send("It looks like you need help with " + "[" + arguments + "]" + compareArgs);
		}
	}
}
client.login("#");