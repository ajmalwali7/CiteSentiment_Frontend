/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logIn, logOut, setUser } from "../actions";
import FormData from "form-data";

export function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user);
  const [nameEdit, setNameEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [reqBody, setReqBody] = useState(null);
  const [reqUpdateBody, setReqUpdateBody] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateMe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/users/updateMe",
        { ...reqBody, id: user._id },
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setNameEdit(false);
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const updatePhoto = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let photo = new FormData();
    photo.append("photo", e.target[0].files[0], "photo");
    try {
      const res = await axios.patch(
        "https://iqraafg.cyclic.app/api/v1/users/updateMe",
        photo,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundry=${photo._boundry}`,
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setReqUpdateBody(null);
      setNameEdit(false);
      dispatch(setUser(res.data.data.user));
      dispatch(logIn());
      setUpdated(true);
      document.getElementById("photoForm").reset();
      setTimeout(() => {
        setUpdated(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("https://iqraafg.cyclic.app/api/v1/users/deleteMe", {
        headers: {
          Authorization: `Bearer ${document.cookie
            .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
            ?.pop()}`,
        },
      });
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (reqUpdateBody) {
      updateMe();
    }
  }, [reqUpdateBody]);
  document.title = "Edit Profile";
  return (
    <div className="w-full md:w-[75vw] lg:w-[82vw]">
      <div className="flex flex-row card m-7 mb-20 bg-accent shadow-xl py-7 px-5 gap-3">
        <div className="flex flex-col pt-8 pl-8 items-center justify-start gap-y-4 w-2/5">
          <div className="avatar">
            <div className="w-28 rounded-full cursor-pointer outline outline-2 outline-primary">
              <img
                src={user.photo ? `${user.photo}` : `/imgs/user-imgs/user.PNG`}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span className="label-text text-lg block text-primary-focus">
              {user.name}
            </span>
            <span className="label-text text-center text-sm block text-primary-focus">
              {`ID: ${user.userID}`}
            </span>
            <div className="divider m-0 before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
            <span className="label-text text-center text-sm block text-primary-focus">
              {user.email}
            </span>
          </div>
        </div>
        <div className="divider divider-horizontal before:bg-secondary after:bg-secondary"></div>
        <div className="flex flex-col w-3/5">
          {updated && (
            <span className={`text-md block text-success`}>
              <FontAwesomeIcon icon={faCheck} size="xl" />
              {`Updated Successfully!`}
            </span>
          )}
          <form id="photoForm" onSubmit={updatePhoto}>
            <label className="label flex flex-col justify-start items-start">
              <span className="label-text text-xs block text-primary-focus ">
                Profile Photo:
              </span>
              <div className="flex justify-start pr-0 w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                <span className="badge badge-info text-xs">
                  Profile photo change will be available soon!
                </span>
                {/* <input
                    type="file"
                    name="photo"
                    required
                    disabled={!nameEdit || isLoading}
                    className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                  />
                  {nameEdit && (
                    <button
                      disabled={isLoading}
                      className="btn btn-success btn-circle btn-sm btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50 self-center"
                    >
                      <FontAwesomeIcon icon={faCheck} size="xl" />
                    </button>
                  )} 
                  When the issue of file uploading is solved*/}
              </div>
            </label>
          </form>
          <form onSubmit={updateMe}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <label className="label flex flex-col justify-start items-start">
                  <span className="label-text text-xs block text-primary-focus ">
                    Name:
                  </span>
                  <div className="flex justify-start w-full items-center gap-2 input border-0 input-primary max-w-xs focus-within:outline-none focus-within:ring-2">
                    <input
                      type="text"
                      disabled={!nameEdit}
                      defaultValue={user.name}
                      onChange={(e) =>
                        setReqBody({ ...reqBody, name: e.target.value })
                      }
                      className="w-full max-w-xs bg-accent focus:outline-none disabled:input-primary text-primary-focus font-medium"
                    />
                  </div>
                </label>
              </div>
              <button
                onClick={() => {
                  setNameEdit(!nameEdit);
                  // console.log(reqBody);
                }}
                type="button"
                disabled={isLoading}
                className="btn btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50"
              >
                {nameEdit ? (
                  <>
                    <FontAwesomeIcon icon={faX} size="xl" />
                    {` Cancel`}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                    {` edit`}
                  </>
                )}
              </button>
              {nameEdit && (
                <button
                  disabled={isLoading}
                  className="btn btn-success btn-outline hover:text-primary active:text-primary-focus text-primary text-opacity-50"
                >
                  <FontAwesomeIcon icon={faCheck} size="xl" />
                  {` Save`}
                </button>
              )}
            </div>
          </form>
          <div className="divider before:bg-base-200 after:bg-base-200 before:opacity-30 after:opacity-30"></div>
          <div>
            <button
              onClick={() => window.my_modal_1.showModal()}
              type="button"
              disabled={isLoading}
              className="btn btn-error btn-outline"
            >
              <FontAwesomeIcon icon={faTrashCan} size="xl" />
              {` Delete Account`}
            </button>
            <dialog id="my_modal_1" className="modal">
              <form
                method="dialog"
                className="modal-box bg-error opacity-90 text-error-content"
              >
                <h3 className="font-bold text-lg">Note!</h3>
                <p className="py-4">
                  This action will DELETE your account. You will not be able to
                  access your account if DELETED!
                </p>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn border-error bg-error-content text-error hover:bg-error hover:border-error-content hover:text-error-content">
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn border-error bg-error-content text-error hover:bg-error hover:border-error-content hover:text-error-content"
                  >
                    DELETE
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
