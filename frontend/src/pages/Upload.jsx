import React from "react";
import adminActions from "../redux/actions/adminActions";
import { useState, useEffect } from "react";
import productsActions from "../redux/actions/productsActions";
import "../styles/upload.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Rating from "@mui/material/Rating";
import { RiLeafFill } from "react-icons/ri";

export default function Uplaod() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    dispatch(productsActions.getProducts());
  }, []);
  const products = useSelector((store) => store.productsReducer.products);

  const allCateg = products.map((item) => item.category);
  const cleanCats = [...new Set(allCateg)];

  async function handleSubmit(event) {
    event.preventDefault();

    const file = await files[0];
    const name = await event.target[0].value;
    const description = await event.target[1].value;
    const price = await event.target[2].value;
    const stock = await event.target[3].value;
    const category = await event.target[10].value;
    if (
      !name ||
      !file ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !value
    ) {
      toast.error("You must complete all the fields!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("sustainable", value);
      formData.append("category", category);
      formData.append("file", file);

      dispatch(adminActions.uploadProduct(formData)).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, {
            duration: 3000,
          });
        }
      });
    }
  }

  return (
    <div className="fondoUp">
      <form
        className="form"
        onSubmit={handleSubmit}
        method="post"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "1rem",
        }}
      >
        <div className="cont">
          <div
            className="form sign-in"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 className="h2Login">Upload Product</h2>
            <label className="labelUp">
              <span className="spanLabel">Name</span>
              <input className="inputUp" name="name" type="text" required />
            </label>
            <label className="labelUp">
              <span className="spanLabel">Description</span>
              <input
                className="inputUp"
                name="description"
                type="text"
                required
              />
            </label>
            <label className="labelUp">
              <span className="spanLabel">Price</span>
              <input className="inputUp" name="price" type="text" required />
            </label>
            <label className="labelUp">
              <span className="spanLabel">Stock</span>
              <input
                className="inputUp"
                name="stock"
                type="number"
                min={1}
                required
              />
            </label>

            <span style={{ marginTop: "1.5rem" }} className="spanLabel">
              Sustainable
            </span>
            <Rating
              style={{
                marginTop: "1.5rem",
                borderBottom: "1px solid rgba(109, 93, 93, 0.4)",
              }}
              name="sustainable"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              icon={<RiLeafFill fontSize="inherit" color="green" />}
              emptyIcon={<RiLeafFill fontSize="inherit" />}
            />

            <label className="labelUp">
              <span className="spanLabel">Category</span>
              <select className="inputUp" required>
                {cleanCats.map((item, i) => {
                  return <option key={i}>{item}</option>;
                })}
              </select>
            </label>
            <label className="labelUp">
              <span className="spanLabel">Photo</span>
              <input
                className="inputUp"
                required
                onChange={(event) => setFiles(event.target.files)}
                name="photo"
                placeholder="photo"
                type="file"
              />
            </label>
            <button className="submit botonLogin" type="submit">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
