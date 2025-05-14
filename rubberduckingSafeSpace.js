/*

14/5/25 

I just realised that the way I'm checking to see if there's someone on the last available tile in the tile array, won't work,
as there can be multiple tiles in the tile array with the last available position. For example, if there is a tile stack of three
at the end of the array, they will all have .location of 26 or something. This will cause errors. 

I instead need to allocate the last available tile according to the place in the tile array, e.g. if there are 26 tiles, 
and the last four tiles have .location of 21, the last position will be 26th, not 21. 

No wait, that's all fine, it's EXACTLY WHY I'm doing it this way, because even if there are twenty tiles in location 15, 
that is still just one location according to the game, and should not be distinguished as individual spaces. 

24/3/25

Drowned player treasures not assigning correctly - Alright, so looking at the code, the treasures are in the correct locations prior 
to the 'move_drowned_players_home' section of code where the tile treasure array is spliced. 
    I found the issue, "newTileArray[i].location = tilePositionCounter;" changes the location no matter what. 
    I think the easiest way to ensure tiles go where they need to after one round, is to record the length of the tile array,
before any modifications (e.g. removal of empty treasure tiles, addition of drowned player treasure). 
    Alright, I've successfully altered it so that it loops through the original treasure tiles the correct amount of times. Now
I just need to add the new tiles onto the end of it. 

Player locations changing twice bug - Looking at the old code, I identified that the player locations were only being updated once officially in the application-context
file, so it had to be getting mutated elsewhere. Sure enough, where I loop through the players who drowned to add their treasure 
to the trail, it mutated appState.players by not deep cloning it first. 


21/3/25

Alright, so we have to: 
 - remove the tiles from the players who drowned.
 - add the tiles from the players who drowned to the tail of the array. 

Brains fried, we're very close. For some reason the tiles, when being added to the end of the array, aren't stacking nicely. 
We can fix it - We have the tecnhnology. 


20/3/25 
Hey kids, we're back with some 'lets order the players from the furthest away, to the closest to the submarine, in a way that allows us to add the dropped
treasures back to the treasure pile in a coherent way'. 

So first what we need to do is take a snapshot on the game state right before the game ends. I think the easiest way to do this is to create an array that contains
the appState.players.id in order of those furthest-closest. That way we can access the treasure belonging to the ID's of those players in that order.


12/3/25 
Alright kids, lets take a look at the steps it'll take to get the second round going, in more detail than the readme.md. 

First things first, lets log who, if anybody is outside of the submarine, and check that we've got that information in 
the appState. 

On second thought, we can use the returnedPlayerIDs array and look to anybody who isn't in that array. We can also
use it to check and see if everybody returned to the submarine. 

Alright, we have everybody back in the submarine. Now to clean up the tiles, I expect this will be difficult. 


??/??/25
Testing save game functionality. 

The current step seems to trigger twice regardless of what it is, e.g. 'rolling' 'rolled' 'moving' etc. 
Additionally, regardless of what step it is, the players are shuffled on the monitor for no apparent reason. 

I'm adding an extra step to buffer between the actual in game steps such as rolling rolled moving etc, and loading the game. 
Hopefully this will mean the currentStep only triggers once and allows the game to flow smoothly. 

The addition of a pre-loaded-game buffer 'loading_game' seems to have worked... but the shuffling still persists. 
I'll try to find the source of the shuffle and what might be causing it, it may be due to the redirect to /gameContainer.
I really hope it's not tied to the logic of the display.. really, really hope. 

As it turns out, it looks like an enormous amount of code is running every single time anything changes, potentially the whole
game. This includes the code that shuffles the player tokens in /WhoGoesFirst. 

*/