import { MenuItem, WineSection, Testimonial, InstagramPost } from './types';

export const FOOD_MENU: MenuItem[] = [
  // --- APPETIZERS ---
  {
    id: 'app-polpette',
    name: 'Polpette',
    description: 'Homemade Angus beef meatballs, slow-cooked in rich San Marzano tomato sauce, topped with shaved Parmigiano-Reggiano & fresh basil.',
    price: '$16',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature']
  },
  {
    id: 'app-burrata',
    name: 'Burrata Pugliese',
    description: 'Fresh organic burrata served on wild arugula salad, heirloom cherry tomatoes, cold-pressed olive oil, oregano, and aged balsamic glaze.',
    price: '$19',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian', 'Popular']
  },
  {
    id: 'app-parmigiana',
    name: 'Parmigiana di Melanzane',
    description: 'Layered fried organic eggplant, rich tomato sauce, melted fior di latte mozzarella, dusted with aged Parmigiano and aromatic basil.',
    price: '$18',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian']
  },
  {
    id: 'app-frittura',
    name: 'Frittura Gamberi & Calamari',
    description: 'Lightly dusted crispy squid and shrimp fried alongside zucchini slices, served with roasted black pepper spicy aioli & fresh charred lemon.',
    price: '$24',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'app-polpo',
    name: 'Polpo alla Griglia',
    description: 'Charred Mediterranean octopus set over silk leeks and potato cream, dusted with cured black olive powder and crunchy sweet potato threads.',
    price: '$26',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1534080391025-09795d197360?auto=format&fit=crop&q=80&w=600',
    tags: ['Chef Special']
  },
  {
    id: 'app-mussels',
    name: 'Sauteed Mussels',
    description: 'Local PEI mussels simmered in a light, aromatic white wine broth steeped with golden garlic, lemon rind, and crushed black pepper.',
    price: '$22',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'app-carpaccio',
    name: 'Carpaccio di Manzo',
    description: 'Wafer-thin prime filet mignon raw ribbons, capped with wild arugula, caperberries, white truffle oil essence, and shaved 24-month Parmigiano.',
    price: '$25',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    tags: ['Luxurious']
  },
  {
    id: 'app-jamon',
    name: 'Jamon Iberico',
    description: '100% Acorn-fed Jamón Ibérico imported from Jabugo, Spain, hand-carved, served with warm pan con tomate.',
    price: '$35',
    category: 'appetizers',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600'
  },

  // --- CHEF'S RECOMMENDATIONS ---
  {
    id: 'chef-cacio',
    name: 'Cacio e Pepe w/ Shaved Truffle',
    description: 'Handcrafted tonnarelli pasta tossed in a velvety cream of Pecorino Romano, toasted black pepper corns, crowned with fresh black winter truffle shavings.',
    price: '$29',
    category: 'recommendations',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
    tags: ['Michelin Favorite', 'Truffle'],
    isPopular: true
  },
  {
    id: 'chef-scoglio',
    name: 'Linguine allo Scoglio',
    description: 'Linguine tossed with colossal tiger prawns, local mussels, calamari, and clams in a Pinot Grigio-infused light cherry tomato reduction.',
    price: '$34',
    category: 'recommendations',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
    tags: ['Ocean Catch']
  },
  {
    id: 'chef-prawns',
    name: 'Fettuccine Pink Sauce & Tiger Prawns',
    description: 'Homemade saffron-tinted fettuccine ribboned with flame-seared giant tiger prawns in a luxurious tomato vodka cream sauce.',
    price: '$32',
    category: 'recommendations',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1621996346565-e3bb69182a59?auto=format&fit=crop&q=80&w=600',
    tags: ['Signora Special']
  },

  // --- PASTA ---
  {
    id: 'pasta-alfredo',
    name: 'Fettuccine Alfredo',
    description: 'Rich and creamy Parmesan-butter emulsified cream coated over egg fettuccine, topped with parsnip crisp strips.',
    price: '$22',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-carbonara',
    name: 'Rigatoni alla Carbonara',
    description: 'An authentic Roman masterpiece: crispy guanciale, creamy whipped organic egg yolks, cracked Tellicherry pepper, and grated Pecorino Romano.',
    price: '$24',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'pasta-bolognese',
    name: 'Pappardelle alla Bolognese',
    description: 'Wide egg ribbons cooked al dente, dressed in a 12-hour slow-simmered beef, veal, and heritage pork ragù, touched with whole milk.',
    price: '$26',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-cacio',
    name: 'Bucatini Cacio e Pepe',
    description: 'Bucatini pasta tossed in authentic Roman style with aged Pecorino Romano cheese and freshly cracked black peppercorns.',
    price: '$23',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-tartufo',
    name: 'Pappardelle Funghi e Tartufo',
    description: 'Earthy wild porcini and chanterelle mushrooms sautéed with fresh garlic-thyme, glazed with rich white truffle paste and Pecorino cream.',
    price: '$28',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian']
  },
  {
    id: 'pasta-vongole',
    name: 'Spaghettoni alle Vongole',
    description: 'Thick-cut spaghetti pan-tossed with fresh Manila clams, toasted garlic flakes, dried Calabrian chili, splash of extra virgin olive oil and parsley.',
    price: '$29',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-lobster-rav',
    name: 'Maine Lobster Ravioli',
    description: 'Pillowy ravioli stuffed with sweet Maine lobster meat, dressed in a luscious lobster bisque reduction sauce, finished with micro chives.',
    price: '$33',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    tags: ['Artisanal']
  },
  {
    id: 'pasta-mare',
    name: 'Linguine ai Frutti di Mare',
    description: 'Symphony of black mussels, middleneck clams, key shrimp, and local calamari simmered together in an organic tomato herb broth.',
    price: '$35',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pasta-lobster',
    name: 'Linguine Lobster',
    description: 'Half fresh Maine lobster tail placed over ribboned linguine, deglazed in premium Cognac with sweet cherry tomatoes & sweet basil.',
    price: '$38',
    category: 'pasta',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    tags: ['High End']
  },

  // --- MAIN ---
  {
    id: 'main-milanese',
    name: 'Cotoletta alla Milanese',
    description: 'Crispy bone-in milk-fed veal chop pounded thin, shallow-fried in clarified butter, lightly dusted with sea salt, arugula salad side.',
    price: '$32',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'main-parm',
    name: 'Chicken Parmigiana',
    description: 'Lightly breaded organic chicken breast topped with fresh marinara sauce, melted buffalo mozzarella cheese, served with a side of spaghetti pomodoro.',
    price: '$28',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca3e8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'main-branzino',
    name: 'Branzino alla Griglia',
    description: 'Whole deboned Mediterranean sea bass grilled on open oak fire, infused with Sicilian olive oil, rosemary, lemon herbs & grilled asparagus.',
    price: '$36',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
    tags: ['Fresh Catch'],
    isPopular: true
  },
  {
    id: 'main-tagliata',
    name: 'Tagliata di Manzo',
    description: '14oz Prime dry-aged NY strip sliced over wild baby arugula bed, drizzled with 18-year barrel-aged Modena balsamic & olive oil.',
    price: '$42',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    tags: ['Prime Cut']
  },
  {
    id: 'main-catch',
    name: 'Catch of the Day',
    description: 'Ask your pristine server for our daily selection of local Miami Beach ocean treasures, baked in parchment or salt-crust.',
    price: '$39',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'main-prawns',
    name: 'Grilled Colossal Prawns',
    description: 'Wood-fired colossal prawns marinated in lemon, garlic, extra virgin olive oil, served over fresh warm quinoa of herbs and lemon slices.',
    price: '$34',
    category: 'main',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600'
  },

  // --- SALADS ---
  {
    id: 'salad-caesar',
    name: 'Limoncello Caesar Salad',
    description: 'Crisp organic romaine leaf towers, herbed garlic crostini, light homemade lemon-anchovy emulsion dressing, completed with 30-month Parmigiano snowflakes.',
    price: '$16',
    category: 'salads',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'salad-arugula',
    name: 'Arugula Salad',
    description: 'Peppery baby arugula, sweet sliced organic pears, caramelized walnuts, goat cheese drops, tossed in mild lemon citrus citronette.',
    price: '$15',
    category: 'salads',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian']
  },

  // --- PIZZA ---
  {
    id: 'pizza-marg',
    name: 'Pizza Margherita',
    description: 'Neapolitan style: San Marzano tomato core, imported buffalo mozzarella, fresh basil, and a generous pool of olive oil on puffy wood-blistered crust.',
    price: '$18',
    category: 'pizza',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    tags: ['Classic']
  },
  {
    id: 'pizza-pep',
    name: 'Pizza Pepperoni',
    description: 'Blistered dough layered with house cured spicy pepperoni chips, hot honey drizzle, fior di latte, and sweet San Marzano tomatoes.',
    price: '$20',
    category: 'pizza',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pizza-prosc',
    name: 'Pizza Prosciutto di Parma',
    description: 'White wood-fired dough topped with creamy mozzarella, baked, and topped with cold prosciutto di parma, shaved parmesan and peppery arugula.',
    price: '$22',
    category: 'pizza',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'pizza-tartufo',
    name: 'Pizza Burrata & Tartufo',
    description: 'Rich white cheese base of fior di latte, white truffle paste, finished after bake with a whole fresh creamy burrata head and olive oil.',
    price: '$26',
    category: 'pizza',
    menuType: 'food',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
    tags: ['Luxurious', 'Truffle']
  },

  // --- SIDES ---
  {
    id: 'side-mash',
    name: 'Mashed Potatoes',
    description: 'Decadent Yukon gold potato cream whipped with European butter and sweet cream.',
    price: '$10',
    category: 'sides',
    menuType: 'food'
  },
  {
    id: 'side-veg',
    name: 'Grilled Seasonal Vegetables',
    description: 'Fire charred local squashes, asparagus, sweet bell peppers, seasoned with sea salt and garlic oil.',
    price: '$11',
    category: 'sides',
    menuType: 'food'
  },
  {
    id: 'side-fries',
    name: 'Truffle Fries',
    description: 'Golden crispy shoestring potatoes tossed with hand-grated Parmigiano, chopped parsley & black truffle sea salt, white truffle oil.',
    price: '$12',
    category: 'sides',
    menuType: 'food',
    isPopular: true
  },
  {
    id: 'side-asparag',
    name: 'Grilled Asparagus',
    description: 'Pencil-thin asparagus spears oak-charred and squeezed with fresh lemon juices.',
    price: '$11',
    category: 'sides',
    menuType: 'food'
  },
  {
    id: 'side-mushroom',
    name: 'Wild Mushrooms',
    description: 'Chanterelle and crimini mushrooms sautéed with vintage Marsala wine, crushed garlic cloves, herbs.',
    price: '$12',
    category: 'sides',
    menuType: 'food'
  }
];

