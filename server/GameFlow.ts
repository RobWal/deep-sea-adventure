/*

'pre-start'
{
    'next_players_turn'
    'decided_pickup_treasure'
}
'rolling'
'rolled'
'moving'
'moved'
{
    'decided_pickup_treasure'
    'decided_leave_treasure
}





APPACTIONS

ADD_PLAYER = "add_player",
SET_TOTAL_PLAYERS = "set_total_players",
GENERATE_PLAYERS = "generate_players",
SHUFFLE_PLAYERS = "shuffle_players",
START_GAME = "start_game",
SET_CURRENT_PLAYER = "set_current_player",
ROLL_DICE = "roll_dice",
MOVE_PLAYER_TOKEN = "move_player_token",
SHOW_DICE_RESULTS = "show_dice_results",
TREASURE_PICKUP_DECISION = "treasure_pickup_decision",
TREASURE_LEAVE_DECISION = "treasure_leave_decision",
TREASURE_DROP_DECISION = "treasure_drop_decision",
NEXT_PLAYER_TURN = "next_player_turn",
SET_OXYGEN_LEVEL = "set_oxygen_level",


Global Oxygen / Round
Average movement / Round
Oxygen left 

oxygenLeft / (globalOxygen/Round) = rounds before dead
average movement / round * rounds before dead = estimated conservative time to return

Not including things like players returning, players picking up more treasure or bunny hopping. 

*/
