export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <input class="add-form">
      <h1>Форма входа</h1>
      <input type="text" class="add-form-name" placeholder="Введите логин" id="login" required/>
      <input type="text" class="add-form-name" placeholder="Введите пароль" id="password" required></input>
      <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">Войти</button>
        <u class="add-form-button-link registry">Зарегестрироваться</u>
      </fieldset>
     </section>`

     container.innerHTML = loginHtml
}