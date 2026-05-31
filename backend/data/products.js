const products = [
  {
    id: 1,
    name: "Oversized Linen Shirt",
    category: "tops",
    price: 1299,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
    tags: ["casual", "minimal", "neutral", "oversized", "summer"],
    brand: "Studio Basics",
    description: "Relaxed fit linen shirt in off-white. Perfect for everyday styling."
  },
  {
    id: 2,
    name: "High-Waist Straight Jeans",
    category: "bottoms",
    price: 2199,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
    tags: ["casual", "denim", "classic", "versatile"],
    brand: "Denim Co.",
    description: "Classic straight-cut high-waist jeans. A wardrobe staple."
  },
  {
    id: 3,
    name: "Slip Midi Dress",
    category: "dresses",
    price: 1899,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",
    tags: ["elegant", "party", "minimal", "evening", "feminine"],
    brand: "Silk & Co.",
    description: "Satin slip dress with adjustable straps. Perfect for evenings out."
  },
  {
    id: 4,
    name: "Cropped Blazer",
    category: "outerwear",
    price: 2999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f5d?w=400&q=80",
    tags: ["formal", "office", "chic", "structured", "versatile"],
    brand: "Sharp Tailors",
    description: "Structured cropped blazer. Elevates any look instantly."
  },
  {
    id: 5,
    name: "Ribbed Crop Top",
    category: "tops",
    price: 699,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
    tags: ["casual", "summer", "minimal", "fitted", "trendy"],
    brand: "Basics Studio",
    description: "Stretch ribbed crop top. Pairs well with high-waist bottoms."
  },
  {
    id: 6,
    name: "Wide Leg Trousers",
    category: "bottoms",
    price: 1799,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
    tags: ["formal", "office", "chic", "relaxed", "neutral"],
    brand: "Fluid Forms",
    description: "Flowing wide-leg trousers in cream. Modern and comfortable."
  },
  {
    id: 7,
    name: "Floral Wrap Dress",
    category: "dresses",
    price: 1599,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    tags: ["casual", "feminine", "summer", "floral", "vacation"],
    brand: "Bloom Studio",
    description: "Lightweight wrap dress with floral print. Effortlessly feminine."
  },
  {
    id: 8,
    name: "Leather Mini Skirt",
    category: "bottoms",
    price: 2499,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80",
    tags: ["party", "edgy", "evening", "trendy", "bold"],
    brand: "Edge Studio",
    description: "Faux leather mini skirt with zip detail. Party-ready style."
  },
  {
    id: 9,
    name: "Chunky Knit Sweater",
    category: "tops",
    price: 2199,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    tags: ["winter", "cozy", "casual", "oversized", "neutral"],
    brand: "Wool & Co.",
    description: "Chunky cable-knit sweater in oatmeal. Ultimate cozy piece."
  },
  {
    id: 10,
    name: "Pleated Midi Skirt",
    category: "bottoms",
    price: 1499,
    image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=400&q=80",
    tags: ["feminine", "elegant", "office", "versatile", "chic"],
    brand: "Pleat Studio",
    description: "Satin pleated midi skirt in dusty rose. Effortlessly elegant."
  },
  {
    id: 11,
    name: "Denim Jacket",
    category: "outerwear",
    price: 2299,
    image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400&q=80",
    tags: ["casual", "classic", "denim", "layering", "versatile"],
    brand: "Denim Co.",
    description: "Classic denim jacket. The ultimate layering piece."
  },
  {
    id: 12,
    name: "Bodycon Dress",
    category: "dresses",
    price: 1699,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
    tags: ["party", "evening", "bold", "fitted", "glamorous"],
    brand: "Curve Studio",
    description: "Figure-hugging bodycon dress in midnight black. Show-stopping style."
  },
  {
    id: 13,
    name: "Linen Co-ord Set",
    category: "sets",
    price: 2799,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f5d?w=400&q=80",
    tags: ["summer", "vacation", "minimal", "casual", "trendy"],
    brand: "Linen House",
    description: "Matching linen top and trouser set in sage green."
  },
  {
    id: 14,
    name: "Puff Sleeve Blouse",
    category: "tops",
    price: 999,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80",
    tags: ["feminine", "romantic", "office", "trendy", "casual"],
    brand: "Bloom Wear",
    description: "Puff sleeve blouse in soft white. Romantic and modern."
  },
  {
    id: 15,
    name: "Cargo Joggers",
    category: "bottoms",
    price: 1399,
    image: "https://images.unsplash.com/photo-1548286978-f218023f8d18?w=400&q=80",
    tags: ["streetwear", "casual", "sporty", "relaxed", "trendy"],
    brand: "Street Studio",
    description: "Relaxed cargo joggers with multiple pockets. Comfortable street style."
  },
  {
    id: 16,
    name: "Trench Coat",
    category: "outerwear",
    price: 4499,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
    tags: ["classic", "formal", "elegant", "winter", "timeless"],
    brand: "Trench House",
    description: "Classic double-breasted trench coat. A timeless investment piece."
  },
  {
    id: 17,
    name: "Ruched Mini Dress",
    category: "dresses",
    price: 1299,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
    tags: ["party", "feminine", "trendy", "evening", "bold"],
    brand: "Night Studio",
    description: "Ruched jersey mini dress. Goes from day to night effortlessly."
  },
  {
    id: 18,
    name: "Printed Kurta",
    category: "ethnic",
    price: 1199,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
    tags: ["ethnic", "casual", "festive", "comfortable", "cultural"],
    brand: "Craft House",
    description: "Block-printed cotton kurta. Beautiful ethnic craftsmanship."
  },
  {
    id: 19,
    name: "Asymmetric Hem Top",
    category: "tops",
    price: 849,
    image: "https://images.unsplash.com/photo-1503342564462-ba37fbf58430?w=400&q=80",
    tags: ["edgy", "trendy", "casual", "modern", "unique"],
    brand: "Form Studio",
    description: "Asymmetric hem top with interesting silhouette. Statement basics."
  },
  {
    id: 20,
    name: "Palazzo Pants",
    category: "bottoms",
    price: 1299,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f5d?w=400&q=80",
    tags: ["comfortable", "ethnic", "festive", "flowy", "casual"],
    brand: "Fluid Studio",
    description: "Flowy palazzo pants in printed fabric. Comfortable yet stylish."
  }
];

module.exports = products;
