import $ from 'jquery'
import 'bootstrap'
import 'popper.js'
import magicGrid from 'magic-grid'

// Add jQuery to global scope
window.$ = $
window.jQuery = $

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