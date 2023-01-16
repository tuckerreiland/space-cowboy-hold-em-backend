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
		cards: [['K','S'], ['9','C'],  ['A','S'], ['8','D'], ['Q','S'],['J','S'], ['1','S']],
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
	})
	players.forEach((player) => {
		player.cards.push(gameDeck.pop().split(''))
	})
}

const dealFlop = () => {
	flop.push(gameDeck.pop())
	flop.push(gameDeck.pop())
	flop.push(gameDeck.pop())
}

const dealTurn = () => {
	turn.push(gameDeck.pop())
}

const dealRiver = () => {
	river.push(gameDeck.pop())
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
}

const addCommunityCardsToPlayerCards = (players, communityCards) => {
	players.forEach( player => {
		communityCards.forEach( card => {
			player.cards.push(card.split(''))
	})
	})
}

//hand value experimentation functions
const determineStraight = (player) => {
	const cardValueRanks = [
		['A', 13],
		['K', 12],
		['Q', 11],
		['J', 10],
		['1', 9],
		['9', 8],
		['8', 7],
		['7', 6],
		['6', 5],
		['5', 4],
		['4', 3],
		['3', 2],
		['2', 1],
	]
	let straight = []

	//helper functions
	const findFaceValue = (card) => {
		return cardValueRanks.find ( value => value[0]===card[0])
	}

	const createStraight = (card, nextCard) => {
		if(!straight.length){
			straight.push(card)
		}
		if(straight.length && straight.length<5){
			let lastCardPushed = straight.slice()[0]
			let faceValue = findFaceValue(lastCardPushed)
			let nextFaceValue = faceValue[1]-1
			let nextCardToPush = player.cards.find( nextCard => findFaceValue(nextCard)[1]===nextFaceValue)
			if (nextCardToPush) {
				straight.push(nextCardToPush)
			}
		}
		
		// for ( let i=player.cards.indexOf(card); i<player.cards.length; i++){
		// 	let currentCard = card
		// }
		}

	createStraight(player.cards[0], createStraight)

	// const findNextCard = (card) => {
	// 	for (let i = 0; i < player.cards.length; i++) {
	// 		let faceValue = findFaceValue(card)
	// 		console.log(faceValue)
	// 		let nextFaceValue = faceValue[1]-1
	// 		let nextCard = player.cards.find( nextCard => findFaceValue(nextCard)[1]===nextFaceValue)
	// 		if (nextCard){
	// 			console.log(nextCard)
	// 			straight.push(nextCard)
	// 		}
	// 		}
	// 	//return i so that I can push from eaxh element in the array if I can't fill the array with it.
	// }
	
	// const findStraight = () => {
	// 	if(straight.length===0){
	// 		straight.push(player.cards[0])
	// 		console.log(straight.slice())
	// 		findNextCard(['K', 'S'])
	// 	}
		
	// }

		
	// for (let i = player.cards.indexOf(currentCard); i < player.cards.length; i++) { 
	// 	currentCard = player.cards[i]
	// 	let faceValue = cardValueRanks.find ( value => value[0]===currentCard[0])
	// 	for (let l = player.cards.indexOf(currentCard)+1; l < player.cards.length; l++) {
	// 		let card = player.cards[l]
	// 		let nextFaceValue = cardValueRanks.find ( value => value[0]===card[0])
	// 		if (faceValue[1]-1 === nextFaceValue[1]){
	// 			console.log(currentCard)
	// 			console.log(card)
	// 			currentCard = card
	// 			console.log(`new starting card${currentCard}`)
	// 		}
	// 	}

		// player.cards.forEach ( card => {
		// 	let nextFaceValue = cardValueRanks.find ( value => value[0]===card[0])
		// 	console.log(faceValue)
		// 	console.log(nextFaceValue)
		// })
	// }
	console.log(straight)
	//I need to make it so that it will start on the first element in the array, then it will go to the next element in the array and keep adding on to the straight, as opposed to just finding a number that is less than or greater than any given array value.  If I build the straight off the high card, then I immediately have my high straight ordered from high to low.
	//Basically, I need to see if the given element, say a king, has a card of immediately lesser value, a queen in this case.
		//Then, the queen becomes the next element that I'm trying to find an immediately lesser value, or a jack, and so on
	//But I also need to check to see if there is a higher value.  Meaning that if a player has six cards that result in a straight, it will start the straight from the high card.
}

