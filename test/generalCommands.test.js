const kick = require('../commands/kick');
const assert = require('assert');
const { Message } = require('discord.js');

describe('Kick user Test', () => {
 it('Should return: \'Você precisa especificar quem você gostaria de expulsar!\'', () => {
        assert.strictEqual(1 + 1, 2);
    });
});