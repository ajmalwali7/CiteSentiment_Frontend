/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../actions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { setUser, logIn } from "../actions";
import FormData from "form-data";
import axios from "axios";

export function MyHome() {
  const dispatch = useDispatch();
  const logged = useSelector((store) => store.isLogged);
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((s) => s.user);
  const [isLoading, setIsLoading] = useState(false);
  // const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  async function uploadPaper(e) {
    setIsLoading(true);
    e.preventDefault();
    const paper = new FormData();
    paper.append("paper", e.target[0].files[0], "file");
    try {
      const res = await axios.post(
        "https://citesentiment-backend.onrender.com/api/papers",
        paper,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundry=${paper._boundry}`,
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(`/paper/${res.data.doc.id}`);
      dispatch(setUser(res.data.user));
      dispatch(logIn());
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  dispatch(setNav());
  return (
    <div className="absolute w-full md:w-[75vw] lg:w-[82vw] h-full">
      {!logged ? (
        <div>
          <section>
            <div className="hero w-screen min-h-screen">
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md w-[90vw] bg-accent text-primary p-7 rounded-3xl mb-24">
                  <div className="avatar">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded">
                      <img src="/imgs/logo/logo.PNG" />
                    </div>
                  </div>
                  <h1 className="mb-3 md:mb-5 text-2xl md:text-4xl font-bold">
                    CiteSentiment
                  </h1>
                  <p className="mb-3 md:mb-5 text-sm md:text-base">
                    In the ever-evolving world of academia, managing and
                    analyzing research papers can be a daunting task. Welcome to
                    CiteSentiment, the ultimate web application designed to
                    streamline your academic research experience. Our innovative
                    platform empowers researchers, students, and academics to
                    effortlessly upload, analyze, and visualize research papers,
                    transforming the way you engage with scholarly work.
                  </p>
                  <button
                    onClick={() => navigate("/sign-up")}
                    className="btn btn-primary"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hero w-screen min-h-screen">
              <div className="hero-content w-full md:w-10/12 text-neutral-content">
                <div className="text-primary bg-cover w-full rounded-3xl shadow-xl my-3 p-9 lg:p-14 bg-accent overflow-x-hidden h-fit">
                  <div className="flex items-center justify-center">
                    <p className="text-base md:text-xl">
                      <strong>
                        <em>CiteSentiment,</em>
                      </strong>{" "}
                      In the ever-evolving world of academia, managing and
                      analyzing research papers can be a daunting task. Welcome
                      to CiteSentiment, the ultimate web application designed to
                      streamline your academic research experience. Our
                      innovative platform empowers researchers, students, and
                      academics to effortlessly upload, analyze, and visualize
                      research papers, transforming the way you engage with
                      scholarly work.{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                      <br />
                      <br />
                      <strong>
                        <em>Our Vision</em>
                      </strong>{" "}
                      is simple yet profound: to empower Afghan students with
                      the knowledge and skills they need to shape their own
                      futures. We believe that education is not just a right but
                      a fundamental tool for personal growth, community
                      development, and societal progress. We are driven by the
                      belief that when students are educated, they become agents
                      of change, capable of overcoming obstacles and achieving
                      their dreams,{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                      <br />
                      <br />
                      <strong>
                        <em>Our Mission</em>
                      </strong>{" "}
                      is to provide a safe, inclusive, and accessible online
                      learning environment where students can thrive
                      academically and personally. We strive to bridge the
                      education gap that has left many Afghan students without
                      access to formal schooling,{" "}
                      <a
                        className="hover:cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => navigate("/about-us")}
                      >
                        <em>read more about us...</em>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hero w-screen">
              <div className="hero-content w-full md:w-10/12 text-neutral-content">
                <div className="text-primary bg-cover w-full rounded-3xl shadow-xl my-3 p-9 lg:p-14 bg-accent overflow-x-hidden h-fit">
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-medium text-center">
                      Contact Us
                    </h1>
                    <br />
                    <p>
                      <strong>
                        <em>Email:</em>
                      </strong>{" "}
                      contact@citesentiment.com{" "}
                    </p>
                    <br />
                    <div className="flex flex-row gap-8 justify-center items-center">
                      <a
                        className="opacity-60 hover:opacity-100 hover:cursor-pointer"
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          className="text-3xl hover:text-black"
                        />
                      </a>
                      <a
                        className="opacity-60 hover:opacity-100 hover:cursor-pointer"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="text-3xl  hover:text-blue-600"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="hero w-screen min-h-[40vh] bg-accent shadow-inner flex flex-col">
              <div className="flex flex-col md:px-4 lg:px-10 md:grid md:grid-cols-3 w-screen min-h-[40vh]">
                <div className="flex flex-col gap-2 md:gap-4 p-4 md:p-7">
                  <div className="avatar">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded">
                      <img src={`/imgs/logo/logo.PNG`} />
                    </div>
                  </div>
                  <p className="text-xs text-primary opacity-70">
                    A pioneering initiative dedicated to transforming the lives
                    of students in Afghanistan through accessible online
                    education. At the heart of our mission lies a commitment to
                    breaking down barriers and ensuring that every student,
                    regardless of their circumstances, has the opportunity to
                    receive a quality education,{" "}
                    <span className="hover:cursor-pointer font-medium">
                      <a onClick={() => navigate("/about-us")}>
                        <em>read more...</em>
                      </a>
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-center md:text-left md:gap-3 p-4 md:p-7 text-primary">
                  <a className="p-0" href="/">
                    <span>Home</span>
                  </a>
                  <a className="p-0" href="/about-us">
                    <span>About Us</span>
                  </a>
                  <a className="p-0" href="/privacy-policy">
                    <span>Privacy Policy</span>
                  </a>
                  <a className="p-0" href="/terms-conditions">
                    <span>Terms & Conditions</span>
                  </a>
                </div>
                <div className="flex flex-col-reverse md:flex-col justify-between p-7">
                  <div className="flex flex-col gap-2">
                    <button
                      className="btn btn-outline text-primary border-primary hover:text-primary hover:bg-slate-200 w-full rounded-2xl p-0"
                      onClick={() => {
                        navigate("/log-in");
                      }}
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-secondary opacity-100 w-full rounded-2xl p-0"
                      onClick={() => {
                        navigate("/sign-up");
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="text-primary">
                    <div className="flex flex-row gap-8 mb-8 md:mb-0 justify-center md:justify-end items-center">
                      <span>
                        <em>Follow Us:</em>
                      </span>
                      <a
                        className="opacity-60 hover:opacity-100 hover:cursor-pointer"
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          className="text-xl md:text-3xl hover:text-black"
                        />
                      </a>
                      <a
                        className="opacity-60 hover:opacity-100 hover:cursor-pointer"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="text-xl md:text-3xl hover:text-blue-600"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="pb-10">
                <span className="m-2 mb-0 text-sm md:text-base p-0 text-primary items-center">
                  <FontAwesomeIcon icon={faCopyright} /> 2023 CiteSentiment, All
                  Rights Reserved
                </span>
              </p>
            </div>
          </footer>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center m-0 h-full">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="flex justify-center items-center m-0 h-full">
          <form onSubmit={uploadPaper} className="flex flex-col">
            <input
              type="file"
              name="paper"
              accept="application/pdf"
              required
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            <button
              type="submit"
              className="btn btn-primary h-8 min-h-5 rounded-xl my-5 disabled:bg-primary disabled:text-primary-content disabled:opacity-70"
            >
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