const determineFlush = (player) => {
	console.log(player.cards)
	let spades = 0;
	let clubs = 0;
	let hearts = 0;
	let diamonds = 0;
	player.cards.forEach( currentCard => {
		switch (currentCard[1]) {
			case 'S': spades++
			break;
			case 'C': clubs++
			break;
			case 'H': hearts++
			break;
			case 'D': diamonds++
			break;
		}
	})
	if (spades ===5 ){
		console.log('spades flush')
	}
	if (clubs ===5 ){
		console.log('clubs flush')
	}
	if (hearts ===5 ){
		console.log('hearts flush')
	}
	if (diamonds ===5 ){
		console.log('diamonds flush')
	}
}

const determineInKindCards = (player) => {
	console.log(player.cards)
	let matches = []
	player.cards.forEach( currentCard => {
		player.cards.forEach(card => {
			if(card[0]===currentCard[0] && player.cards.indexOf(card) != player.cards.indexOf(currentCard)){
				matches.push(currentCard)
				// matches.filter((card, index) => index !=matches.indexOf(card))
			}
		//I need to figure out how to get it to only send a card to the high hand array once.
		//I think I may need to take a step back and rethink the architecture of the game and how I do this.
		//First, I need a way to determine the 'high card' so that will probably mean giving each of the letters/numbers a ranking
			//this could also be achieved with a local array in a separate function if I want to avoid complicating the deck
		//The ranking could help me design a system for identifying straights and flushes.  
			//Really I'm only interested in the suit so long as they have five of the cards, it's the only hand where suit matters
		//If it's not a straight or a flush then it's a combination of same value cards
		//then we need to have this work like this:
			//does player have a flush or straight?
				//if only flush the that's the high hand
				//if only straight then that's the high hand
				//if both are true then straight flush is the high hand
				//determine high card of high hand
				//if neither flush nor straight are true then:
			//does player have matching cards?
				//if four of a value then four of a kind is high hand
				//if three of a value then three of a kind is high hand
				//if two of a value then pair is high hand
				//if two or more pairs of differnent value then highest two pairs are high hand
				//if three of a kind and two or more pairs of differnent value then highest three of a kind and highest pair are high hand
				//in all cases, highest unused card is added to high hand
				//high card is determined from high hand after high hand value is determined
			//edge cases
				//matches that exceed the five playable cards
					//three pair (choose two highest pair and highest remaining card)
					//two three of a kind (would be full house with higher three of a kind keepign all three cards)
				//players have same hand
					//not possible with straight flush
					//in this case, player with higher card in the hole wins
					//only tie is identical full houses
			
		})
	})
	player.highHand.push(matches)
	console.log(player)
}

const determineHighHand = () => {

}

// dealCards();
// dealFlop();
// dealTurn();
// dealRiver();
// handValue();
// makeCommunityCardArray();
// addCommunityCardsToPlayerCards(players, communityCards);

// determineInKindCards(players[0]);

determineFlush(players[0])
determineStraight(players[0])

// determineHighHand();

// const filterTest = () => {
// 	const arrayOne = [1,2,3,4]
// 	const arrayTwo = [3,4,5,6]

// 	// const result = arrayOne.filter( num => {
// 	// 	if (num != 2 &! arrayTwo.filter( char => char!=num)){
// 	// 		return
// 	// 	}
// 	// });
// 	console.log(arrayOne.filter( num => !arrayTwo.includes(num)))
// }
// filterTest();


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
	//two pairs
		//two pairs
	//if two same number
		//pair + high card
	//high card

	
	