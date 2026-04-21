import { useState } from "react";
import { Search, Filter, ChevronDown, Star, Clock, TrendingUp, Zap, ShoppingCart, Heart, Check } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  emi: number;
  rating: number;
  reviews: number;
  soldThisMonth: number;
  stock: number;
  noCostEMI: boolean;
  discount: number;
}

export function EMIMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [noCostEMIOnly, setNoCostEMIOnly] = useState(false);
  const [selectedTenure, setSelectedTenure] = useState<number[]>([]);
  const [minRating, setMinRating] = useState(0);

  const categories = ["All", "Laptops", "Smartphones", "TVs", "Air Conditioners", "Furniture"];
  const brands = ["Apple", "Samsung", "Dell", "HP", "LG", "Sony", "Godrej"];
  const tenures = [3, 6, 9, 12, 18, 24];

  const products: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 14\" M3 Pro",
      brand: "Apple",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      price: 189990,
      emi: 7916,
      rating: 4.8,
      reviews: 1247,
      soldThisMonth: 2156,
      stock: 3,
      noCostEMI: true,
      discount: 15,
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max 256GB",
      brand: "Apple",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop",
      price: 159900,
      emi: 6663,
      rating: 4.9,
      reviews: 3421,
      soldThisMonth: 4832,
      stock: 12,
      noCostEMI: true,
      discount: 10,
    },
    {
      id: 3,
      name: "Samsung 65\" QLED 4K Smart TV",
      brand: "Samsung",
      category: "TVs",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      price: 124990,
      emi: 5208,
      rating: 4.6,
      reviews: 892,
      soldThisMonth: 1567,
      stock: 8,
      noCostEMI: true,
      discount: 20,
    },
    {
      id: 4,
      name: "Dell XPS 15 Intel i9 RTX 4060",
      brand: "Dell",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
      price: 179990,
      emi: 7500,
      rating: 4.7,
      reviews: 654,
      soldThisMonth: 987,
      stock: 5,
      noCostEMI: false,
      discount: 12,
    },
    {
      id: 5,
      name: "Samsung Galaxy S24 Ultra 512GB",
      brand: "Samsung",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
      price: 134990,
      emi: 5625,
      rating: 4.8,
      reviews: 2134,
      soldThisMonth: 3245,
      stock: 15,
      noCostEMI: true,
      discount: 8,
    },
    {
      id: 6,
      name: "LG 1.5 Ton 5 Star Inverter AC",
      brand: "LG",
      category: "Air Conditioners",
      image: "https://images.unsplash.com/photo-1631545806609-4b67c0e384f3?w=400&h=300&fit=crop",
      price: 45990,
      emi: 1916,
      rating: 4.5,
      reviews: 567,
      soldThisMonth: 1234,
      stock: 2,
      noCostEMI: true,
      discount: 25,
    },
    {
      id: 7,
      name: "Sony Bravia 55\" OLED 4K TV",
      brand: "Sony",
      category: "TVs",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
      price: 149990,
      emi: 6250,
      rating: 4.9,
      reviews: 743,
      soldThisMonth: 892,
      stock: 6,
      noCostEMI: true,
      discount: 18,
    },
    {
      id: 8,
      name: "Godrej Interio Executive Sofa Set",
      brand: "Godrej",
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      price: 89990,
      emi: 3750,
      rating: 4.4,
      reviews: 421,
      soldThisMonth: 756,
      stock: 4,
      noCostEMI: false,
      discount: 30,
    },
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleTenure = (tenure: number) => {
    setSelectedTenure((prev) =>
      prev.includes(tenure) ? prev.filter((t) => t !== tenure) : [...prev, tenure]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesNoCostEMI = !noCostEMIOnly || product.noCostEMI;
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesNoCostEMI && matchesRating;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Offer Timer Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="flex items-center justify-center gap-3 text-sm font-medium">
            <Clock className="w-5 h-5" />
            <span>Limited Time Offer: Extra 10% Cashback on No Cost EMI | Ends in 23:45:12</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] bg-white min-w-[180px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                />
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart (0)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 lg:px-12 max-w-[1400px] py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0A2540]">Filters</h2>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setPriceRange([0, 200000]);
                    setNoCostEMIOnly(false);
                    setSelectedTenure([]);
                    setMinRating(0);
                  }}
                  className="text-sm text-[#0A2540] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-[#0A2540] mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 accent-[#0A2540]"
                      />
                      <span className="text-sm text-[#64748B] group-hover:text-[#0A2540]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-[#0A2540] mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#0A2540]"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">₹0</span>
                    <span className="font-bold text-[#0A2540]">₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* No Cost EMI */}
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={noCostEMIOnly}
                    onChange={(e) => setNoCostEMIOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#0A2540]"
                  />
                  <div>
                    <div className="font-bold text-[#0A2540] group-hover:text-[#0D2F52]">No Cost EMI Only</div>
                    <div className="text-xs text-[#64748B]">Zero interest on EMI</div>
                  </div>
                </label>
              </div>

              {/* Tenure */}
              <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                <h3 className="font-bold text-[#0A2540] mb-3">EMI Tenure</h3>
                <div className="grid grid-cols-3 gap-2">
                  {tenures.map((tenure) => (
                    <button
                      key={tenure}
                      onClick={() => toggleTenure(tenure)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
                        selectedTenure.includes(tenure)
                          ? "bg-[#0A2540] text-white border-[#0A2540]"
                          : "bg-white text-[#64748B] border-[#E5E7EB] hover:border-[#0A2540]"
                      }`}
                    >
                      {tenure}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-bold text-[#0A2540] mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4 h-4 accent-[#0A2540]"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                        <span className="text-sm text-[#64748B] ml-1">& above</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === 0}
                      onChange={() => setMinRating(0)}
                      className="w-4 h-4 accent-[#0A2540]"
                    />
                    <span className="text-sm text-[#64748B]">All Ratings</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#0A2540] mb-1">
                  {selectedCategory === "All" ? "All Products" : selectedCategory}
                </h1>
                <p className="text-sm text-[#64748B]">
                  {filteredProducts.length} products available
                </p>
              </div>
              <select className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2540] text-sm">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.noCostEMI && (
                      <div className="absolute top-3 left-3 bg-[#16A34A] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        No Cost EMI
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.stock <= 5 && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Only {product.stock} left
                      </div>
                    )}
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#F8FAFC] transition-all opacity-0 group-hover:opacity-100">
                      <Heart className="w-5 h-5 text-[#64748B]" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <div className="text-xs text-[#64748B] mb-1">{product.brand}</div>
                      <h3 className="font-bold text-[#0A2540] mb-2 line-clamp-2 min-h-[48px]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                          <span className="font-bold text-[#0A2540] text-sm">{product.rating}</span>
                        </div>
                        <span className="text-xs text-[#64748B]">({product.reviews.toLocaleString()})</span>
                        <div className="flex items-center gap-1 text-xs text-[#16A34A] ml-auto">
                          <TrendingUp className="w-3 h-3" />
                          <span>{product.soldThisMonth.toLocaleString()} sold</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-4 pb-4 border-b border-[#E5E7EB]">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-[#0A2540]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-[#64748B] line-through">
                          ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-900 font-medium">or EMI from</span>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-900">
                              ₹{product.emi.toLocaleString('en-IN')}<span className="text-sm">/mo</span>
                            </div>
                            <div className="text-xs text-blue-700">for 24 months</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all font-medium">
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    </div>

                    {/* Social Proof */}
                    {product.soldThisMonth > 2000 && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#64748B] bg-[#F8FAFC] rounded-lg px-3 py-2">
                        <Check className="w-3 h-3 text-[#16A34A]" />
                        <span>
                          <span className="font-bold text-[#0A2540]">{product.soldThisMonth.toLocaleString()}</span> people bought this month
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">No products found</h3>
                <p className="text-[#64748B] mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setPriceRange([0, 200000]);
                    setNoCostEMIOnly(false);
                    setSelectedTenure([]);
                    setMinRating(0);
                    setSearchQuery("");
                  }}
                  className="px-6 py-3 bg-[#0A2540] text-white rounded-lg hover:bg-[#0D2F52] transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
