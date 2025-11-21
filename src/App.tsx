import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Login from "./pages/AuthPages/Login";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Campaigns from "./pages/Campaigns";
import CampaignCreate from "./pages/CampaignCreate";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignEdit from "./pages/CampaignEdit";
import Influencers from "./pages/Influencers";
import InfluencerCreate from "./pages/InfluencerCreate";
import InfluencerDetail from "./pages/InfluencerDetail";
import InfluencerEdit from "./pages/InfluencerEdit";
import InfluencerCategories from "./pages/InfluencerCategories";
import Posts from "./pages/Posts";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Dashboard/Home";
import { useAuthStore } from "./stores/authStore";
import { NotificationProvider } from "./components/notifications/NotificationProvider";

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes - Public */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard Layout - Protected */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route index path="/" element={<Home />} />

            {/* Campaign Pages */}
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/create" element={<CampaignCreate />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/:id/edit" element={<CampaignEdit />} />

            {/* Influencer Pages */}
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/influencers/create" element={<InfluencerCreate />} />
            <Route path="/influencers/:id" element={<InfluencerDetail />} />
            <Route path="/influencers/:id/edit" element={<InfluencerEdit />} />
            <Route path="/influencer-categories" element={<InfluencerCategories />} />
            <Route path="/posts" element={<Posts />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}
