const { SlashCommandBuilder } = require('discord.js');
const { showCalender } = require('../controllers/calendarController')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('showcalendar')
        .setDescription('Show the saved events')
        .addStringOption(option =>
            option.setName('limit')
                .setDescription('Add a limit on how many you want to see (default 10)')
        ),
    async execute(interaction) {
        let msg = await showCalender(interaction);
        await interaction.reply({ embeds: [msg] });
    },
};