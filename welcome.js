const welcome_messages = require('./welcome_messages.json');

async function welcome(client, member, left=false) {
	let oldIdentity = [];
	const intro = 'Welcome to ***The Starry Expanse Project\'s*** official Discord server!\nPlease make sure to read the rules!'
	
	// Get random message
	const message = welcome_messages[Number(left)][Math.floor(Math.random() * welcome_messages[Number(left)].length)];

	// Try changing nickname and avatar
	try {
		const cho = member.guild.members.get(client.user.id);
		let filename = `avatars/${message[0].toLowerCase()}.png`;
		oldIdentity = [cho.nickname, client.user.displayAvatarURL]
		await cho.setNickname(message[0]);
		await client.user.setAvatar(filename);
	} catch(err) {
		console.error('Could not send change nickname or send avatar. Do we have permissions and does ' + filename + ' exist?');
	}

	// Send greeting on #welcome channel
	try {
		const welcome_channel = member.guild.channels.find(ch => ch.name == 'welcome');
		await welcome_channel.send(message[1].replace('@name', member) + left ? '' : (' ' + intro));
	} catch(err) {
		console.error('Could not send welcome message. Does #welcome exist and do we have permissions?');
	}
	
	// Restore old nickname and avatar
	try {
		if(oldIdentity.length >= 2) {
			const cho = member.guild.members.get(client.user.id);
			await cho.setNickname(oldIdentity[0]);
			await client.user.setAvatar(oldIdentity[1]);
		}
	} catch(err) {
		console.error('Could not send change nickname or send avatar. Do we have permissions and does ' + oldIdentity[1] + ' exist?');
	}
}

module.exports = welcome;
