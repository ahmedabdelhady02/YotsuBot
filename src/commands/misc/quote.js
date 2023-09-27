const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'quote',
  description: 'Replies with a profound quote.',
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[]

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const filePath = path.join(__dirname, '..', '..', 'quote.txt');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }

      // splitting the file content by new line to get an array of lines
      const lines = data.split('\n');
      const quote = lines[Math.floor(Math.random() * lines.length)];
      interaction.editReply(`${quote}`);
      //console.log(lines);
    });
  },
};
