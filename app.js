const tg = window.Telegram.WebApp;

            const debugSection = document.getElementById('debug-section');

            function debug(message) {
                debugSection.innerHTML += message + '<br>';
                debugSection.scrollTop = debugSection.scrollHeight;
            }

            debug("start...");

            function toggleDebugSection() {
                const debugSection = document.getElementById('debug-section');
                if (debugSection.style.display === 'none' || debugSection.style.display === '') {
                    debugSection.style.display = 'block';
                } else {
                    debugSection.style.display = 'none';
                }
            }

            let longPressTimer;
            const longPressDuration = 3000;

            function addLongPressListener(element) {
                element.addEventListener('touchstart', function(e) {
                    longPressTimer = setTimeout(function() {
                        toggleDebugSection();
                    }, longPressDuration);
                });

                element.addEventListener('touchend', function(e) {
                    clearTimeout(longPressTimer);
                });

                element.addEventListener('touchmove', function(e) {
                    clearTimeout(longPressTimer);
                });
            }

            document.querySelectorAll('.app').forEach(addLongPressListener);

            // Инициализируем историю навигации с первой страницы
            let navigationHistory = ['first-page'];

           // Function to handle button animation
 var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };

// Function to switch pages
function switchPage(fromPageId, toPageId) {
    const currentPageId = navigationHistory[navigationHistory.length - 1];
    const currentPage = document.getElementById(currentPageId);
    const toPage = document.getElementById(toPageId);
    
    setTimeout(() => { // Задержка перед сменой страниц
        if (currentPageId === toPageId) {
            debug(`Уже на странице ${toPageId}`);
            return;
        }
        
        currentPage.style.display = 'none';
        toPage.style.display = 'flex';
        
       // Добавляем новую страницу в историю навигации
       navigationHistory.push(toPageId);

       // Включаем кнопку "Назад" в Telegram Mini App
       if (navigationHistory.length > 1) {
           tg.BackButton.show();
       } else {
           tg.BackButton.hide();
       }
       
       if (toPageId === 'add-info-page') {
           const additionalInfo = document.getElementById('additional-info');
           autoResize(additionalInfo);
       } else if (toPageId === 'confirm-page') {
           updateConfirmPage();
       } else if (toPageId === 'orders') {
           getOrders();
       } else if (toPageId === 'author-first') {
           getOrders('exchange');
       } else if (toPageId === 'order-details-page') {
           getOffers(order);
       } else if (toPageId === 'author-profile') {
           getAuthorProfile();
       }
       
       debug(`Переключение с ${currentPageId} на ${toPageId}`);
       debug(`Текущая история навигации: ${navigationHistory.join(' -> ')}`);
    }, 700); // 500 миллисекунд задержки, можно настроить по вашему усмотрению
}


 var bubblyButtons = document.getElementsByClassName("bubbly-button");

 for (var i = 0; i < bubblyButtons.length; i++) {
   bubblyButtons[i].addEventListener('click', animateButton, false);
 }


            function goBack() {
                if (navigationHistory.length > 1) {
                    const previousPage = navigationHistory[navigationHistory.length - 2];
                    // Переключаемся на предыдущую страницу
                    switchPage(previousPage);
                    // Удаляем дублирование в истории, которое может возникнуть из-за вызова switchPage
                    navigationHistory.pop();
                    navigationHistory.pop();

                    // Скрываем кнопку "Назад", если вернулись на первую страницу
                    if (navigationHistory.length <= 1) {
                        tg.BackButton.hide();
                    }
                } else {
                    debug("Невозможно вернуться назад: это первая страница");
                }
            }

            tg.ready();
            tg.expand();
            tg.setHeaderColor('#298c6b');
            tg.setBackgroundColor('#298c6b');

            let isKeyboardVisible = false;
            const initialWindowHeight = window.innerHeight;

            function setBackButtonState() {
              tg.MainButton.setParams({
                text: 'Назад',
                color: '#23775b',
                text_color: '#FFFFFF',
                is_active: true
              });
              tg.MainButton.onClick(() => {
                // tg.close();
                goBack();
              });
            }

            function setHideKeyboardButtonState() {
              tg.MainButton.setParams({
                text: 'Скрыть клавиатуру',
                color: '#23775b',
                text_color: '#FFFFFF',
                is_active: true
              });
              tg.MainButton.onClick(() => {
                if (document.activeElement) {
                  document.activeElement.blur();
                }
                tg.closeScanQrPopup();
                isKeyboardVisible = false;
                setBackButtonState();
              });
            }

            // Инициализация кнопки
            setBackButtonState();
            // tg.MainButton.show();
            // tg.MainButton.hide();

            tg.BackButton.onClick(goBack);

            if (navigationHistory.length <= 1) {
                tg.BackButton.hide();
            }

            // Отслеживание фокуса на полях ввода
            const inputFields = document.querySelectorAll('input, textarea');
            inputFields.forEach(field => {
              field.addEventListener('focus', () => {
                if (!isKeyboardVisible) {
                  isKeyboardVisible = true;
                  setHideKeyboardButtonState();
                }
              });
            });

            function updateGreeting() {
                const helloText = document.getElementById('hello-text');
                const userName = tg.initDataUnsafe?.user?.first_name || tg.initDataUnsafe?.user?.username;
                
                if (userName) {
                    helloText.textContent = `Привет, ${userName}!`;
                    debug(`Имя пользователя получено: ${userName}`);
                } else {
                    debug("Имя пользователя не найдено");
                }
            }

            window.addEventListener('load', updateGreeting);


            function autoResize(textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            }

            document.addEventListener('DOMContentLoaded', function() {
                const additionalInfo = document.getElementById('additional-info');
                additionalInfo.addEventListener('input', function() {
                    autoResize(this);
                });
            });

            function updateConfirmPage() {
                document.getElementById('confirm-task-type').textContent = taskTypeSelect.options[taskTypeSelect.selectedIndex].text;
                document.getElementById('confirm-subject').textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
                document.getElementById('confirm-page-count').textContent = pageCountInput.value;
                document.getElementById('confirm-deadline').textContent = deadline.value;
                document.getElementById('confirm-uniq').textContent = uniqSelect.options[uniqSelect.selectedIndex].text;
                document.getElementById('confirm-additional-info').textContent = document.getElementById('additional-info').value;
            }

            async function getOrders(source = 'client', filter = 'all') {
                showLoadingIndicator(); // Показываем индикатор загрузки
                try {
                    if(source == 'client')
                    {
                        const userData = window.Telegram.WebApp.initDataUnsafe;
                        const ordersData = {
                            Request: 'get_orders',
                            User: userData.user
                        };

                        const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ordersData)
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        displayOrders(data);
                        return data;
                    } else if (source == 'exchange') {
                        const userData = window.Telegram.WebApp.initDataUnsafe;
                        const ordersData = {
                            Request: 'get_orders_exchange',
                            User: userData.user,
                            Filter: filter
                        };

                        const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ordersData)
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        displayOrders(data, 'exchange');
                        return data;
                    }
                } catch (error) {
                    console.error('Ошибка при получении заказов:', error);
                    displayError('Не удалось загрузить заказы. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                }
            }

            async function getOffers(order) {
                // const orderDiv = document.createElement('div');
                // orderDiv.className = 'order-item';
                // orderDiv.innerHTML = `
                //     <div class="order-content">
                //         <strong>Заказ #${order.AutoNumber}</strong>
                //         <p>Предмет: ${order.subject}</p>
                //         <p>Тип задания: ${order.taskType}</p>
                //         <p>Дедлайн: ${new Date(order.deadline).toLocaleDateString()}</p>
                //         <p>Количество страниц: ${order.pageCount}</p>
                //         <p>Уникальность: ${order.uniqueness}</p>
                //         ${order.additionalInfo ? `<p>Доп. информация: ${order.additionalInfo}</p>` : ''}
                //     </div>
                // `;

                // let orderContainer = document.querySelector('#order-details-container');
                // orderContainer.appendChild(orderDiv); 

                showLoadingIndicator(); // Показываем индикатор загрузки
                let middleContent = document.querySelector('#order-details-container');
                middleContent.innerHTML = '';
                try {
                    const userData = window.Telegram.WebApp.initDataUnsafe;
                    const offersData = {
                        Request: 'get_offers',
                        User: userData.user,
                        Order: order
                    };

                    const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(offersData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    displayOffers(data);
                    return data;
                } catch (error) {
                    console.error('Ошибка при получении предложений:', error);
                    displayError('Не удалось загрузить предложения. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                }
            }

            async function getAuthorProfile() {
                showLoadingIndicator(); // Показываем индикатор загрузки
                // let middleContent = document.querySelector('#author-profile-container');
                // middleContent.innerHTML = '';
                try {
                    const userData = window.Telegram.WebApp.initDataUnsafe;
                    const requestData = {
                        Request: 'get_author_profile',
                        User: userData.user
                    };

                    const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    displayAuthorProfile(data);
                    return data;
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                    displayError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                }
            }

            function displayAuthorProfile(data) {
                let middleContent = document.querySelector('#author-profile-container');
                middleContent.innerHTML = '';
                // console.log(data);

                const authorDiv = document.createElement('div');
                authorDiv.className = 'order-item';
                authorDiv.innerHTML = `
                    <div class="order-content">
                        <strong>${data.Status}</strong>
                        <p>${data.Name}</p>
                        <p>${data.Level}: ${data.Specialty}</p>
                        <p>Опыт: ${data.Experience}</p>
                        ${data.Info ? `<p>О себе: ${data.Info}</p>` : ''}
                    </div>
                `;

                middleContent.appendChild(authorDiv);
            }

            function displayOffers(offers) {
                let middleContent = document.querySelector('#order-details-container');
                
                if (offers[0].__IMTLENGTH__ == 0) {
                    middleContent.innerHTML = '<p>У вас пока нет предложений от авторов.</p>';
                    return;
                }

                const offersWrapper = document.createElement('div');
                offersWrapper.className = 'orders-wrapper';
                const offersContainer = document.createElement('div');
                offersContainer.className = 'orders-container';

                const groupsCount = Math.ceil(offers.length / 3);
                for (let i = 0; i < groupsCount; i++) {
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'order-group';
                    const startIndex = i * 3;
                    const endIndex = Math.min((i + 1) * 3, offers.length);
                    for (let j = startIndex; j < endIndex; j++) {
                        const offer = offers[j];
                        if (offer.Price) {
                            const offerDiv = createOfferElement(offer);
                            groupDiv.appendChild(offerDiv);
                        }
                    }
                    offersContainer.appendChild(groupDiv);
                }

                offersWrapper.appendChild(offersContainer);
                middleContent.appendChild(offersWrapper);

                // Функция для пересчета размеров элементов
                function resizeOfferItems() {
                    const offerGroups = document.querySelectorAll('.order-group');
                    offerGroups.forEach(group => {
                        const offerItems = group.querySelectorAll('.order-item');
                        const groupWidth = group.offsetWidth;
                        const groupHeight = offersWrapper.offsetHeight;
                        const itemWidth = (groupWidth - 40) / 3; // 40px - это суммарный отступ между элементами (2 * 20px)
                        const itemHeight = groupHeight - 40; // 40px для отступов сверху и снизу

                        offerItems.forEach(item => {
                            // item.style.width = `${itemWidth}px`;
                            item.style.height = `${itemHeight}px`;
                            item.style.maxWidth = 'none';
                            item.style.maxHeight = 'none';
                        });
                    });
                }

                // Вызываем функцию при загрузке и изменении размера окна
                resizeOfferItems();
                window.addEventListener('resize', resizeOfferItems);

                let startX;
                let startY;
                let startTime;
                let isSwiping = false;
                const minSwipeDistance = 50; // Минимальное расстояние для свайпа
                const maxSwipeTime = 300; // Максимальное время для свайпа (в миллисекундах)

                offersWrapper.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].pageX - offersWrapper.offsetLeft;
                    startY = e.touches[0].pageY - offersWrapper.offsetTop;
                    startTime = new Date().getTime();
                    isSwiping = true;
                });

                offersWrapper.addEventListener('touchmove', (e) => {
                    if (!isSwiping) return;
                    e.preventDefault(); // Предотвращаем прокрутку страницы
                });
                
                offersWrapper.addEventListener('touchend', (e) => {
                    if (!isSwiping) return;
                    
                    const endX = e.changedTouches[0].pageX - offersWrapper.offsetLeft;
                    const endY = e.changedTouches[0].pageY - offersWrapper.offsetTop;
                    const endTime = new Date().getTime();
                    const diffX = endX - startX;
                    const diffY = endY - startY;
                    const elapsedTime = endTime - startTime;
                    
                    // Проверяем, был ли это свайп (достаточное расстояние и время)
                    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < Math.abs(diffX) && elapsedTime < maxSwipeTime) {
                        const groupWidth = offersWrapper.clientWidth;
                        const currentScrollLeft = offersWrapper.scrollLeft;
                        
                        // Определяем направление прокрутки
                        const direction = diffX < 0 ? 1 : -1;
                        
                        // Вычисляем новую позицию прокрутки
                        const currentGroup = Math.round(currentScrollLeft / groupWidth);
                        const newGroup = currentGroup + direction;
                        const scrollPosition = newGroup * groupWidth;
                        
                        // Ограничиваем прокрутку крайними значениями
                        const maxScroll = offersWrapper.scrollWidth - groupWidth;
                        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
                        
                        // Используем нашу функцию плавной прокрутки
                        smoothScrollTo(offersWrapper, finalScrollPosition, 300);
                    }
                    
                    isSwiping = false;
                });
            }

            function createOfferElement(offer) {
                const offerDiv = document.createElement('div');
                offerDiv.className = 'order-item';
                offerDiv.innerHTML = `
                    <div class="order-content">
                        <strong>Цена: ${offer.Price}</strong>
                        <p>Автор: ${offer.AuthorName[0]} (${offer.AuthorStatus[0]})</p>
                    </div>
                    <button id="order-details-btn" class="order-details-btn">Принять предложение</button>
                `;

                const submitButton = offerDiv.querySelector('#order-details-btn');
                submitButton.addEventListener('click', () => submitOffer(offer));

                return offerDiv;
            }

            async function submitOffer(offer) {
                showLoadingIndicator(); // Показываем индикатор загрузки
                try {
                    const userData = window.Telegram.WebApp.initDataUnsafe;
                    const offerData = {
                        Request: 'submit_offer',
                        User: userData.user,
                        Offer: offer
                    };

                    const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(offerData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    displayContact(data);
                    return data;
                } catch (error) {
                    console.error('Ошибка при отправке данных:', error);
                    displayError('Не удалось отправить данные. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                }
            }

            async function buyStatus(tarif) {
                alert('для завершения оплаты мы перенаправим вас в диалог с ботом');
                showLoadingIndicator(); // Показываем индикатор загрузки
                try {
                    const userData = window.Telegram.WebApp.initDataUnsafe;
                    const offerData = {
                        Request: 'buy_status',
                        User: userData.user,
                        Tarif: tarif
                    };

                    const response = await fetch('https://hook.eu2.make.com/qf2v83kjpyeni2dg2sqrdy6k3v28cwsf', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(offerData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    displayContact(data);
                    return data;
                } catch (error) {
                    console.error('Ошибка при отправке данных:', error);
                    displayError('Не удалось отправить данные. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                    tg.close();
                }
            }

            function displayContact(data) {
                alert(data);
            }

            function displayOrders(orders, source = 'client') {
                let middleContent;
                if (source == 'client') {
                    middleContent = document.querySelector('#user-orders-container');
                } else if (source == 'exchange') {
                    middleContent = document.querySelector('#author-orders-container');
                }
                
                middleContent.innerHTML = ''; // Очищаем содержимое
                if (orders.length === 0) {
                    middleContent.innerHTML = '<p>У вас пока нет заказов.</p>';
                    return;
                }
                const ordersWrapper = document.createElement('div');
                ordersWrapper.className = 'orders-wrapper';
                const ordersContainer = document.createElement('div');
                ordersContainer.className = 'orders-container';

                const groupsCount = Math.ceil(orders.length / 3);
                for (let i = 0; i < groupsCount; i++) {
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'order-group';
                    const startIndex = i * 3;
                    const endIndex = Math.min((i + 1) * 3, orders.length);
                    for (let j = startIndex; j < endIndex; j++) {
                        const order = orders[j];
                        const orderDiv = createOrderElement(order, source);
                        groupDiv.appendChild(orderDiv);
                    }
                    ordersContainer.appendChild(groupDiv);
                }

                ordersWrapper.appendChild(ordersContainer);
                middleContent.appendChild(ordersWrapper);

                // Функция для пересчета размеров элементов
                function resizeOrderItems() {
                    const orderGroups = document.querySelectorAll('.order-group');
                    orderGroups.forEach(group => {
                        const orderItems = group.querySelectorAll('.order-item');
                        const groupWidth = group.offsetWidth;
                        const groupHeight = ordersWrapper.offsetHeight;
                        const itemWidth = (groupWidth - 40) / 3; // 40px - это суммарный отступ между элементами (2 * 20px)
                        const itemHeight = groupHeight - 40; // 40px для отступов сверху и снизу

                        orderItems.forEach(item => {
                            // item.style.width = `${itemWidth}px`;
                            item.style.height = `${itemHeight}px`;
                            item.style.maxWidth = 'none';
                            item.style.maxHeight = 'none';
                        });
                    });
                }

                // Вызываем функцию при загрузке и изменении размера окна
                resizeOrderItems();
                window.addEventListener('resize', resizeOrderItems);

                let startX;
                let startY;
                let startTime;
                let isSwiping = false;
                const minSwipeDistance = 50; // Минимальное расстояние для свайпа
                const maxSwipeTime = 300; // Максимальное время для свайпа (в миллисекундах)

                ordersWrapper.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].pageX - ordersWrapper.offsetLeft;
                    startY = e.touches[0].pageY - ordersWrapper.offsetTop;
                    startTime = new Date().getTime();
                    isSwiping = true;
                });

                ordersWrapper.addEventListener('touchmove', (e) => {
                    if (!isSwiping) return;
                    e.preventDefault(); // Предотвращаем прокрутку страницы
                });
                
                ordersWrapper.addEventListener('touchend', (e) => {
                    if (!isSwiping) return;
                    
                    const endX = e.changedTouches[0].pageX - ordersWrapper.offsetLeft;
                    const endY = e.changedTouches[0].pageY - ordersWrapper.offsetTop;
                    const endTime = new Date().getTime();
                    const diffX = endX - startX;
                    const diffY = endY - startY;
                    const elapsedTime = endTime - startTime;
                    
                    // Проверяем, был ли это свайп (достаточное расстояние и время)
                    if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < Math.abs(diffX) && elapsedTime < maxSwipeTime) {
                        const groupWidth = ordersWrapper.clientWidth;
                        const currentScrollLeft = ordersWrapper.scrollLeft;
                        
                        // Определяем направление прокрутки
                        const direction = diffX < 0 ? 1 : -1;
                        
                        // Вычисляем новую позицию прокрутки
                        const currentGroup = Math.round(currentScrollLeft / groupWidth);
                        const newGroup = currentGroup + direction;
                        const scrollPosition = newGroup * groupWidth;
                        
                        // Ограничиваем прокрутку крайними значениями
                        const maxScroll = ordersWrapper.scrollWidth - groupWidth;
                        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));
                        
                        // Используем нашу функцию плавной прокрутки
                        smoothScrollTo(ordersWrapper, finalScrollPosition, 300);
                    }
                    
                    isSwiping = false;
                });
            }

            function smoothScrollTo(element, to, duration) {
                const start = element.scrollLeft;
                const change = to - start;
                const increment = 20;
                let currentTime = 0;

                function animateScroll() {
                    currentTime += increment;
                    const val = easeInOutQuad(currentTime, start, change, duration);
                    element.scrollLeft = val;
                    if (currentTime < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                animateScroll();
            }

            function createOrderElement(order, source = 'client') {
                let buttonText = 'Открыть';
                if (source != 'client') {
                    buttonText = 'Предложить цену';
                }
                const orderDiv = document.createElement('div');
                orderDiv.className = 'order-item';
                orderDiv.innerHTML = `
                    <div class="order-content">
                        <strong>Заказ #${order.AutoNumber}</strong>
                        <p>Предмет: ${order.subject}</p>
                        <p>Тип задания: ${order.taskType}</p>
                        <p>Дедлайн: ${new Date(order.deadline).toLocaleDateString()}</p>
                        <p>Количество страниц: ${order.pageCount}</p>
                        <p>Уникальность: ${order.uniqueness}</p>
                        ${order.additionalInfo ? `<p>Доп. информация: ${order.additionalInfo}</p>` : ''}
                    </div>
                    <button id="order-details-btn" class="order-details-btn">${buttonText}</button>
                `;

                const detailsButton = orderDiv.querySelector('#order-details-btn');
                if (source == 'client') {
                    detailsButton.addEventListener('click', () => switchPage('order-details-page', order));
                } else {
                    detailsButton.addEventListener('click', () => showOrderDetails(order));
                }

                return orderDiv;
            }

            function showOrderDetails(order) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Детали заказа #${order.AutoNumber}</h2>
                        <p><strong>Предмет:</strong> ${order.subject}</p>
                        <p><strong>Тип задания:</strong> ${order.taskType}</p>
                        <p><strong>Дедлайн:</strong> ${new Date(order.deadline).toLocaleDateString()}</p>
                        <p><strong>Количество страниц:</strong> ${order.pageCount}</p>
                        <p><strong>Уникальность:</strong> ${order.uniqueness}</p>
                        ${order.additionalInfo ? `<p><strong>Доп. информация:</strong> ${order.additionalInfo}</p>` : ''}
                        <div>
                            <label for="yourPrice">Ваша цена:</label>
                            <input type="number" id="yourPrice" name="yourPrice">
                        </div>
                        <button id="submitPrice" class="order-details-btn">Отправить</button>
                    </div>
                `;
                document.body.appendChild(modal);

                const closeBtn = modal.querySelector('.close');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });

                const submitBtn = modal.querySelector('#submitPrice');
                submitBtn.addEventListener('click', () => {
                    const price = modal.querySelector('#yourPrice').value;
                    console.log('Введенная сумма:', price);
                    sendOffer(order, modal.querySelector('#yourPrice').value, modal);
                    // document.body.removeChild(modal);
                });

                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            }

            async function sendOffer(order, offer, modal) {
                showLoadingIndicator(); // Показываем индикатор загрузки
                try {
                    const userData = window.Telegram.WebApp.initDataUnsafe;
                    const offerData = {
                        Request: 'set_offer',
                        User: userData.user,
                        Order: order,
                        Offer: offer
                    };

                    const response = await fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(offerData)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    displayOrders(data);
                    return data;
                } catch (error) {
                    console.error('Ошибка при отправке предложения:', error);
                    displayError('Не удалось отправить предложение. Пожалуйста, попробуйте позже.');
                } finally {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                    document.body.removeChild(modal);
                }
            }

            function showLoadingIndicator() {
                const loadingIndicator = document.createElement('div');
                loadingIndicator.id = 'loading-indicator';
                loadingIndicator.className = 'loading-spinner';
                document.body.appendChild(loadingIndicator);
            }

            function hideLoadingIndicator() {
                const loadingIndicator = document.getElementById('loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
            }

            function displayError(message) {
                const middleContent = document.querySelector('.middle-content');
                middleContent.innerHTML = `<p style="color: red;">${message}</p>`;
            }

            function confirmOrder() {
                showLoadingIndicator(); // Показываем индикатор загрузки
                // Собираем данные заказа
                const userData = window.Telegram.WebApp.initDataUnsafe;

                const orderData = {
                    Request: 'new_order',
                    taskType: taskTypeSelect.options[taskTypeSelect.selectedIndex].text,
                    subject: subjectSelect.options[subjectSelect.selectedIndex].text,
                    pageCount: pageCountInput.value,
                    deadline: deadline.value,
                    uniqueness: uniqSelect.options[uniqSelect.selectedIndex].text,
                    additionalInfo: document.getElementById('additional-info').value,
                    User: userData.user
                };

                // Отправляем данные на сервер
                fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => {
                    if (response.ok) {
                        // return response.json();
                        return;
                    }
                    throw new Error('Ошибка при отправке заказа');
                })
                .then(data => {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                    debug('Заказ успешно отправлен на сервер');
                    alert('Ваш заказ успешно отправлен!');
                    switchPage('confirm-page', 'first-page');
                })
                .catch(error => {
                    debug(`Ошибка при отправке заказа: ${error.message}`);
                    alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
                });
            }

            function confirmAuthorProfile() {
                showLoadingIndicator(); // Показываем индикатор загрузки
                const userData = window.Telegram.WebApp.initDataUnsafe;

                if (!userData.user.username) {
                    alert('Заполните username в профиле telegram, иначе заказчики не смогут с вами связаться.');
                    return;
                }

                const specialty = document.getElementById('specialty');
                const level = document.getElementById('level');
                const experience = document.getElementById('experience');

                const orderData = {
                    Request: 'update_author_profile',
                    specialty: specialty.options[specialty.selectedIndex].text,
                    level: level.options[level.selectedIndex].text,
                    experience: experience.options[experience.selectedIndex].text,
                    info: document.getElementById('additional-author-info').value,
                    User: userData.user
                };

                // Отправляем данные на сервер
                fetch('https://hook.eu2.make.com/9dtv8d3gghcyb07brfqvu1lb8qgamghn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => {
                    if (response.ok) {
                        // return response.json();
                        return;
                    }
                    throw new Error('Ошибка при отправке запроса');
                })
                .then(data => {
                    hideLoadingIndicator(); // Скрываем индикатор загрузки
                    alert('Готово!');
                    switchPage('author-first');
                })
                .catch(error => {
                    debug(`Ошибка при отправке данных: ${error.message}`);
                    alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
                });
            }

            // Установка минимальной даты для выбора (сегодня)
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('deadline-input').setAttribute('min', today);


            const taskTypeSelect = document.getElementById('task-type');
            const subjectSelect = document.getElementById('subject');
            const nextButton = document.getElementById('next-button');
            const pageCountInput = document.getElementById('page-count');
            const deadline = document.getElementById('deadline-input');
            const uniqSelect = document.getElementById('uniq');

            function goToNextPage() {
                debug(`Выбранный тип работы: ${taskTypeSelect.options[taskTypeSelect.selectedIndex].text}`);
                debug(`Выбранный предмет: ${subjectSelect.options[subjectSelect.selectedIndex].text}`);
                debug(`Количество страниц: ${pageCountInput.value}`);
                debug(`Дата сдачи: ${deadline.value}`);
                debug(`Уникальность: ${uniqSelect.value}`);
                if (taskTypeSelect.value && subjectSelect.value && pageCountInput.value) {
                    switchPage('order-type', 'add-info-page');
                } else {
                    alert('Пожалуйста, выберите тип работы, предмет и укажите количество страниц');
                }
            }

            if (window.Telegram && window.Telegram.WebApp) {
                const userData = window.Telegram.WebApp.initDataUnsafe;
                
                console.log('Данные пользователя Telegram:');
                console.log('User:', userData.user);
                console.log('Chat Type:', userData.chat_type);
                console.log('Chat Instance:', userData.chat_instance);
                console.log('Start Param:', userData.start_param);
                
                // Если есть данные пользователя, выводим их отдельно
                if (userData.user) {
                    console.log('\nПодробная информация о пользователе:');
                    console.log('ID:', userData.user.id);
                    console.log('First Name:', userData.user.first_name);
                    console.log('Last Name:', userData.user.last_name);
                    console.log('Username:', userData.user.username);
                    console.log('Language Code:', userData.user.language_code);
                }
            } else {
                console.log('Объект Telegram.WebApp недоступен. Убедитесь, что скрипт выполняется в среде Telegram Mini App.');
            }