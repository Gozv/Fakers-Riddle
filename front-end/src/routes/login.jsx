import { ThemeProvider, createTheme, TextField, Grid, Button } from '@mui/material';
import { redirect } from "react-router-dom"
import { useState } from 'react';

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

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    emailMessage: "",
    passwordMessage: "",
  });

  const validateEmail = (email) => {
    const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailValid = validateEmail(email);
    let passwordValid = validatePassword(password);

    setError({
      emailError: !emailValid,
      passwordError: !passwordValid,
      emailMessage: emailValid ? "" : "Email incorrecto",
      passwordMessage: passwordValid ? "" : "Contraseña incorrecta",
    });

    if (emailValid && passwordValid) {
      console.log("Inicio de sesión exitoso");
  
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section>
        <form
          method="post"
          className="px-20 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
          <Grid item xs={8}>
            <TextField
              id="email"
              name="email"
              type="email"
              placeholder="JoeDoe@email.com"
              required
              error={error.emailError}
              variant="outlined"
              label="Email"
              helperText={error.emailError ? error.emailMessage : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} mt={2}>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder=" ◽◽◽◽◽◽◽◽"
              required
              error={error.passwordError}
              variant="outlined"
              label="Password"
              helperText={error.passwordError ? error.passwordMessage : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </Button>
        </form>
      </section>
    </ThemeProvider>
  );
}
// function Login() {
//   return (
//     <section>
//       <Form 
//         method="post"
//         className="px-20 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between"
//       >
//         <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
//         <label className="block text-xl py-6">
//             Email:
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="JoeDoe@email.com"
//               required
//             />
//           </label>
//           <label className="block text-xl py-6">
//             Password:
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder=" ◽◽◽◽◽◽◽◽"
//               required
//             />
//           </label>
//         <button
//             className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
//             type="submit"
//         >
//         Login
//         </button>
//       </Form>
//     </section>
//   )
// }

export default Login