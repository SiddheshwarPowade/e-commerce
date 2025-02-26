import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../common/Toast";
import { Controller, useForm } from "react-hook-form";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  const { handleSubmit, control, formState, reset } = useForm();
  const { errors } = formState;

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
      reset(result.data);
    } else {
      showErrorToast(result.message);
    }
  };

  const updateProduct = async ({ name, price, category, company }) => {
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
      showSuccessToast("Product updated successfully");
      navigate("/");
    } else {
      showErrorToast(result.message);
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit(updateProduct)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              placeholder="Enter product name"
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors?.name && <p className="invalid-input">Enter valid name</p>}
        <Controller
          control={control}
          name="price"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              placeholder="Enter product price"
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors?.price && <p className="invalid-input">Enter valid price</p>}
        <Controller
          control={control}
          name="category"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              placeholder="Enter product category"
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors?.category && (
          <p className="invalid-input">Enter valid category</p>
        )}
        <Controller
          control={control}
          name="company"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              placeholder="Enter product company"
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
        />
        {errors?.company && (
          <p className="invalid-input">Enter valid company</p>
        )}

        <input type="submit" className="appButton" value="Update" />
      </form>
    </div>
  );
};

export default UpdateProduct;
