const { SlashCommandBuilder } = require('discord.js');
const { saveCalender } = require('../controllers/calendarController')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addevent')
        .setDescription('Use this command to save a important task')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('What needs to be planned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('When does it need to be planned (dd/mm/yyyy)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('At what time does it need to be planned (hh:mm)')
                .setRequired(true)),
    async execute(interaction) {
        let msg = await saveCalender(interaction)
        await interaction.reply(msg);
    },
};