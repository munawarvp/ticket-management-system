import { useState } from "react";
import { authenticateUser } from "../utils/api_service";
import { setLocal } from "../utils/helper";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      if (!username || !password) {
        alert("Please enter username and password");
        return;
      }
      const response = await authenticateUser({ username, password });
      if (response.success) {
        setLocal(JSON.stringify(response.data), "token");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => {
                    const passwordInput = document.getElementById("password");
                    const eyeIcon = document.getElementById("eye-icon");
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                      eyeIcon.classList.remove("fa-eye");
                      eyeIcon.classList.add("fa-eye-slash");
                    } else {
                      passwordInput.type = "password";
                      eyeIcon.classList.remove("fa-eye-slash");
                      eyeIcon.classList.add("fa-eye");
                    }
                  }}
                >
                  <i className="fas fa-eye" id="eye-icon"></i>
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600 flex justify-between">
              <p>Don't have an account?</p>
              <p className="text-indigo-600" onClick={() => navigate("/signup")}>Sign up</p>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onClick={loginUser}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
