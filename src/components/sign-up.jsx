/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { noNav } from "../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sameText, setSameText] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("An unknown Error Occurred!");
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [reqBody, setReqBody] = useState({});

  const dispatch = useDispatch();

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(reqBody);
    try {
      await axios.post(
        "https://citesentiment-backend.onrender.com/api/users/signup",
        reqBody
      );
    } catch (err) {
      if (err.response) {
        if (err.response.status == 400) {
          setErrorMsg(err.response.data.message);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          setErrorMsg("An unknown Error Occurred!");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }
      } else {
        setErrorMsg("An unknown Error Occurred!");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }

  dispatch(noNav());
  document.title = "Sign Up: CiteSentiment";
  return (
    <>
      <div className="flex flex-row justify-center items-center w-screen h-screen fixed top-0">
        <div className="flex flex-col w-full md:w-[55%] h-96 justify-center items-center">
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
                  Name:
                </span>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setReqBody({
                      ...reqBody,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                  className="input bg-accent input-bordered input-primary py-1 px-3 h-8 text-sm w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                />
              </label>
              <label className="label p-0 flex flex-col justify-start items-start">
                <span className="after:content-['*'] after:text-error after:text-lg label-text text-sm block text-primary-focus ">
                  Email:
                </span>
                <input
                  type="email"
                  required
                  onChange={(e) => {
                    setReqBody({
                      ...reqBody,
                      email: e.target.value,
                    });
                  }}
                  placeholder="Email"
                  className="input bg-accent input-bordered input-primary py-1 px-3 h-8 text-sm w-full focus:outline-none focus:ring-2 focus:text-primary-focus focus:font-medium text-neutral-500"
                />
              </label>
              <label className="label p-0 flex flex-col justify-start items-start">
                <span className="after:content-['*'] after:text-error after:text-lg  label-text text-sm block text-primary-focus ">
                  Password:
                </span>
                <div className="flex bg-accent justify-start w-full items-center gap-2 input input-bordered input-primary py-1 px-3 h-8 focus-within:outline-none focus-within:ring-2">
                  <input
                    type={passwordShown ? "text" : "password"}
                    required
                    onChange={(e) => {
                      if (
                        reqBody.confirmPassword &&
                        e.target.value === reqBody.confirmPassword
                      ) {
                        setSameText(true);
                      } else {
                        setSameText(false);
                      }
                      setReqBody({ ...reqBody, password: e.target.value });
                    }}
                    minLength={8}
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
              </label>
              <label className="label p-0 flex flex-col justify-start items-start">
                <span className="after:content-['*'] after:text-error after:text-lg  label-text text-sm block text-primary-focus">
                  Confirm Password:
                </span>
                <div className="flex bg-accent justify-start w-full items-center gap-2 input input-bordered input-primary py-1 px-3 h-8 focus-within:outline-none focus-within:ring-2">
                  <input
                    type={confirmPasswordShown ? "text" : "password"}
                    required
                    onChange={(e) => {
                      if (
                        reqBody.password &&
                        e.target.value === reqBody.password
                      ) {
                        setSameText(true);
                      } else {
                        setSameText(false);
                      }
                      setReqBody({
                        ...reqBody,
                        confirmPassword: e.target.value,
                      });
                    }}
                    minLength={8}
                    disabled={isLoading}
                    placeholder="Confirm Password"
                    className="w-full bg-accent focus:outline-none disabled:input-primary disabled:opacity-80 focus:text-primary-focus focus:font-medium text-neutral-500"
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
                      <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                    ) : (
                      <FontAwesomeIcon icon={faEye} size="sm" />
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
                  <FontAwesomeIcon icon={faCheck} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faX} size="sm" />
                )}
                "Password" and "Confirm Password" Must be Same
              </span>
              <span className="text-sm text-primary mt-4">
                By clicking "Sign Up" I agree to the{" "}
                <a
                  className="text-info hover:opacity-70"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  className="text-info hover:opacity-70"
                  href="terms-conditions"
                >
                  Terms & Conditions
                </a>
              </span>
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
                  disabled={isLoading || !sameText}
                  className="btn btn-primary h-8 min-h-5 rounded-xl my-5 disabled:bg-primary disabled:text-primary-content disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
