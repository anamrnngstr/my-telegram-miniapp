let animateButton = function(e) {
    e.preventDefault();  // Corrected to prevent the default action of the event.
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function(){
        e.target.classList.remove('animate');
    }, 700);
};

let bubblyButtons = document.getElementsByClassName("button-back");

for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}
