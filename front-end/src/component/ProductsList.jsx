import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../common/Toast";

export default function ProductsList() {
  const [products, setProducts] = React.useState([]);
  const { token } = useSelector((state) => state.token);

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    result = await result.json();
    if (result.returnCode === 1) {
      setProducts(result.data);
    } else {
      setProducts([]);
      showErrorToast(result.message);
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    result = await result.json();
    if (result.returnCode === 1) {
      showSuccessToast("Record is deleted");
      getProducts();
    } else {
      showErrorToast("Something wrong");
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value ?? "";
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      result = await result.json();
      if (result.returnCode === 1) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search Product"
        className="search-product-box"
        onChange={searchHandle}
      />
      <div style={{ height: "calc(100vh - 18rem)", overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Comopany</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.company}</td>
                  <td>
                    <button
                      className="btn btn-danger fa fa-trash"
                      onClick={() => deleteProduct(product._id)}
                    ></button>
                    <Link to={`update/${product._id}`} className="link">
                      <span className="btn btn-primary ms-1 fa fa-pencil"></span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <label>
                <b>No Result found</b>
              </label>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
