export type Product = {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  image: string;
  desc: string;
  tag?: string | null;
  festival?: string[];
};


//----FULL PRODUCT DATA (25 Items)
export const PRODUCTS: Product[] = [
  // --- SWEETS ---
  {
    id: "s1",
    slug: "grand-indian-mithai-thali",
    name: "Grand Indian Mithai Thali",
    price: "₹899",
    category: "Sweets",
    festival: ["Diwali"],
    image: "/sweet1.png",
    desc: "A lavish assortment of traditional Indian sweets and snacks, beautifully arranged to celebrate togetherness. Perfect for gifting families during joyous festivals.",
    tag: "Festive Classic"
  },
  {
    id: "s2",
    slug: "royal-ghewar-platter",
    name: "Royal Ghewar Platter",
    price: "₹1,299",
    category: "Sweets",
    festival: ["Rakhi"],
    image: "/sweet2.png",
    desc: "A rich and crispy ghewar, delicately soaked in syrup and adorned with silver vark and nuts — a royal dessert rooted in Indian tradition.",
    tag: "Traditional"
  },
  {
    id: "s3",
     slug: "cookie-delight-box",
    name: "Cookie Delight Box",
    price: "₹1,599",
    category: "Sweets",
    festival: ["Christmas"],
    image: "/sweet3.png",
    desc: "A refined selection of buttery cookies and dry-fruit sweets, lightly dusted and delicately flavored for those who love subtle indulgence.",
    tag: "Premium Treats"
  },
  {
    id: "s4",
    slug: "eid-special-sweet-platter",
    name: "Eid Special Sweet Platter",
    price: "₹999",
    category: "Sweets",
    festival: ["Eid"],
    image: "/sweet4.png",
    desc: "A thoughtfully curated selection of traditional Eid sweets, delicately prepared for sharing blessings and sweetness with loved ones.",
    tag: "Eid Exclusive"
  },
  {
    id: "s5",
    slug: "luxury-celebration-sweet-crate",
    name: "Luxury Celebration Sweet Crate",
    price: "₹1,199",
    category: "Sweets",
    festival: ["Diwali", "Eid"],
    image: "/sweet5.png",
    desc: "An opulent wooden crate filled with assorted laddoos, barfis, and festive sweets — perfect for marking life’s biggest celebrations.",
    tag: "Grand Celebration"
  },

  // --- FLOWERS ---
  {
    id: "f1",
    slug: "crimson-festive-rose-bouquet",
    name: "Crimson Festive Rose Bouquet",
    price: "₹599",
    category: "Flowers",
    festival: ["Christmas"],
    image: "/flower1.png",
    desc: "A rich bouquet of red roses accented with festive greens and berries, wrapped in rustic tones — perfect for warm celebrations and heartfelt gifting.",
    tag: "Festive Elegance"
  },
  {
    id: "f2",
     slug: "babys-breath-bliss-bouquet",
    name: "Baby’s Breath Bliss Bouquet",
    price: "₹799",
    category: "Flowers",
    festival: ["Eid"],
    image: "/flower2.png",
    desc: "A delicate bouquet of soft white baby’s breath, symbolising purity and peace — ideal for serene celebrations and meaningful moments.",
    tag: "Pure & Graceful"
  },
  {
    id: "f3",
     slug: "elegant-orchid-arrangement",
    name: "Elegant Orchid Arrangement",
    price: "₹1,299",
    category: "Flowers",
    festival: ["Diwali"],
    image: "/flower3.png",
    desc: "Exotic purple orchids arranged in a minimalist glass vase.",
    tag: "Luxury"
  },
  {
    id: "f4",
   slug: "sunflower-joy-bouquet",
    name: "Sunflower Joy Bouquet",
    price: "₹399",
    category: "Flowers",
    festival: ["Rakhi"],
    image: "/flower4.png",
    desc: "A cheerful bouquet of radiant sunflowers paired with soft fillers — a perfect gift to spread happiness and positive energy.",
    tag: "Bright & Cheerful"
  },
  {
    id: "f5",
    slug: "luxury-flower-basket",
    name: "Luxury Flower Basket",
    price: "₹1,499",
    category: "Flowers",
    festival: ["Diwali", "Christmas", "Eid"],
    image: "/flower5.png",
    desc: "A graceful basket of white roses and fresh greens, thoughtfully arranged to convey elegance, peace, and heartfelt emotions.",
    tag: "Serene Luxury"
  },


  // --- DRY FRUITS ---
  {
    id: "d1",
    slug: "premium-almonds-and-cashews",
    name: "Premium Almonds & Cashews",
    price: "₹1,299",
    category: "Dry Fruits",
    festival: ["Diwali", "Rakhi"],
    image: "/dryfruits1.png",
    desc: "Jumbo California Almonds and Mangalorean Cashews in a gift box.",
    tag: "Healthy"
  },
  {
    id: "d2",
    slug: "mixed-dry-fruits-box",
    name: "Mixed Dry Fruits Box",
    price: "₹1,599",
    category: "Dry Fruits",
    festival: ["Rakhi"],
    image: "/dryfruits2.png",
    desc: "A four-partition box containing Almonds, Cashews, Raisins, and Pistachios.",
    tag: null
  },
  {
    id: "d3",
    slug: "luxury-dry-fruits-hamper",
    name: "Luxury Dry Fruits Hamper",
    price: "₹2,299",
    category: "Dry Fruits",
    festival: ["Diwali", "Eid", "Rakhi"],
    image: "/dryfruits3.png",
    desc: "Exotic dry fruits including Apricots, Figs, and Pecans.",
    tag: "Premium"
  },
  {
    id: "d4",
    slug: "organic-dry-fruits-collection",
    name: "Organic Dry Fruits Collection",
    price: "₹1,899",
    category: "Dry Fruits",
    festival: ["Eid"],
    image: "/dryfruits4.png",
    desc: "Certified organic nuts sourced directly from sustainable farms.",
    tag: "Organic"
  },
  {
    id: "d5",
    slug: "gourmet-nuts-selection",
    name: "Gourmet Nuts Selection",
    price: "₹999",
    category: "Dry Fruits",
    festival: ["Christmas"],
    image: "/dryfruits5.png",
    desc: "Roasted and salted nuts for a savory snacking experience.",
    tag: "Snack"
  },

  // --- CHOCOLATES ---
  {
    id: "c1",
    slug: "belgian-chocolate-box",
    name: "Belgian Chocolate Box",
    price: "₹899",
    category: "Chocolates",
    festival: ["Rakhi", "Christmas"],
    image: "/choco1.png",
    desc: "Rich and creamy Belgian milk chocolates in a signature box.",
    tag: "Imported"
  },
  {
    id: "c2",
     slug: "premium-chocolate-collection",
    name: "Premium Chocolate Collection",
    price: "₹1,499",
    category: "Chocolates",
    festival: ["Diwali"],
    image: "/choco2.png",
    desc: "An assortment of dark, milk, and white chocolates.",
    tag: null
  },
  {
    id: "c3",
    slug: "artisan-chocolate-hamper",
    name: "Artisan Chocolate Hamper",
    price: "₹1,999",
    category: "Chocolates",
    festival: ["Eid"],
    image: "/choco3.png",
    desc: "Handcrafted chocolates with unique fillings like Paan and Chilli.",
    tag: "Artisan"
  },
  {
    id: "c4",
    slug: "gourmet-chocolate-gift-set",
    name: "Gourmet Chocolate Gift Set",
    price: "₹1,299",
    category: "Chocolates",
    festival: ["Christmas", "Rakhi"],
    image: "/choco4.png",
    desc: "Gourmet bars tailored for the true chocolate connoisseur.",
    tag: "Gourmet"
  },
  {
    id: "c5",
    slug: "luxury-chocolate-box",
    name: "Luxury Chocolate Box",
    price: "₹2,299",
    category: "Chocolates",
    festival: ["Christmas", "Diwali", "Rakhi", "Eid"],
    image: "/choco5.png",
    desc: "Gold-dusted truffles in a velvet-finish box.",
    tag: "Luxury"
  },

  // --- HAMPERS ---
  {
    id: "h1",
    slug: "premium-festival-hamper",
    name: "Premium Festival Hamper",
    price: "₹2,499",
    category: "Hampers",
    festival: ["Diwali", "Rakhi"],
    image: "/hamper1.png",
    desc: "The complete festive package: Sweets, Diyas, and Dry Fruits.",
    tag: "All-in-One"
  },
  {
    id: "h2",
    slug: "luxury-gift-hamper",
    name: "Luxury Gift Hamper",
    price: "₹3,299",
    category: "Hampers",
    festival: ["Diwali", "Christmas", "Rakhi"],
    image: "/hamper2.png",
    desc: "Curated with gourmet chocolates, premium nuts, and a scented candle.",
    tag: "Luxury"
  },
  {
    id: "h3",
    slug: "corporate-gift-hamper",
    name: "Corporate Gift Hamper",
    price: "₹4,999",
    category: "Hampers",
    festival: ["Christmas"],
    image: "/hamper3.png",
    desc: "Professional and elegant packaging suitable for business partners.",
    tag: "Corporate"
  },
  {
    id: "h4",
    slug: "custom-curated-hamper",
    name: "Custom Curated Hamper",
    price: "₹1,999",
    category: "Hampers",
    festival: ["Eid"],
    image: "/hamper4.png",
    desc: "A balanced mix of snacks and sweets, perfect for family sharing.",
    tag: null
  },
  {
    id: "h5",
    slug: "deluxe-celebration-box",
    name: "Deluxe Celebration Box",
    price: "₹3,799",
    category: "Hampers",
    festival: ["Diwali", "Christmas"],
    image: "/hamper5.png",
    desc: "Our largest hamper featuring an assortment of our finest products.",
    tag: "Exclusive"
  },
];
