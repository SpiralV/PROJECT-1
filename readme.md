# Rock Paper Scissors 2 (working title)

<img src="https://i.ibb.co/7NsTd89/preprealphamock.png">

## Basal Declarations

>### Choose "Rock Paper Scissors" as a character
>
>### Vertical scroll through blocks of R/P/S (2D audiosurf type thing)
>
>### Endless/High-score, possibly 3-5 premade levels

## mights and maybes

>- *might*: end up making Ice the default character if it's too much
>- *might*: add shooting/enemies
>- *maybe*: different anim/icon depending on current block
>- *maybe*: Add buffs/debuffs for being in specific zones *stretch* shoot items in different zones, flyover for status effect change
>- *maybe*: zone blocks alternate/change standard drop function per player agency, com ai, or random occurrences of special block conditions

## structured speculah

>- *unsure*: what to actually name my "characters", what will beat what, how to actually do any of this
>- *unsure*: make 2 players WASD Lctrl(shoot optional) && Arrows Rctrl(shoot optional) || make 2nd player COM, enable/disable enemies && control with mouse+click(shoot) *stretch* add right click dodge or alternate fire
>- *unsure*: should laser be fire? should rocket be something else? should ice be something else? I'm having trouble thinking of an icon, image, or enemy attack for laser specifically.
>- *unsure*: Ice is general, and magical, Maybe I can just turn this whole damn thing into a Frozen game where you play as Elsa, dodging the core elements and their attacks.
>
>>### MUCH TO THINK ABOUT
>>
>>- *VERY unsure*: if single player route, change to elemental dodge game, maybe make player character elsa, hey frozen 2 was pretty good guys
>>- *VERY unsure*: could just be a block clearing game too, where your chosen character deletes bads and collects goods

## present working game logic

>### Rock=rocket="power"
>
>### Paper=laser="energy"
>
>### Scissors=shivers="ability"
>
>
>- *quotes are to be my js tags, using Destiny nomenclature, Ice ability is core influence from Destiny, so it felt appropriate*
>
>>### Game Logic
>>
>>- 3 different blocks descending, randomly || set levels
>>- 6-10+ origin columns
>>- player alternates current column to move piece || mouse move
>>- descending blocks in connected pieces, and adhere to grid
>>
>>### Rocket Logic
>>
>>- singular or multi rocket icon or basically an airplane
>>- Rocket bombs laser blocks
>>- Rocket stands in Rocket to be safe/heal?
>>- Rocket slowly freezes/dies in Ice
>>
>>### Laser Logic
>>
>>- Laser...rifle? icon? perpetual laser beam originating below start point?
>>- Laser melts ice blocks
>>- Laser safe in laser blocks
>>- Laser gets bombed or something idk
>>
>>### Shiver Logic
>>
>>- some kind of circular ice ring or a snowflake or something
>>- Freezes/shatters rocket blocks
>>- safe in ice blocks
>>- melts in laser blocks

***

## freethink zone

***

**executing KISS substructures . . .**  
**. . . Simplifying (PROJECT-1) . . .**

***

- I like the block clearing idea actually. I wanted them to move freely through zones and all this extra stuff that I probably would need months to fine-tune.
- Just have blocks descend in groups or columns and if they are in groups they take x hits to destroy based on x number of blocks connected
- can pass through, collect, or ignore safe blocks, dodge negative blocks
- should it be an instant game over? adding health bars? tough to say for sure.
- Can I use gamemaker from 15 years ago? lol. I think I could make it in that pretty easily. I will be checking out canvas and phaser for modern ideas and browser implementations

***

**. . . PROJECT-1 . . .** ...Simplified?

***

## additional ramblings below

- to be filled with nonsense
- you were warned
- could possibly turn it into "rock" is always squares, laser is always L blocks, and Ice is straight lines, turn it into some kind of Tetris shooter type thing. 