# Deep Sea Adventure

# What is it?

Deep Sea Adventure is an online single-player game which is a recreation of the table-top board game by the same name, created by Jun Sasaki and Goro Sasaki.

# The general approach

This project was a large undertaking for me that required pushing my React boundaries and the approach I took strongly reflects that. The game had a lot of potential when I began brainstorming, from playing a single round on your own against AI's, to playing online with friends in real time, complete with logins and customisable features. The scope of the project had no real ceiling.

While fleshing out what was realistic in the given timeframe, it became quite clear that this would take a large amount of time, so the minimum viable product became a single-player single-round experience.

The first steps of the project were a deep dive into the details of what the game would look like, what each step might be and creating a wireframe to reflect that. This involved creating visual assets for both the wireframe and the game itself as the need for images arose.

From there the major next step was fleshing out the structure of the game, both in terms of what would be required for it to work, as well as how to structure that in a coherent way. After the foundations were there, it became a continual process of iterating over the game cycle, implementing features one by one, finding and fixing edge cases, as well as refactoring code as additions were made.

# Have a look!

https://deep-see-adventure.herokuapp.com/

## What a user is greeted with when first loading the application:

![Home screen](https://i.imgur.com/g65mKLw.png 'Home screen')

## Some options available to the user before the game commences:

![Starting options](https://i.imgur.com/RqQtF24.png 'Starting options')

## What the user sees when they're in the game

![In game view](https://i.imgur.com/GZBoYtx.png 'In game view')

# Wireframe

https://www.canva.com/design/DAE9nxGrJQU/n800FeMsJyuLdoipYZEGMA/edit

# Technologies used:

-   HTML
-   CSS
-   React
-   TypeScript
-   Node.js
-   Heroku

# User stories

-   As an avid table-top gamer and Deep Sea Adventure enthusiast, I want to be able to practice playing the game so that when I play with friends, my approach to the game is better.
-   As someone who enjoys playing table-top games with friends, I sometimes find it hard to find a time where everybody is available, sometimes there are months between meetings so I want to be able to scratch my Deep Sea Adventure itch in the meantime so that time between meetings doesn't feel as bad.
-   As someone who enjoys spending short amounts of time playing games, I want to be able to play Deep Sea Adventure so that I can enjoy my time off more.

# Major hurdles

There were a handful of things that took some time to tackle, they all came from my inexperience with React, especially in the case of useContext and useReducer in the context of the game.

Some examples are:

-   Rewriting specific aspects of the useContext game state, especially when deeply nested
-   Fleshing out the flow of the game so that the right code ran at the right time, even in edge cases
-   The pacing of the game so that AI turns didn't happen instantly, but rather had a natural flow that the user could easily interpret
-   Utilising react JSX components in a dynamic way to populate the UI depending on the useContext

# Next steps

There were lots of potential features that could've been implemented, some of the features I was hoping to implement were:

-   Three rounds in total, which would include tile reorganising and drowned diver treasure being added to the trail.
-   Functional 'X' and '?' buttons that navigate the user to an options menu and a help menu respectively.
-   An indicator that makes clear whose turn it is, between the players score and their name.
-   Animations added to the movement of pieces such as treasure tiles and player tokens to more clearly illustrate the game state.
-   Sound effects for a more immersive experience.
-   The ability to 'rewind' the game in order to see 'what if' a user had done something else.
-   Allowing for multiple local users to play against each other, or AI.
-   Allowing for multiple users to play online against each other, or AI, by utilising web sockets.
