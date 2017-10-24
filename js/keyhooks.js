document.addEventListener('keydown', function (event) {
    if (event.keyCode === 187) zoomIn()
    if (event.keyCode === 189) zoomOut()

    if (event.keyCode === 39) translate('left')
    if (event.keyCode === 37) translate('right')
    if (event.keyCode === 40) translate('up')
    if (event.keyCode === 38) translate('down')
    // pageUp and down
    if (event.keyCode === 33) translate('stepUp')
    if (event.keyCode === 34) translate('stepDown')

    if (event.keyCode === 68) rotateCamera('right')
    if (event.keyCode === 65) rotateCamera('left')
    if (event.keyCode === 87) rotateCamera('up')
    if (event.keyCode === 83) rotateCamera('down')
})

