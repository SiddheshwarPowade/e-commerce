import React from "react";
import { useSelector } from "react-redux";
import { showSuccessToast } from "../common/Toast";
import { Controller, useForm } from "react-hook-form";

const AddProduct = () => {
  const { token } = useSelector((state) => state.token);
  const user = useSelector((state) => state.loginUser);

  const { handleSubmit, control, formState, reset } = useForm();
  const { errors } = formState;

  const addProduct = async ({ name, price, category, company }) => {
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
      showSuccessToast("Product added successfully");
      reset({ name: "", price: "", category: "", company: "" });
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit(addProduct)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              value={field.value}
              placeholder="Enter product name"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.name && <p className="invalid-input">Enter valid name</p>}

        <Controller
          control={control}
          name="price"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              value={field.value}
              placeholder="Enter product price"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.price && <p className="invalid-input">Enter valid price</p>}

        <Controller
          control={control}
          name="category"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              className="inputBox"
              type="text"
              value={field.value}
              placeholder="Enter product category"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.category && (
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
              value={field.value}
              placeholder="Enter product company"
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {errors.company && <p className="invalid-input">Enter valid company</p>}
        <input type="submit" className="appButton" value="Add" />
      </form>
    </div>
  );
};

export default AddProduct;
