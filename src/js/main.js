import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import magicGrid from 'magic-grid'

// Add jQuery to global scope
window.$ = $
window.jQuery = $

// Hamburger Bar Click Events
const menuButton = document.querySelector('.burger');
menuButton.onclick = function (e) {
    this.classList.toggle('rotated')
    document.body.classList.toggle('open')
    document.querySelector('.mobile-menu').classList.toggle('open')
}

// Add magic grid to gallery page
if (document.querySelector('.gallery')) {

    let magic = new magicGrid({
        container: "#masonry",
        static: true,
        animate: true,
    });

    magic.listen();
    setTimeout(x => magic.positionItems(), 200)
    setTimeout(x => magic.positionItems(), 1000)
}