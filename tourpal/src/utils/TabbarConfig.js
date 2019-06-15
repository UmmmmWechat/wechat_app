import {GUIDE_CALENDAT, GUIDE_CENTER, GUIDE_MAIN, TOURIST_CENTER, TOURIST_MAIN} from "../pages/pages_url";

// images
import home from "../assets/image/tabbar/home.png";
import homeSelected from "../assets/image/tabbar/home_selected.png";
import user from "../assets/image/tabbar/user.png";
import userSelected from "../assets/image/tabbar/user_selected.png";
import calendar from "../assets/image/tabbar/calendar.png";
import calendarSelected from "../assets/image/tabbar/calendar-selected.png";
import invitation from "../assets/image/tabbar/invitation.png";
import invitationSelected from "../assets/image/tabbar/invitation_selected.png";

console.log(home);

export const TOURIST_HOME = {
  name: "tourist-main",
  label: "首页",
  path: "/" + TOURIST_MAIN,
  icon: home,
  selectedIcon: homeSelected
};

export const TOURIST_USER_CENTER = {
  name: "tourist-user",
  label: "我",
  path: "/" + TOURIST_CENTER,
  icon: user,
  selectedIcon: userSelected
};

export const GUIDE_HOME = {
  name: "guide-home",
  label: "邀请",
  path: "/" + GUIDE_MAIN,
  icon: invitation,
  selectedIcon: invitationSelected
};

export const GUIDE_CALENDAR = {
  name: "guide-calendar",
  label: "日程",
  path: "/" + GUIDE_CALENDAT,
  icon: calendar,
  selectedIcon: calendarSelected
};

export const GUIDE_USER_CENTER = {
  name: "guide-user",
  label: "我",
  path: "/" + GUIDE_CENTER,
  icon: user,
  selectedIcon: userSelected
};

export const touristTabbarConfig = {
  TOURIST_HOME,
  TOURIST_USER_CENTER
};

export const guideTabbarConfig = {
  GUIDE_HOME,
  GUIDE_CALENDAR,
  GUIDE_USER_CENTER
};
