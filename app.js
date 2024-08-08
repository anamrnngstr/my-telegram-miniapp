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

tg.ready();
tg.expand();
tg.setHeaderColor('#298c6b');
tg.setBackgroundColor('#298c6b');

let isKeyboardVisible = false;
const initialWindowHeight = window.innerHeight;

function setExitButtonState() {
  tg.MainButton.setParams({
    text: '-',
    color: '#23775b',
    text_color: '#FFFFFF',
    is_active: true
  });
  // tg.MainButton.onClick(() => {
  //   tg.close();
  // });
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
    setExitButtonState();
  });
}

// Инициализация кнопки
setExitButtonState();
tg.MainButton.show();

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

// tg.MainButton.show();
// tg.MainButton.setParams({
//   // text: 'EXIT',
//   text: 'скрыть клавиатуру',
//   color: '#23775b',
//   text_color: '#FFFFFF',
//   is_active: true
// });

// // tg.MainButton.onClick(() => {
// //     tg.close();
// // });

// tg.MainButton.onClick(() => {
//     // Сначала убираем фокус с текущего элемента ввода
//       if (document.activeElement) {
//         document.activeElement.blur();
//       }
      
//       // Затем закрываем нативный попап (клавиатуру)
//       if (window.Telegram && window.Telegram.WebApp) {
//         window.Telegram.WebApp.closeScanQrPopup();
//       }
// });

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

// function switchPage(fromPageId, toPageId) {
//     const fromPage = document.getElementById(fromPageId);
//     const toPage = document.getElementById(toPageId);
    
//     fromPage.style.display = 'none';
//     toPage.style.display = 'flex';
    
//     if (toPageId === 'add-info-page') {
//         const additionalInfo = document.getElementById('additional-info');
//         autoResize(additionalInfo);
//     }
    
//     debug(`Переключение с ${fromPageId} на ${toPageId}`);
// }

function updateConfirmPage() {
    document.getElementById('confirm-task-type').textContent = taskTypeSelect.options[taskTypeSelect.selectedIndex].text;
    document.getElementById('confirm-subject').textContent = subjectSelect.options[subjectSelect.selectedIndex].text;
    document.getElementById('confirm-page-count').textContent = pageCountInput.value;
    document.getElementById('confirm-deadline').textContent = deadline.value;
    document.getElementById('confirm-uniq').textContent = uniqSelect.options[uniqSelect.selectedIndex].text;
    document.getElementById('confirm-additional-info').textContent = document.getElementById('additional-info').value;
}

           

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

        if (fromPage && toPage) {
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
        } else {
            if (!fromPage) console.error(`Element with id ${fromPageId} not found`);
            if (!toPage) console.error(`Element with id ${toPageId} not found`);
        }
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

        async function getOrders() {
            try {
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
            } catch (error) {
                console.error('Ошибка при получении заказов:', error);
                displayError('Не удалось загрузить заказы. Пожалуйста, попробуйте позже.');
            }
        }

        function displayOrders(orders) {
            const middleContent = document.querySelector('.middle-content-orders');
            middleContent.innerHTML = ''; // Очищаем содержимое

            if (orders.length === 0) {
                middleContent.innerHTML = '<p>У вас пока нет заказов.</p>';
                return;
            }

            const ordersList = document.createElement('ul');
            ordersList.style.listStyleType = 'none';
            ordersList.style.padding = '0';

            orders.forEach((order, index) => {
                const listItem = document.createElement('li');
                listItem.style.marginBottom = '10px';
                listItem.style.padding = '10px';
                listItem.style.border = '1px solid #ddd';
                listItem.style.borderRadius = '5px';

                listItem.innerHTML = `
                    <strong>Заказ #${order.AutoNumber}</strong><br>
                    Предмет: ${order.subject}<br>
                    Тип задания: ${order.taskType}<br>
                    Дедлайн: ${new Date(order.deadline).toLocaleDateString()}<br>
                    Количество страниц: ${order.pageCount}<br>
                    Уникальность: ${order.uniqueness}<br>
                    ${order.additionalInfo ? `Доп. информация: ${order.additionalInfo}` : ''}
                `;

                ordersList.appendChild(listItem);
            });

            middleContent.appendChild(ordersList);
        }

        function displayError(message) {
            const middleContent = document.querySelector('.middle-content');
            middleContent.innerHTML = `<p style="color: red;">${message}</p>`;
        }

        function confirmOrder() {
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
                debug('Заказ успешно отправлен на сервер');
                alert('Ваш заказ успешно отправлен!');
                switchPage('confirm-page', 'first-page');
            })
            .catch(error => {
                debug(`Ошибка при отправке заказа: ${error.message}`);
                alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
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


