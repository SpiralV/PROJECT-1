/* top layer */

// window.onload over DOMContentLoaded to ensure all related content is loaded
window.onload = function() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    // setting attributes (is css redundant?)
    canvas.width = 1000
    canvas.height = 563
    ctx.imageSmoothingEnabled = false
    ctx.font = '22px Helvetica'
    let quad
    let player 
    let shoot
    let enemyTimer = 0
    let score = 0
    const playerPic = new Image()
    playerPic.src = 'speship-left.png'
// trying to make this clickable but I can only tab to it.
    // canvas.tabIndex = 1

// setting canvasPosition for determining border collision, unsure so far
// let canvasPosition = canvas.getBoundingClientRect()

/* input zone */

// several attempts at inputs. Current solution has bugs, but most effective so far
// some random combination for inputs that worked for someone, "which" is outdated?
// // update -- deleted outdated terminology

//*button* *keycode* 
// left     37 
// right    39 
// space    32
// enter    13

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

// this is scanning for all key presses, and my attempt to select the specific ones in this case didn't work. I think I am missing a keyup element but I don't know how to implement it. 
document.addEventListener('keydown', inpHandle) 

//this is sort of working for now, i tried to fix it and ended up really angry
function inpHandle(e) {
    // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
    switch (e.keyCode) {
        case (87):
            player.y -= 20
        break
        case (65):
            player.x -= 20
        break
        case (83):
            player.y += 20
        break
        case (68):
            player.x += 20
        break
        case (13):
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            quad.blasted = true
            score = 0
            enemyTimer = 0
            player = new Player(400, 100, 'white', 100, 100)
        break
        case (77):
            shoot.render()
        break 
    } 
}

// these could probably go up top but I'm unsure about them for now


// player character
class Player {
    constructor (x, y, color, width, height){
        // consider hardcoding?
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        // these below are all related to the sprite
        // this.angle = 0
        // this.frameX = 0
        // this.frameY = 0
        // this.frame = 0
        this.spriteWidth = 500
        this.spriteHeight = 500
    }
    // some sort of triangulated distance function from fishgame
    // update(){
    //     const dx = this.x - player.x
    //     const dy = this.y - player.y
    //     let theta = Math.atan2(dy, dx)
    //     this.angle = theta
    //     if (player.x != this.x) {
    //         this.x -= dx/30
    //     }
    //     if (player.y != this.y) {
    //         this.y-= dy/30
    //     }
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // attempt to add sprite to hitbox, need to line it up
        ctx.drawImage(playerPic, this.x, this.y, this.spriteWidth/4.7, this.spriteHeight/4.3)
    }
}
// i think this just fires the Player function? or lets me type player instead of Player?
player = new Player(400, 100, 'white', 100, 100)
// enemy targets
// would like to set blocks in groups of four, tetromino shapes, change hit box to morph to block shape, or have them assemble in random groups of four, unsure, might just go for square(shoot) and bar(let pass) blocks
// need to implement canvas crawler here
//         // implement ogre Crawler type situation for various block types

class Shoot {
    constructor(){
    this.x = player.x + 47
    this.y = player.y + 50
    this.speed = 25
    this.width = 10
    this.height = 10
    this.y += this.speed
    }
    render(){
        ctx.fillStyle = 'lightcoral'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
shoot = new Shoot
const minoArray = []
class Tetromino {
    constructor(x, y, color, width, height){
        this.x = x
        this.y = y
        this.speed = 45
        this.color = color
        this.width = width
        this.height = height
        this.blasted = false
    }
    render() {
        this.y -= this.speed
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

quad = new Tetromino(50, 600, 'lightblue', 100, 400)

function minoSummon(){
    if(enemyTimer % 60 == 0){
        quad = new Tetromino(Math.random() * (canvas.width - 250), 600, 'pink', 400, 400)
    }
    }
  


setInterval(animate, 60)
function animate(){
    enemyTimer++
    minoSummon()
    if (!quad.blasted) {
        detectHit()
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.render()
    if (!quad.blasted) {
    quad.render()
    }
    ctx.fillStyle = 'slategrey'
    ctx.fillText('blocks blasted: ' + score, 799, 19)
    if(enemyTimer < 180){
    ctx.fillText('use WASD for arrow keys', 100, 138)
    ctx.fillText('dodge blue, shoot pink', 100, 158)
    ctx.fillText('press M to shoot!', 100, 178)
    }
    ctx.fillText('press enter to restart', 795, 558)
}

function detectHit() {
    // one big, confusing if:
    if (
        player.x + player.width >= quad.x &&
        player.x <= quad.x + quad.width &&
        player.y <= quad.y + quad.height &&
        player.y + player.height >= quad.y
        ) {
          // do some game stuff!
         quad.blasted = true
         score++
        }
}

// push new Tetromino into a randomizer? Put the randomization into the Tetromino constructor?


    // i dont get this stuff at all i will try to implement canvas crawler techniques

    // for (let i = 0; i < minosArray.length; i++){
    //     minosArray[i].update()
    //     minosArray[i].draw()
    //     // i dont really understand the radius and splice stuff
    //     if(minosArray[i].y < 0 - minosArray[i].radius * 2){
    //         minosArray.splice(i, 1)
    //     }
    //     // this makes sure the tetromino isn't already set to be deleted, a bugfix imported from the fish game, also checks if it's "blasted" which is just a collision detection for now. Need to implement shooting bullets but would like input and block gen first (can just be a dodge game at first)
    //     if(minosArray[i]){
    //         if(minosArray[i].distance < minosArray[i].radius + player.radius){
    //             if(!minosArray[i].blasted){
    //                 score++
    //                 minosArray[i].blasted = true
    //                 minosArray.splice(i, 1)
    //             }
    //         }
    //     }    
    // }


// Canvas animation activation station

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