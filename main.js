class UserService {  
  constructor(username, password) {
    this._username = username;
    this._password = password;
  }
  
  _getUsername() {
    return this._username.trim();
  }
  
  _getPassword() {
    return this._password.trim(); 
  }
  
  isValidParams() {
    let isValid = false;
    let validatePass = this._getPassword();
    let validateUserName = this._getUsername();
    
    if (validateUserName && validatePass.length >= 8) {
      isValid = true;
    } else {
      throw new Error('Недопустимые логин или пароль')
    } 
    return isValid;
  }
  
  async authenticateUser() {
    let _url = 'https://examples.com/api/user/authenticate';
    let data = {
      username: this._getUsername(),
      password: this._getPassword(),
    };
          
    try {
      const response = await fetch(_url, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
      }
      
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}

const $loginBtn = document.querySelector('form #login');
const $username = document.querySelector('#username');
const $password = document.querySelector('#password');

$loginBtn.addEventListener('click', () => {
  const username = $username.value;
  const password = $password.value;

  const user = new UserService(username, password);

  if ( user.isValidParams() ) {
    user.authenticateUser();
  }
});
