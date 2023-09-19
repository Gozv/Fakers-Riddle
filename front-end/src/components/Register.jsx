import { Link } from "react-router-dom";
import { useRef } from "react";
import SendForm from "./SendForm";

function Register() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const birthdayRef = useRef(null);

  const handleSubmit = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const birthday = birthdayRef.current.value;

    return(
      <SendForm 
      firstName={firstName}
      lastName={lastName}
      userName={userName}
      email={email}
      password={password}
      birthday={birthday}
      />
    )
  }
  
  return (
    <main className="h-screen">
      <div className="px-8 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          <label className="block text-xl py-6">
            First Name:
            <input
              name="firstName"
              type="text"
              placeholder=" Joe"
              ref={firstNameRef}
              required
            />
          </label>
          <label className="block text-xl py-6">
            Last Name:
            <input
              name="lastName"
              type="text"
              placeholder=" Doe"
              ref={lastNameRef}
              required
            />
          </label>
          <label className="block text-xl py-6">
            User Name:
            <input
              name="userName"
              type="text"
              placeholder=" JoeD_01"
              ref={userNameRef}
              required
            />
          </label>
          <label className="block text-xl py-6">
            Email:
            <input
              name="email"
              type="email"
              placeholder="JoeDoe@email.com"
              ref={emailRef}
              required
            />
          </label>
          <label className="block text-xl py-6">
            Password:
            <input
              name="password"
              type="password"
              placeholder=" ◽◽◽◽◽◽◽◽"
              ref={passwordRef}
              required
            />
          </label>
          <label className="block text-xl py-6">
            Birthday:
            <input
              name="birthday"
              type="date"
              ref={birthdayRef}
              required
            />
          </label>
          <button
            onClick={handleSubmit}
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
      </div>
      <p className="text-center text-gray-500 text-s">
        Are you already registered?
        <Link to="/login" className="bg-green-700 hover:bg-green-900 hover:underline text-white px-4 rounded flex-end">
          Login
        </Link>
      </p>
    </main>
  );
}

export default Register;
