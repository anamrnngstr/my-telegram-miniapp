
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes, CallbackQueryHandler, MessageHandler, filters

# Функция для обработки команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [InlineKeyboardButton("Заказать", callback_data='order')],
        [InlineKeyboardButton("Исполнить", callback_data='perform')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Выберите действие:', reply_markup=reply_markup)

# Функция для обработки нажатий на кнопки
async def button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    if query.data == 'order':
        await query.edit_message_text(text="Вы выбрали 'Заказать'.")
    elif query.data == 'perform':
        await query.edit_message_text(text="Вы выбрали 'Исполнить'.")

# Функция для обработки обычных текстовых сообщений
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(update.message.text)

# Основная функция, где происходит настройка бота
def main() -> None:
    application = Application.builder().token('7394940775:AAH4jtyM2iJqHpIfMpyCh-4hvAojGRmqAqA').build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))
    
    # Добавляем обработчик для кнопок
    application.add_handler(CallbackQueryHandler(button))

    # Добавляем обработчик для всех текстовых сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Запускаем бота
    application.run_polling()

if __name__ == '__main__':
    main()
