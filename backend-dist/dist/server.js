var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.js
var import_express2 = __toESM(require("express"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
var import_cors = __toESM(require("cors"), 1);

// config/db.js
var import_mongoose = __toESM(require("mongoose"), 1);
var connectDB = async () => {
  try {
    const conn = await import_mongoose.default.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// routes/product.route.js
var import_express = __toESM(require("express"), 1);

// controllers/product.controller.js
var import_mongoose3 = __toESM(require("mongoose"), 1);

// models/product.model.js
var import_mongoose2 = __toESM(require("mongoose"), 1);
var productSchema = new import_mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
var Product = import_mongoose2.default.model("Product", productSchema);
var product_model_default = Product;

// controllers/product.controller.js
var getProducts = async (req, res) => {
  try {
    const products = await product_model_default.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
var createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new product_model_default(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
var updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!import_mongoose3.default.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updatedProduct = await product_model_default.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
var deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!import_mongoose3.default.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await product_model_default.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// routes/product.route.js
var router = import_express.default.Router();
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
var product_route_default = router;

// server.js
import_dotenv.default.config();
var app = (0, import_express2.default)();
var PORT = process.env.PORT || 5e3;
var __dirname = import_path.default.resolve();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use("/api/products", product_route_default);
if (process.env.NODE_ENV === "production") {
  app.use(import_express2.default.static(import_path.default.join(__dirname, "/frontend/dist")));
  app.get("/*path", (req, res) => {
    res.sendFile(import_path.default.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
