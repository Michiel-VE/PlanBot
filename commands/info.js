const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const infoEmbed = new EmbedBuilder().setColor(0x0099FF)
    .setTitle('More info About PlanMaster')
    .setAuthor({ name: 'Michiel Van Eynde', iconURL: 'https://michielve.be/assets/img/icon.webp' })
    .setDescription('Below are all possible commands and their explaination!')
    .addFields(
        { name: '/info', value: 'Brings up this card, don\t worry your\'re the only one who sees this' },
        { name: '\u200B', value: '\u200B' },
        { name: '/showcalender', value: 'Returns a list of all events, you can add a limit if needed, default limit is 10' },
        { name: '\u200B', value: '\u200B' },
        { name: '/addevent', value: 'With this command, you can add a event to the calender, date has to be in format (dd/mm/yyyy)' },
        { name: '\u200B', value: '\u200B' },
        { name: '/deleteevent', value: 'With this command, you can delete a event from the calender, date has to be in format (dd/mm/yyyy)' },
    )
    .setTimestamp()
    .setFooter({ text: 'Made for Web Server Programming', iconURL: 'https://moodle.jamk.fi/pluginfile.php/1/theme_maisteriboost/logo/1666774712/logo%20%2811%29.png' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gives information about what to fill in when planing a task'),
    async execute(interaction) {
        await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
    }
};