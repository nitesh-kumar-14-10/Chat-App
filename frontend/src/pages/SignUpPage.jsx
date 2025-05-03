import { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
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
            Join BrainVerse and start your journey today
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            <span>{error.response?.data?.message || "Signup failed"}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Create Your Account</h2>
              <p className="text-sm text-gray-400">
                Fill in your details to start your journey
              </p>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full bg-black border-blue-800 text-white"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="input input-bordered w-full bg-black border-blue-800 text-white"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-black border-blue-800 text-white"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Terms */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs text-white">
                  I agree to the{" "}
                  <span className="text-blue-500 hover:underline">terms of service</span> and{" "}
                  <span className="text-blue-500 hover:underline">privacy policy</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-blue-800 hover:bg-blue-900 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Already have account */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
