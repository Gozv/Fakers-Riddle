import { Form, redirect } from 'react-router-dom'

export async function action({ request }) {
  const formData = await request.formData()
  const userData = Object.fromEntries(formData)
  const response = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  const data = await response.json()

  console.log(data)
  if (response.ok){
    return redirect('/login')
  }
}

function Register() {
  return (
    <>
      <div className="px-8 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        <Form method="post">
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          <label className="block text-xl py-6">
            First Name:
            <input id="firstName" name="firstName" type="text" placeholder=" Joe" required />
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
              placeholder=" JoeD_01"
              required
            />
          </label>
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
              type="text"
              placeholder=" ◽◽◽◽◽◽◽◽"
              required
            />
          </label>
          <label className="block text-xl py-6">
            Birthday:
            <input id="birthday" name="birthday" type="date" required />
          </label>
          <button 
            type="submit"
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </button>
        </Form>
      </div>
    </>
  )
}

export default Register
