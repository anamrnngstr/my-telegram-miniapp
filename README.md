# my-telegram-miniapp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Request Card</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="card">
    <div class="status-bar">
        <div class="client-status">Постоянный клиент</div>
        <div class="date-time">Сегодня 17:45</div>
    </div>
    <div class="card-header">
        <h1>Правовое регулирование купли-продажи земельных участков</h1>
        <div class="article-info">
            <span class="category">Статья</span>
            <span class="field">Право и юриспруденция</span>
            <span class="due-date">30.08.2024</span>
        </div>
    </div>
    <div class="card-body">
        <p>Нужно написать курсовую работу объемом 30 страниц с оригинальностью 70% по антиплагиату РАНХиГС.
           Будет просьба, перед началом написания, нужно будет составить план курсовой работы, науч рук его согласует,
           а далее уже приступить к написанию самой курсовой.
        </p>
    </div>
    <div class="card-footer">
        <div class="price">Договорная цена</div>
        <div class="bids">37 ставок</div>
        <button class="submit-btn">Поставить ставку</button>
    </div>
</div>

</body>
</html>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
}

.card {
    background-color: #ffffff;
    width: 100%;
    max-width: 700px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    overflow: hidden;
}

.status-bar {
    background-color: #f0f0f0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}

.client-status {
    color: purple;
    font-weight: bold;
}

.date-time {
    color: gray;
}

.card-header h1 {
    font-size: 18px;
    padding: 10px 20px;
    margin: 0;
    border-bottom: 1px solid #eee;
}

.article-info {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #eee;
    font-size: 14px;
}

.card-body {
    padding: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}

.card-footer {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eee;
}

.price {
    font-weight: bold;
    color: #333;
}

.bids {
    color: #666;
}

.submit-btn {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
