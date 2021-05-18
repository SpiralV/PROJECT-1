/* top layer */

// is this effectively a DOMContentLoaded? look it up 
window.onload = function() {
const canvas = document.getElementById('canvas1')
// i dont fully understand context commands
const ctx = canvas.getContext('2d')
// some examples use width and height in the HTML. 2021 best practice?
canvas.width = 1000
canvas.height = 563
// trying to make this clickable but I can only tab to it.
canvas.tabIndex = 1

// setting canvasPosition for determining border collision, unsure so far
// let canvasPosition = canvas.getBoundingClientRect()

/* input zone */

// several attempts at inputs. Current solution has bugs, but most effective so far
// some random combination for inputs that worked for someone, "which" is outdated?

//*button* *keycode* 
// left     37 
// right    39 
// space    32
// enter    13

// canvas.addEventListener('keydown', function(e){
//     move = false
//     x = false
//     y = false
//     let keycode
//     if(window.event) keycode = window.event.keyCode
//     else if (e) keycode = e.which
//     switch(keycode) {
//         case 37:
//             move = true
//             x = 'negative'
//         break
//         case 39:
//             move = true
//             x = 'positive'
//     }
// })

// document.addEventListener('keydown', keyDownHandler, false)
// document.addEventListener('keyup', keyUpHandler, false)
// let rightPressed = false
// let leftPressed = false
// function keyDownHandler(event) {
//     if(event.keycode == 39) {
//         rightPressed = true
//     }
//     if(event.keycode == 37) {
//         leftPressed = true
//     }
// }
// function keyUpHandler(event) {
//     if(event.keycode == 39) {
//         rightPressed = false
//     }
//     if(event.keycode == 37) {
//         leftPressed = false
//     }
// }

// const inpHelp = { left: 37, right: 39 }
// let leftPressed = false
// let rightPressed = false
// function inpManage(event) {
//     if(event.keyCode == inpHelp.left) {
//         leftPressed = true
//         console.log('left')
//     }
//     if(event.keyCode == inpHelp.right) {
//         rightPressed = true
//         console.log('right')
//     }
// }

/* input current solve */

// trying to incorporate these shorthands to control Player input speed, etc.
let leftPressed = false
let rightPressed = false

// not rly doing anything
canvas.addEventListener('mousedown', e => {
    lastDownTarget = e.target
})    

// this is scanning for all key presses, and my attempt to select the specific ones in this case didn't work. I think I am missing a keyup element but I don't know how to implement it. 
canvas.addEventListener('keydown', e => {
    if(lastDownTarget == canvas) {
        if(e.key == 'a') {
            leftPressed = true
        } else {leftPressed = false}    
        if(e.key == 'd') {
            rightPressed = true
        } else {rightPressed = false}    
    }    
})    
// I want to make the game start screen be a dual-function pause/start screen, with p key for pause, start/restart for enter, shoot for m
// for MVP I could just make start/pause buttons in HTML perhaps, but I'd rather incorporate these, and maybe even up down (w, s)


// these could probably go up top but I'm unsure about them for now
const playerPic = new Image()
playerPic.src = 'speship-left.png'
let score = 0
// copied functionality for timing and things. Sometimes it doesn't work right with the block generation/appearing on screen, still in progress with translating/implementing block generator
let gameFrame = 0

// player toolings
class Player {
    constructor (){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.radius = 125
        // not using these (from fishgame) right now, might implement them later
        // this.angle = 0
        // this.frameX = 0
        // this.frameY = 0
        // this.frame = 0
        // this.spriteWidth = 500
        // this.spriteHeight = 500
    }

    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if(rightPressed) {
            this.x += 3
            console.log('right')
        }
        if(leftPressed) {
            this.x -= 3
            console.log('left')
        }
        ctx.fillStyle = 'lightsalmon'
        ctx.fillRect(this.x, this.y, this.radius, 125)
        // attempt to add sprite to hitbox
       // ctx.save()
       // ctx.drawImage(playerPic, this.x, this.y, this.spriteWidth, this.spriteHeight, 0, 0, this.spriteWidth/4, this.spriteHeight/4)
    }
}
// i think this just fires the Player function?
const player = new Player()

