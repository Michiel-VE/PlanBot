const { SlashCommandBuilder } = require('discord.js');
const { deleteEvent } = require('../controllers/calendarController')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteevent')
        .setDescription('delete an event')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('What was the event name you want to delete')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('When was the event (dd/mm/yyyy)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('At what time did the event take place (hh:mm)')
                .setRequired(true)),
    async execute(interaction) {
        let msg = await deleteEvent(interaction)
        await interaction.reply(msg);
    },
};