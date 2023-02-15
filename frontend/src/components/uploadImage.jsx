import React from "react";
import Button from "@mui/material/Button";

export default function userImage() {
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <div className="w-[128px] h-[128px] border-2">
        <img src={file} width="200" />
      </div>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" type="file" onChange={handleChange} />
      </Button>
    </div>
  );
}