// enemy targets
const minosArray = []
// would like to set blocks in groups of four, tetromino shapes, change hit box to morph to block shape, or have them assemble in random groups of four, unsure, might just go for square(shoot) and bar(let pass) blocks
class Tetromino {
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.speed = Math.random() * 1.8
        this.radius = 125
        this.distance
        this.blasted = false
    }
    update(){
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw(){
        ctx.fillStyle = 'slateblue'
        ctx.beginPath()
        ctx.fillRect(this.x, this.y, this.radius, 125)
        ctx.closePath()
        ctx.stroke()
    }
}

// push new Tetromino into a randomizer? Put the randomization into the Tetromino constructor?

// this is copied from codealong, don't fully understand it just looking at it today.
function blockFarm(){
    // look up how to set this interval, or just use the game frames
    if(gameFrame % 2250 == 0){
        minosArray.push(new Tetromino())
    }
    for (let i = 0; i < minosArray.length; i++){
        minosArray[i].update()
        minosArray[i].draw()
        // i dont really understand the radius and splice stuff
        if(minosArray [i].y < 0 - minosArray[i].radius * 2){
            minosArray.splice(i, 1)
        }
        // this makes sure the tetromino isn't already set to be deleted, a bugfix imported from the fish game, also checks if it's "blasted" which is just a collision detection for now. Need to implement shooting bullets but would like input and block gen first (can just be a dodge game at first)
        if(minosArray[i]){
            if(minosArray[i].distance < minosArray[i].radius + player.radius){
                if(!minosArray[i].blasted){
                    score++
                    minosArray[i].blasted = true
                    minosArray.splice(i, 1)
                }
            }
        }    
    }
}    


// Canvas animation activation station
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    blockFarm()
    player.draw()
    ctx.fillStyle = 'slategrey'
    ctx.fillText('score : ' + score, 10, 50)
    gameFrame++
    requestAnimationFrame(animate)
}
animate ()
}

/* general notes */

// TODO basic js setup -- see fishgame(js-2dgame-yt) for help, dont be afraid to google
//    note - google left right space enter inputs for canvas, implement them instead of mouse input, because mouse input is wtf for now
// TODO player movement and shoot buttons
// TODO block generation (simple squares for now)
// TODO block styling(find sprites and draw hitboxes)
// TODO collision detection (shoot/player/block/border)
// TODO menu buttons/options
// TODO reconsider tetris shapes (pending further review of hitboxes)


/* original pseudocode pieces

///// not quite answered yet
dont forget to google codepen vertshoot game
setinterval shoot -- investigating timestops in javascript games
shoot mapped to button -- double check js connectors
left right mapped to button -- same as above (mouse operation stretch goal)
fish game  |google border collision in javascript lol - fishgame good example, to be explored further
score incrementor - score++ my friend (iterations stretch goal)

/ / / / / answered / / / / /
*fish game* |make blocks disappear at bottom if not shot - check fishgame
*canvas*  |let boardspace - canvassed
canvas   |let playerIcon? - affix img to hitbox
canvas   |let start/let stop/let reset - menu bar
canvas   |js class entire menu bar? lol - menu bar/right canvas
js class blocks? for arrays? - yes class Blocks blocksArray
make object generator for blocks - remember constructor() first
check out canvas - definitely done




*/

////// /!\ stretch goals /!\ \\\\\\
// blocks take 4 hits to destroy, scroll speeds balanced accordingly
// scroll illusion
// style everything better
// for example, blocks have hitbars or visually represent life status via each block lighting up or dimming preferably at random
// ie. major spritework
// sound effects
// background music (toggle button)
// full grid movement or mouse movement
// snap blocks into tetris formats and fall/rise in grid patterns only
// score numerical styling based on tetris
// scoring based on dodging straight bars specifically
// high score leaderboard + initials entry
// additional menu option considerations and css stylings to facilitate game modes/window focus
// convoluted 1P endless mode with levels akin to tetris, and lives upon hi-score thresholds
// convoluted 2P co-op mode where other player plays tetris, and the scoring is based on multiple bar types
// easter egg to unlock tempest view mode, and extremely convoluted 1p mode
// extremely convoluted 1P mode where blocks have elements and attacks + buffs/debuffs
// extremely convoluted 1P mode has convoluted plotline about humanity 