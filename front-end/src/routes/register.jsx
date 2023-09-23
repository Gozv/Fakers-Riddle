import {redirect } from "react-router-dom";
import {Box, TextField, Button, Grid} from "@mui/material"
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
  const data = await response.json()
  console.log(data)
  return redirect("/login");
}

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
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
      console.log("Registro exitoso");
      // Aquí puedes realizar el registro o enviar los datos al servidor
    }
  };

  return (
    <>
   

      <div className="px-8 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        {/* <Form method="post"> */}
          <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>
          <Box component="form" method="post" onSubmit={handleSubmit}>
            <Grid item xs={8}>
<TextField
id="firstName"
label="First name"
type="text"
placeholder="Joe"
variant="outlined"
helperText="Put your Name"
error={error.error}
required
/>
</Grid>
<Grid item xs={8} mt={2}>
<TextField
label="Last Name"
id="lastName"
name="lastName"
type="text"
placeholder="Doe"
required
variant="outlined"
helperText="Put your Last Name"
error={error.error}

/>
</Grid>
<Grid item xs={8} mt={2}>
<TextField
id="userName"
name="userName"
type="text"
placeholder="JoeD_01"
required
label="User Name"
error={error.error}
helperText="Put your User Name"
variant="outlined"
/>
</Grid>
<Grid item xs={8} mt={2}>
<TextField
id="email"
name="email"
type="email"
placeholder="JoeDoe@email.com"
required
error={error.error}
variant="outlined"
label="Email:"
helperText="Put your email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</Grid>
<Grid item xs={8} mt={2}>
<TextField
id="password"
name="password"
type="password"
placeholder="*********"
required
label="Password"
helperText="Put your Password"
error={error.passwordError}
variant="outlined"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
</Grid>
<Grid item xs={8} mt={2}>
<TextField
id="birthday"
name="birthday"
type="date"
variant="outlined"
error={error.error}
helperText="Put yout birthday"
/>
</Grid>

<Button 
            type="submit"
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </Button>
</Box>

          {/* <label className="block text-xl py-6">
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
              type="password"
              placeholder=" ◽◽◽◽◽◽◽◽"
              required
            />
          </label>
          <label className="block text-xl py-6">
            Birthday:
            <input id="birthday" name="birthday" type="date" required />
          </label> */}
          {/* <Button 
            type="submit"
            className="w-full item-center bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </Button> */}
        {/* </Form> */}
      </div>
    </>
  );
}

export default Register;
