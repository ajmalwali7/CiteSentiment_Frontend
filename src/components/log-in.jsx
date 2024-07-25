/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, noNav, setUser } from "../actions";

export function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sameText, setSameText] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [tokenWrong, setTokenWrong] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("An Unknown Error Occurred!");
  const [reqBody, setReqBody] = useState({});

  const navigate = useNavigate();

  const errorFunc = (msg) => {
    setErrorMsg(msg);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  async function sendReset(e) {
    e.preventDefault();
    setIsLoading(true);
    const email = {
      email: e.target[0].value.toLowerCase(),
    };
    try {
      await axios.post(
        `https://citesentiment-backend.onrender.com/api/users/forgotPassword`,
        email
      );
      document.querySelector("form").reset();
      setTokenSent(true);
    } catch (err) {
      if (err.response) {
        if (err.response.status == 404) {
          errorFunc(err.response.data.message);
        } else {
          errorFunc("An Unknown Error Occurred!");
        }
      } else {
        errorFunc("An Unknown Error Occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(e) {
    e.preventDefault();
    console.log(e);
    setIsLoading(true);
    const body = {
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const res = await axios.patch(
        `https://citesentiment-backend.onrender.com/api/users/resetPassword/${e.target[0].value}`,
        body
      );
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      navigate("/");
    } catch (err) {
      if (err.response.status == 400) {
        setTokenWrong(true);
        setTimeout(() => {
          setTokenWrong(false);
        }, 3000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://citesentiment-backend.onrender.com/api/users/login`,
        reqBody
      );
      document.cookie = `jwt=${res.data.token}; max-age=${new Date(
        Date.now + 2 * 24 * 60 * 60 * 1000
      )}`;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      navigate("/");
    } catch (err) {
      if (err.response) {
        if (err.response.status == 401) {
          errorFunc(err.response.data.message);
        } else {
          errorFunc("An Unknown Error Occurred!");
        }
      } else {
        errorFunc("An Unknown Error Occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  }
  dispatch(noNav());
  document.title = "Log In: Research Spider";

  return (
    <>
      <div className="flex flex-row justify-center items-center w-screen h-screen fixed top-0">
        <div className="flex flex-col w-full md:w-[55%] h-96 justify-center items-center">
          {!forgotPassword ? (
            <form onSubmit={handleForm} className="w-11/12 max-w-sm md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-2 px-5 h-fit">
                <div className="avatar mb-6 flex justify-center">
                  <div className="w-14 h-14 rounded">
                    <img src={`/imgs/logo/logo.PNG`} />
                  </div>
                </div>
                {error && (
                  <span className="text-error w-full text-center text-base font-normal h-4 max-w-xs p-0">
                    {errorMsg}
                  </span>
                )}
                <label className="label p-0 flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus">
                    Email:
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    onChange={(e) => {
                      setReqBody({
                        ...reqBody,
                        email: e.target.value.toLowerCase(),
                      });
                    }}
                    disabled={isLoading}
                    className="input bg-accent input-bordered input-primary py-1 px-3 h-8 text-sm w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label p-0 flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus">
                    Password:
                  </span>
                  <div className="flex bg-accent justify-start w-full items-center gap-2 input input-bordered input-primary py-1 px-3 h-8 focus-within:outline-none focus-within:ring-2">
                    <input
                      type={passwordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        setReqBody({ ...reqBody, password: e.target.value });
                      }}
                      disabled={isLoading}
                      placeholder="Password"
                      className="w-full bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                    <button
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                        // console.log(reqBody);
                      }}
                      type="button"
                      disabled={isLoading}
                      className="hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                    >
                      {passwordShown ? (
                        <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} size="sm" />
                      )}
                    </button>
                  </div>
                  <a
                    onClick={() => setForgotPassword(true)}
                    className="link text-xs m-1 self-end block text-primary-focus "
                  >
                    Forgot Password
                  </a>
                </label>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    disabled={isLoading}
                    className="btn btn-secondary h-8 min-h-5 rounded-xl my-5 disabled:bg-secondary disabled:text-secondary-content disabled:opacity-70"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary h-8 min-h-5 rounded-xl my-5 disabled:bg-primary disabled:text-primary-content disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : !tokenSent ? (
            <form onSubmit={sendReset} className="w-11/12 max-w-sm md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-2 px-5 h-fit">
                <div className="avatar mb-6 flex justify-center">
                  <div className="w-14 h-14 rounded">
                    <img src={`/imgs/logo/logo.PNG`} />
                  </div>
                </div>
                {error && (
                  <span className="text-error w-full text-center text-base font-normal h-4 max-w-xs p-0">
                    {errorMsg}
                  </span>
                )}
                <label className="label p-0 flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus">
                    Email:
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="input bg-accent input-bordered input-primary py-1 px-3 h-8 text-sm w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setForgotPassword(false)}
                    disabled={isLoading}
                    className="btn btn-secondary h-8 min-h-5 rounded-xl my-5 disabled:bg-secondary disabled:text-secondary-content disabled:opacity-70"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary h-8 min-h-5 rounded-xl my-5 disabled:bg-primary disabled:text-primary-content disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Send Link"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={resetPassword} className="w-11/12 md:w-9/12">
              <div className="flex flex-col card bg-accent shadow-xl w-full py-4 px-5 h-fit">
                <div className="avatar mb-6">
                  <div className="w-14 h-14 rounded">
                    <img src={`/imgs/logo/logo.PNG`} />
                  </div>
                </div>
                {tokenWrong && (
                  <span className="alert alert-error text-white font-medium mb-2 p-2 pl-4 flex items-center">
                    Token You Copied Is Not Correct, Please Try Again!
                  </span>
                )}
                {error && (
                  <span className="alert alert-error text-white font-medium mb-2 h-6 max-w-xs p-0 pl-4 flex items-center">
                    An Unknown Error Occurred!
                  </span>
                )}
                <span className="alert alert-info text-sm md:text-base text-white md:font-medium mb-2 h-fit p-2">
                  Token Sent To Your Email, Please Copy The Token Here
                </span>
                <label className="label p-0 flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus">
                    Token:
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Token"
                    className="input input-bordered input-primary w-full max-w-xs focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                  />
                </label>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus">
                    New Password:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={passwordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        if (
                          confirmPassword &&
                          e.target.value === confirmPassword
                        ) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setPassword(e.target.value);
                      }}
                      minLength={8}
                      disabled={isLoading}
                      placeholder="New Password"
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                    <button
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                        // console.log(reqBody);
                      }}
                      type="button"
                      disabled={isLoading}
                      className="hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                    >
                      {passwordShown ? (
                        <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} size="xl" />
                      )}
                    </button>
                  </div>
                </label>
                <label className="label flex flex-col justify-start items-start">
                  <span className="after:content-['*'] after:ml-1 after:text-error after:text-lg  label-text text-base block text-primary-focus">
                    Confirm New Password:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input input-bordered input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type={confirmPasswordShown ? "text" : "password"}
                      required
                      onChange={(e) => {
                        if (password && e.target.value === password) {
                          setSameText(true);
                        } else {
                          setSameText(false);
                        }
                        setConfirmPassword(e.target.value);
                      }}
                      disabled={isLoading}
                      placeholder="Confirm New Password"
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
                    />
                    <button
                      onClick={() => {
                        setConfirmPasswordShown(!confirmPasswordShown);
                        // console.log(reqBody);
                      }}
                      type="button"
                      disabled={isLoading}
                      className="hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                    >
                      {confirmPasswordShown ? (
                        <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                      ) : (
                        <FontAwesomeIcon icon={faEye} size="xl" />
                      )}
                    </button>
                  </div>
                </label>
                <span
                  className={`text-xs text-error block ${
                    sameText ? "text-success" : "text-error"
                  }`}
                >
                  {sameText ? (
                    <FontAwesomeIcon icon={faCheck} size="xl" />
                  ) : (
                    <FontAwesomeIcon icon={faX} size="xl" />
                  )}
                  "New Password" and "Confirm New Password" Must be Same
                </span>
                <div className="flex justify-between">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setTokenSent(false)}
                    className="btn btn-secondary rounded-3xl mt-5 disabled:btn-secondary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Back"
                    )}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !sameText}
                    className="btn btn-primary rounded-3xl mt-5 disabled:btn-primary disabled:opacity-80"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
