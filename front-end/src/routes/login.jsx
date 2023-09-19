import { Form, redirect } from "react-router-dom"

export async function action () {
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
            type="email"
            placeholder="JoeDoe@email.com"
            required
          />
        </label>
        <label className="block text-xl py-6">
          Password:
          <input
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