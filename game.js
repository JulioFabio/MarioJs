kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    clearColor: [0,0,0,1]
})

loadRoot("https://i.imgur.com/")

loadSprite('bloco','3e5YRQd.png')

scene("game", () => {
    layer(["bg", "obj", "ui"], "obj")

    const map = [
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '                                   ',
        '===================================',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('bloco'), solid()]
    }

    const gameLevel = addLevel(map, levelCfg)
})

go("game")