import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black text-white">
      <div className="border border-blue-800 flex flex-col w-full max-w-md mx-auto bg-black rounded-xl shadow-lg overflow-hidden p-6 sm:p-10">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            BrainVerse
          </h1>
          <p className="text-sm text-blue-200 mt-1">
            Connect with BrainVerse Friends
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            <span>{error.response?.data?.message || "Login failed"}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
              <p className="text-sm text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="input input-bordered w-full bg-black border-blue-800 text-white"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-black border-blue-800 text-white"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-blue-800 hover:bg-blue-900 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
