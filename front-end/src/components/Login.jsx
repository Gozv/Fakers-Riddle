import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(() => event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(() => event.target.value);
  };

  return (
    <section>
      <form className="px-20 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
        <label className="block">
          Email:
          <input
            type="email"
            placeholder="JoeDoe@email.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className="block">
          Password:
          <input
            type="password"
            placeholder=" ◽◽◽◽◽◽◽◽"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <Link to={"/room"}>
          <button
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Login;
