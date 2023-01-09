const deck = [
	'AS','KS','QS','JS','1S','9S','8S','7S','6S','5S','4S','3S','2S',
	'AC','KC','QC','JC','1C','9C','8C','7C','6C','5C','4C','3C','2C',
	'AH','KH','QH','JH','1H','9H','8H','7H','6H','5H','4H','3H','2H',
	'AD','KD','QD','JD','1D','9D','8D','7D','6D','5D','4D','3D','2D',
]

let gameDeck = [];

let players = [
	{
		name: 'Rick Dickless',
		cards: [],
		chips:1000,
		bet:0,
		highHand:[],
	},
	{
		name: 'Bubbles',
		cards: [],
		chips:1000,
		bet:0,
		highHand:[],
	},
	{
		name: 'Sweaty',
		cards: [],
		chips:1000,
		bet:0,
		highHand:[],
	},
]

let flop = [];
let turn = [];
let river = [];
let communityCards = [];
//functions

//shuffle
const shuffle = (array) => {
	let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  gameDeck = array;
}

//deal cards
const dealCards = () => {
	shuffle(deck);
	players.forEach((player) => {
		player.cards.push(gameDeck.pop().split(''))
		console.log(player.cards)
	})
	players.forEach((player) => {
		player.cards.push(gameDeck.pop().split(''))
		console.log(player.cards)
	})
	console.log(gameDeck.length)
}

const dealFlop = () => {
	flop.push(gameDeck.pop())
	flop.push(gameDeck.pop())
	flop.push(gameDeck.pop())
	console.log(flop)
	console.log(gameDeck.length)
}

const dealTurn = () => {
	turn.push(gameDeck.pop())
	console.log(turn)
	console.log(gameDeck.length)
}

const dealRiver = () => {
	river.push(gameDeck.pop())
	console.log(river)
	console.log(gameDeck.length)
}

const handValue = () => {
	players.forEach((player) => {
		const hand = []
		player.cards.forEach((card)=>{
			hand.push(card)
		})
		flop.forEach((card)=> {
			hand.push(card)
		})
		hand.push(turn[0])
		hand.push(river[0])

	})
}

const makeCommunityCardArray = () => {
	flop.forEach( card => {
		communityCards.push(card)
	})
	communityCards.push(turn[0])
	communityCards.push(river[0])
	console.log(communityCards)
}

const addCommunityCardsToPlayerCards = (players, communityCards) => {
	players.forEach( player => {
		communityCards.forEach( card => {
			player.cards.push(card.split(''))
	})
	})
}

const findOfAKindCards = (player) => {
	console.log(player.cards)
	player.cards.forEach( currentCard => {
		player.cards.filter(card => {
			if(card[0]===currentCard[0] && player.cards.indexOf(card)!=player.cards.indexOf(currentCard)){
				console.log(card)
				console.log(currentCard)
				console.log ('match!')
				//need to push these cards to highHand array
			}
		})
	})
}


const determineHighHand = () => {

}

dealCards();
dealFlop();
dealTurn();
dealRiver();
handValue();
makeCommunityCardArray();
addCommunityCardsToPlayerCards(players, communityCards);

findOfAKindCards(players[0]);

determineHighHand();


//logic notes
	//five card hands
	//if straight = true and flush = true
		//straigh flush
	//if four same number
		//four of a kind + high card
	//if two one number three other number
		//full house
	//if five of same suit
		//flush
	//if five consecutive numbers
		//straight
	//if three same number
		//three of a kind + high card
	//if two same number
		//pair + high card
	//high card

	
	