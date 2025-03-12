/*


12/3/25 
Alright kids, lets take a look at the steps it'll take to get the second round going, in more detail than the readme.md. 

First things first, lets log who, if anybody is outside of the submarine, and check that we've got that information in 
the appState. 

On second thought, we can use the returnedPlayerIDs array and look to anybody who isn't in that array. We can also
use it to check and see if everybody returned to the submarine. 












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