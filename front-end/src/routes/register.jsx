import { Form, redirect } from "react-router-dom";
import { useState } from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  await response.json()

  return redirect("/login");
}

function Register() {
  const [isValid, setIsValid] = useState(false);

  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateUserName = (userName) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[_])[a-z\d_]+$/;
    return regex.test(userName)
  }

  const validateEmail = (email) => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(password);
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    if(!validateUserName(value)) {
      setUserNameError(true)
      setIsValid(false)
    } else {
      setUserNameError(false)
      setIsValid(!emailError)
    }
  }

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
      setIsValid(!userNameError);
    }
  };

  return (
    <>
      <div className="px-8 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        <Form method="post">
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          <label className="block text-xl py-6">
            First Name:
            <input id="firstName" name="firstName" type="text" placeholder=" Joe" />
          </label>
          <label className="block text-xl py-6">
            Last Name:
            <input id="lastName" name="lastName" type="text" placeholder=" Doe" required />
          </label>
          <label className="block text-xl py-6">
            User Name:
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder=" joe_001"
              required
              onChange={handleUserNameChange}
            />
            {userNameError && (
              <p className="text-red-500">Username must contain lowercase letters, a digit and an underscore</p>
            )}
          </label>
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
              <p className="text-red-500">Please enter a valid email address</p>
            )}
          </label>
          <label className="block text-xl py-6">
            Password:
            <input
              id="password"
              name="password"
              type="password"
              placeholder="▪▪▪▪▪▪▪▪"
              required
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500">The password must contain 8 characters with at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)</p>
            )}
          </label>
          <label className="block text-xl py-6">
            Birthday:
            <input id="birthday" name="birthday" type="date" />
          </label>
          <button 
            type="submit"
            className="w-full item-center bg-green-700 hover.bg-green-900 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500"
            disabled={!isValid}
          >
            Accept
          </button>
        </Form>
      </div>
    </>
  );
}

export default Register;
