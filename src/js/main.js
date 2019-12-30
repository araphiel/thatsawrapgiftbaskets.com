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

// Change colors on scroll

const extraColors = ['--yellow', '--blue', '--pink', '--light']
const chances = [50, 16, 16, 16]
function chooseWeighted(items, chances) {
    var sum = chances.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    chances = chances.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    return items[chances.filter(el => el <= rand).length];
}


const targets = document.querySelectorAll('main>section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const { color } = entry.target.dataset        
        // Are we in viewport?
        if (entry.intersectionRatio > 0 && color) {
            document.documentElement.style.setProperty('--secondary-color', `var(--${color})`);
            // observer.unobserve(entry.target);
        } else {
            document.documentElement.style.setProperty('--secondary-color', `var(${chooseWeighted(extraColors, chances)})`);
        }
    });
}, );

targets.forEach(target => observer.observe(target))