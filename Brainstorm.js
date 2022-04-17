/*

Single player - One round
    1:
    {
        onEvent (click/buttondown) function to proceed
    }
    2:
    {
        interface {
            Escape button {
                TODO - Placeholder for options eg. quit / save / change colour / whatever
            }
            Help button {
                TODO - Placeholder for game rules
            }
            Choose player name {
                Requires a state playerName [playerName, setPlayerName] = useState("Enter your name");   ***Does it require state? Or can it be set and forget?***
                Push player to players[{}] with default values
            }
            Select players {
                Requires a state numberOfPlayers [numberOfPlayers, setNumberOfPlayers] = useState(2); ***Does it require state? Or can it be set and forget?***
                onClick {
                    if(playerName !== <some checks>) { run game with that many players }
                }
            }
        }
    }
    3:
    {
        Populate base game state {
            Requires a state [currentOxygen, setCurrentOxygen] = useState(25);
            Requires treasures to randomise in specific way {
                Thirty two tiles total {
                    8x id(1->8), value(2x 0->3), mapPosition(1->8), img(1)
                    8x id(9->16), value(2x 4->7), mapPosition(9->16), img(2)
                    8x id(17->24), value(2x 8->11), mapPosition(17->24), img(3)
                    8x id(25->32), value(2x 12->15), mapPosition(25->32), img(4)
                }
            }
            treasure {
                id: number between 0-31,
                value: number between 0-15,
                mapPosition: number between 0-32 (0 is submarine ie. safe, 32 is last available square),
                isPickedUp: boolean, 
            }
            players {
                players array/object initialised, names generated either locally (P1 + bots) or locally + serverside (PvP)
                [{
                    name: string (can be randomly assigned for bots, requires state ***Does it require state? Or can it be set and forget?***),
                    colour: string,
                    score: number (requires state, default 0),
                    mapPosition: number between 0-32 (requires state, default 0),
                    direction: string ('+', '-'),
                    treasures: [] array of treasureId's (requires state, default empty),
                }]
            }
            dice {
                [amountRolled, setAmountRolled] = useState([1,3]);
            }
        }
    }
    4:
    {
        interface {
            Text {
                'Who will go first?'
            }
            icons {
                icons === number of players
            }
        }
    }
    5:
    {
        [whoseTurn, setWhoseTurn] = useState('')
        setWhoseTurn('<playerName>')
        Text {
            '<playerName> is going first!'
        }
    }
    6 onwards
    {
        rollTheDice {
            if(yourTurn){
                interface {
                    Text: 'It is your turn to roll!'
                    Button {
                        Text: 'Roll the dice!'
                        onClick(()=>{
                            removeRollDisplay();
                            dice {
                            two images that load based on two randomised rolls between 1-3
                            setAmountRolled([x, y]);
                        }
                    }
                }
            } else {
                announcer {
                    Text: '<whoseTurn.name> is rolling!'
                }
            }
        }
        rollResults {
            announcer {
                Text: '<currentPlayer> rolled a <amountRolled>!',
                Dice: img changes according to rolls
            }
        }
        playerMoves {
            currentPlayer.mapPosition += `${currentPlayer.direction}${amountRolled}` (or something)
        }
        treasureCheck {
            [treasureChoice, setTreasureChoice] = useState('')
            if(playerDirection === '+') {
                if(treasure[mapPosition].isPickedUp===false){
                    if(yourTurn &&){
                        interface {
                            Text: 'What will you do with the treasure?'
                            ButtonOne {
                                Text: 'Pick it up!'
                                onClick(()=>{
                                    setTreasureChoice('takes the treasure!');
                                    removeTreasureDisplay();
                                    addPlayerTreasure(); //swaps the tile you're standing on to 'no treasure' and adds the treasure next to your name and into your array, sets treasure isPickedUp===true, 
                                }
                            }
                            ButtonTwo {
                                Text: 'Leave it!'
                                onClick(()=> {
                                    setTreasureChoice('doesn't take the treasure!');
                                    removeTreasureDisplay();
                                })
                            }
                        }
                    } else {
                        announcer {
                            Text: `${whoseTurn.name} ${treasureChoice}`; 
                        }
                    }
                }
            } else if (playerDirection === '-'){

            }
        }
    }

*/
