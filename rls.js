/* top layer */

// window.onload over DOMContentLoaded to ensure all related content is loaded
window.onload = function() {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    // setting attributes (is css redundant?)
    canvas.width = 1000
    canvas.height = 550
    // ctx.imageSmoothingEnabled = false
    ctx.font = '22px Helvetica'
    let quad
    let slab
    let player 
    // let shoot
    let enemyTimer = 0
    let score = 0
    let frameSec = setInterval(animate, 60)
    const playerPic = new Image()
    playerPic.src = 'speship-left.png'
    const crashed = document.createElement('audio')
    crashed.src = 'sfx/game-over.wav'
    const staato = document.createElement('audio')
    staato.src = 'sfx/Item2A_3.wav'
    const bompin = document.createElement('audio')
    bompin.src = 'sfx/maybe-border-sound.wav'
    staato.play()

/* input current solve */
// this is scanning for all key presses, with inpHandle wiring specific keys
addEventListener('keydown', inpHandle) 

//this is sort of working for now, not how I would like it to work
function inpHandle(e) {
    // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
    switch (e.keyCode) {
        // 'w' y-=
        case (87):
            player.y -= 25
            if(player.y == -25){
                player.y += 25
                bompin.play()
            }
        break
        // 'a' x-=
        case (65):
            player.x -= 25
            if(player.x == -25){
                player.x += 25
                bompin.play()
            }
        break
        // 's' y+=
        case (83):
            player.y += 25
            if(player.y == 450){
                player.y -= 25
                bompin.play()
            }
        break
        // 'd' x+=
        case (68):
            player.x += 25
            if(player.x == 925){
                player.x -= 25
                bompin.play()
            }
        break
        // 'Enter' - reset function, potential for refactor 
        case (13):
            clearInterval(frameSec)
            frameSec = setInterval(animate, 60)
            staato.play()
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            slab.crashed = false
            quad.crashed = false
            score = 0
            enemyTimer = 0
            player = new Player(350, 100, 'rgba(0, 0, 0, 0)', 100, 100)
            slab = new Tetromino(50, 600, '#a1edd1', 100, 300)
            quad = new Tetromino(700, 600, '#a1a2ed', 200, 200)
        break

        // experimental bullet functionality
        // case (77):
        //     shoot = new Shoot(player.x + 52, player.y + 55, 10, 'limegreen', 25)
        //     shoot.render() 
        // break
    } 
}

/* experimental bullet functionality
// function shooTest(e) {
//     switch(e.keyCode) {
//         case (77):
//         shoot.update()
//     }
// } */

// playable character control center
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
    // edgeChek(){
    //     if(x )
    // }

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

// This initializes the first instance of the game
player = new Player(350, 100, 'rgba(0, 0, 0, 0)', 100, 100)

/* bullet functionality, experimental for now
// const shots = []
// class Shoot {
//     constructor(x, y, radius, color, speed){
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.speed = speed
//     }
//     render(){
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
//         ctx.fillStyle = this.color
//         ctx.fill()
//         ctx.strokeStyle = 'yellow'
//         ctx.stroke()
//     }
//     update(){
//         this.render()
//         this.y += 25
//     }
// }
*/

// 
// const minoArray = []
class Tetromino {
    constructor(x, y, color, width, height){
        this.x = x
        this.y = y
        this.speed = 25
        this.color = color
        this.width = width
        this.height = height
        this.blasted = false
        this.crashed = false
        this.passed = false
    }
    render() {
        this.y -= this.speed
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// just to get game to function on tick 1 idk why
slab = new Tetromino(50, 600, '#a1edd1', 100, 300)
quad = new Tetromino(700, 600, '#a1a2ed', 200, 200)

// randomize block type and spawn location
function minoSummon(){
    if(enemyTimer % 60 == 0){
        quad = new Tetromino(Math.random() * (canvas.width - 50), 600, '#a1a2ed', 200, 200)
    }
    if(enemyTimer % 150 == 0){
        slab = new Tetromino(Math.random() * (canvas.width - 300), 600, '#a1edd1', 100, 300)
    }
}
  


// sets animations and text fields within game window
function animate(){
    enemyTimer++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    minoSummon()
    quad.render()
    slab.render()
    player.render()
    detectHit()
    ctx.fillStyle = 'rgb(253, 226, 229)'
    ctx.fillText('I blocks passed: ' + score, 799, 19)
    // ctx.fillStyle = 'rgba(39, 9, 239, 0.2)'
    if(enemyTimer < 120){
        ctx.strokeStyle = 'lightpink'
        ctx.fillStyle = 'rgb(253, 236, 239)'
        ctx.strokeText('WASD steers your vessel.', 175, 38)
        ctx.fillText('WASD steers your vessel.', 175, 38)
        ctx.strokeText('steer around Tetromino blocks. ', 275, 58)
        ctx.fillText('steer around Tetromino blocks. ', 275, 58)
        ctx.strokeText('flying past I blocks give 4 points.', 375, 78)
        ctx.fillText('flying past I blocks give 4 points.', 375, 78)
    }
    ctx.fillStyle = 'rgb(253, 236, 239)'
    ctx.fillText('press enter to restart', 795, 545)
}

// detection dimensions imported from canvas crawler, game over functionality
function detectHit() {
    if(slab.y == -200) {
        score += 4
    }
    // canvas crawler hit detection solve
    if (
        player.x + player.width >= quad.x &&
        player.x <= quad.x + quad.width &&
        player.y <= quad.y + quad.height &&
        player.y + player.height >= quad.y
        ) {
         quad.crashed = true
         console.log('hello')
        }
    
    // refactor potential here, unsure best course of action
    if (
        player.x + player.width >= slab.x &&
        player.x <= slab.x + slab.width &&
        player.y <= slab.y + slab.height &&
        player.y + player.height >= slab.y
        ) {
         slab.crashed = true
         console.log('checking')
        }
    if(slab.crashed){
        slab.crashed = false
        crashed.play()
        ctx.fillStyle = 'rgb(253, 236, 239)'
        ctx.strokeStyle = 'rgb(56, 12, 56)'
        ctx.fillText('You crashed! Press enter to retry!', 300, 300)
        ctx.strokeText('You crashed! Press enter to retry!', 300, 300)
        clearInterval(frameSec)
    }
    if(quad.crashed){
        quad.crashed = false
        crashed.play()
        ctx.fillStyle = 'rgb(253, 236, 239)'
        ctx.strokeStyle = 'rgb(64, 32, 64)'
        ctx.fillText('You crashed! Press enter to retry!', 300, 300)
        ctx.strokeText('You crashed! Press enter to retry!', 300, 300)
        clearInterval(frameSec)
    }
}
}

/* input variants 
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
 */

/* notes about potential clearing of bullets or blocks, from fishgame
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

/* original set of notes, not updated 
// TODO basic js setup -- see fishgame(js-2dgame-yt) for help, dont be afraid to google
//    note - google left right space enter inputs for canvas, implement them instead of mouse input, because mouse input is wtf for now
// TODO player movement and shoot buttons
// TODO block generation (simple squares for now)
// TODO block styling(find sprites and draw hitboxes)
// TODO collision detection (shoot/player/block/border)
// TODO menu buttons/options
// TODO reconsider tetris shapes (pending further review of hitboxes)


// original pseudocode pieces

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