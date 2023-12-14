describe('Farewell action spell', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'odette-diamondcrest',
                inPlay: ['anchornaut', 'mist-spirit'],
                dicepool: ['divine', 'charm', 'divine', 'charm'],
                hand: ['farewell']
            },
            player2: {
                phoenixborn: 'aradel-summergaard',
                inPlay: ['silver-snake', 'iron-worker', 'butterfly-monk'],
                spellboard: [],
                deck: ['purge', 'molten-gold', 'blink', 'summon-gilder']
            }
        });
    });

    it('discard unit with life 2', function () {
        expect(this.player2.deck.length).toBe(4);
        this.player1.clickCard(this.farewell);
        this.player1.clickPrompt('Play this action');

        this.player1.clickDie(0);
        this.player1.clickDie(1);
        this.player1.clickDone();

        this.player1.clickCard(this.ironWorker);

        expect(this.ironWorker.location).toBe('discard');
        expect(this.player2.deck.length).toBe(2);
    });

    it('discard to avoid on destroy effect', function () {
        this.player1.clickCard(this.farewell);
        this.player1.clickPrompt('Play this action');

        this.player1.clickDie(0);
        this.player1.clickDone();

        this.player1.clickCard(this.butterflyMonk);

        expect(this.butterflyMonk.location).toBe('archives');
        expect(this.player1).toHaveDefaultPrompt();
        expect(this.player2.deck.length).toBe(3);
    });
});
