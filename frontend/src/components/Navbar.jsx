import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "../styles/navbar.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import Cart from "../pages/Cart";
import { useState } from "react";
import Logo from "../assets/logo-effect3.png";
import Image from "mui-image";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/actions/userActions";
import toast from "react-hot-toast";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import cartActions from "../redux/actions/cartActions";
import { RiLeafFill } from "react-icons/ri";

const pages = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Products",
    to: "/products",
  },

  {
    name: "About Us",
    to: "/aboutUs",
  },
];

const settings = [
  {
    name: "Sign Up",
    to: "/signUp",
  },

  {
    name: "Sign In",
    to: "/signIn",
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.usersReducer.loggedUser);
  const cart = useSelector((store) => store.productsReducer.cart);
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [sustainable, setSustainable] = React.useState();

  React.useEffect(() => {
    async function getSust() {
      let res = await dispatch(cartActions.getSustainable());
      setSustainable(res.data.res);
    }
    getSust();
  }, [cart]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function SignOut() {
    dispatch(userActions.userSignOut(user));
    toast.success("You have signed out", {
      duration: 3000,
    });
    navigate("/", { replace: true });
  }

  return (
    <AppBar position="static" className="container-box-x">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{width: "100%"}}>
          <Box
            className="order-1"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <LinkRouter key={index} to={page.to} className="linkNav">
                  <MenuItem>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>

          <LinkRouter className="order-0" to="/" >
            <Image src={Logo} className="loguito justify-start" />
          </LinkRouter>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, width: "60%", justifyContent: "center" }}>
            {pages.map((page, index) => (
              <LinkRouter
                key={index}
                to={page.to}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <button className="mx-2">{page.name}</button>
              </LinkRouter>
            ))}

            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', fontWeight: "700", display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box className="flex items-center gap-5 order-3" sx={{width: "20%", justifyContent: "flex-end"}}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={sustainable} color="success" max={9999}>
                <RiLeafFill
                  className="iconLeaf"
                  style={{
                    color: "success",
                    fontSize: "2.5rem",
                  }}
                />
              </StyledBadge>
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <PersonOutlineIcon sx={{ color: "white", fontSize: "2rem" }} /> */}
                {user ? (
                  <Avatar alt="User Photo" src={user?.photo} />
                ) : (
                  <Avatar
                    alt="Offline User"
                    src="https://secure.gravatar.com/avatar/a6321ca519c15d35a4e297efc45d5ecb?s=500&d=mm&r=g"
                    sx={{ color: "white" }}
                  />
                )}
              </IconButton>
            </Tooltip>

            <LinkRouter to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalQuantity} color="success">
                  <ShoppingCartIcon
                    sx={{
                      color: "white",
                      fontSize: "1.7rem"
                    }}
                  />
                </StyledBadge>
              </IconButton>
            </LinkRouter>

            {/* <LinkRouter className="relative" to="/cart">
              <ShoppingCartIcon
                sx={{
                  color: "white",
                  fontSize: "1.7rem",
                  marginLeft: "2.5rem",
                }}
              />
              <p className="absolute top-0 right-0 rounded-full numerocarrito">
                {cart.length}
              </p>
            </LinkRouter> */}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <Box>
                  <MenuItem
                    sx={{ "&:hover": { bgcolor: "rgb(224,224,224)" } }}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography onClick={SignOut}>Sign Out</Typography>
                  </MenuItem>
                  {user.role === "admin" && (
                    <LinkRouter to="/upload">
                      <MenuItem
                        sx={{ "&:hover": { bgcolor: "rgb(224,224,224)" } }}
                      >
                        <Typography>Upload Product</Typography>
                      </MenuItem>
                    </LinkRouter>
                  )}
                </Box>
              ) : (
                settings.map((setting, index) => (
                  <LinkRouter
                    key={index}
                    onClick={handleCloseUserMenu}
                    to={setting.to}
                    className="linkNav"
                  >
                    <MenuItem>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </LinkRouter>
                ))
              )}

              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
