import { Form, redirect } from "react-router-dom";
import { useState } from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);

  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const data = await response.json();

  if(data.userName) {
    window.sessionStorage.setItem('userName', data.userName)
  }

  if (data.token) { 
    window.localStorage.setItem("token", data.token);
  }

  if (data.refreshToken) {
    window.localStorage.setItem("refreshToken", data.refreshToken);
  }

  if (!data.token) {
    alert("Please try again or go to registration firth");
    return redirect("/login");
  } else {
    return redirect("/room");
  }
}

function Login() {
  const [isValid, setIsValid] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateUserName = (userName) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[_])[a-z\d_]+$/;
    return regex.test(userName);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(password);
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    if (!validateUserName(value)) {
      setUserNameError(true);
      setIsValid(false);
    } else {
      setUserNameError(false);
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
      setIsValid(!userNameError);
    }
  };

  return (
    <section className="md:h-screen">
      <Form
        method="post"
        className="px-20 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
        <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input id="userName" name="userName" type="text" placeholder="user_01" className="input input-bordered w-full max-w-lg" onChange={handleUserNameChange} required />
            <label className="label">
              <span className="label-text-alt">
                {userNameError && (
                  <p className="text-red-500">Username must contain lowercase letters, a digit and an underscore</p>
                )}
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input id="password" name="password" type="text" placeholder="▪▪▪▪▪▪▪▪" className="input input-bordered w-full max-w-s" onChange={handlePasswordChange} required />
            <label className="label">
              <span className="label-text-alt">
                {passwordError && (
                  <p className="text-red-500">The password must contain 8 characters with at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)</p>
                )}
              </span>
            </label>
          </div>
        <button
          className="w-full item-center bg-curious-blue-700 hover:bg-curious-blue-600 text-white font-bold py-2 px-4 rounded  disabled:bg-slate-500"
          type="submit"
          disabled={!isValid}
        >
          Login
        </button>
      </Form>
    </section>
  );
}

export default Login;
