"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { products, type Product } from "@/lib/data/products";

type CartItem = Product & {
  quantity: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

export default function Storefront() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedCart = window.localStorage.getItem("maison-cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Product[];

        if (Array.isArray(data) && data.length > 0) {
          setCatalog(data);
        }
      } catch (error) {
        console.error("Unable to load products", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("maison-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const categories = [
    "All",
    "Home",
    "Essentials",
    "Wellness",
    "Accessories",
    "Travel",
    "Dining",
  ];

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return catalog;
    }

    return catalog.filter((product) => product.category === selectedCategory);
  }, [catalog, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 24 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f6efe3]">
      <header className="mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7b46a] bg-[#d7b46a]/10 text-sm font-semibold text-[#f0d8a6]">
              M
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#c5b59a]">
                Maison
              </p>
              <h1 className="text-lg font-medium tracking-[0.2em] text-[#f6efe3]">
                ÉTOILE
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-[#e9dcc3] md:flex">
            <a href="#collections" className="transition hover:text-white">
              Collections
            </a>
            <a href="#featured" className="transition hover:text-white">
              Featured
            </a>
            <a href="#journal" className="transition hover:text-white">
              Journal
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#f6efe3] transition hover:border-[#d7b46a] hover:text-[#f0d8a6]">
              Sign in
            </button>
            <button className="relative rounded-full bg-[#d7b46a] px-4 py-2 text-sm font-medium text-[#1b1715] shadow-[0_12px_35px_rgba(215,180,106,0.35)] transition hover:translate-y-[-1px] hover:bg-[#e5c57f]">
              Cart ({totalItems})
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-6 pb-20 lg:px-8">
        <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#12100f] p-5 shadow-[0_35px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
          <div className="flex flex-col justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d7b46a]/30 bg-[#d7b46a]/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-[#f0d8a6]">
              New season • curated essentials
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="max-w-xl text-5xl font-semibold leading-none tracking-[-0.06em] text-white lg:text-7xl">
                Luxury living,
                <span className="block text-[#d7b46a]">
                  beautifully refined.
                </span>
              </h2>

              <p className="max-w-lg text-base leading-7 text-[#d9cbb1] lg:text-lg">
                Discover elevated essentials for home, style, and rituals—made
                to feel as exquisite as they look.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="rounded-full bg-[#d7b46a] px-6 py-3 text-sm font-medium text-[#171310] transition hover:bg-[#e6c97d]"
              >
                Shop the collection
              </a>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-[#d7b46a] hover:text-[#f0d8a6]">
                Book a styling call
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["1.2K+", "happy clients"],
                ["4.9/5", "average rating"],
                ["48h", "global delivery"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-2xl font-semibold text-[#f0d8a6]">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-[#d9cbb1]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#d7b46a]/20 via-[#1a1714] to-[#0d0c0b]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),transparent_32%)]" />
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury interior styling"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-[#171310]/80 p-4 backdrop-blur-xl">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#f0d8a6]">
                Curated edit
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-white">
                    The Atelier Set
                  </p>
                  <p className="mt-1 text-sm text-[#d9cbb1]">
                    Apartment Essentials
                  </p>
                </div>
                <p className="text-xl font-semibold text-[#f0d8a6]">$680</p>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#d7b46a]">
                Collections
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">
                Shop by mood
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? "border-[#d7b46a] bg-[#d7b46a] text-[#171310]"
                      : "border-white/10 bg-white/5 text-[#e9dcc3] hover:border-white/25"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id="featured"
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#12100f] shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="relative h-72 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.accent}`}
                />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#171310]/75 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#f0d8a6] backdrop-blur-md">
                  {product.badge}
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#c5b59a]">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-[#f0d8a6]">
                    <span>★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-semibold text-white">
                    {product.name}
                  </h4>
                  <p className="mt-2 text-sm text-[#d3c5ad]">
                    {product.tagline}
                  </p>
                </div>

                <p className="text-sm leading-6 text-[#d9cbb1]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-white">
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice ? (
                      <span className="text-sm text-[#9b8d74] line-through">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-[#d7b46a] px-4 py-2 text-sm font-medium text-[#171310] transition hover:bg-[#e7cb82]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-[#12100f] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#d7b46a]">
              The Maison promise
            </p>
            <h3 className="text-3xl font-semibold text-white md:text-4xl">
              Everything you need to live beautifully.
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["White-glove delivery", "Complimentary concierge support"],
                ["Artisan quality", "High-touch materials and finishes"],
                ["Easy returns", "30-day satisfaction promise"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-base font-medium text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#d9cbb1]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#d7b46a]/20 bg-[#1b1715] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d7b46a]">
                Cart
              </p>
              <span className="text-sm text-[#d9cbb1]">{totalItems} items</span>
            </div>

            <div className="mt-5 space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-[#d9cbb1]">
                  Your cart is empty. Add a few signature pieces.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#d9cbb1]">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, -item.quantity)
                          }
                          className="text-xs text-[#f0d8a6]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-[#0d0c0b]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 text-lg text-[#f0d8a6]"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 text-lg text-[#f0d8a6]"
                          >
                            +
                          </button>
                        </div>
                        <strong className="text-sm text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm text-[#d9cbb1]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-full bg-[#d7b46a] px-5 py-3 text-sm font-medium text-[#171310] transition hover:bg-[#e6c97d]">
              Checkout securely
            </button>
          </aside>
        </section>

        <section id="journal" className="grid gap-4 md:grid-cols-3">
          {[
            [
              "The quiet luxury reset",
              "Create a softer, calmer home with layered textures and warm lighting.",
            ],
            [
              "Travel rituals",
              "Smart essentials that feel polished before a single departure.",
            ],
            [
              "Wellness at home",
              "Thoughtful fragrances and tactile details for everyday ease.",
            ],
          ].map(([title, text]) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#d7b46a]">
                Journal
              </p>
              <h4 className="mt-4 text-xl font-semibold text-white">{title}</h4>
              <p className="mt-3 text-sm leading-6 text-[#d9cbb1]">{text}</p>
            </article>
          ))}
        </section>
      </main>

      <footer id="about" className="border-t border-white/10 bg-[#100f0e]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-[#d9cbb1] md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Maison Étoile. Curated for a life well lived.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Instagram
            </a>
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
