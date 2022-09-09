kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

let isJumping = true
let isBig = false

loadRoot("https://i.imgur.com/")

loadSprite('bloco','M6rwarW.png')
loadSprite('goomba','KPO3fR9.png')
loadSprite('surpresa','gesQ1KP.png')
loadSprite('unboxed','bdrLpi6.png')
loadSprite('moeda','wbKxhcd.png')
loadSprite('mario','Wb1qfhK.png')
loadSprite('cogumelo','0wMd92p.png')

scene("game", ({ score }) => {
    layer(["bg", "obj", "ui"], "obj")

    const map = [
        '=                                   =',
        '=                                   =',
        '=                                   =',
        '=                                   =',
        '=                                   =',
        '=                                   =',
        '=               {{{{{               =',
        '=                                   =',
        '=         %{%{*                     =',
        '=                                   =',
        '=                                   =',
        '=             ^       ^      ^      =',
        '=====================================',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid()],
        '$': [sprite('moeda'), 'moeda'],
        '%': [sprite('surpresa'), solid(), 'moeda-surpresa'],
        '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
        '{': [sprite('unboxed'), solid()],
        '^': [sprite('goomba'), 'dangerous'],
        '#': [sprite('cogumelo'), 'cogumelo',body()],
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text('Moedas:' + score, 10),
        pos(12,5),
        layer('ui'),
        {
            value: score
        }
    ])

    function big(){
        return{
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                isBig = false
            },
            biggify(){
                this.scale = vec2(1.5)
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'),
        solid(),
        body(),
        big(),
        pos(60,0),
        origin('bot'),
    ])

    keyDown('left', () => {
        player.flipX(true)
        player.move(-120,0)
    })
    
    keyDown('right', () => {
        player.flipX(false)
        player.move(120,0)
    })

    keyPress('space', () => {
        if(player.grounded()){
            player.jump(390)
            isJumping = true
        }
    })

    action('dangerous',(obj) => {
        obj.move(-20,0)
    })

    player.action(() => {
        if(player.grounded()){
            isJumping = false
        }
    })

    player.on('headbutt', (obj) => {
        if(obj.is('moeda-surpresa')){
            gameLevel.spawn('$', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('{', obj.gridPos.sub(0,0))
        }

        if(obj.is('cogumelo-surpresa')){
            gameLevel.spawn('#', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('{', obj.gridPos.sub(0,0))
        }
    })

    action('cogumelo', (obj) => {
        obj.move(40,0)
    })

    player.collides('cogumelo',(obj) => {
        destroy(obj)
        player.biggify()
    })

    player.collides('dangerous', (obj) => {
        if(isJumping){
            destroy(obj)
        }else{
            if(isBig){
                player.smallify()
            }else{
                go("lose", ({score: scoreLabel.value}))
            }
        }
    })

    player.collides('moeda', (obj) =>{
        destroy(obj)
        scoreLabel.value++
        scoreLabel.text = 'Moedas: ' +scoreLabel.value
    })
})

scene("lose", ({score}) => {
    add([ text('Voce Morreu', 18), origin('center'), pos(width()/2, height()/2)])
    add([ text('score: ' +score, 17), origin('center'), pos(width()/1.5, height()/1.5) ])
})

go("game", ({ score: 0}))