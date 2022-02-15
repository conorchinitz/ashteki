describe('Hope Everthorn', function () {
    describe('Duplicate', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'hope-everthorn',
                    inPlay: ['shadow-hound'],
                    dicepool: ['natural', 'natural', 'charm', 'charm', 'illusion'],
                    spellboard: ['summon-shadow-spirit'],
                    hand: [],
                    archives: ['shadow-hound']
                },
                player2: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['flute-mage']
                }
            });
        });

        it('duplicates', function () {
            expect(this.player1.inPlay.length).toBe(1);
            expect(this.player1.archives.length).toBe(1);
            this.player1.clickCard(this.hopeEverthorn);
            this.player1.clickPrompt('Duplicate');
            this.player1.clickDie(0);
            this.player1.clickCard(this.shadowHound);

            expect(this.player1.archives.length).toBe(0);

            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.aradelSummergaard);
            this.player1.clickCard(this.player1.player.unitsInPlay[0]);
            this.player1.clickCard(this.player1.player.unitsInPlay[1]);
            this.player1.clickPrompt('Done');

            this.player2.clickPrompt('Done'); // no blocker

            this.player1.clickCard(this.player1.player.unitsInPlay[0]); //resolve fights in order
            this.player1.clickCard(this.player1.player.unitsInPlay[1]); //resolve fights in order

            this.player1.clickPrompt('End Turn');

            expect(this.player2).toHaveDefaultPrompt();

            //expect(this.player1.inPlay.length).toBe(1); // failing: still 2
            //expect(this.player1.archives.length).toBe(1); // failing: still 0
        });
    });
});
