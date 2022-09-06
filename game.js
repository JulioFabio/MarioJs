kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

loadRoot("https://i.imgur.com/")

loadSprite('bloco','M6rwarW.png')
loadSprite('goomba','KPO3fR9.png')
loadSprite('surpresa','gesQ1KP.png')
loadSprite('unboxed','bdrLpi6.png')
loadSprite('moeda','wbKxhcd.png')
loadSprite('mario','Wb1qfhK.png')
loadSprite('cogumelo','0wMd92p.png')

scene("game", () => {
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

    const player = add([
        sprite('mario'),
        solid(),
        body(),
        pos(60,0),
        origin('bot'),
    ])

    keyDown('left', () => {
        player.move(-120,0)
    })
    
    keyDown('right', () => {
        player.move(120,0)
    })
})

go("game")