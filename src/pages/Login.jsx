import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api-project-ns11.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      navigate("/app");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-[500px] rounded-md bg-white p-8 ">
        <h2 className="mb-6 text-center font-sans text-4xl font-bold text-pink-500">
          Log in
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-between gap-4 border border-black bg-[#f5f5f5] p-4 shadow-[4px_4px_0px_#000] mb-12"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="self-start flex items-center justify-center gap-1 px-3 py-2 border-none rounded-[15px] bg-pink-200 font-bold text-sm cursor-pointer  hover:bg-pink-300 transition"
          >
            Log In
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-center text-lg text-gray-700 mb-10">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Register here
          </Link>
        </p>
        <Link
          to="/"
          className="mt-6 text-pink-400 hover:text-pink-600 underline transition mb-8"
        >
          ← Back to Home
        </Link>
        {isLoading && <p>Logging in...</p>}
      </div>
    </div>
  );
};

export default Login;
