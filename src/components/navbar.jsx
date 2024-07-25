/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../actions/index";

export function Navbar() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const navbar = useSelector((store) => store.nav);
  const [mobNav, setMobNav] = useState(false);
  // const getCookieValue = (name) =>
  //   document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  const navigate = useNavigate();

  return (
    <>
      {navbar && (
        <>
          <div className="navbar shadow-md bg-accent h-[7vh] z-[9999] min-h-0 opacity-90 items-center w-full fixed flex flex-row justify-between">
            <div className="block md:hidden">
              {logged && (
                <label
                  htmlFor="my-drawer-2"
                  className="swap swap-rotate btn btn-primary btn-circle btn-outline w-8 h-8 min-h-fit min-w-fit border-0"
                >
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" />

                  {/* hamburger icon */}
                  <svg
                    className="swap-off fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className="swap-on fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              )}
            </div>
            <div className="flex gap-2 px-5">
              <div className="py-1">
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-2xl md:text-3xl text-primary font-light md:font-medium flex gap-2 items-center justify-center cursor-pointer"
                >
                  <div className="avatar">
                    <div className="w-9 h-9">
                      <img src={`/imgs/logo/logo.PNG`} />
                    </div>
                  </div>
                  CiteSentiment
                </a>
              </div>
            </div>
            {logged && (
              <div className="menu menu-horizontal p-0 pr-3 pt-2">
                <details className="dropdown dropdown-end z-[5000]">
                  <summary className="marker:content-none">
                    <div tabIndex={0} className="avatar">
                      <div className="w-9 h-9 rounded-full">
                        <img
                          src={
                            user.photo
                              ? `${user.photo}`
                              : `/imgs/user-imgs/user.PNG`
                          }
                        />
                      </div>
                    </div>
                  </summary>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[5000] p-1 shadow bg-accent rounded-box w-36 mt-4 text-primary text-lg"
                  >
                    <li>
                      <a href="/my-settings">Settings</a>
                    </li>
                    <li>
                      <a onClick={() => dispatch(logOut())} href="/">
                        Log Out
                      </a>
                    </li>
                  </ul>
                </details>
              </div>
            )}
            {!logged && (
              <div>
                <div className="hidden md:block">
                  <ul className="menu menu-horizontal px-5 flex gap-9 items-end">
                    <li>
                      <details>
                        <summary className="text-primary text-lg font-medium px-0">
                          About
                        </summary>
                        <ul className="p-2 bg-accent text-primary w-56">
                          <li>
                            <a
                              onClick={() => {
                                navigate("/about-us");
                              }}
                            >
                              About Us
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                navigate("/privacy-policy");
                              }}
                            >
                              Privacy Policy
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                navigate("/terms-conditions");
                              }}
                            >
                              Terms & Conditions
                            </a>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <a
                        className="text-primary text-lg font-medium px-0"
                        onClick={() => {
                          navigate("/log-in");
                        }}
                      >
                        Log In
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-primary-content text-lg font-medium hover:bg-primary h-8 bg-primary pt-[2px] pb-0 px-2 mb-1"
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      >
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="block md:hidden">
                  <details className="dropdown dropdown-bottom dropdown-end">
                    <summary
                      onClick={() => setMobNav(!mobNav)}
                      className="btn btn-outline text-2xl btn-primary btn-circle border-none p-0 m-0 h-fit w-fit min-w-0 min-h-0"
                    >
                      {mobNav ? (
                        <FontAwesomeIcon icon={faX} />
                      ) : (
                        <FontAwesomeIcon icon={faBars} />
                      )}
                    </summary>
                    <ul className="p-2 shadow menu w-screen h-[90vh] mt-2 translate-x-4 dropdown-content z-[1] bg-accent text-primary">
                      <div className="flex flex-col gap-4 menu menu-horizontal px-5 items-center">
                        <a href="/" className="text-xl h-10">
                          Home
                        </a>
                        <details>
                          <summary className="text-xl h-10">About</summary>
                          <ul className="p-0 bg-base-100">
                            <li>
                              <a href="about-us" className="text-xl h-10">
                                About Us
                              </a>
                            </li>
                            <li>
                              <a
                                href="/privacy-policy"
                                className="text-xl h-10"
                              >
                                Privacy Policy
                              </a>
                            </li>
                            <li>
                              <a
                                href="/terms-conditions"
                                className="text-xl h-10"
                              >
                                Terms & Conditions
                              </a>
                            </li>
                          </ul>
                        </details>
                        <button
                          className="btn btn-outline text-primary border-primary hover:text-primary hover:bg-slate-200 w-full rounded-2xl p-0"
                          onClick={() => {
                            navigate("/log-in");
                          }}
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => {
                            navigate("/sign-up");
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </ul>
                  </details>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
