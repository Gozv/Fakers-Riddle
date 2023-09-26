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
    if (!validateUserName(value)) {
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
    <main>
      <div className="px-24 font-serif border rounded-xl content-between">
        <Form method="post" className="grid-flow-col">
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input type="text" id="firstName" name="firstName" placeholder="Type here" className="input input-bordered w-full max-w-lg" required />
          </div>
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input id="lastName" name="lastName" type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" required />
          </div>
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
              <span className="label-text">Email</span>
            </label>
            <input id="email" name="email" type="email" placeholder="user@email.com" className="input input-bordered w-full max-w-s" onChange={handleEmailChange} required />
            <label className="label">
              <span className="label-text-alt">
                {emailError && (
                  <p className="text-red-500">Please enter a valid email address</p>
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
          <div className="form-control w-full max-w-lg">
            <label className="label">
              <span className="label-text">Birthday</span>
            </label>
            <input id="birthday" name="birthday" type="date" className="input input-bordered w-full max-w-s" required />
            <label className="label">
              <span className="label-text-alt">
                {passwordError && (
                  <p className="text-red-500">The password must contain 8 characters with at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)</p>
                )}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full item-center bg-slate-900 hover.bg-slate-950 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500"
            disabled={!isValid}
          >
            Accept
          </button>
        </Form>
      </div>
    </main>
  );
}

export default Register;
