import { Schema, model, models, type Model } from "mongoose";

type ProductDocument = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge: string;
  image: string;
  accent: string;
  featured?: boolean;
};

const ProductSchema = new Schema<ProductDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    rating: { type: Number, default: 4.8 },
    badge: { type: String, default: "New" },
    image: { type: String, required: true },
    accent: { type: String, default: "from-stone-200/70 to-transparent" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ProductModel = models.Product as Model<ProductDocument> | undefined;

export default ProductModel || model<ProductDocument>("Product", ProductSchema);
