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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="players" element={<Player />} />
      <Route path="coaches-academies" element={<CoachesAcademies />} />
      <Route path="about" element={<About />} />
      <Route path="partners" element={<Partner />} />
    </Route>
  )
);
