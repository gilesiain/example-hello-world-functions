
var hide
var tawk

window.Tawk_API = window.Tawk_API || {};
window.Tawk_API.onLoad = function(){
 setTimeout(tawk_hide, 50)
 window.Tawk_API.maximize();
};

window.Tawk_API.onChatMinimized = function(){
    tawk_hide()
    window.Tawk_API.maximize();
};


function tawk_hide(){

    if (!hide){
    tawk = document.getElementsByClassName('widget-visible')[0].id
    const val = '#'+tawk+'.widget-visible'
    console.log(val)
    var styles = ``+val+` { 
        display:none !important;
    }
`
var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
hide = true
console.log('hide')
}
}


function tawk_show(){

    if (hide){
    const val = '#'+tawk+'.widget-visible'
    console.log(val)
    var styles = ``+val+` { 
        display:block !important;
    }
`
var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
hide = false
console.log('show')
}
}


function tawk_toggle(){
    if(!hide){
        tawk_hide()
    }else(
        tawk_show()
    )
}
