const debugSection = document.getElementById('debug-section');

            function debug(message) {
                debugSection.innerHTML += message + '<br>';
                debugSection.scrollTop = debugSection.scrollHeight;
            }

            debug("start...");

           

        // Function to handle button animation
        var animateButton = function(e) {
            e.preventDefault();

            // Reset animation
            e.target.classList.remove('animate');
            e.target.classList.add('animate');

            setTimeout(function() {
                e.target.classList.remove('animate');
            }, 700);
        };

        // Function to switch pages
        function switchPage(fromPageId, toPageId) {
            setTimeout(function() {
                const fromPage = document.getElementById(fromPageId);
                const toPage = document.getElementById(toPageId);

                fromPage.style.display = 'none';
                toPage.style.display = 'flex';

                if (toPageId === 'add-info-page') {
                    const additionalInfo = document.getElementById('additional-info');
                    autoResize(additionalInfo);
                } else if (toPageId === 'confirm-page') {
                    updateConfirmPage();
                } else if (toPageId === 'orders') {
                    getOrders();
                }

                console.log(`Переключение с ${fromPageId} на ${toPageId}`);
            }, 700); // Delay the page switch to allow the animation to complete
        }

        var bubblyButtons = document.getElementsByClassName("bubbly-button");

        for (var i = 0; i < bubblyButtons.length; i++) {
            bubblyButtons[i].addEventListener('click', function(e) {
                animateButton(e);
                var fromPageId = e.target.getAttribute('data-from');
                var toPageId = e.target.getAttribute('data-to');
                switchPage(fromPageId, toPageId);
            }, false);
        }