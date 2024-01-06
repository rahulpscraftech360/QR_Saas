import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";
import organizationSlice, { removeUser } from "./../utils/organizationSlice";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const user = useSelector((store) => store.organization);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("logineduser", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("searchQuery", searchQuery);
  const searchCache = useSelector((store) => store.search);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const logout = () => {
    console.log("logout");
    dispatch(removeUser());
    navigate("/organization/login");
  };

  const handleImageClick = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility
  };

  // console.log("suggestion", suggestion);
  // useEffect(() => {
  //   // cal search api for each search query change
  //   // prevent call if keypress< 200ms using debounce if 2 api call time <200ms decline api call

  //   const timer = setTimeout(() => {
  //     if (searchCache[searchQuery]) {
  //       setSuggestion(searchCache[searchQuery]);
  //     } else {
  //       getSearchSuggestion();
  //       dispatch(cacheResults);
  //     }
  //   }, 200);

  //   return () => {
  //     clearTimeout(timer); // will clear timer if click <200 so prevent api call by rest setTimout of api
  //   };
  // }, [searchQuery]);

  // const getSearchSuggestion = async () => {
  //   console.log("search,query", searchQuery);
  //   const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  //   let jsonData;
  //   try {
  //     jsonData = await data.json();

  //     //console.log("fetching");
  //     setSuggestion(jsonData[1]);
  //     dispatch(
  //       cacheResults({
  //         [searchQuery]: jsonData[1],
  //       })
  //     );
  //   } catch (error) {
  //     alert(`Error: ${error}`);
  //   } finally {
  //     console.log("done fetching");
  //   }
  // };

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in,

  //       const { uid, email, displayName, photoURL } = user;
  //       dispatch(
  //         addUser({
  //           uid: uid,
  //           email: email,
  //           displayName: displayName,
  //           photoURL: photoURL,
  //         })
  //       );
  //       // ...
  //       navigate("/browse");
  //     } else {
  //       // User is signed out

  //       dispatch(removeUser());
  //       navigate("/"); //header inside body, so navigate works, in every page , when user not present  redirect to the login page
  //     }
  //   });

  //   // un Subscribe when component unmount
  //   return () => unSubscribe();
  // }, []);

  return (
    <div className="grid grid-cols-12 p-2 m-1 shadow-lg">
      <div className="flex col-span-1 ">
        <img
          onClick={() => {
            toggleMenuHandler();
          }}
          className="h-10 cursor-pointer"
          src="https://cdn3.iconfinder.com/data/icons/minimal-website-ui-kit/100/ld_menu_closed-512.png"
          alt="menu"
        />
        {/* <a href="/">
          <img
            className="h-11 mx-2"
            src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg.webp"
            alt="logo"
          />
        </a> */}
      </div>
      <div className=" flex col-span-10 mx-5 px-8 justify-center text-center">
        <div className="flex-col w-3/5">
          {/* <div className="flex ">
            <input
              className=" w-4/5 p-2 border border-gray-400 rounded-l-full"
              type="text "
              value={searchQuery}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="  border border-gray-400 p-2 rounded-r-full"
              placeholder="Search"
            >
              🔍 Search
            </button>
          </div> */}
          {/* {showSuggestion && suggestion && (
            <div className="fixed bg-white  w-[37rem] rounded-xl shadow-lg">
              <ul className=" ">
                {suggestion?.map((suggest) => (
                  <li
                    key={suggest.id}
                    // onClick={setSearchQuery(suggest)}
                    className="align-left px-5 py-2"
                  >
                    🔍{suggest}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
      <div className="flex col-span-1 justify-end ">
        <img
          className="h-10 rounded-full"
          src="https://scontent.fblr5-1.fna.fbcdn.net/v/t39.30808-6/395291322_793320132804874_5621380736087764737_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=2ZQUEgFukSQAX_p0o5l&_nc_ht=scontent.fblr5-1.fna&oh=00_AfD6dzWAP9c9SoMXHjSOsH7q_sN5Dl7fRIVzntBUK31zHw&oe=658243B3"
          alt="user"
          onClick={handleImageClick}
        />
        {menuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-md p-2 rounded">
            <ul>
              <li
                className="cursor-pointer hover:bg-gray-200 py-1 px-2"
                onClick={logout}
              >
                Logout
              </li>
              {/* Add other menu items as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Head;
