import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);

  React.useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params?.id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    result = await result.json();

    if (result.returnCode === 1) {
      setName(result.data.name);
      setPrice(result.data.price);
      setCategory(result.data.category);
      setCompany(result.data.company);
    }
  };

  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    result = await result.json();
    if (result.returnCode === 1) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
