const { EmbedBuilder } = require('discord.js');
const Event = require('../models/event')

const showCalender = async (interaction) => {
    let limit = 10
    if (interaction.options.getString('limit')) {
        limit = interaction.options.getString('limit')
    }

    let events = await Event.find().sort({ 'date': 1 }).limit(limit)


    const eventsEmbed = new EmbedBuilder().setColor(0x0099FF)
        .setTitle('Following events')

    if (events.length > 0) {
        events.forEach(event => {
            eventsEmbed.addFields({
                name: `${event.date.toLocaleString()}`, value: `${event.text}`
            })
        });
    }
    else {
        eventsEmbed.addFields({
            name: 'No events found', value: 'Use /addevent to add some'
        })
    }

    return eventsEmbed
}

const saveCalender = async (interaction) => {
    let name = interaction.options.getString('name');
    let date = interaction.options.getString('date').split("/");
    let time = interaction.options.getString('time').split(":");


    check = checkFormat(name, date, time, 'add')

    if (check.check) {
        date = check.msg
    }
    else {
        return check.msg
    }


    await Event.create({ date: date, text: name })
    return 'Event has been created'
}

const deleteEvent = async (interaction) => {
    let name = interaction.options.getString('name');
    let date = interaction.options.getString('date').split("/");
    let time = interaction.options.getString('time').split(":");

    check = checkFormat(name, date, time, 'delete')

    if (check.check) {
        date = check.msg
    }
    else {
        return check.msg
    }

    const deletedEvent = Event.findOneAndDelete({ text: name, date })
    await Event.deleteOne(deletedEvent)
    return 'Event has been deleted'
}

const checkFormat = (name, date, time, type) => {
    currentDate = new Date()

    if (!name || !date || date.length < 3 || time.length < 2) {
        return {
            check: false, msg: 'Something is wrong'
        }
    }

    if (Number(date[0]) < 1 || Number(date[0]) > 31 || Number(date[1]) < 1 || Number(date[1] > 12)) {
        return {
            check: false, msg: `Date: ${date[0]}/${date[1]}/${date[2]} is not valid!`
        }
    }

    if (Number(time[0]) < 0 || Number(time[0]) > 24 || Number(time[1]) < 0 || Number(time[1] > 60)) {
        return {
            check: false, msg: `Time: ${time[0]}:${time[1]} is not valid!`
        }
    }

    if (date[2].length !== 4) {
        return {
            check: false, msg: `Year: ${date[2]} is not valid!`
        }
    }

    date = new Date(date[2], date[1] - 1, date[0], time[0], time[1])

    if (type == 'add' && date.getTime() < currentDate.getTime()) {
        return {
            check: false, msg: `You do know the day is ${currentDate.toLocaleString()} right?`
        }
    }

    return {
        check: true, msg: date
    }


}

module.exports = {
    showCalender,
    saveCalender,
    deleteEvent
}