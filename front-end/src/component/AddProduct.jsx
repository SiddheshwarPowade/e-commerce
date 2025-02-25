import React from "react";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const { token } = useSelector((state) => state.token);
  const user = useSelector((state) => state.loginUser);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    let userId = user._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    result = await result.json();

    if (result.returnCode === 1) {
      alert("Product added successfully");
      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        value={price}
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        value={category}
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        value={company}
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
