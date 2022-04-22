import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/Auth/slice";

export default function Login() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(credentials));
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
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
        <button>Login</button>
      </form>
    </div>
  );
}
