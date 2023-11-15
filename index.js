let options = {
    lang: '',
    playerMode: '',
    autoplay: '',
    hints: '',
    spotlight: '',
    theme: '',
    tools: '',
    hotkey: '',
    preload: '',
    volume: '',
    playbackRates: '',
    index: '',
    infoPanel: '',
    contextMenu: '',
    videos: ''
}
let mplayer = ''

let hints_textarea = document.querySelector('#hints_input')
let hints_button = document.querySelector('#hints_button')
hints_button.onclick = () => {
    hints_textarea.value = JSON.stringify({
        enabled: true,
        elements: [
            {
                start: 10,
                end: 20,
                html: `<h1>TEST HINT</h1>`
            }
        ]
    })
}

let spotlight_textarea = document.querySelector('#spotlight_input')
let spotlight_button = document.querySelector('#spotlight_button')
spotlight_button.onclick = () => {
    spotlight_textarea.value = JSON.stringify({
        enabled: true,
        backgroundColor: '#FFFFFF'
    })
}

let playbackRates_input = document.querySelector('#playbackRates')
let playbackRates_button = document.querySelector('#playbackRates_button')
playbackRates_button.onclick = () => {
    playbackRates_input.value = '[.25, .5, .75, 1, 1.25, 1.5, 1.75, 2]'
}

let contextMenu_input = document.querySelector('#contextMenu_input')
let contextMenu_button = document.querySelector('#contextMenu_button')
contextMenu_button.onclick = () => {
    contextMenu_input.value = `[
        {
            title: '关于MPlayer',
            targetFunction: 'openLink',
            params: "https://mplayer.1205.moe/"
        },
        {
            title: '播放器信息',
            targetFunction: 'toggleInfoPanel'
        }
    ]`
}

contextMenu_input.value = `[
        {
            title: '关于MPlayer',
            targetFunction: 'openLink',
            params: "https://mplayer.1205.moe/"
        },
        {
            title: '播放器信息',
            targetFunction: 'toggleInfoPanel'
        }
    ]`

const toggleButtons = () => {
    let beforeLoad = document.querySelector('.beforeLoad')
    let afterLoad = document.querySelector('.afterLoad')
    let optionsContainer = document.querySelector('.options')
    if (beforeLoad.classList.contains('hide')) {
        beforeLoad.classList.remove('hide')
        afterLoad.classList.add('hide')
        optionsContainer.classList.remove('hide')
    } else {
        afterLoad.classList.remove('hide')
        beforeLoad.classList.add('hide')
        optionsContainer.classList.add('hide')
    }
}

const loadDemo = () => {
    toggleButtons()
    // lang
    let langInputs = document.querySelectorAll('[name="language"]')
    langInputs.forEach(input => {
        if (input.checked) {
            options.lang = input.value
        }
    })
    if (!options.lang) {
        options.lang = 'en_US'
    }

    // player mode
    let playerModeInputs = document.querySelectorAll('[name="playerMode"]')
    playerModeInputs.forEach(input => {
        if (input.checked) {
            options.playerMode = input.value
        }
    })
    if (options.playerMode !== 'normal') {
        options.playerMode = 'normal'
    }

    // autoplay
    let autoplayInputs = document.querySelectorAll('[name="autoplay"]')
    autoplayInputs.forEach(input => {
        if (input.checked) {
            options.autoplay = (input.value === 'true')
        }
    })

    // hints
    let hintsInputs = document.querySelectorAll('[name="hints"]')
    let hints_textarea = document.querySelector('#hints_input')
    hintsInputs.forEach(input => {
        if (input.checked) {
            if (input.value === 'disabled') {
                options.hints = {
                    enabled: false
                }
            } else {
                options.hints = JSON.parse(hints_textarea.value)
            }
        }
    })

    // spotlight
    let spotlightInputs = document.querySelectorAll('[name="spotlight"]')
    let spotlight_textarea = document.querySelector('#spotlight_input')
    spotlightInputs.forEach(input => {
        if (input.checked) {
            if (input.value === 'disabled') {
                options.spotlight = {
                    enabled: false,
                    backgroundColor: '#FFFFFF'
                }
            } else {
                options.spotlight = JSON.parse(spotlight_textarea.value)
            }
        }
    })

    // theme
    let themeInput = document.querySelector('#theme')
    options.theme = themeInput.value
    if (!options.theme) {
        options.theme = '#39c5bb'
    }

    // tools
    options.tools = []
    let toolsInputs = document.querySelectorAll('[name="tools"]')
    toolsInputs.forEach(input => {
        if (input.checked) {
            options.tools.push(input.value)
        }
    })

    // hotkey
    let hotkeyInputs = document.querySelectorAll('[name="hotkey"]')
    hotkeyInputs.forEach(input => {
        if (input.checked) {
            options.hotkey = (input.value === 'true')
        }
    })

    // volume
    let volumeInput = document.querySelector('#volume')
    options.volume = parseFloat(volumeInput.value)
    if (!options.volume && options.volume !== 0) {
        options.volume = 1
    }

    // playback rates
    let playbackRatesInput = document.querySelector('#playbackRates')
    options.playbackRates = eval(playbackRatesInput.value)
    if (!options.playbackRates) {
        options.playbackRates = [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2]
    }

    // index
    let indexInput = document.querySelector('#index')
    options.index = parseInt(indexInput.value)
    if (!options.index) {
        options.index = 0
    }

    // infoPanel
    options.infoPanel = []
    let infoPanelInputs = document.querySelectorAll('[name="infoPanel"]')
    infoPanelInputs.forEach(input => {
        if (input.checked) {
            options.infoPanel.push(input.value)
        }
    })

    // contextMenu
    let contextMenu_input = document.querySelector('#contextMenu_input')
    options.contextMenu = eval(contextMenu_input.value)
    if (!options.contextMenu) {
        options.contextMenu = [
            {
                title: '关于MPlayer',
                targetFunction: 'openLink',
                params: `https://mplayer.1205.moe/`
            },
            {
                title: '播放器信息',
                targetFunction: 'toggleInfoPanel'
            }
        ]
    }

    options.videos = [
        {
            title: '[hls, subtitles, qualities]Plastic Memories EP. 1',
            src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/hls/PlasticMemoriesEP1.m3u8",
            tracks: [
                {
                    srclang: 'zh_CN',
                    src: 'https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/subtitles/PlasticMemoriesEP1.sc.vtt',
                    label: "简体字",
                    kind: "captions"
                },
                {
                    srclang: 'zh_TW',
                    src: 'https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/subtitles/PlasticMemoriesEP1.tc.vtt',
                    label: "正體字",
                    kind: "captions"
                }
            ],
            images: ['https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/images/isla.jpg']
        },
        {
            title: '[native]Plastic Memories EP. 2',
            src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep2/native/PlasticMemoriesEP2.mp4"
        },
        {
            title: '[flv]Your Lie in April EP. 1',
            src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/YourLieInApril/ep1/flv/EP1.flv"
        }
    ]

    mplayer = new MPlayer(document.querySelector('#mplayer'), options)
}

