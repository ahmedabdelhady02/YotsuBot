const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Quote = require('../../models/Quote');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const quoteAuthorId = interaction.options.get('quote-author').value;
    const quote = interaction.options.get('quote').value;
    const quoteAuthor = await interaction.guild.members.fetch(quoteAuthorId);

    await interaction.deferReply();

    const newQuote = new Quote({
      userId: quoteAuthorId,
      guildId: interaction.guildId,
      quote: quote,
    });
    await newQuote.save();
    interaction.editReply(`Quote added.\n"${quote}" - ${quoteAuthor}`);
  },

  name: 'quote',
  description: 'Quote a user.',
  options: [
    {
      name: 'quote',
      description: 'The quote.',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'quote-author',
      description: 'The person being quoted.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
