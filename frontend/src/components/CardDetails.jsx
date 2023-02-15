import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productsActions from "../redux/actions/productsActions";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import adminActions from "../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiLeafFill } from "react-icons/ri";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ITEM_HEIGHT = 48;

export default function RecipeReviewCard({ product }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reload, setReload] = useState(false);
  const cart = useSelector((store) => store.productsReducer.cart);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const { id } = useParams();
  const [expanded, setExpanded] = React.useState(false);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.getProducts());
  }, [reload]);
  // const product = useSelector((store) => store.productsReducer.oneProduct);
  // console.log("inicio", product);
  const products = useSelector((store) => store.productsReducer.products);

  const allCateg = products.map((item) => item.category);
  const cleanCats = [...new Set(allCateg)];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const loggedUser = useSelector((store) => store.usersReducer.loggedUser);

  // const [value, setValue] = React.useState();
  const navigate = useNavigate();
  const handleDelete = (event) => {
    dispatch(adminActions.deleteProduct(event.target.id)).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 3000,
        });
        navigate("/products");
      }
    });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  // const [files, setFiles] = useState(product.photo)

  const PRODUCT_INITIAL_STATE = {
    name: "",
    description: "",
    stock: 0,
    price: 0,
    sustainable: 0,
    category: "",
    otherCategory: "",
    imageSelection: "",
    photo: "",
    newImageFile: null,
  };
  const [productState, setProductState] = useState(PRODUCT_INITIAL_STATE);
  const {
    name,
    description,
    stock,
    price,
    sustainable,
    category,
    imageSelection,
    photo,
    newImageFile,
  } = productState;

  function handleSubmit(event) {
    setEditable(false);
    const newFile = newImageFile;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("sustainable", sustainable);
    if (imageSelection === "upload-image") {
      formData.append("file", newFile);
    } else {
      formData.append("photo", photo);
    }
    dispatch(adminActions.modifyProduct(product._id, formData)).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 3000,
        });
        setReload(!reload);
      } else {
        toast.error(res.data.message, {
          duration: 3000,
        });
      }
    });
  }

  // console.log("effect", product);

  useEffect(() => {
    if (product) {
      setProductState({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        category: product.category,
        sustainable: product.sustainable,
        otherCategory: "",
        imageSelection: "current-image",
        photo: product.photo,
        newImageFile: null,
      });
    }
  }, [product]);

  console.log(cart)
  function addToCart(product) {
    if (product.stock === 0){
      toast.error("This product is out of stock");
    }else{
      dispatch(productsActions.addToCart(product));
      toast.success("Product added!");
    }

  }
  return (
    <Card className="details">
      <div className="detailsTop">
        <div className="detailsTop-A flex flex-col justify-center items-start min-w-[20vw]">
          <CardMedia
            className="detailsTop-A-cardMedia flex grow"
            component="img"
            height="100%"
            image={product?.photo}
            alt="Paella dish"
          />
          <div className="grow inputUpload">
            {editable && (
              <select
                onChange={(e) =>
                  setProductState({
                    ...productState,
                    imageSelection: e.target.value,
                  })
                }
              >
                <option value="current-image">Use current image</option>
                <option value="upload-image">Upload image</option>
              </select>
            )}
            <div className="inputUploadA">
              {editable && imageSelection === "upload-image" && (
                <input
                  onChange={(event) => {
                    setProductState({
                      ...productState,
                      newImageFile: event.target.files[0],
                    });
                  }}
                  type="file"
                ></input>
              )}
            </div>
          </div>
        </div>
        <div className="detailsTop-B">
          <Box
            className="editContent"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <div>
              {loggedUser && loggedUser.role === "admin" && (
                <div>
                  <Button
                    className="editContentBtn"
                    variant="contained"
                    color="error"
                    id={product?._id}
                    onClick={handleDelete}
                    sx={{ bgcolor: "#d30000", mr: 1, borderRadius: 50 }}
                  >
                    <DeleteIcon sx={{ width: 15, color: "white" }} />
                  </Button>
                  <Button
                    className="editContentBtn"
                    variant="contained"
                    color="primary"
                    id={product?._id}
                    onClick={handleEdit}
                    sx={{ bgcolor: "#41788f", mr: 1, borderRadius: 5 }}
                  >
                    <EditIcon sx={{ width: 15, color: "white" }} />
                  </Button>
                  {editable && (
                    <>
                      <Button
                        className="editContentBtn"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                        sx={{
                          bgcolor: "#41788f",
                          bgcolor: "#13542d",
                          my: 1,
                          borderRadius: 50,
                          color: "white",
                        }}
                        color="success"
                        aria-label="more"
                        id="long-button"
                      >
                        Save
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexdirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              p: 0,
            }}
          >
            {
              <div className="flex flex-row items-center flex-wrap">
                <p className="font-bold py-2">Name:</p>
                <div
                  onInput={(event) =>
                    setProductState({
                      ...productState,
                      name: event.currentTarget.textContent,
                    })
                  }
                  suppressContentEditableWarning={true}
                  className={editable ? "editable rounded-lg" : "non-editables"}
                  contentEditable={editable}
                >
                  {product?.name}{" "}
                </div>
              </div>
            }
          </CardContent>
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="body"
              color="text.secondary"
              className="flex items-center"
            >
              {
                <div className="flex flex-row items-center justify-center">
                  <p className="font-bold py-2 text-black">USD:</p>
                  <div
                    onInput={(event) =>
                      setProductState({
                        ...productState,
                        price: event.currentTarget.textContent,
                      })
                    }
                    suppressContentEditableWarning={true}
                    className={
                      editable ? "editable rounded-lg" : "non-editables"
                    }
                    contentEditable={editable}
                  >
                    {product?.price}{" "}
                  </div>
                </div>
              }
            </Typography>
            <Typography
              variant="body"
              color="text.secondary"
              className="flex items-center"
            >
              {
                <div className="flex flex-row items-center justify-center my-2">
                  <p className="font-bold py-2 text-black">Stock:</p>
                  <div
                    onInput={(event) =>
                      setProductState({
                        ...productState,
                        stock: event.currentTarget.textContent,
                      })
                    }
                    suppressContentEditableWarning={true}
                    className={
                      editable ? "editable rounded-lg" : "non-editables"
                    }
                    contentEditable={editable}
                  >
                    {product?.stock}{" "}
                  </div>
                </div>
              }
            </Typography>
            <div>
              {editable ? (
                <>
                  <p className="font-bold py-2">Category:</p>
                  <select
                    onChange={(e) =>
                      setProductState({
                        ...productState,
                        category: e.target.value,
                      })
                    }
                  >
                    {cleanCats.map((item, i) => {
                      return <option key={i}>{item}</option>;
                    })}
                  </select>
                </>
              ) : (
                <Typography
                  variant="body"
                  color="text.secondary"
                  className="flex items-center"
                >
                  {/* {console.log(product.category)} */}
                  Category: {product.category}
                  {/* {console.log(product.category)} */}
                </Typography>
              )}
            </div>
          </CardContent>
          <CardContent sx={{ p: 0 }}>
            <Rating
              sx={{ py: 1 }}
              readOnly={!editable}
              name="sustainable"
              value={sustainable}
              onChange={(event, newValue) => {
                setProductState({
                  ...productState,
                  sustainable: newValue,
                });
              }}
              icon={<RiLeafFill fontSize="inherit" color="green"  />}
              emptyIcon={<RiLeafFill fontSize="inherit" />}
            />
          </CardContent>
          <CardContent sx={{ width: "100%" }}>
            <Button
              className="generalBtn"
              variant="contained"
              sx={{ width: "100%", backgroundColor: "#13552D" }}
              onClick={(e) => addToCart(product, e)}
            >
              Add To Cart
            </Button>
          </CardContent>
        </div>
      </div>
      <div className="detailsExpand">
        <CardActions sx={{ p: 0 }}>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <p className="font-bold p-2">Description:</p>
            <div
              onInput={(event) =>
                setProductState({
                  ...productState,
                  description: event.currentTarget.textContent,
                })
              }
              className={editable ? "editable rounded-lg" : "non-editables"}
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {product?.description}{" "}
            </div>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}
