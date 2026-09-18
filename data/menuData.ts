export interface MenuItemVariant {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  isVeg: boolean;
  basePrice: number;
  description?: string;
  imageEmoji?: string;
  isPopular?: boolean;
  variants?: MenuItemVariant[];
  prepTypeOptions?: string[]; // e.g. ["Fried Rice", "Noodles"]
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Ionicons or MaterialCommunityIcons name
  emoji: string;
}

export const RESTAURANT_INFO = {
  name: "THE MOM'S KITCHEN",
  tagline: "Love and care in every bite",
  phone: "+91 93639 17296",
  whatsappNumber: "919363917296",
  address: "506, Villarasampatti Road, Opposite to Velalar College of Engineering, Maruthi Nagar, Erode, Tamil Nadu 638012",
  instagram: "@_THE_MOMS_KITCHEN_",
  upiId: "9363917296@upi",
};

export const CATEGORIES: Category[] = [
  { id: "all", name: "All Items", icon: "restaurant-outline", emoji: "🍽️" },
  { id: "combos", name: "Combo & Buckets", icon: "gift-outline", emoji: "🎁" },
  { id: "starters", name: "Starters", icon: "flame-outline", emoji: "🔥" },
  { id: "veg_rice_noodles", name: "Veg Rice & Noodles", icon: "leaf-outline", emoji: "🥬" },
  { id: "nonveg_rice_noodles", name: "Non-Veg Rice & Noodles", icon: "fast-food-outline", emoji: "🍗" },
  { id: "veg_curries", name: "Veg Curries / Dry", icon: "nutrition-outline", emoji: "🍲" },
  { id: "nonveg_curries", name: "Non-Veg Curries / Dry", icon: "bonfire-outline", emoji: "🥘" },
  { id: "fried_veg", name: "Fried Veg", icon: "sparkles-outline", emoji: "🥟" },
  { id: "fried_nonveg", name: "Fried Non-Veg", icon: "pizza-outline", emoji: "🍗" },
  { id: "momos", name: "Momos", icon: "cube-outline", emoji: "🥟" },
  { id: "burgers", name: "Burgers", icon: "fast-food-outline", emoji: "🍔" },
  { id: "sandwiches", name: "Sandwiches", icon: "layers-outline", emoji: "🥪" },
  { id: "pizzas", name: "Pizzas", icon: "disc-outline", emoji: "🍕" },
  { id: "fries", name: "French Fries", icon: "grid-outline", emoji: "🍟" },
  { id: "wraps", name: "Wraps", icon: "refresh-outline", emoji: "🌯" },
  { id: "bread_omelette", name: "Bread Omelette", icon: "egg-outline", emoji: "🍳" },
  { id: "sea_foods", name: "Sea Foods", icon: "fish-outline", emoji: "🦐" },
  { id: "ice_creams", name: "Ice Creams", icon: "ice-cream-outline", emoji: "🍨" },
  { id: "beverages", name: "Beverages", icon: "cafe-outline", emoji: "☕" },
  { id: "desserts", name: "Desserts", icon: "gift-outline", emoji: "🍰" },
  { id: "milkshakes", name: "Milkshakes", icon: "wine-outline", emoji: "🥤" },
  { id: "mojitos", name: "Mojitos", icon: "color-wand-outline", emoji: "🍹" },
];

