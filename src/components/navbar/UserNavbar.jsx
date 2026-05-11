import React,{useEffect,useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import {FaBell} from "react-icons/fa";
import {getUnreadCount} from "../../service/notificationService";

const UserNavbar = () => {
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [unreadCount, setUnreadCount] = useState(0);
  const[isfetched,setIsFetched]=useState(false);
  const fetchUnreadCount = async () => {
   if(!isAuthenticated) return; // Skip fetching if not authenticated
    try {
      const res = await getUnreadCount();
      setUnreadCount(res.data || 0);
      setIsFetched(true);
    } catch (err) {
      console.error("Error fetching unread count", err);
    }
  };
 useEffect(() => {
  const timingOut = setInterval(() => {
    const auth = sessionStorage.getItem("isAuthenticated");

    if (auth) {
      setIsAuthenticated(auth);
      setName(sessionStorage.getItem("name"));
      setRole(sessionStorage.getItem("role"));
    }
  }, 1000);

  return () => clearInterval(timingOut);
}, []);

  useEffect(() => {
    // initial fetch
    fetchUnreadCount();

    // polling every 5 seconds
    const timer = setInterval(() => {
      fetchUnreadCount();
    },1000);

    return () => clearInterval(timer);
  }, []);



  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium text-slate-600 transition-all duration-300 
     hover:text-orange-500 pb-1
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
     after:bg-orange-500 after:transition-all after:duration-300 ${
       isActive
         ? "text-orange-500 after:w-full"
         : "after:w-0 hover:after:w-full"
     }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* --- LOGO --- */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tight text-orange-500"
        >
          Rent<span className="text-slate-900">Hub</span>
        </Link>

        {/* --- MENU --- */}
        <ul className="hidden md:flex items-center gap-8">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/properties" className={navLinkClass}>Properties</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About-Us</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
        </ul>

        {/* --- RIGHT SECTION --- */}
        <div className="hidden md:flex items-center">

          {isAuthenticated && role === "TENANT" ? (
            <div className="flex items-center gap-4">

              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl 
                bg-slate-100 text-slate-700 font-medium text-sm
                hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <RxAvatar size={20} />
                <span className="max-w-25 truncate">
                  {name || "User"}
                </span>
              </Link>

              <NavLink
                to="/user/notification"
                className={({ isActive }) => `${navLinkClass({ isActive })} relative`}
              >
                <FaBell size={20} />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                    {unreadCount}
                  </span>
                )}
              </NavLink>

            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          )}

        </div>

      </nav>
    </header>
  );
};

export default UserNavbar;