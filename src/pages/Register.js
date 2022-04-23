import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth/slice";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    firstName: "",
    lastName: "",
    terms: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div>
      <h2>Register</h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          value={userData.firstName}
          placeholder="First Name"
          onChange={({ target }) =>
            setUserData({ ...userData, firstName: target.value })
          }
        />
        <input
          required
          value={userData.lastName}
          placeholder="Last Name"
          onChange={({ target }) =>
            setUserData({ ...userData, lastName: target.value })
          }
        />
        <input
          required
          value={userData.email}
          type="email"
          placeholder="Email"
          onChange={({ target }) =>
            setUserData({ ...userData, email: target.value })
          }
        />
        <input
          required
          value={userData.password}
          type="password"
          placeholder="Password"
          onChange={({ target }) =>
            setUserData({ ...userData, password: target.value })
          }
        />
        <input
          required
          value={userData.password_confirmation}
          type="password"
          placeholder="Confirm password"
          onChange={({ target }) =>
            setUserData({
              ...userData,
              password_confirmation: target.value,
            })
          }
        />
        Accept Terms of Use
        <input
          required
          value={userData.terms}
          type="checkbox"
          onChange={({ target }) =>
            setUserData({
              ...userData,
              terms: target.value,
            })
          }
        ></input>
        <button>Register</button>
      </form>
    </div>
  );
}