const loadDefaultDemo = () => {
    toggleButtons()
    options = {
        lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en_US',
        playerMode: 'normal',
        autoplay: false,
        hints: {
            enabled: true,
            elements: [
                {
                    start: 10,
                    end: 20,
                    html: `<h1>TEST HINT</h1>`
                }
            ]
        },
        spotlight: {
            enabled: true,
            backgroundColor: '#FFFFFF'
        },
        theme: '#39c5bb',
        loop: false,
        tools: ['timeline', 'playPause', 'volumeControl', 'durationViewer', 'screenshot', 'playerSettings', 'enablePlaylist', 'subtitles', 'miniPlayer', 'theaterMode', 'fullscreen'],
        hotkey: true,
        preload: false,
        volume: 1,
        playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        index: 1,
        infoPanel: ['basicVideoInfo', 'playerFPS', 'videoURL', 'connectionStatus', 'date', 'playerInfo'],
        contextMenu: [
            {
                title: '关于MPlayer',
                targetFunction: 'openLink',
                params: `https://mplayer.1205.moe/`
            },
            {
                title: '播放器信息',
                targetFunction: 'toggleInfoPanel'
            }
        ],
        videos: [
            {
                title: '[hls, subtitles, qualities]Plastic Memories EP. 1',
                src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/hls/PlasticMemoriesEP1.m3u8",
                tracks: [
                    {
                        srclang: 'zh_CN',
                        src: 'https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/subtitles/PlasticMemoriesEP1.sc.vtt',
                        label: "简体字",
                        kind: "captions"
                    },
                    {
                        srclang: 'zh_TW',
                        src: 'https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/subtitles/PlasticMemoriesEP1.tc.vtt',
                        label: "正體字",
                        kind: "captions"
                    }
                ],
                images: ['https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep1/images/isla.jpg']
            },
            {
                title: '[native]Plastic Memories EP. 2',
                src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/PlasticMemories/ep2/native/PlasticMemoriesEP2.mp4"
            },
            {
                title: '[flv]Your Lie in April EP. 1',
                src: "https://mplayer-demo-1255545160.cos.ap-nanjing.myqcloud.com/YourLieInApril/ep1/flv/EP1.flv"
            }
        ]
    }
    mplayer = new MPlayer(document.querySelector('#mplayer'), options)
}

const destroyDemo = () => {
    if (mplayer) {
        mplayer.destroy()
        mplayer = ''
    }
    toggleButtons()
}

const copyOptions = () => {
    let obj = options
    obj.videos = [
        {
            title: 'your own video title',
            src: "your own video url"
        },
    ]
    copyString(JSON.stringify(obj))
}

const copyString = (string) => {
    navigator.clipboard.writeText(string).then(() => {
        alert('copied!')
    }).catch(e => {
        alert('failed to copy.')
        console.log(e)
    })
}