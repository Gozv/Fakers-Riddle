import { Form, redirect } from "react-router-dom"
import {useState} from "react"

export async function action ({ request }) {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const data = await response.json()
  
  if (data.token) {
    window.localStorage.setItem('token', data.token);
  }

  if(data.refreshToken) {
    window.localStorage.setItem('refreshToken', data.refreshToken);
  }
  
  return redirect('/room')
}


function Login() {
  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (!validateEmail(value)) {
      setEmailError(true);
      setIsValid(false);
    } else {
      setEmailError(false);
      setIsValid(!passwordError);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (!validatePassword(value)) {
      setPasswordError(true);
      setIsValid(false);
    } else {
      setPasswordError(false);
      setIsValid(!emailError);
    }
  };

  return (
    <section>
      <Form
        method="post"
        className="px-20 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
        <label className="block text-xl py-6">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            placeholder="JoeDoe@email.com"
            required
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-red-500">Email incorrecto</p>
          )}
        </label>
        <label className="block text-xl py-6">
          Password:
          <input
            id="password"
            name="password"
            type="password"
            placeholder=" ◽◽◽◽◽◽◽◽"
            required
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="text-red-500">Contraseña incorrecta</p>
          )}
        </label>
        <button
          className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded  disabled:bg-slate-500"
          type="submit"
          disabled={!isValid}
        >
          Login
        </button>
      </Form>
    </section>
  )
}

export default Login;