export const BEVERAGES_MENU: MenuItem[] = [
  // --- BEVERAGES ---
  {
    id: 'bev-pellegrino',
    name: 'San Pellegrino Sparkling',
    description: 'Sparkling natural mineral water from Bergamo, Italy. Classic glass bottle.',
    price: '$8',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-panna',
    name: 'Acqua Panna Still',
    description: 'Premium natural spring water bottled from pristine Tuscany springs.',
    price: '$8',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-cola',
    name: 'Coca Cola',
    description: 'Classic cold Mexican Coke bottle sweetened with pure cane sugar.',
    price: '$5',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-diet-cola',
    name: 'Diet Coke',
    description: 'Crisp sugar-free refreshment served chilled.',
    price: '$5',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-sprite',
    name: 'Sprite',
    description: 'Refreshing lemon-lime carbonated soda.',
    price: '$5',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-peach-tea',
    name: 'San Benedetto Peach Tea',
    description: 'Exclusive Italian premium iced tea infused with natural sweet peach juice.',
    price: '$7',
    category: 'beverages',
    menuType: 'beverage',
    isPopular: true
  },
  {
    id: 'bev-lemon-tea',
    name: 'San Benedetto Lemon Tea',
    description: 'Famed artisan Italian iced black tea steeped with pure Sicilian lemon juices.',
    price: '$7',
    category: 'beverages',
    menuType: 'beverage'
  },
  {
    id: 'bev-limonata',
    name: 'Organic San Pellegrino Limonata',
    description: 'Cult-classic fizzy lemonade containing 16% real juice from sun-ripened Italian lemons.',
    price: '$7',
    category: 'beverages',
    menuType: 'beverage'
  },

  // --- COCKTAILS ---
  {
    id: 'cock-old',
    name: 'Old Fashioned Classico',
    description: 'Premium Kentucky straight Bourbon, brown sugar Demerara, angostura bitters, expressed orange peel.',
    price: '$18',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-negroni',
    name: 'Negroni Fiorentino',
    description: 'Sabatini Gin, Campari, and Carpano Antica Formulo sweet vermouth, stirred with ice and garnished with a scorched blood orange wrap.',
    price: '$17',
    category: 'cocktails',
    menuType: 'beverage',
    isPopular: true
  },
  {
    id: 'cock-aperol',
    name: 'Aperol Spritz',
    description: 'Aperol liqueur, crisp Prosecco DOCG superio, splash of sparkling club soda, orange round over block ice.',
    price: '$16',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-strawberry',
    name: 'Strawberry Love',
    description: 'Belvedere vodka, fresh muddled organic strawberries, fresh lemon verbena extracts, prosecco float.',
    price: '$18',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-drop',
    name: 'Limoncello Drop Martini',
    description: 'Citron Vodka, private chef-made Limoncello liqueur, fresh-squeezed organic lemon pulp, organic simple syrup, served with a delicate crystalline sugar rim.',
    price: '$17',
    category: 'cocktails',
    menuType: 'beverage',
    tags: ['Signature', 'Lemon Featured']
  },
  {
    id: 'cock-mojito',
    name: 'Limoncello Mojito',
    description: 'White Rum, hand-made house Limoncello syrup, squashed spearmint leaves, fresh lime wheels, finished with soda splash.',
    price: '$16',
    category: 'cocktails',
    menuType: 'beverage',
    tags: ['Lemon Featured']
  },
  {
    id: 'cock-margarita',
    name: 'Luxury Gold Margarita',
    description: 'Don Julio Reposado Tequila, Grand Marnier 100, cold-press lime extract, agave nectar, finished with kosher flake salt band.',
    price: '$19',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-spritz-limon',
    name: 'Limoncello Spritz Royal',
    description: 'Sweet homemade Amalfi Limoncello, Prosecco di Valdobbiadene, club soda splash, slapped sweet basil, wild lemon wheel.',
    price: '$16',
    category: 'cocktails',
    menuType: 'beverage',
    tags: ['Must Try', 'Lemon Featured'],
    isPopular: true
  },
  {
    id: 'cock-sofia',
    name: 'Sofia',
    description: 'Luxury botanical gin, elderflower liqueur, fresh white cucumber juice, cold lime juice, tonic wash.',
    price: '$18',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-sleep',
    name: 'Sleep Of Maybe Not',
    description: 'Whiskey, Montenegro Amaro, sweet roasted almond orgeat syrup, cold brew espresso foam.',
    price: '$18',
    category: 'cocktails',
    menuType: 'beverage'
  },
  {
    id: 'cock-passione',
    name: 'Passione',
    description: 'Mezcal, fresh golden passionfruit flesh, spiced honey water, sweet hot habanero dry salt dusting.',
    price: '$17',
    category: 'cocktails',
    menuType: 'beverage'
  }
];

