import React, { useState } from "react";
import { checkValidData } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/organizationSlice";
import MiniCalendar from "./../components/calendar/MiniCalendar";
const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(errorMessage);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const toggleForm = () => {
    setErrorMessage(null);
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For address fields, update nested state
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let dataToValidate = { email: formData.email, password: formData.password };

    if (isRegistering) {
      dataToValidate = { ...formData }; // For registration, include all form fields
    }

    const message = checkValidData(dataToValidate, isRegistering);
    console.log(message);
    // You can handle form submission logic here
    setErrorMessage(message);
    if (message) return; // means there is error
    if (isRegistering) {
      console.log("Registration Data:", formData);
      try {
        const response = await axios.post("/organizations/", formData);
        console.log(response.status);
        if (response.status === 201) {
          // Registration successful
          alert(`User Registered Successfully! Please Log in.`);
          setIsRegistering(false); // Navigate to the login page
        } else {
          // Handle other success status codes or unexpected responses
          console.error("Unexpected response:", response);

          console.log(">>>>>>>>>>>>>>>>>>>", response.data);
        }
      } catch (error) {
        // Handle request failure or error
        console.error("Registration failed:", error);
        console.error("Registration failed:", error);
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error;
          setErrorMessage(errorMessage); // Set the error message received from the backend
        } else {
          setErrorMessage("Registration failed. Please try again."); // Set a default error message for other errors
        }
      }
    } else {
      console.log("Login Data:>>>", dataToValidate);
      try {
        const response = await axios.post("/organizations/login", formData);

        if (response.status === 200) {
          // Login successful
          alert(`Logged in successfully!`);
          console.log(response);
          dispatch(addUser(response.data));

          navigate("/"); // Navigate to the home/dashboard page
        } else {
          // Handle other success status codes or unexpected responses
          console.error("Unexpected response:", response);
          // Set an error message or handle the response accordingly
        }
      } catch (error) {
        // Handle request failure or error
        console.error("Login failed:", error);
        // Set an error message or handle the error based on your requirements
      }
    }
  };

  //   const handleButtonClick = () => {
  //     setErrorMessage(message);
  //     toast(message, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //     if (message) return;

  //     //create a  new user /sign up/sing in
  //     //navigate("/browse");

  //     if (!signIn) {
  //       //sing up logic
  //       createUserWithEmailAndPassword(
  //         auth,
  //         email.current.value,
  //         password.current.value
  //       )
  //         .then((userCredential) => {
  //           // Signed in
  //           const user = userCredential.user;
  //           updateProfile(auth.currentUser, {
  //             displayName: userName.current.value,
  //             photoURL: "https://avatars.githubusercontent.com/u/110342996?v=4",
  //           })
  //             .then(() => {
  //               const { uid, email, displayName, photoURL } = auth.currentUser;
  //               dispatch(
  //                 addUser({
  //                   uid: uid,
  //                   email: email,
  //                   displayName: displayName,
  //                   photoURL: photoURL,
  //                 })
  //               );
  //               navigate("/browse");
  //               // ...
  //             })
  //             .catch((error) => {
  //               // An error occurred
  //               // ...
  //               const errorCode = error.code;
  //               const errorMessage = error.message;
  //               setErrorMessage(errorCode + "-" + errorMessage);
  //             });

  //           // ...
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           setErrorMessage(errorCode + "-" + errorMessage);
  //           // ..
  //         });
  //     } else {
  //       //signIn logic
  //       signInWithEmailAndPassword(
  //         auth,
  //         email.current.value,
  //         password.current.value
  //       )
  //         .then((userCredential) => {
  //           // Signed in
  //           const user = userCredential.user;
  //           // ...
  //           console.log(user);
  //           if (user) {
  //             // dispatch(addUser(user));
  //             navigate("/browse");
  //           }
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           setErrorMessage(errorCode + "-" + errorMessage);
  //         });
  //     }
  //   };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {" "}
      organization
      <h2 className="text-2xl font-semibold mb-4">
        {isRegistering ? "Registration" : "Login"}
      </h2>
      {errorMessage ? (
        <label className="block mb-1 text-red-500">{errorMessage}</label>
      ) : (
        <div></div>
      )}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="mb-4">
            <label className="block mb-1">Organization name:</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
        )}
        {/* <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div> */}
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          />
        </div>
        {isRegistering && (
          <div className="mb-4">
            <label className="block mb-1">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
        )}
        <div className="mb-4 relative">
          <label className="block mb-1">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a9 9 0 0 0-7.053 13.982l1.04-1.746A6.1 6.1 0 0 1 10 7c1.787 0 3.417.774 4.542 2.01l1.042 1.746A9 9 0 0 0 10 3zm0 5c-.785 0-1.527.215-2.158.59l1.076 1.803A3.99 3.99 0 0 1 10 9a4 4 0 0 1 0 8c.785 0 1.527-.215 2.158-.59l1.076 1.803A6 6 0 0 0 10 17a6 6 0 0 0 0-12z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm14 0a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        {isRegistering && (
          <>
            {" "}
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                type="string"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Street:</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">city:</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">state:</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">country</label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Postal Code</label>
              <input
                type="text"
                name="address.postalCode" // Updated name for the postal code field
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>{" "}
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button
          className="ml-1 text-blue-500 underline focus:outline-none"
          onClick={toggleForm}
        >
          {isRegistering ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
