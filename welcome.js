const welcome_messages = require('./welcome_messages.json');

async function welcome(client, member) {
	// Get random message
	const message = welcome_messages[Math.floor(Math.random() * welcome_messages.length)];

	// Try changing nickname and avatar
	try {
		const cho = member.guild.members.get(client.user.id);
		let filename = `avatars/${message[0].toLowerCase()}.png`;
		await cho.setNickname(message[0]);
		await client.user.setAvatar(filename);
	} catch(err) {
		console.error('Could not send change nickname or send avatar. Do we have permissions and does ' + filename + ' exist?');
	}

	// Send greeting on #welcome channel
	try {
		const welcome_channel = member.guild.channels.find(ch => ch.name == 'welcome');
		await welcome_channel.send(message[1].replace('@name', member));
	} catch(err) {
		console.error('Could not send welcome message. Does #welcome exist and do we have permissions?');
	}
}

module.exports = welcome;
