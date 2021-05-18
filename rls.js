// head
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 563
canvas.tabIndex = 1
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
//*button* *keycode* 
// left     37 
// right    39 
// space    32
// enter    13
let leftPressed = false
let rightPressed = false
let shootPressed = false
let pausePressed = false
let startPressed = false
canvas.addEventListener('keypress', e => {
    console.log(e.key)
    console.log(leftPressed)
    if(e.key = 'a') {
        leftPressed = true
    }
    if(e.key = 'd') {
        rightPressed = true
    }
    if(e.key = 'm') {
        shootPressed = true
    }
    if(e.key = 'p') {
        pausePressed = true
    }
    if(e.key = 'Enter') {
        startPressed = true
    }
})
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



// top-scoped declarations
const playerPic = new Image()
playerPic.src = 'speship-left.png'
let score = 0
let gameFrame = 0
let canvasPosition = canvas.getBoundingClientRect()

// player toolings
class Player {
    constructor (){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frame = 0
        this.spriteWidth = 500
        this.spriteHeight = 500
    }
    draw(){
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        // if(rightPressed) {
        //     playerX += 3
        //     console.log('right')
        // }
        // if(leftPressed) {
        //     playerX -= 3
        //     console.log('left')
        // }
        ctx.fillStyle = 'lightsalmon'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx.fill()
        ctx.closePath()
        ctx.fillRect(this.x, this.y, this.radius, 10)
    }
}

const player = new Player()

// enemy targets
const minosArray = []
// set blocks in groups of four, tetromino shapes, change hit box to morph to block oh god how
class Tetromino {
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 100
        this.radius = 50
        this.speed = Math.random() * 1.8
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
        // look up square instead of circle for below
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
    }
}

// set blocks in groups of four, tetromino shapes, change hit box to morph to block oh god how
function blockFarm(){
    // look up how to set this interval, or just use the game frames
    if(gameFrame % 250 == 0){
        minosArray.push(new Tetromino())
    }
    for (let i = 0; i < minosArray.length; i++){
        minosArray[i].update()
        minosArray[i].draw()
        if(minosArray [i].y < 0 - minosArray[i].radius * 2){
            minosArray.splice(i, 1)
        }
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


// Canvas activation
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
// TODO basic js setup -- see fishgame(js-2dgame-yt) for help, dont be afraid to google
//    note - google left right space enter inputs for canvas, implement them instead of mouse input, because mouse input is wtf for now
// TODO player movement and shoot buttons
// TODO block generation (simple squares for now)
// TODO block styling(find sprites and draw hitboxes)
// TODO collision detection (shoot/player/block/border)
// TODO menu buttons/options
// TODO reconsider tetris shapes (pending further review of hitboxes)

// /!\ stretch goals
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

/* sudocode

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