import {AUTH_PAGE,
    HOME_PAGE,
    MY_PROFILE_PAGE,
    PROFILE_PAGE,
    EVENT_PAGE,
    FRIENDS_PAGE,
    NEWS_PAGE,
    MODERATOR_PANEL_PAGE,RECALLS_PAGE} from './shared/constants/const.js'

import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import ModeratorPanelPage from "./pages/ModeratorPanelPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RecallsPage from "./pages/RecallsPage.jsx";

export const publicRoutes = [
    {
        path: AUTH_PAGE,
        Element: AuthPage,
    },
    {
        path: HOME_PAGE,
        Element: HomePage,
    },
    {
        path: EVENT_PAGE,
        Element: EventPage,
    },
    {
        path: PROFILE_PAGE,
        Element: ProfilePage,
    },{
        path: RECALLS_PAGE,
        Element: RecallsPage,
    }
]

export const privateRoutes = [
    {
        path: FRIENDS_PAGE,
        Element: FriendsPage,
        role: ['participant']
    },
    {
        path: MY_PROFILE_PAGE,
        Element: ProfilePage,
        role: ['participant', 'organizer']
    },
    {
        path: NEWS_PAGE,
        Element: NewsPage,
        role: ['participant']
    },
    {
        path: MODERATOR_PANEL_PAGE,
        Element: ModeratorPanelPage,
        role: ['admin', 'moderator']
    }
]