export const MENU_ITEMS: MenuItem[] = [
  // 0. SPECIAL COMBOS & BUCKET CHICKEN
  {
    id: "combo_bucket_chicken",
    name: "Fried Bucket Chicken",
    categoryId: "combos",
    isVeg: false,
    basePrice: 449,
    description: "Fried Chicken Wings (4 pcs) + Fried Chicken Strips (4 pcs) + Fried Chicken Popcorn + French Fries + Mojito (2)",
    imageEmoji: "🪣",
    isPopular: true,
  },
  {
    id: "combo_1",
    name: "Combo 1 (Chicken Feast)",
    categoryId: "combos",
    isVeg: false,
    basePrice: 375,
    description: "Chicken Sandwich + Fried Chicken Wings + Fried Chicken Popcorn + Mojitos",
    imageEmoji: "🍗",
    isPopular: true,
  },
  {
    id: "combo_2",
    name: "Combo 2 (Burger & Momos)",
    categoryId: "combos",
    isVeg: false,
    basePrice: 375,
    description: "Chicken Burger + Fried Chicken Strips + Fried Chicken Momos + Mojitos",
    imageEmoji: "🍔",
    isPopular: true,
  },
  {
    id: "combo_3",
    name: "Combo 3 (Veg Delight)",
    categoryId: "combos",
    isVeg: true,
    basePrice: 300,
    description: "Veg Burger + French Fries + Fried Veg Momos + Mojitos",
    imageEmoji: "🍔",
    isPopular: true,
  },
  {
    id: "combo_4",
    name: "Combo 4 (Veg Paneer Special)",
    categoryId: "combos",
    isVeg: true,
    basePrice: 300,
    description: "Veg Sandwich + French Paneer Roll (3 pcs) + Fried Veg Nuggets + Mojitos",
    imageEmoji: "🥪",
    isPopular: true,
  },

  // 1. STARTERS
  {
    id: "st_gobi_chilly",
    name: "Gobi Chilly",
    categoryId: "starters",
    isVeg: true,
    basePrice: 70, // was 60 + 10
    description: "Crispy cauliflower florets tossed with garlic, green chillies, and Indo-Chinese sauces.",
    imageEmoji: "🥦",
    isPopular: true,
  },
  {
    id: "st_mushroom_chilly",
    name: "Mushroom Chilly",
    categoryId: "starters",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Tender button mushrooms batter fried and wok-tossed in spicy chilli gravy.",
    imageEmoji: "🍄",
  },
  {
    id: "st_paneer_chilly",
    name: "Paneer Chilly",
    categoryId: "starters",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Soft fresh cottage cheese cubes wok-fried with crisp bell peppers and oriental spices.",
    imageEmoji: "🧀",
    isPopular: true,
  },
  {
    id: "st_chicken_chilly",
    name: "Chicken Chilly",
    categoryId: "starters",
    isVeg: false,
    basePrice: 60, // was 50 + 10
    description: "Succulent chicken chunks tossed with cracked pepper, chillies, and soy reduction.",
    imageEmoji: "🍗",
    isPopular: true,
  },
  {
    id: "st_chicken_maharani",
    name: "Chicken Maharani",
    categoryId: "starters",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Royal starter made with tender chicken cooked in a rich, velvety aromatic spiced marination.",
    imageEmoji: "👑",
    isPopular: true,
  },

  // 2. VEG FRIED RICE / NOODLES
  {
    id: "vfr_veg",
    name: "Veg Fried Rice / Noodles",
    categoryId: "veg_rice_noodles",
    isVeg: true,
    basePrice: 70,
    description: "Fluffy aromatic rice or soft noodles wok-tossed with garden-fresh shredded vegetables.",
    imageEmoji: "🍚",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 70 }, // was 60 + 10
      { id: "schezwan", name: "Schezwan", price: 80 }, // was 70 + 10
      { id: "dragon", name: "Dragon", price: 100 }, // was 90 + 10
    ],
  },
  {
    id: "vfr_gobi",
    name: "Gobi Fried Rice / Noodles",
    categoryId: "veg_rice_noodles",
    isVeg: true,
    basePrice: 90,
    description: "Golden crispy gobi pieces tossed with flavorful rice or noodles in your favorite style.",
    imageEmoji: "🥦",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 90 }, // was 80 + 10
      { id: "schezwan", name: "Schezwan", price: 100 }, // was 90 + 10
      { id: "dragon", name: "Dragon", price: 110 }, // was 100 + 10
    ],
  },
  {
    id: "vfr_mushroom",
    name: "Mushroom Fried Rice / Noodles",
    categoryId: "veg_rice_noodles",
    isVeg: true,
    basePrice: 100,
    description: "Sliced button mushrooms stir-fried with fragrant rice or soft noodles.",
    imageEmoji: "🍄",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 100 }, // was 90 + 10
      { id: "schezwan", name: "Schezwan", price: 110 }, // was 100 + 10
      { id: "dragon", name: "Dragon", price: 120 }, // was 110 + 10
    ],
  },
  {
    id: "vfr_paneer",
    name: "Paneer Fried Rice / Noodles",
    categoryId: "veg_rice_noodles",
    isVeg: true,
    basePrice: 110,
    description: "Delicious cubes of fresh malai paneer stir-fried with veggies and seasoned rice/noodles.",
    imageEmoji: "🧀",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 110 }, // was 100 + 10
      { id: "schezwan", name: "Schezwan", price: 120 }, // was 110 + 10
      { id: "dragon", name: "Dragon", price: 130 }, // was 120 + 10
    ],
  },
  {
    id: "vfr_mixed_veg",
    name: "Mixed Veg Fried Rice / Noodles",
    categoryId: "veg_rice_noodles",
    isVeg: true,
    basePrice: 120,
    description: "Loaded combination of Gobi, Mushroom, and Paneer wok-tossed together with rice/noodles.",
    imageEmoji: "🥗",
    isPopular: true,
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 120 }, // was 110 + 10
      { id: "schezwan", name: "Schezwan", price: 130 }, // was 120 + 10
      { id: "dragon", name: "Dragon", price: 140 }, // was 130 + 10
    ],
  },

  // 3. NON VEG FRIED RICE / NOODLES
  {
    id: "nvfr_egg",
    name: "Egg Fried Rice / Noodles",
    categoryId: "nonveg_rice_noodles",
    isVeg: false,
    basePrice: 80,
    description: "Classic scramble of farm eggs with garlic, spring onions, and fragrant basmati/noodles.",
    imageEmoji: "🍳",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 80 }, // was 70 + 10
      { id: "schezwan", name: "Schezwan", price: 90 }, // was 80 + 10
      { id: "dragon", name: "Dragon", price: 100 }, // was 90 + 10
    ],
  },
  {
    id: "nvfr_chicken",
    name: "Chicken Fried Rice / Noodles",
    categoryId: "nonveg_rice_noodles",
    isVeg: false,
    basePrice: 110,
    description: "Tender chicken pieces tossed with seasoned wok rice or long noodles. Our customer favorite!",
    imageEmoji: "🍗",
    isPopular: true,
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 110 }, // was 100 + 10
      { id: "schezwan", name: "Schezwan", price: 120 }, // was 110 + 10
      { id: "dragon", name: "Dragon", price: 130 }, // was 120 + 10
    ],
  },
  {
    id: "nvfr_prawn",
    name: "Prawn Fried Rice / Noodles",
    categoryId: "nonveg_rice_noodles",
    isVeg: false,
    basePrice: 120,
    description: "Juicy fresh prawns stir-fried with scallions, spices, and premium rice or noodles.",
    imageEmoji: "🦐",
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 120 }, // was 110 + 10
      { id: "schezwan", name: "Schezwan", price: 130 }, // was 120 + 10
      { id: "dragon", name: "Dragon", price: 140 }, // was 130 + 10
    ],
  },
  {
    id: "nvfr_mixed_nonveg",
    name: "Mixed Non-Veg Fried Rice / Noodles",
    categoryId: "nonveg_rice_noodles",
    isVeg: false,
    basePrice: 130,
    description: "The ultimate feast! Egg, Chicken, and Prawn wok-tossed together with Chef's secret spices.",
    imageEmoji: "🥘",
    isPopular: true,
    prepTypeOptions: ["Fried Rice", "Noodles"],
    variants: [
      { id: "normal", name: "Normal", price: 130 }, // was 120 + 10
      { id: "schezwan", name: "Schezwan", price: 140 }, // was 130 + 10
      { id: "dragon", name: "Dragon", price: 150 }, // was 140 + 10
    ],
  },

  // 4. VEG CURRIES / DRY
  {
    id: "vc_manchurian",
    name: "Veg Manchurian (Dry / Gravy)",
    categoryId: "veg_curries",
    isVeg: true,
    basePrice: 130,
    description: "Classic Chinese delicacy tossed in ginger-garlic and dark soy sauce.",
    imageEmoji: "🍲",
    variants: [
      { id: "gobi", name: "Gobi Manchurian", price: 130 }, // was 120 + 10
      { id: "mushroom", name: "Mushroom Manchurian", price: 130 }, // was 120 + 10
      { id: "paneer", name: "Paneer Manchurian", price: 160 }, // was 150 + 10
    ],
  },
  {
    id: "vc_dragon_fry",
    name: "Dragon Fry",
    categoryId: "veg_curries",
    isVeg: true,
    basePrice: 140,
    description: "Crispy fried and coated in sweet, spicy, tangy Dragon sauce garnished with cashews.",
    imageEmoji: "🌶️",
    variants: [
      { id: "gobi", name: "Gobi Dragon Fry", price: 140 }, // was 130 + 10
      { id: "mushroom", name: "Mushroom Dragon Fry", price: 140 }, // was 130 + 10
      { id: "paneer", name: "Paneer Dragon Fry", price: 160 }, // was 150 + 10
    ],
  },
  {
    id: "vc_pepper",
    name: "Pepper Gravy / Dry",
    categoryId: "veg_curries",
    isVeg: true,
    basePrice: 150,
    description: "Rich South-Indian spiced black pepper gravy with aromatic curry leaves and coriander.",
    imageEmoji: "🧂",
    variants: [
      { id: "gobi", name: "Gobi Pepper", price: 150 }, // was 140 + 10
      { id: "mushroom", name: "Mushroom Pepper", price: 150 }, // was 140 + 10
      { id: "paneer", name: "Paneer Pepper", price: 170 }, // was 160 + 10
    ],
  },
  {
    id: "vc_japan",
    name: "Japan Gravy / Dry",
    categoryId: "veg_curries",
    isVeg: true,
    basePrice: 160,
    description: "Creamy, mildly sweet and savory special Japanese fusion gravy with herbs.",
    imageEmoji: "🍱",
    variants: [
      { id: "gobi", name: "Gobi Japan", price: 160 }, // was 150 + 10
      { id: "mushroom", name: "Mushroom Japan", price: 160 }, // was 150 + 10
      { id: "paneer", name: "Paneer Japan", price: 190 }, // was 180 + 10
    ],
  },

  // 5. NON VEG CURRIES / DRY
  {
    id: "nvc_chicken_manchurian",
    name: "Chicken Manchurian",
    categoryId: "nonveg_curries",
    isVeg: false,
    basePrice: 140, // was 130 + 10
    description: "Tender batter-fried chicken balls cooked in rich Indo-Chinese Manchurian sauce.",
    imageEmoji: "🍗",
  },
  {
    id: "nvc_dragon_chicken",
    name: "Dragon Chicken",
    categoryId: "nonveg_curries",
    isVeg: false,
    basePrice: 150, // was 140 + 10
    description: "Crispy fried chicken strips tossed in spicy fiery dragon sauce with toasted sesame.",
    imageEmoji: "🐉",
    isPopular: true,
  },
  {
    id: "nvc_pepper_chicken",
    name: "Pepper Chicken (Gravy / Dry)",
    categoryId: "nonveg_curries",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Spicy roasted chicken cooked with crushed black peppercorns and curry leaves.",
    imageEmoji: "🍛",
    isPopular: true,
  },
  {
    id: "nvc_japan_chicken",
    name: "Japan Chicken (Gravy / Dry)",
    categoryId: "nonveg_curries",
    isVeg: false,
    basePrice: 190, // was 180 + 10
    description: "Chef's signature creamy and luscious Japan style chicken preparation.",
    imageEmoji: "🍱",
    isPopular: true,
  },
  {
    id: "nvc_moms_special_chicken",
    name: "Mom's Kitchen Special Chicken",
    categoryId: "nonveg_curries",
    isVeg: false,
    basePrice: 210, // was 200 + 10
    description: "Our hallmark signature preparation loaded with secret homestyle masalas and rich gravy.",
    imageEmoji: "⭐",
    isPopular: true,
  },

  // 6. FRIED VEG
  {
    id: "fv_veg_nuggets",
    name: "Veg Nuggets (5 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Golden crispy vegetable patties seasoned with herbs and served with tangy dip.",
    imageEmoji: "🥔",
  },
  {
    id: "fv_veg_roll",
    name: "Veg Roll (3 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Crunchy spring rolls stuffed with spiced seasoned cabbage and carrot shreds.",
    imageEmoji: "🥢",
  },
  {
    id: "fv_paneer_roll",
    name: "Paneer Roll (3 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 100, // was 90 + 10
    description: "Crispy rolls filled with grated cottage cheese and house seasonings.",
    imageEmoji: "🧀",
  },
  {
    id: "fv_smiley",
    name: "Smiley (6 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Golden smiley mashed potato crisps loved by kids and adults alike.",
    imageEmoji: "😊",
  },
  {
    id: "fv_crispy_cheese_balls",
    name: "Crispy Cheese Balls (6 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Mouth melting melted cheese encased in a super crispy golden crust.",
    imageEmoji: "🟡",
    isPopular: true,
  },
  {
    id: "fv_cheese_corn_nuggets",
    name: "Cheese Corn Nuggets (5 pcs)",
    categoryId: "fried_veg",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Sweet American corn kernels blended with cheddar and mozzarella cheese.",
    imageEmoji: "🌽",
  },

  // 7. FRIED NON VEG
  {
    id: "fnv_fried_chicken_leg",
    name: "Fried Chicken Leg (1 pc)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 90, // was 80 + 10
    description: "Crispy southern-style marinated tender chicken drumstick fried to golden perfection.",
    imageEmoji: "🍗",
    isPopular: true,
  },
  {
    id: "fnv_bbq_fried_chicken_leg",
    name: "BBQ Fried Chicken Leg (1 pc)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 110, // was 100 + 10
    description: "Crunchy fried chicken drumstick coated in sweet & smoky barbecue glaze.",
    imageEmoji: "🍗",
  },
  {
    id: "fnv_chicken_nuggets",
    name: "Chicken Nuggets (5 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 110, // was 100 + 10
    description: "Juicy minced chicken bites with herb crumb coating and dipping sauce.",
    imageEmoji: "🧆",
  },
  {
    id: "fnv_fried_chicken_strips",
    name: "Fried Chicken Strips (4 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Tender boneless chicken breast strips breaded and fried golden crisp.",
    imageEmoji: "🥓",
  },
  {
    id: "fnv_chicken_popcorn",
    name: "Chicken Popcorn",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Bite-sized seasoned crunchy chicken popcorn, perfect for munching.",
    imageEmoji: "🍿",
    isPopular: true,
  },
  {
    id: "fnv_fried_chicken_wings",
    name: "Fried Chicken Wings (4 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Crispy spiced chicken wings fried until crackling crisp outside and juicy inside.",
    imageEmoji: "🍗",
  },
  {
    id: "fnv_bbq_chicken_strips",
    name: "Fried BBQ Chicken Strips (4 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Fried chicken tenders tossed generously in smoky hickory BBQ sauce.",
    imageEmoji: "🥓",
  },
  {
    id: "fnv_bbq_chicken_wings",
    name: "Fried BBQ Chicken Wings (4 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Juicy crispy wings glazed with finger-licking tangy barbecue reduction.",
    imageEmoji: "🍗",
  },
  {
    id: "fnv_honey_wings",
    name: "Honey Wings (4 pcs)",
    categoryId: "fried_nonveg",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Crispy chicken wings glazed with organic honey, butter, and chili flakes.",
    imageEmoji: "🍯",
    isPopular: true,
  },

  // 8. MOMOS
  {
    id: "momo_fried_veg",
    name: "Fried Veg Momos",
    categoryId: "momos",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Crispy fried dumplings stuffed with shredded veggies, served with fiery red chutney.",
    imageEmoji: "🥟",
  },
  {
    id: "momo_veg_schezwan",
    name: "Fried Veg Schezwan Momos",
    categoryId: "momos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Fried vegetable momos tossed in spicy Schezwan sauce.",
    imageEmoji: "🥟",
  },
  {
    id: "momo_paneer",
    name: "Fried Paneer Momos",
    categoryId: "momos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Stuffed with seasoned minced paneer and coriander, deep fried golden.",
    imageEmoji: "🥟",
    isPopular: true,
  },
  {
    id: "momo_cheese_corn",
    name: "Fried Cheese Corn Momos",
    categoryId: "momos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Gooey mozzarella cheese and sweet corn filled dumplings, fried crunchy.",
    imageEmoji: "🥟",
    isPopular: true,
  },
  {
    id: "momo_chicken",
    name: "Fried Chicken Momos",
    categoryId: "momos",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Juicy spiced minced chicken dumplings fried crisp and served with spicy dip.",
    imageEmoji: "🥟",
    isPopular: true,
  },
  {
    id: "momo_chicken_schezwan",
    name: "Fried Chicken Schezwan Momos",
    categoryId: "momos",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Crunchy chicken momos stir-tossed in zesty homemade Schezwan sauce.",
    imageEmoji: "🥟",
  },

  // 9. BURGERS
  {
    id: "bg_veg",
    name: "Veg Burger",
    categoryId: "burgers",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Crispy spiced herb vegetable patty topped with lettuce, mayo, and tomato in toasted buns.",
    imageEmoji: "🍔",
  },
  {
    id: "bg_fried_chicken",
    name: "Fried Chicken Burger",
    categoryId: "burgers",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Golden fried crunchy chicken fillet with creamy mayonnaise and crisp lettuce.",
    imageEmoji: "🍔",
    isPopular: true,
  },
  {
    id: "bg_bbq_chicken",
    name: "BBQ Chicken Burger",
    categoryId: "burgers",
    isVeg: false,
    basePrice: 140, // was 130 + 10
    description: "Grilled or fried chicken patty drenched in bold smoky barbecue sauce.",
    imageEmoji: "🍔",
  },
  {
    id: "bg_tandoori_chicken",
    name: "Tandoori Chicken Burger",
    categoryId: "burgers",
    isVeg: false,
    basePrice: 150, // was 140 + 10
    description: "Juicy chicken infused with tandoori spices, mint mayo, and onions.",
    imageEmoji: "🍔",
    isPopular: true,
  },
  {
    id: "bg_tower_chicken",
    name: "Tower Chicken Burger",
    categoryId: "burgers",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Double stacked high chicken patty layered with cheese, fresh greens, and special sauce.",
    imageEmoji: "🍔",
    isPopular: true,
  },

  // 10. SANDWICHES
  {
    id: "sw_veg",
    name: "Veg Sandwich",
    categoryId: "sandwiches",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Freshly sliced cucumbers, tomatoes, and greens with butter and mint chutney.",
    imageEmoji: "🥪",
  },
  {
    id: "sw_cheese_corn",
    name: "Cheese Corn Sandwich",
    categoryId: "sandwiches",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Golden sweet corn kernels smothered in molten cheese between toasted bread.",
    imageEmoji: "🥪",
    isPopular: true,
  },
  {
    id: "sw_paneer",
    name: "Paneer Sandwich",
    categoryId: "sandwiches",
    isVeg: true,
    basePrice: 130, // was 120 + 10
    description: "Tender spiced paneer cubes grilled with bell peppers and cheese.",
    imageEmoji: "🥪",
  },
  {
    id: "sw_chicken",
    name: "Chicken Sandwich",
    categoryId: "sandwiches",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Seasoned shredded chicken tossed with herb mayonnaise in toasted bread.",
    imageEmoji: "🥪",
    isPopular: true,
  },
  {
    id: "sw_tandoori_chicken",
    name: "Tandoori Chicken Sandwich",
    categoryId: "sandwiches",
    isVeg: false,
    basePrice: 140, // was 130 + 10
    description: "Smoky tandoori spiced chicken shreds grilled with mint chutney and melted cheese.",
    imageEmoji: "🥪",
  },
  {
    id: "sw_bbq_chicken",
    name: "BBQ Chicken Sandwich",
    categoryId: "sandwiches",
    isVeg: false,
    basePrice: 150, // was 140 + 10
    description: "Toasted sandwich loaded with pulled chicken, caramelized onions, and BBQ sauce.",
    imageEmoji: "🥪",
  },

  // 11. PIZZAS
  {
    id: "pz_margherita",
    name: "Margherita Pizza",
    categoryId: "pizzas",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Classic pizza base with rich marinara sauce, mozzarella cheese, and Italian basil.",
    imageEmoji: "🍕",
  },
  {
    id: "pz_golden_corn",
    name: "Golden Corn Pizza",
    categoryId: "pizzas",
    isVeg: true,
    basePrice: 140, // was 130 + 10
    description: "Crispy sweet corn kernels layered over creamy mozzarella cheese.",
    imageEmoji: "🍕",
  },
  {
    id: "pz_veg_mania",
    name: "Veg Mania Pizza",
    categoryId: "pizzas",
    isVeg: true,
    basePrice: 160, // was 150 + 10
    description: "Loaded with capsicum, onion, tomato, olives, and extra cheese.",
    imageEmoji: "🍕",
    isPopular: true,
  },
  {
    id: "pz_paneer",
    name: "Paneer Pizza",
    categoryId: "pizzas",
    isVeg: true,
    basePrice: 160, // was 150 + 10
    description: "Cubes of soft paneer tossed in Italian herbs on a bubbly cheese crust.",
    imageEmoji: "🍕",
  },
  {
    id: "pz_paneer_tikka",
    name: "Paneer Tikka Pizza",
    categoryId: "pizzas",
    isVeg: true,
    basePrice: 170, // was 160 + 10
    description: "Tandoori marinated paneer tikka, red onions, capsicum, and mozzarella.",
    imageEmoji: "🍕",
    isPopular: true,
  },
  {
    id: "pz_chicken",
    name: "Chicken Pizza",
    categoryId: "pizzas",
    isVeg: false,
    basePrice: 170, // was 160 + 10
    description: "Generous helping of roasted chicken cubes, marinara sauce, and gooey cheese.",
    imageEmoji: "🍕",
  },
  {
    id: "pz_chicken_tikka",
    name: "Chicken Tikka Pizza",
    categoryId: "pizzas",
    isVeg: false,
    basePrice: 180, // was 170 + 10
    description: "Smoky spicy chicken tikka chunks with crunchy onions and melted mozzarella.",
    imageEmoji: "🍕",
    isPopular: true,
  },
  {
    id: "pz_bbq_chicken",
    name: "BBQ Chicken Pizza",
    categoryId: "pizzas",
    isVeg: false,
    basePrice: 190, // was 180 + 10
    description: "Grilled BBQ chicken chunks, smoky barbecue drizzle, and melted cheese.",
    imageEmoji: "🍕",
  },
  {
    id: "pz_moms_special",
    name: "Mom's Kitchen Special Pizza",
    categoryId: "pizzas",
    isVeg: false,
    basePrice: 210, // was 200 + 10
    description: "The crown jewel! Loaded with double chicken, sausages, peppers, olives, and Chef's secret blend.",
    imageEmoji: "🍕",
    isPopular: true,
  },

  // 12. FRENCH FRIES
  {
    id: "ff_classic",
    name: "French Fries",
    categoryId: "fries",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Golden crispy salted potato fries served with ketchup and dip.",
    imageEmoji: "🍟",
  },
  {
    id: "ff_masala",
    name: "Masala French Fries",
    categoryId: "fries",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Crispy fries tossed with chatpata Indian spice mix.",
    imageEmoji: "🍟",
  },
  {
    id: "ff_peri_peri",
    name: "Peri-Peri French Fries",
    categoryId: "fries",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Fries shaken with fiery African peri-peri seasoning.",
    imageEmoji: "🍟",
    isPopular: true,
  },
  {
    id: "ff_cheesy",
    name: "Cheesy French Fries",
    categoryId: "fries",
    isVeg: true,
    basePrice: 150, // was 140 + 10
    description: "Hot crispy fries drenched in rich liquid cheddar cheese sauce.",
    imageEmoji: "🍟",
    isPopular: true,
  },
  {
    id: "ff_chicken_loaded",
    name: "Chicken Loaded Fries",
    categoryId: "fries",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "Loaded mountain of fries topped with spicy chicken popcorn, jalapenos, and melted cheese.",
    imageEmoji: "🍟",
    isPopular: true,
  },

  // 13. WRAPS
  {
    id: "wr_veg",
    name: "Veg Wrap",
    categoryId: "wraps",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Crispy spiced vegetable patty rolled in a soft tortilla with fresh greens and mayo.",
    imageEmoji: "🌯",
  },
  {
    id: "wr_paneer",
    name: "Paneer Wrap",
    categoryId: "wraps",
    isVeg: true,
    basePrice: 130, // was 120 + 10
    description: "Succulent paneer cubes tossed in tandoori spices and wrapped with onions and mint sauce.",
    imageEmoji: "🌯",
    isPopular: true,
  },
  {
    id: "wr_chicken",
    name: "Chicken Wrap",
    categoryId: "wraps",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Juicy grilled chicken slices wrapped in a warm tortilla with garlic mayo and veggies.",
    imageEmoji: "🌯",
    isPopular: true,
  },
  {
    id: "wr_chicken_schezwan",
    name: "Chicken Schezwan Wrap",
    categoryId: "wraps",
    isVeg: false,
    basePrice: 150, // was 140 + 10
    description: "Spicy Schezwan glazed fried chicken rolled with crunchy cabbage and chili garlic spread.",
    imageEmoji: "🌯",
    isPopular: true,
  },

  // 14. BREAD OMELETTE
  {
    id: "bo_classic",
    name: "Bread Omelette",
    categoryId: "bread_omelette",
    isVeg: false,
    basePrice: 70, // was 60 + 10
    description: "Double egg fluffy omelette folded neatly with toasted butter bread and green chillies.",
    imageEmoji: "🍳",
    isPopular: true,
  },
  {
    id: "bo_cheese",
    name: "Cheese Bread Omelette",
    categoryId: "bread_omelette",
    isVeg: false,
    basePrice: 90, // was 80 + 10
    description: "Fluffy omelette stuffed with gooey molten cheese inside toasted bread slices.",
    imageEmoji: "🍳",
    isPopular: true,
  },
  {
    id: "bo_chicken",
    name: "Chicken Bread Omelette",
    categoryId: "bread_omelette",
    isVeg: false,
    basePrice: 110, // was 100 + 10
    description: "Spiced chicken chunks folded into a savory egg omelette with crispy toasted bread.",
    imageEmoji: "🍳",
    isPopular: true,
  },

  // 15. SEA FOODS
  {
    id: "sf_crab_lollipop",
    name: "Crab Lollipop (4 pcs)",
    categoryId: "sea_foods",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Savory minced crab meat seasoned with coastal spices, breaded, and fried crisp.",
    imageEmoji: "🦀",
    isPopular: true,
  },
  {
    id: "sf_fish_fingers",
    name: "Fish Fingers (4 pcs)",
    categoryId: "sea_foods",
    isVeg: false,
    basePrice: 130, // was 120 + 10
    description: "Tender boneless fish fillets crumb-coated and fried to golden perfection with tartar dip.",
    imageEmoji: "🐟",
    isPopular: true,
  },
  {
    id: "sf_fried_prawn",
    name: "Fried Prawn (12 pcs)",
    categoryId: "sea_foods",
    isVeg: false,
    basePrice: 160, // was 150 + 10
    description: "12 crispy golden fried butterflied prawns seasoned with garlic pepper spices.",
    imageEmoji: "🦐",
    isPopular: true,
  },

  // 16. ICE CREAMS
  {
    id: "ic_vanilla",
    name: "Vanilla Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 70, // was 60 + 10
    description: "Smooth and creamy Madagascar vanilla bean ice cream.",
    imageEmoji: "🍨",
  },
  {
    id: "ic_strawberry",
    name: "Strawberry Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 80, // was 70 + 10
    description: "Refreshing sweet strawberry scoop made with real fruit puree.",
    imageEmoji: "🍓",
  },
  {
    id: "ic_chocolate",
    name: "Chocolate Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Rich dark Dutch cocoa chocolate ice cream.",
    imageEmoji: "🍫",
  },
  {
    id: "ic_butterscotch",
    name: "Butterscotch Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Caramelized crunch praline butterscotch scoop.",
    imageEmoji: "🍬",
  },
  {
    id: "ic_blackcurrant",
    name: "Blackcurrant Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 100, // was 90 + 10
    description: "Tangy and sweet wild blackcurrant berry scoop.",
    imageEmoji: "🍇",
  },
  {
    id: "ic_mango",
    name: "Mango Scoop",
    categoryId: "ice_creams",
    isVeg: true,
    basePrice: 100, // was 90 + 10
    description: "Luscious golden Alphonso mango delight.",
    imageEmoji: "🥭",
  },

  // 17. BEVERAGES
  {
    id: "bv_tea",
    name: "Tea",
    categoryId: "beverages",
    isVeg: true,
    basePrice: 25, // was 15 + 10
    description: "Hot homestyle masala milk tea brewed to perfection.",
    imageEmoji: "🫖",
  },
  {
    id: "bv_lemon_tea",
    name: "Lemon Tea",
    categoryId: "beverages",
    isVeg: true,
    basePrice: 25, // was 15 + 10
    description: "Zesty invigorating black tea infused with fresh lemon juice.",
    imageEmoji: "🍋",
  },
  {
    id: "bv_coffee",
    name: "Coffee",
    categoryId: "beverages",
    isVeg: true,
    basePrice: 30, // was 20 + 10
    description: "Authentic South Indian aromatic filter coffee.",
    imageEmoji: "☕",
    isPopular: true,
  },
  {
    id: "bv_horlicks",
    name: "Horlicks",
    categoryId: "beverages",
    isVeg: true,
    basePrice: 30, // was 20 + 10
    description: "Warm comforting malted milk drink.",
    imageEmoji: "🥛",
  },
  {
    id: "bv_lemon_juice",
    name: "Lemon Juice",
    categoryId: "beverages",
    isVeg: true,
    basePrice: 40, // was 30 + 10
    description: "Chilled fresh lemon soda or sweet water for quick refreshment.",
    imageEmoji: "🍹",
  },

  // 18. DESSERTS
  {
    id: "ds_strawberry_panna_cotta",
    name: "Strawberry Panna Cotta",
    categoryId: "desserts",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Silky Italian sweetened cream pudding topped with wild strawberry coulis.",
    imageEmoji: "🍮",
    isPopular: true,
  },
  {
    id: "ds_gulab_jamun_ice_cream",
    name: "Ice Cream with Gulab Jamun",
    categoryId: "desserts",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Warm, sweet saffron gulab jamuns paired with chilled vanilla ice cream.",
    imageEmoji: "🍨",
    isPopular: true,
  },
  {
    id: "ds_sizzling_brownie",
    name: "Sizzling Brownie with Ice Cream",
    categoryId: "desserts",
    isVeg: true,
    basePrice: 160, // was 150 + 10
    description: "Fudgy warm chocolate brownie served sizzling on a cast-iron skillet with vanilla scoop & molten chocolate sauce.",
    imageEmoji: "🍫",
    isPopular: true,
  },

  // 19. MILKSHAKES
  {
    id: "ms_vanilla",
    name: "Vanilla Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Classic thick milkshake blended with pure vanilla ice cream and full-cream milk.",
    imageEmoji: "🥤",
  },
  {
    id: "ms_strawberry",
    name: "Strawberry Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 100, // was 90 + 10
    description: "Creamy pink shake infused with rich strawberry puree.",
    imageEmoji: "🍓",
  },
  {
    id: "ms_butterscotch",
    name: "Butterscotch Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Rich butterscotch praline shake with crunchy butterscotch bits.",
    imageEmoji: "🥤",
  },
  {
    id: "ms_blackcurrant",
    name: "Blackcurrant Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 130, // was 120 + 10
    description: "Berry lovers' favorite thick blackcurrant shake.",
    imageEmoji: "🍇",
  },
  {
    id: "ms_mango",
    name: "Mango Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 130, // was 120 + 10
    description: "Tropical Alphonso mango pulp blended into a thick luscious shake.",
    imageEmoji: "🥭",
  },
  {
    id: "ms_chocolate",
    name: "Chocolate Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 130, // was 120 + 10
    description: "Decadent dark chocolate ganache milkshake for chocolate cravings.",
    imageEmoji: "🍫",
    isPopular: true,
  },
  {
    id: "ms_oreo",
    name: "Oreo Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 140, // was 130 + 10
    description: "Loaded with crushed Oreo cookies, chocolate syrup, and vanilla cream.",
    imageEmoji: "🍪",
    isPopular: true,
  },
  {
    id: "ms_kitkat",
    name: "Kitkat Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 150, // was 140 + 10
    description: "Crunchy Kitkat wafer bars blended with rich creamy chocolate ice cream.",
    imageEmoji: "🍫",
    isPopular: true,
  },
  {
    id: "ms_brownie",
    name: "Brownie Milkshake",
    categoryId: "milkshakes",
    isVeg: true,
    basePrice: 160, // was 150 + 10
    description: "Heavy decadent monster shake packed with chunks of baked chocolate brownie.",
    imageEmoji: "🧋",
    isPopular: true,
  },

  // 20. MOJITOS
  {
    id: "mj_deep_blue_sea",
    name: "Deep Blue Sea Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 90, // was 80 + 10
    description: "Stunning ocean blue curacao mocktail with lemon wedges, mint, and soda.",
    imageEmoji: "🌊",
    isPopular: true,
  },
  {
    id: "mj_green_mint",
    name: "Green Mint Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 100, // was 90 + 10
    description: "The classic invigorating muddled garden mint, lime, sugar, and sparkling soda.",
    imageEmoji: "🍃",
    isPopular: true,
  },
  {
    id: "mj_strawberry",
    name: "Strawberry Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Sweet strawberry crushed with fresh mint leaves and fizzy lime soda.",
    imageEmoji: "🍓",
  },
  {
    id: "mj_green_apple",
    name: "Green Apple Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Crisp tart green apple syrup muddled with cooling mint sprigs.",
    imageEmoji: "🍏",
    isPopular: true,
  },
  {
    id: "mj_bubblegum",
    name: "Bubblegum Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Fun, nostalgic sweet bubblegum flavor fizzed with lemon and mint.",
    imageEmoji: "🫧",
  },
  {
    id: "mj_watermelon",
    name: "Watermelon Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Juicy summer watermelon blend with zesty lime and crushed ice.",
    imageEmoji: "🍉",
  },
  {
    id: "mj_pineapple",
    name: "Pineapple Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Tropical crushed pineapple mocktail with crisp bubbles and mint.",
    imageEmoji: "🍍",
  },
  {
    id: "mj_orange",
    name: "Orange Mojito",
    categoryId: "mojitos",
    isVeg: true,
    basePrice: 110, // was 100 + 10
    description: "Citrusy burst of sweet valencia orange with cooling garden mint.",
    imageEmoji: "🍊",
  },
];