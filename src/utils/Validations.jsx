import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Username is required")
    .email("Invalid email format")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

// export const productValidationSchema = Yup.object({
//   productName: Yup.string()
//     .required("Product name is required")
//     .trim()
//     .max(100, "Product name must be at most 100 characters long"),
//   category: Yup.string().required("Category is required"), // Assuming category is an ObjectId in string format
//   subCategory: Yup.string(), // Assuming subCategory is an ObjectId in string format
//   image: Yup.string().required("Main image URL is required"),
//   multipleImages: Yup.array().of(Yup.string()),
//   originalPrice: Yup.number()
//     .required("Original price is required")
//     .min(0, "Original price cannot be negative"),
//   discountPrice: Yup.number()
//     .min(0, "Discount price cannot be negative")
//     .when("originalPrice", (originalPrice, schema) => {
//       return schema.max(
//         originalPrice,
//         "Discount price cannot exceed original price"
//       );
//     }),
//   status: Yup.string().oneOf(["stock", "out_of_stock"]),
//   todaysSpecial: Yup.boolean(),
//   description: Yup.string()
//     .required("Description is required")
//     .max(1000, "Description must be at most 1000 characters long"),
//   priceFor: Yup.string()
//     .required("Price for unit is required")
//     .oneOf(["Kg", "g", "Pieces", "Nos"]),
//   isActive: Yup.boolean(),
//   isDeleted: Yup.boolean(),
// });

export const productValidationSchema = Yup.object({
  productName: Yup.string()
    .required("Product name is required")
    .trim()
    .max(100, "Product name must be at most 100 characters long"),
  category: Yup.string().required("Category is required"),
  image: Yup.string().required("Image is required"),
  subCategory: Yup.string(),
  originalPrice: Yup.number()
    .required("Original price is required")
    .min(0, "Original price cannot be negative"),
  discountPrice: Yup.number()
    .min(0, "Discount price cannot be negative")
    .when("originalPrice", (originalPrice, schema) => {
      return schema.max(
        originalPrice,
        "Discount price cannot exceed original price"
      );
    }),
  description: Yup.string()
    .required("Description is required")
    .max(1000, "Description must be at most 1000 characters long"),
  priceFor: Yup.string()
    .required("Price for unit is required")
    .oneOf(["Kg", "g", "Pieces", "Nos"]),
});
