import { Route, Routes } from "react-router-dom";
// , useDispatch
// import { useNavigate } from "react-router-dom";

import { Layout } from "./components/layout";
import { Signup } from "./components/sign-up";
import { Login } from "./components/log-in";
import { Paper } from "./components/paper";
import { Missing } from "./components/missing";
import { MyHome } from "./components/myHome";
import { Settings } from "./components/settings";
import { PrivacyPolicy } from "./components/privacyPolicy";
import { TermsConditions } from "./components/termsConditions";
import { AboutUs } from "./components/aboutUs";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyHome />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="log-in" element={<Login />} />
          <Route path="my-settings" element={<Settings />} />
          <Route path="paper/:handle" element={<Paper />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}
