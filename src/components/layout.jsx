import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";
import { useSelector } from "react-redux";
// import { Drawer } from "./drawer";

export function Layout() {
  const logged = useSelector((s) => s.isLogged);
  const user = useSelector((s) => s.user);

  return (
    <>
      <Navbar />
      {!logged && (
        <div className="mt-[7vh] border-t border-transparent">
          <Outlet />
        </div>
      )}
      {logged && (
        <div className="drawer md:drawer-open mt-[7vh] h-[93vh]">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ml-0 md:ml-[25vw] lg:ml-[18vw] h-[93vh] w-full">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <div className="menu flex flex-col shadow-md p-2 text-base mt-[7vh] md:mt-0 w-[70vw] md:w-[25vw] lg:w-[18vw] h-[93vh] bg-accent text-primary fixed">
              {/* Sidebar content here */}
              <div className="flex flex-col justify-between h-full overflow-y-auto">
                <ul>
                  <li className="rounded-md mx-2">
                    <a href="/">New Paper</a>
                  </li>
                  <li className="rounded-md mx-2">
                    <a href="/my-settings">Settings</a>
                  </li>
                  <li>
                    <div className="divider divider-primary m-0"></div>
                  </li>
                  {user.papers
                    .slice()
                    .reverse()
                    .map((p, index) => {
                      return (
                        <li className="rounded-md mx-2" key={index}>
                          <a href={`/paper/${p._id}`}>
                            {p.title.length > 22
                              ? p.title.substring(0, 22) + "..."
                              : p.title}
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <ul>
                  <li className="flex flex-row">
                    <a className="p-0" href="/terms-conditions">
                      <span className="m-1 text-[10px]">
                        Terms & Conditions
                      </span>
                    </a>
                    <span className="p-0 min-h-0 min-w-0 font-extrabold">
                      .
                    </span>
                    <a className="p-0" href="/privacy-policy">
                      <span className="m-1 text-[10px]">Privacy Policy</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