export const HAPPY_HOUR_MENU: MenuItem[] = [
  {
    id: 'hh-negroni',
    name: 'Happy Hour Negroni',
    description: 'Perfect classic Florentine negroni served at dynamic sunset hours.',
    price: '$12',
    category: 'cocktails',
    menuType: 'happyhour'
  },
  {
    id: 'hh-aperol',
    name: 'Sunset Aperol Spritz',
    description: 'Lively bubbly Aperol prosecco blend at sunset values.',
    price: '$11',
    category: 'cocktails',
    menuType: 'happyhour'
  },
  {
    id: 'hh-spritz',
    name: 'Happy Hour Limoncello Spritz',
    description: 'Refreshing organic Amalfi lemon liqueur and gold prosecco.',
    price: '$11',
    category: 'cocktails',
    menuType: 'happyhour',
    tags: ['Best Seller']
  },
  {
    id: 'hh-polpette',
    name: 'Polpette (2 pcs)',
    description: 'Casserole of hand-rolled Angus beef meatballs, tomato marinara, hot focaccia triangle toast.',
    price: '$10',
    category: 'appetizers',
    menuType: 'happyhour'
  },
  {
    id: 'hh-mozzarella',
    name: 'Crispy Mozzarella Sticks',
    description: 'Hand breaded deep fried organic cow milk mozzarella tubes, marinara sauce dipping.',
    price: '$9',
    category: 'appetizers',
    menuType: 'happyhour'
  },
  {
    id: 'hh-fries',
    name: 'Happy Hour Truffle Fries',
    description: 'Crisp shoestring skin-on fries, truffle snow parmesan, herb dust.',
    price: '$8',
    category: 'sides',
    menuType: 'happyhour'
  }
];

