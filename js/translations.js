let translations = {
    zh_CN: {
        'welcome-to-mplayer-online-demo': '欢迎来到MPlayer在线演示',
        'view-project-in-github': '在GitHub中查看项目',
        'edit-options': '调整Options对象',
        'lang(language)': 'lang(语言)',
        'playerMode(player-mode)': 'playerMode(播放器模式)',
        'autoplay(autoplay)': 'autoplay(自动播放)',
        'hints(hints)': 'hints(提示)',
        'inject-template-code': '插入模版代码',
        'spotlight(spotlight-effect)': 'spotlight(聚光灯效果)',
        'theme(main-color)': 'theme(主題色)',
        'main-color': '主題色(仅支持16进制色，例如#39c5bb)',
        'tools(control-tools)': 'tools(视频控件)',
        'hotkey(hotkey)': 'hotkey(热键)',
        'volume(volume)': 'volume(音量)',
        'default-volume': '默认音量(0-1)',
        'playbackRates(playback-rates)': 'playbackRates(播放速度)',
        'playback-rates': '播放速度(数组形式)',
        'use-default-playback-rates': '使用默认值',
        'index(index-of-the-default-video)': 'index(默认视频的索引值)',
        'default-index': '默认索引',
        'infoPanel(info-panel-items)': 'infoPanel(信息面板项目)',
        'contextMenu(context-menu)': 'contextMenu(右键菜单)',
        'reset-template-code': '重置模版代码',
        'load-demo-using-this-configs': '以您选择的配置加载MPlayer',
        'load-default-demo': '加载默认MPlayer',
        'destroy-demo': '销毁MPlayer实例',
        'copy-options': '复制options对象(不包含videos值)',
    },
    zh_TW: {
        'welcome-to-mplayer-online-demo': '歡迎來到MPlayer線上演示',
        'view-project-in-github': '於GitHub查看專案',
        'edit-options': '調整Options對象',
        'lang(language)': 'lang(語言)',
        'playerMode(player-mode)': 'playerMode(播放器模式)',
        'autoplay(autoplay)': 'autoplay(自動播放)',
        'hints(hints)': 'hints(提示)',
        'inject-template-code': '注入樣板代碼',
        'spotlight(spotlight-effect)': 'spotlight(聚光燈效果)',
        'theme(main-color)': 'theme(主題色)',
        'main-color': '主題色(僅支援16進制色，例如#39c5bb)',
        'tools(control-tools)': 'tools(影片控制器)',
        'hotkey(hotkey)': 'hotkey(熱鍵)',
        'volume(volume)': 'volume(音量)',
        'default-volume': '預設音量(0-1)',
        'playbackRates(playback-rates)': 'playbackRates(播放速度)',
        'playback-rates': '播放速度(數組形式)',
        'use-default-playback-rates': '使用預設值',
        'index(index-of-the-default-video)': 'index(預設播放的影片的index值)',
        'default-index': '預設的index',
        'infoPanel(info-panel-items)': 'infoPanel(資訊面板項目)',
        'contextMenu(context-menu)': 'contextMenu(右鍵菜單)',
        'reset-template-code': '重設樣板代碼',
        'load-demo-using-this-configs': '以您選擇的配置載入MPlayer',
        'load-default-demo': '載入預設的MPlayer',
        'destroy-demo': '銷毀MPlayer實例',
        'copy-options': '拷貝options對象(不含videos值)',
    },
    en_US: {
        'welcome-to-mplayer-online-demo': 'Welcome to MPlayer online demo',
        'view-project-in-github': 'View project in GitHub',
        'edit-options': 'Edit Options object',
        'lang(language)': 'lang(language)',
        'playerMode(player-mode)': 'playerMode(player mode)',
        'autoplay(autoplay)': 'autoplay(autoplay)',
        'hints(hints)': 'hints(hints)',
        'inject-template-code': 'inject template code',
        'spotlight(spotlight-effect)': 'spotlight(Spotlight Effect)',
        'theme(main-color)': 'theme(main color)',
        'main-color': 'main color(only hex color is supported, such as #39c5bb)',
        'tools(control-tools)': 'tools(video control tools)',
        'hotkey(hotkey)': 'hotkey(hotkey)',
        'volume(volume)': 'volume(volume)',
        'default-volume': 'default volume (0 - 1)',
        'playbackRates(playback-rates)': 'playbackRates(playback rates)',
        'playback-rates': 'playback rates(as an array)',
        'use-default-playback-rates': 'use default value',
        'index(index-of-the-default-video)': 'index(index of default video)',
        'default-index': 'default index',
        'infoPanel(info-panel-items)': 'infoPanel(info panel items)',
        'contextMenu(context-menu)': 'contextMenu(right click menu)',
        'reset-template-code': 'reset template code',
        'load-demo-using-this-configs': 'Load MPlayer using the configs you chose',
        'load-default-demo': 'Load default MPlayer',
        'destroy-demo': 'destroy MPlayer instance',
        'copy-options': 'copy options object(exclude videos value)',
    }
}

let languagesSwitchButtons = document.querySelectorAll('div.languageButtonGroup button')

languagesSwitchButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.dataset.lang === 'zh_CN') {
            localStorage.setItem('lang', 'zh_CN')
        } else if (e.target.dataset.lang === 'zh_TW') {
            localStorage.setItem('lang', 'zh_TW')
        } else {
            localStorage.setItem('lang', 'en_US')
        }
        location.reload()
    })
})

let selectButton = (button) => {
    languagesSwitchButtons.forEach(btn => {
        btn.classList.remove('select')
    })
    button.classList.add('select')
}

let render = () => {
    if (localStorage.getItem('lang')) {
        if (localStorage.getItem('lang') === 'zh_CN') {
            let elements = document.querySelectorAll('[data-fill]')
            elements.forEach(element => {
                element.innerText = translations["zh_CN"][element.dataset.fill]
            })
            selectButton(document.querySelector('button[data-lang="zh_CN"]'))
        } else if (localStorage.getItem('lang') === 'zh_TW') {
            let elements = document.querySelectorAll('[data-fill]')
            elements.forEach(element => {
                element.innerText = translations["zh_TW"][element.dataset.fill]
            })
            selectButton(document.querySelector('button[data-lang="zh_TW"]'))
        } else {
            let elements = document.querySelectorAll('[data-fill]')
            elements.forEach(element => {
                element.innerText = translations["en_US"][element.dataset.fill]
            })
            selectButton(document.querySelector('button[data-lang="en_US"]'))
        }
    } else {
        let elements = document.querySelectorAll('[data-fill]')
        elements.forEach(element => {
            element.innerText = translations["en_US"][element.dataset.fill]
        })
        selectButton(document.querySelector('button[data-lang="en_US"]'))
    }
}

render()