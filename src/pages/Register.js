import { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../services/AuthService";

export default function Register({ onRegister }) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    firstName: "",
    lastName: "",
    checkbox: true,
  });

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalidCredentials(false);

    try {
      await authService.register(credentials);
      history.push("/");
      onRegister();
    } catch {
      setInvalidCredentials(true);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          value={credentials.firstName}
          placeholder="First Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, firstName: target.value })
          }
        />
        <input
          required
          value={credentials.lastName}
          placeholder="Last Name"
          onChange={({ target }) =>
            setCredentials({ ...credentials, lastName: target.value })
          }
        />
        <input
          required
          value={credentials.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setCredentials({ ...credentials, email: target.value })
          }
        />
        <input
          required
          value={credentials.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        <input
          required
          value={credentials.password_confirmation}
          type="password"
          placeholder="Confirm password"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              password_confirmation: target.value,
            })
          }
        />
        Accept Terms of Use
        <input
          required
          value={credentials.checkbox}
          type="checkbox"
          onChange={({ target }) =>
            setCredentials({
              ...credentials,
              checkbox: target.value,
            })
          }
        ></input>
        {invalidCredentials && (
          <p style={{ color: "red" }}>Invalid credentials</p>
        )}
        <button>Register</button>
      </form>
    </div>
  );
}