export const WINE_SHOWCASE_DATA: WineSection[] = [
  {
    title: 'Sparkling / Bollicine',
    subtitle: 'Luminous bubbles, perfect for ocean oceanfront toasts',
    items: [
      {
        name: 'Dom Pérignon Brut Champagne',
        description: 'Elite vintage Champagne from Reims. Creamy, mineral-tinged excellence with almonds and dried citrus aromas.',
        priceGlass: '$85',
        priceBottle: '$420',
        vintage: '2013',
        region: 'Champagne, France'
      },
      {
        name: 'Prosecco Superiore DOCG Valdobbiadene',
        description: 'Delicate aroma of white peach, honey, and orange blossoms. Brut, bubbly and extremely refreshing.',
        priceGlass: '$15',
        priceBottle: '$65',
        vintage: 'NV',
        region: 'Veneto, Italy'
      }
    ]
  },
  {
    title: 'Rosé Collection',
    subtitle: 'Sun-kissed salmon hues representing luxury sunset vistas',
    items: [
      {
        name: 'Whispering Angel Rosé',
        description: 'Château d\'Esclans classic Provence pale rosé. Crisp red berry, mineral and bone-dry citrus.',
        priceGlass: '$16',
        priceBottle: '$70',
        vintage: '2024',
        region: 'Côtes de Provence, France'
      }
    ]
  },
  {
    title: 'Sweet & Dessert Wine',
    subtitle: 'Luscious, floral nectar selections',
    items: [
      {
        name: 'Moscato d\'Asti DOCG Ceretto',
        description: 'Gently sparkling, sweet white nectar with notes of stone fruits, gold honey and sage.',
        priceGlass: '$14',
        priceBottle: '$58',
        vintage: '2023',
        region: 'Piedmont, Italy'
      }
    ]
  },
  {
    title: 'Vibrant & Complex Whites',
    subtitle: 'Clean estate minerality showing authentic Italian soil traits',
    items: [
      {
        name: 'Pinot Grigio Jermann',
        description: 'Rich, velvet Pinot Grigio boasting heavy golden flower extract notes and dried apricots.',
        priceGlass: '$16',
        priceBottle: '$70',
        vintage: '2023',
        region: 'Friuli-Venezia Giulia, Italy'
      },
      {
        name: 'Cervaro della Sala Chardonnay',
        description: 'Antinori family masterpiece. Barrel-fermented chardonnay with touch of grechetto, butterscotch and white chocolate.',
        priceGlass: '$28',
        priceBottle: '$130',
        vintage: '2022',
        region: 'Umbria, Italy'
      },
      {
        name: 'Gavi di Gavi Black Label La Scolca',
        description: 'Legendary royal white. High acid, flinty, wet slate, roasted almond background, absolute seafood pairing.',
        priceBottle: '$120',
        vintage: '2022',
        region: 'Piedmont, Italy'
      }
    ]
  },
  {
    title: 'Bold & Noble Reds',
    subtitle: 'Full-bodied ruby masterpieces aged in Slavonian white oak',
    items: [
      {
        name: 'Chianti Classico Riserva Ruffino Ducale Oro',
        description: 'Deep ruby red. Violet bouquet, cherry stone, sweet plums, cedar chest aromas and velvety tannins.',
        priceGlass: '$19',
        priceBottle: '$85',
        vintage: '2020',
        region: 'Tuscany, Italy'
      },
      {
        name: 'Tignanello Toscana IGT Antinori',
        description: 'A revolutionary Super Tuscan. Sangiovese-Cabernet blend. Complex black currant, tobacco smoke, cacao powder.',
        priceGlass: '$45',
        priceBottle: '$240',
        vintage: '2020',
        region: 'Tuscany, Italy'
      },
      {
        name: 'Amarone della Valpolicella Classico Masi Costasera',
        description: 'Dried grape must raisins extraction. Deep crimson, dark cherry liqueur, rich clove spice, chocolate finish.',
        priceBottle: '$150',
        vintage: '2018',
        region: 'Veneto, Italy'
      },
      {
        name: 'Brunello di Montalcino Biondi-Santi DOCG',
        description: 'The royal crown of Tuscany. Incredible structure, earthy leather, sun-dried rose leaves, cherry pit, centuries-classic design.',
        priceBottle: '$350',
        vintage: '2016',
        region: 'Tuscany, Italy'
      }
    ]
  },
  {
    title: 'Wines by the Glass / Selezione',
    subtitle: 'Premium house drafts curated weekly by our sommelier',
    items: [
      {
        name: 'Sommelier Prosecco DOC',
        description: 'Crisp green apples, delicate clean bubble string.',
        priceGlass: '$12',
        priceBottle: '$50',
        vintage: 'NV',
        region: 'Veneto, Italy'
      },
      {
        name: 'Estate Pinot Grigio',
        description: 'Light lime peel, wet white sand, elegant acidity.',
        priceGlass: '$13',
        priceBottle: '$54',
        vintage: '2023',
        region: 'Trentino, Italy'
      },
      {
        name: 'Tuscan Chianti DOCG',
        description: 'Earthy cherries, rosemary sprig scent, clean red food wine.',
        priceGlass: '$13',
        priceBottle: '$54',
        vintage: '2022',
        region: 'Tuscany, Italy'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alessandro Moretti',
    role: 'Gastronomy Critic',
    text: '“Limoncello has captured the true spirit of the Amalfi Coast with a Miami high-end twist. The Carpaccio di Manzo was flawless, but the Cacio e Pepe with fresh shaved winter truffles is simply a religious experience. Limoncello Spritz is perfect.”',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Serena Vance',
    role: 'Miami Beach Local',
    text: '“My absolute favorite Italian fine dining restaurant. The lighting is romantic, the service is Michelin-tier, and the lemon decor feels like you stepped inside a private villa in Positano. Handcarved Jamon Iberico and Branzino are incredible.”',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Chef Ricardo Cellini',
    role: 'Culinary Advisor',
    text: '“The attention to heritage Italian ingredients is stunning. The hand-crafted Bucatini and high-acid organic olives are perfect. The Limoncello Drop Martini is the best version I’ve ever tasted in the United States.”',
    rating: 5
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'insta-1',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
    likes: '1,420',
    comments: '48',
    caption: 'Fresh organic egg-yolk Rigatoni Carbonara tossed to absolute creaminess. Truly Roman. 🇮🇹 #LimoncelloMiami #MiamiBeach'
  },
  {
    id: 'insta-2',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600',
    likes: '942',
    comments: '19',
    caption: 'Puglian Burrata served atop a vibrant canvas of organic red gold tomatoes and premium extra virgin olive oil. 🍅🥗 #AmalfiVibes'
  },
  {
    id: 'insta-3',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    likes: '2,110',
    comments: '105',
    caption: 'Sunset skies call for our ice-cold craft masterpiece: The Limoncello Spritz Royal. 🍋🥂 #SunsetHour #MiamiFineDining'
  },
  {
    id: 'insta-4',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
    likes: '1,288',
    comments: '32',
    caption: 'Whole Mediterranean Branzino roasted on pristine oak embers. Healthy, flavorful, perfect for Miami Beach evenings.'
  }
];
