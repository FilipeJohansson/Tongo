const kick = require('../commands/tongo');
const assert = require('assert');
const Discord = require('discord.js');
const client = new Discord.client;
const tongo = require('../commands/tongo');
const userConstruct = {
    id: '282224142345043970',
    username: 'Havoc'
}

const users = new Map().set('282224142345043970', userConstruct);
client.message


console.log(tongo.execute('', ''));

/*
Collection(1) [Map] {
    '282224142345043970' => User {
      id: '282224142345043970',
      username: 'Havoc'
    }
  }
*/
/*
describe('Kick user Test', () => {
        describe('test', () => {
                test('Should return: \'Você precisa especificar quem você gostaria de expulsar!\'', () =>
                //expect(
                //    kick.execute() 
                //).toEqual(true));
                //expect(
                //    kick.execute(
                //        {
                //            users:new Map() 
                //        }
                //    )
//
                //  ).toEqual(false));

                
            }
        )
    }
)
*/
/*
test('returns true if thanking self with THANK YOU', () =>
      expect(
        shouldThank(({
          content: 'THANK YOU <@86890631690977280>',
          mentions: { users: new Map().set('86890631690977280', {}) }
        } as Partial<Message>) as never)
      ).toEqual(true));
*/