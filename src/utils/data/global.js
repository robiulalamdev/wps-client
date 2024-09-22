import {
  iClaimReports,
  iDashboard,
  iFeatured,
  iMediaManagement,
  iObserver,
  iSponsor,
  iVerificationRequests,
} from "../icons/dashboard-icons/dashicons";

import sponsor1 from "../../assets/images/dashboard-images/dashboard-home/social-1.png";
import sponsor2 from "../../assets/images/dashboard-images/dashboard-home/social-2.png";
import sponsor3 from "../../assets/images/dashboard-images/dashboard-home/social-3.png";
import sponsor4 from "../../assets/images/dashboard-images/dashboard-home/social-4.png";

export const sidebarItems = [
  { id: 1, name: "Dashboard", path: "/dashboard", icon: iDashboard },
  { id: 2, name: "Overseer", path: "/dashboard/overseer", icon: iObserver },
  {
    id: 3,
    name: "Media Management",
    path: "/dashboard/media-management",
    icon: iMediaManagement,
  },
  {
    id: 4,
    name: "Featured",
    path: "/dashboard/featured",
    icon: iFeatured,
  },
  {
    id: 5,
    name: "Sponsors",
    path: "/dashboard/sponsors",
    icon: iSponsor,
  },
];

export const sidebarBottomItems = [
  {
    id: 1,
    name: "Claims / Reports",
    path: "/dashboard/claims/reports",
    icon: iClaimReports,
  },
  {
    id: 2,
    name: "Verification Requests",
    path: "/dashboard/verification-requests",
    icon: iVerificationRequests,
  },
];

export const sponsorClicks = [
  { id: 1, count: 30, image: sponsor1 },
  { id: 2, count: 57, image: sponsor2 },
  { id: 3, count: 197, image: sponsor3 },
  { id: 4, count: 1349, image: sponsor4 },
];
