import { Form, redirect } from "react-router-dom"

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
            />
          </label>
          <label className="block text-xl py-6">
            Password:
            <input
              id="password"
              name="password"
              type="password"
              placeholder=" ◽◽◽◽◽◽◽◽"
              required
            />
          </label>
        <button
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
            type="submit"
        >
        Login
        </button>
      </Form>
    </section>
  )
}

export default Login