const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js');
const Quote = require('../../models/Quote');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply('You can only run this command in a server.');
      return;
    }

    await interaction.deferReply();

    const randomQuote = await Quote.aggregate([{ $match: { guildId: interaction.guildId } }, { $sample: { size: 1 } }]);

    if (randomQuote[0] != null) {
      const userObject = await interaction.guild.members.fetch(randomQuote[0].userId);
      interaction.editReply(`"${randomQuote[0].quote}" - ${userObject}`);
    } else {
      interaction.editReply('There are no quotes for this server yet!');
    }
  },
  name: 'random-quote',
  description: 'Replies with a profound quote.',
};
