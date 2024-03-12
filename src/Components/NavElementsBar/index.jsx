import "./index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "../../Context/index.jsx";
import CategorySlider from "../CategorySlider/categorySlider.jsx";
import Popup from "reactjs-popup";
import CartPopup from "../../Pages/CartPopup/index.jsx";
import CategoryItem from "../CategoryItem/CategoryItem.jsx";
import Profile from "../../Pages/ProfilePage/index.jsx";
import { useNavigate } from "react-router";

export const NavElementsBar = () => {
  const [isCategoryTrue, setIsCateogrytrue] = useState(false);
  const navigate = useNavigate();

  const [isShowbyCategoryTrue, setShowbyCategoryTrue] = useState(false);

  const [count, setCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { categoryList, wishList, cartDetails } = useAppContext();

  useEffect(() => {
    // Check if cartDetails.data is not null or undefined before using its length
    if (cartDetails.data && Array.isArray(cartDetails.data)) {
      setCount(cartDetails.data.length);
    }
  }, [cartDetails.data]);

  const initialActiveElId =
    categoryList && categoryList.length > 0 ? categoryList[0].category_id : "";

  const [activeElId, setActivedropEle] = useState(initialActiveElId);

  const handleMouseMove = (e) => {
    // Get the horizontal and vertical position of the mouse
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get the horizontal and vertical position of the container
    const containerX = e.currentTarget.getBoundingClientRect().left;
    const containerY = e.currentTarget.getBoundingClientRect().top;

    // Calculate the distance between the mouse and the container
    const distanceX = mouseX - containerX;
    const distanceY = mouseY - containerY;

    // If the mouse is moving downwards, set isCategoryTrue to true
    if (
      distanceY > 0 &&
      distanceX >= 0 &&
      distanceX <= e.currentTarget.offsetWidth
    ) {
      setIsCateogrytrue(true);
    } else {
      // Otherwise, set isCategoryTrue to false
      setIsCateogrytrue(false);
    }
  };
  function showCategoriesDropdown() {
    return (
      <SlideDown
        className="nav-dropdown-main-container"
        onMouseLeave={() => setIsCateogrytrue(false)}
      >
        <Scrollbars style={{ width: 300, height: 480 }}>
          <ul className="nav-dropdown-ul-container">
            {categoryList.map((each) => {
              return (
                <li
                  key={each.category_id}
                  onClick={() => setActivedropEle(each.category_id)}
                  className={`${
                    activeElId === each.category_id
                      ? "nav-dropdown-li-active"
                      : ""
                  }`}
                >
                  {each.name}
                </li>
              );
            })}
          </ul>
        </Scrollbars>
        <div className="nav-dropdown-side-container">
          <CategoryItem categoryId={activeElId} />
        </div>
      </SlideDown>
    );
  }

  function showCategoryCarousel() {
    return (
      <SlideDown
        className="nav-dropdown-shop-by-container"
        onMouseLeave={() => setShowbyCategoryTrue(false)}
      >
        <CategorySlider />
      </SlideDown>
    );
  }

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="navbar-ele">
        <div className="nav-ele-bar-main-container">
          <button
            className={`nav-ele-btn ${
              isCategoryTrue ? "nav-ele-btn-active" : ""
            }`}
            onMouseLeave={handleMouseMove}
            onMouseEnter={() => setIsCateogrytrue(true)}
          >
            <RxHamburgerMenu />
            All Categories
          </button>
          <ul className="nav-ele-bar-ul-container">
            <li className="nav-ele-bar-li-ele" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="nav-ele-bar-li-ele">Shop By Brand</li>
            <li
              className="nav-ele-bar-li-ele"
              onClick={() => showCategoryCarousel(!isCategoryTrue)}
              onMouseEnter={() => setShowbyCategoryTrue(true)}
            >
              Shop By Category
            </li>
            <li className="nav-ele-bar-li-ele">Blog</li>
            <li className="nav-ele-bar-li-ele">Shop</li>
            <li className="nav-ele-bar-li-ele">Elements</li>
            <li className="nav-ele-bar-li-ele">Features</li>
          </ul>
          <ul className="nav-ele-bar-icons-ul-container">
            <li>
              <Tooltip title="Wishlist">
                <IconButton>
                  <Badge badgeContent={wishList.length} color="primary">
                    <FaRegHeart
                      className="nav-ele-bar-icon"
                      onClick={() => navigate("/wishlist")}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Popup
                closeOnDocumentClick={true}
                open={isPopupOpen}
                onClose={handleCloseClick}
                contentStyle={{
                  width: "350px",
                  padding: "5px",
                }}
                trigger={
                  <Tooltip title="Cart">
                    <IconButton>
                      {count > 0 ? (
                        <Badge badgeContent={count} color="primary">
                          <RiShoppingCart2Line className="nav-ele-bar-icon" />
                        </Badge>
                      ) : (
                        <RiShoppingCart2Line className="nav-ele-bar-icon" />
                      )}
                    </IconButton>
                  </Tooltip>
                }
                position="bottom right"
              >
                <CartPopup onClose={handleCloseClick} />
              </Popup>
            </li>
            <li>
              <Popup
                closeOnDocumentClick={true}
                open={isPopupOpen}
                onClose={handleCloseClick}
                contentStyle={{
                  width: "350px",
                  padding: "5px",
                }}
                trigger={
                  <Tooltip title="profile">
                    <IconButton>
                      <CgProfile className="nav-ele-bar-icon" />
                    </IconButton>
                  </Tooltip>
                }
                position="bottom right"
              >
                <Profile onClose={handleCloseClick} />
              </Popup>
            </li>
          </ul>
        </div>
        <hr className="navbar-ele-hr-line" />
      </div>

      {isCategoryTrue && showCategoriesDropdown()}
      {isShowbyCategoryTrue && showCategoryCarousel()}
    </>
  );
};

export default NavElementsBar;
