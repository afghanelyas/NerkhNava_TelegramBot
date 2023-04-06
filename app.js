require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TOKEN;

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
  polling: true,
});

// Listener (handler) for telegram's /bookmark event

bot.onText(/\/start/, (msg) => {
  // send welcome message
  bot.sendMessage(msg.chat.id, "از کدام ولایت استید؟", {
    reply_markup: {
      keyboard: [["کابل", "هرات"], ["غزنی"], ["قندهار"]],
      resize_keyboard: true,
      one_time_keyboard: true,
      force_reply: true,
    },
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toString().toLocaleLowerCase().includes("کابل")) {
    bot.sendMessage(msg.chat.id, "از کدام بخیش میخواهید؟", {
      reply_markup: {
        keyboard: [["میوه جات", "سبزیجات"], ["مواد خوراکه"], [" گوشت و تیل"]],
      },
    });
  }

  if (msg.text.toString().toLowerCase().includes("میوه جات")) {
    bot.sendMessage(msg.chat.id, "از کدام نوع میوه میخواهید؟", {
      reply_markup: {
        inline_keyboard: [
          [
            {text: "سییب", callback_data: "سیب سیر ۳۴۰ افغانی "},
            {text: "انگور", callback_data: "انگور سیر ۲۳۰ افغانی"},
            {text: "شفتالو", callback_data: "شتفالو سیر ۱۰۰ افغانی"},
            {text: "مالته", callback_data: "مالته سیر ۱۲۰ افغانی"},
          ],
        ],
      },
    });
  } else if (msg.text.toString().toLowerCase().includes("سبزیجات")) {
    bot.sendMessage(msg.chat.id, "از کدام نوع سبزیجات میخواهید؟", {
      reply_markup: {
        inline_keyboard: [
          [
            {text: "گندنه", callback_data: "گندنه سیر ۷۰ افغانی"},
            {text: "پالک", callback_data: "پالک سیر ۱۲۰ افغانی"},
            {text: "ملی سرخک", callback_data: "ملی سرخک دسته ۵ افغانی"},
            {text: "نیش پیاز", callback_data: "نیش پیاز دسته ۵ افغانی"},
          ],
        ],
      },
    });
  } else if (msg.text.toString().toLowerCase().includes("مواد خوراکه")) {
    bot.sendMessage(msg.chat.id, "از کدام نوع مواد خوراکه میخواهید؟", {
      reply_markup: {
        inline_keyboard: [
          [
            {text: "آرد", callback_data: "آرد بوجی ۱۶۰۰ افغانی"},
            {text: "روغن", callback_data: "روغن پیپ ۲۰۰۰ افغانی"},
            {text: " برنج", callback_data: "  برنج بوجی ۹۰۰ افغانی"},
            {text: " لوبیا", callback_data: "لوبیا  سیر ۵۰۰ افغانی"},
          ],
        ],
      },
    });
  } else if (msg.text.toString().toLowerCase().includes("گوشت و تیل")) {
    bot.sendMessage(msg.chat.id, "از کدام نوع گوشت و تیل میخواهید؟", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "گوشت گوسفند",
              callback_data: "گوشت گوسفند فی کیلو ۴۵۰ افغانی",
            },
            {text: "گوشت گاو", callback_data: "گوشت گاو فی کیلو ۳۸۰ افغانی"},
            {text: "گوشت مرغ ", callback_data: "گوشت مرغ  فی کیلو ۲۳۰ افغانی"},
            {text: "تیل دیزل ", callback_data: "تیل دیزل فی لیتر ۱۱۰ افغانی"},
            {text: "تیل پطرول ", callback_data: "تیل پطرول فی لیتر ۸۴ افغانی"},
          ],
        ],
      },
    });
  }
});

// Listener (handler) for callback data from /label command
bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const category = callbackQuery.data;
  bot.sendMessage(message.chat.id, `${category}`);
});

// Inline keyboard options
const inlineKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "YES",
          callback_data: JSON.stringify({
            command: "we are fine",
            answer: "YES",
          }),
        },
        {
          text: "NO",
          callback_data: JSON.stringify({
            command: "sorry",
            answer: "NO",
          }),
        },
      ],
    ],
  },
};

// Keyboard layout for requesting phone number access
const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      [
        {
          text: "My phone number",
          request_contact: true,
          one_time_keyboard: true,
        },
      ],
      ["Cancel"],
    ],
  },
};

// Listener (handler) for retrieving phone number
bot.onText(/\/phone/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Can we get access to your phone number?",
    requestPhoneKeyboard
  );
});
