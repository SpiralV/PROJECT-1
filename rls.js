// head
const canvas = document.getElementById('canvas1')
const contx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 563
contx.font = '50px Tahoma'
//*button* *keycode* 
// left     37 
// right    39 
// space    32
// enter    13

// canvas.addEventListener('keypress 37', () => {}

// top-scoped declarations
const playerPic = new Image()
playerPic.src = 'speship-left.png'
let score = 0
let gameFrame = 0

// player toolings
class Player {
    constructor (){
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.radius = 50
        this.spriteWidth = 500
        this.spriteHeight = 500
    }
    draw(){
        contx.fillStyle = 'lightsalmon'
        contx.beginPath()
        contx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        contx.fill()
        contx.closePath()
        contx.fillRect(this.x, this.y, this.radius, 10)
    }
}

const player = new Player()

// enemy targets
const minosArray = []
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
        contx.fillStyle = 'slateblue'
        contx.beginPath()
        // look up square instead of circle for below
        contx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        contx.fill()
        contx.closePath()
        contx.stroke()
    }
}

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
    contx.clearRect(0, 0, canvas.width, canvas.height)
    blockFarm()
    player.draw()
    contx.fillStyle = 'slategrey'
    contx.fillText('score : ' + score, 10, 50)
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