const Dice = require("../../../server/game/dice");

describe('Chimera vs Imperial Ninja', function () {
    describe('discard 2 or discard the shown', function () {
        beforeEach(function () {
            this.setupTest({
                mode: 'solo',
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['imperial-ninja', 'blue-jaguar', 'mist-spirit'],
                    dicepool: ['natural', 'natural', 'charm', 'charm'],
                    spellboard: ['summon-butterfly-monk'],
                    hand: ['generosity']
                },
                player2: {
                    dummy: true,
                    phoenixborn: 'corpse-of-viros',
                    behaviour: 'viros-behaviour',
                    ultimate: 'viros-ultimate',
                    inPlay: ['iron-scales'],
                    spellboard: [],
                    threatZone: ['hunting-instincts'],
                    dicepool: ['rage', 'rage', 'rage', 'rage', 'rage']
                }
            });
        });

        it('imperial ninja behaviour', function () {
            spyOn(Dice, 'd12Roll').and.returnValue(1);

            this.player1.clickAttack(this.ironScales);
            this.player1.clickCard(this.imperialNinja);
            expect(this.imperialNinja.exhausted).toBe(true);
            expect(this.player1).toHaveDefaultPrompt();
        });
    });
});
