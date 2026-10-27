import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import Player from "@/pages/player/Player";
import CoachesAcademies from "@/pages/coaches&Academies/Coaches&Academies";
import About from "@/pages/about/About";
import Partner from "@/pages/partner/Partner";
import NotFound from "@/pages/notFound/NotFound";
import Login from "@/pages/login/Login";
import Join from "@/pages/join/Join";
import PlayerSignup from "@/pages/join/PlayerSignup";
import CoachSignup from "@/pages/join/CoachSignup";
import CoachPending from "@/pages/join/CoachPending";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import RequireAuth, { DashboardRedirect } from "@/routes/RequireAuth";
import { ROLES } from "@/constants/dummyUsers";
import { DASHBOARD_MENUS } from "@/constants/dashboardMenus";
import { EXTRA_ROUTES, getDashboardPage } from "@/routes/dashboardPages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="join" element={<Join />} />
      <Route path="join/player" element={<PlayerSignup />} />
      <Route path="join/coach" element={<CoachSignup />} />
      <Route path="join/coach/pending" element={<CoachPending />} />
      <Route path="dashboard" element={<RequireAuth />}>
        <Route index element={<DashboardRedirect />} />
        {ROLES.map((role) => (
          <Route key={role} path={role} element={<RequireAuth role={role} />}>
            <Route element={<DashboardLayout />}>
              {DASHBOARD_MENUS[role].map(({ key, path }) => {
                const Page = getDashboardPage(role, key);
                const element = Page ? <Page /> : <DashboardPage menuKey={key} />;
                return path ? (
                  <Route key={key} path={path} element={element} />
                ) : (
                  <Route key={key} index element={element} />
                );
              })}
              {EXTRA_ROUTES[role]?.map((route) => {
                const Page = route.Page;
                return <Route key={route.path} path={route.path} element={<Page />} />;
              })}
            </Route>
          </Route>
        ))}
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="players" element={<Player />} />
        <Route path="coaches-academies" element={<CoachesAcademies />} />
        <Route path="about" element={<About />} />
        <Route path="partners" element={<Partner />} />
        <Route path="*" element={<NotFound />} handle={{ hideCta: true }} />
      </Route>
    </>
  )
);
