import { login, registration, setToken, setName} from './api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
      <h1>Форма входа</h1>
      <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required/>
      <input type="password" class="add-form-name" placeholder="Введите пароль" id="password" required/>
      <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">Войти</button>
        <u class="add-form-button-link registry">Зарегестрироваться</u>
      </fieldset>
    </section>`

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
      renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
    if (!loginEl.value.trim() || !passwordEl.value.trim()) {
      alert('Пожалуйста, заполните все поля')
      loginEl.classList.add('error')
      passwordEl.classList.add('error')

      setTimeout(() => {
        loginEl.classList.remove('error')
        passwordEl.classList.remove('error')
      }, 3000)
      return
    }

    login(loginEl.value, passwordEl.value)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Неверный логин или пароль')
        }
        return response.json()
      })
      .then((data) => {
        setToken(data.user.token)
        setName(data.user.name)
        fetchAndRenderComments()
      })
      .catch((error) => {
        alert(error.message)
      })
  })
}