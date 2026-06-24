import type {ImageSourcePropType} from 'react-native';

import {menuImages} from './assets';

export type MenuCategory =
  | 'Opening Specials'
  | 'Small Plates'
  | 'Main Dishes'
  | 'Sweet'
  | 'Drinks'
  | 'Extras';

export type MenuItem = {
  id: string;
  title: string;
  category: MenuCategory;
  price: number;
  featured?: boolean;
  description: string;
  ingredients: string;
  pairing: string;
  allergenNote: string;
  image: ImageSourcePropType;
};

export const MENU_CATEGORY_STYLES: Record<
  MenuCategory,
  {background: string; color: string}
> = {
  'Opening Specials': {background: '#281a3a', color: '#a060e0'},
  'Small Plates': {background: '#142418', color: '#60c070'},
  'Main Dishes': {background: '#281e0c', color: '#d0a040'},
  Sweet: {background: '#2a1018', color: '#e08090'},
  Drinks: {background: '#101828', color: '#60a0e0'},
  Extras: {background: '#1a1428', color: '#9090c0'},
};

export const OPENING_MENU: MenuItem[] = [
  {
    id: 'win-spirit-welcome-plate',
    title: 'Win Spirit Welcome Plate',
    category: 'Opening Specials',
    price: 22,
    featured: true,
    description:
      'A refined opening-night plate with seasonal bites, warm garnish, delicate sauce details, and elegant presentation for a premium first dining impression.',
    ingredients: 'Seasonal bites, warm garnish, house sauce, delicate details',
    pairing: 'Pairs well with signature mocktail or sparkling water.',
    allergenNote: 'Ask staff for full allergen information.',
    image: menuImages.winSpiritWelcomePlate,
  },
  {
    id: 'golden-lounge-sliders',
    title: 'Golden Lounge Sliders',
    category: 'Small Plates',
    price: 16,
    description:
      'Mini premium sliders served with soft house sauce, crisp side garnish, toasted buns, and a comfortable lounge-style serving mood.',
    ingredients: 'Mini buns, house sauce, garnish, toasted finish',
    pairing: 'Pairs well with sparkling apple cooler or violet citrus fizz.',
    allergenNote: 'Contains gluten, eggs. May contain dairy.',
    image: menuImages.goldenLoungeSliders,
  },
  {
    id: 'citrus-herb-chicken',
    title: 'Citrus Herb Chicken',
    category: 'Main Dishes',
    price: 24,
    description:
      'Tender chicken with citrus herbs, roasted vegetables, light evening sauce, and a balanced warm finish for a calm opening dinner.',
    ingredients: 'Chicken, citrus, fresh herbs, roasted vegetables, evening sauce',
    pairing: 'Pairs well with sparkling water or apple cooler.',
    allergenNote: 'May contain dairy and mustard.',
    image: menuImages.citrusHerbChicken,
  },
  {
    id: 'truffle-mushroom-risotto',
    title: 'Truffle Mushroom Risotto',
    category: 'Main Dishes',
    price: 21,
    description:
      'Creamy mushroom risotto with parmesan, fresh herbs, gentle truffle aroma, and a smooth refined texture for a relaxed dining moment.',
    ingredients: 'Arborio rice, mushrooms, parmesan, truffle, fresh herbs',
    pairing: 'Pairs well with sparkling water or violet citrus fizz.',
    allergenNote: 'Contains dairy and gluten. May contain celery.',
    image: menuImages.truffleMushRisotto,
  },
  {
    id: 'purple-garden-burrata',
    title: 'Purple Garden Burrata',
    category: 'Small Plates',
    price: 17,
    description:
      'Creamy burrata served with roasted purple carrots, basil oil, toasted seeds, and a light citrus finish for an elegant starter.',
    ingredients: 'Burrata, purple carrots, basil oil, toasted seeds, citrus',
    pairing: 'Pairs well with sparkling apple cooler or plain sparkling water.',
    allergenNote: 'Contains dairy and sesame.',
    image: menuImages.purpleGardenBurrata,
  },
  {
    id: 'charcoal-herb-flatbread',
    title: 'Charcoal Herb Flatbread',
    category: 'Small Plates',
    price: 15,
    description:
      'Crisp flatbread with whipped cheese, roasted peppers, herb oil, soft greens, and a warm savory finish for sharing.',
    ingredients: 'Flatbread, whipped cheese, roasted peppers, herb oil, greens',
    pairing: 'Pairs well with any drink from the Drinks section.',
    allergenNote: 'Contains gluten and dairy.',
    image: menuImages.charcoalHerbFlatbread,
  },
  {
    id: 'seared-salmon-glow-bowl',
    title: 'Seared Salmon Glow Bowl',
    category: 'Main Dishes',
    price: 27,
    featured: true,
    description:
      'Seared salmon served over jasmine rice with citrus greens, cucumber ribbons, sesame crunch, and a smooth lemon dressing.',
    ingredients: 'Salmon, jasmine rice, citrus greens, cucumber, sesame, lemon dressing',
    pairing: 'Pairs well with violet citrus fizz or sparkling water.',
    allergenNote: 'Contains fish and sesame. May contain dairy.',
    image: menuImages.searedSalmonGlowBowl,
  },
  {
    id: 'amber-beef-tender-plate',
    title: 'Amber Beef Tender Plate',
    category: 'Main Dishes',
    price: 31,
    featured: true,
    description:
      'Tender beef slices with roasted potatoes, glazed vegetables, warm pepper sauce, and a refined evening presentation.',
    ingredients: 'Beef, roasted potatoes, glazed vegetables, pepper sauce',
    pairing: 'Pairs well with warm maple butter cake for a complete evening meal.',
    allergenNote: 'Contains dairy and mustard.',
    image: menuImages.amberBeefTenderPlate,
  },
  {
    id: 'saffron-cream-pasta',
    title: 'Saffron Cream Pasta',
    category: 'Main Dishes',
    price: 23,
    description:
      'Fresh pasta with saffron cream, parmesan, roasted cherry tomatoes, soft herbs, and a smooth golden finish.',
    ingredients: 'Fresh pasta, saffron cream, parmesan, cherry tomatoes, herbs',
    pairing: 'Pairs well with sparkling apple cooler.',
    allergenNote: 'Contains gluten, dairy, and eggs.',
    image: menuImages.saffronCreamPasta,
  },
  {
    id: 'crispy-cod-mini-tacos',
    title: 'Crispy Cod Mini Tacos',
    category: 'Small Plates',
    price: 18,
    description:
      'Mini tacos filled with crispy cod, citrus slaw, lime cream, fresh herbs, and a clean coastal flavor.',
    ingredients: 'Cod, taco shells, citrus slaw, lime cream, fresh herbs',
    pairing: 'Pairs well with violet citrus fizz or sparkling water.',
    allergenNote: 'Contains fish and gluten. May contain dairy.',
    image: menuImages.crispyCodMiniTacos,
  },
  {
    id: 'rosemary-lamb-skewer-plate',
    title: 'Rosemary Lamb Skewer Plate',
    category: 'Main Dishes',
    price: 25,
    description:
      'Tender lamb skewers with rosemary glaze, roasted vegetables, garlic yogurt, and warm flatbread for a rich dining moment.',
    ingredients: 'Lamb, rosemary, roasted vegetables, garlic yogurt, flatbread',
    pairing: 'Pairs well with sparkling water or apple cooler.',
    allergenNote: 'Contains dairy and gluten. May contain mustard.',
    image: menuImages.rosemaryLambSkewer,
  },
  {
    id: 'roasted-pear-brie-toast',
    title: 'Roasted Pear & Brie Toast',
    category: 'Small Plates',
    price: 14,
    description:
      'Crisp artisan toast with warm brie, roasted pear, honey drizzle, toasted walnuts, and a soft herb finish.',
    ingredients: 'Artisan bread, brie, roasted pear, honey, walnuts, herbs',
    pairing: 'Pairs well with sparkling apple cooler.',
    allergenNote: 'Contains dairy, gluten, and nuts.',
    image: menuImages.roastedPearBrieToast,
  },
  {
    id: 'midnight-berry-tart',
    title: 'Midnight Berry Tart',
    category: 'Sweet',
    price: 12,
    description:
      'A delicate berry tart with soft cream, dark chocolate detail, fresh fruit notes, and elegant opening-night styling.',
    ingredients: 'Tart shell, mixed berries, cream, dark chocolate',
    pairing: 'Pairs well with espresso or sparkling water.',
    allergenNote: 'Contains gluten, dairy, and eggs.',
    image: menuImages.midnightBerryTart,
  },
  {
    id: 'velvet-night-chocolate-mousse',
    title: 'Velvet Night Chocolate Mousse',
    category: 'Sweet',
    price: 13,
    description:
      'Smooth dark chocolate mousse with cherry compote, cocoa crumble, soft cream detail, and a refined sweet finish.',
    ingredients: 'Dark chocolate, cream, cherry compote, cocoa crumble',
    pairing: 'Pairs well with classic espresso set.',
    allergenNote: 'Contains dairy, eggs, and gluten.',
    image: menuImages.velvetNightMousse,
  },
  {
    id: 'lavender-cream-cheesecake',
    title: 'Lavender Cream Cheesecake',
    category: 'Sweet',
    price: 12,
    description:
      'A delicate cheesecake with lavender cream, berry glaze, crisp biscuit base, and a calm floral note.',
    ingredients: 'Cream cheese, lavender, berry glaze, biscuit base',
    pairing: 'Pairs well with sparkling apple cooler or espresso.',
    allergenNote: 'Contains dairy, eggs, and gluten.',
    image: menuImages.lavenderCreamCheesecake,
  },
  {
    id: 'warm-maple-butter-cake',
    title: 'Warm Maple Butter Cake',
    category: 'Sweet',
    price: 14,
    description:
      'Soft butter cake served warm with maple cream, toasted pecans, and a smooth vanilla touch.',
    ingredients: 'Butter cake, maple cream, toasted pecans, vanilla',
    pairing: 'Pairs well with classic espresso set.',
    allergenNote: 'Contains dairy, gluten, eggs, and nuts.',
    image: menuImages.warmMapleButter,
  },
  {
    id: 'spirit-signature-mocktail',
    title: 'Spirit Signature Mocktail',
    category: 'Drinks',
    price: 9,
    description:
      'A bright non-alcoholic drink with citrus, berry notes, sparkling finish, and a fresh garnish for a stylish evening pause.',
    ingredients: 'Citrus, berry syrup, sparkling water, fresh garnish',
    pairing: 'Pairs well with small plates and light starters.',
    allergenNote: 'No major allergens declared.',
    image: menuImages.spiritSigMocktail,
  },
  {
    id: 'classic-espresso-set',
    title: 'Classic Espresso Set',
    category: 'Drinks',
    price: 8,
    description:
      'Fresh espresso served with a small sweet bite, smooth aroma, and a simple premium presentation for a calm break during the visit.',
    ingredients: 'Espresso, small sweet bite',
    pairing: 'Pairs well with any dessert item.',
    allergenNote: 'May contain dairy and gluten.',
    image: menuImages.classicEspressoSet,
  },
  {
    id: 'sparkling-apple-cooler',
    title: 'Sparkling Apple Cooler',
    category: 'Drinks',
    price: 8,
    description:
      'A crisp non-alcoholic apple drink with sparkling finish, fresh garnish, soft fruit notes, and a clean refreshing taste.',
    ingredients: 'Apple juice, sparkling water, fresh garnish',
    pairing: 'Pairs well with light plates and sharing items.',
    allergenNote: 'No major allergens declared.',
    image: menuImages.sparklingAppleCooler,
  },
  {
    id: 'violet-citrus-fizz',
    title: 'Violet Citrus Fizz',
    category: 'Drinks',
    price: 10,
    description:
      'A bright citrus mocktail with violet syrup, sparkling water, fresh lime, and a stylish opening-night color accent.',
    ingredients: 'Violet syrup, citrus, sparkling water, fresh lime',
    pairing: 'Pairs well with salmon, burrata, or light small plates.',
    allergenNote: 'No major allergens declared.',
    image: menuImages.violetCitrusFizz,
  },
  {
    id: 'extra-bread-butter',
    title: 'Extra Bread & Butter',
    category: 'Extras',
    price: 6,
    description:
      'Warm bread served with soft herb butter, light seasonal spread, and a clean side presentation for sharing at the table.',
    ingredients: 'Artisan bread, herb butter, seasonal spread',
    pairing: 'Great with any main course.',
    allergenNote: 'Contains gluten and dairy.',
    image: menuImages.extraBreadButter,
  },
  {
    id: 'roasted-garlic-potato-bites',
    title: 'Roasted Garlic Potato Bites',
    category: 'Extras',
    price: 7,
    description:
      'Golden potato bites with roasted garlic, herb salt, soft dipping sauce, and a simple warm side presentation.',
    ingredients: 'Potatoes, roasted garlic, herb salt, dipping sauce',
    pairing: 'Pairs well with any main dish.',
    allergenNote: 'May contain dairy and mustard.',
    image: menuImages.roastedGarlicPotato,
  },
];

export function getMenuItemById(itemId: string): MenuItem | undefined {
  return OPENING_MENU.find(item => item.id === itemId);
}

export function formatPrice(amount: number): string {
  return `$${amount}`;
}

export function formatEuro(amount: number): string {
  return formatPrice(amount);
}
