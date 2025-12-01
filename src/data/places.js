// Pittsburgh Places Database
// Lightweight database for frontend use

export const PLACES = [
  // Coffee Theme
  {
    id: 'coffee-1',
    name: 'Commonplace Coffee',
    themes: ['coffee', 'artsy'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'short',
    neighborhood: 'Squirrel Hill',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Commonplace+Coffee+Squirrel+Hill+Pittsburgh',
    description: 'A quiet corner where the world slows down, one sip at a time.',
    image: 'https://commonplacecoffee.com/cdn/shop/t/1/assets/503404235023451015-fc12f0c7-213d-428e-bce3-e55a9e876bd0.jpg?v=116082943188719865881710012611?w=800'
  },
  {
    id: 'coffee-2',
    name: 'De Fer Coffee & Tea',
    themes: ['coffee'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Strip District',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=De+Fer+Coffee+Strip+District+Pittsburgh',
    description: 'The buzz of the city meets the warmth of a perfect brew.',
    image: 'https://images.squarespace-cdn.com/content/v1/605b9257affe47617d6a4e81/1648141697062-DKOG6ZJGCZ7VOY79RHA5/strip.jpg?w=800'
  },
  {
    id: 'coffee-3',
    name: '21st Street Coffee & Tea',
    themes: ['coffee'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'short',
    neighborhood: 'Strip District',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=21st+Street+Coffee+Strip+District+Pittsburgh',
    description: 'Where time stands still and conversations flow like espresso.',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/nbGIVsghziOXa3yDclA05w/1000s.jpg?w=800'
  },
  {
    id: 'coffee-4',
    name: 'Constellation Coffee',
    themes: ['coffee'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'short',
    neighborhood: 'Lawrenceville',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Constellation+Coffee+Lawrenceville+Pittsburgh',
    description: 'A cozy nook that feels like home, with coffee that tastes like discovery.',
    image: 'https://www.cartogramme.com/wp-content/uploads/2017/07/constellationfront-970x659.jpg?w=800'
  },

  // Architecture Theme
  {
    id: 'arch-1',
    name: 'Fallingwater',
    themes: ['architecture'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'long',
    neighborhood: 'Mill Run',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Fallingwater+Mill+Run+Pennsylvania',
    description: 'Nature and design dance together in perfect harmony.',
    image: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/laurel/2022-10-9-Fallingwater-006_355F2BC4-0DBA-A106-B4D721F2F4A86A82-355f0836b845446_35603ee9-aa38-bb40-50a65312f975f444.jpg?w=800'
  },
  {
    id: 'arch-2',
    name: 'Cathedral of Learning',
    themes: ['architecture'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Oakland',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Cathedral+of+Learning+Pittsburgh',
    description: 'A tower of knowledge that reaches for the sky, inspiring wonder at every turn.',
    image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/229000/229915-Cathedral-Of-Learning.jpg?w=800'
  },
  {
    id: 'arch-3',
    name: 'Phipps Conservatory',
    themes: ['architecture', 'night'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'long',
    neighborhood: 'Oakland',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Phipps+Conservatory+Pittsburgh',
    description: 'Glass and steel cradle a world of green, where architecture breathes with nature.',
    image: 'https://www.phipps.conservatory.org/images/made/assets/images/as_blog_image/2010s_recap_cover_photo_1494_780_s_c1.jpg?w=800'
  },
  {
    id: 'arch-4',
    name: 'Randyland',
    themes: ['architecture'],
    moodArousal: 'energetic',
    moodWeight: 3,
    durationTag: 'medium',
    neighborhood: 'North Side',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Randyland+Pittsburgh',
    description: 'A burst of color and joy that turns every corner into a surprise.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Randyland.jpg?w=800'
  },

  // Riverside Theme
  {
    id: 'river-1',
    name: 'Point State Park',
    themes: ['riverside'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'medium',
    neighborhood: 'Downtown',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Point+State+Park+Pittsburgh',
    description: 'Where three rivers meet, and the city\'s heartbeat slows to match the water.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Point_State_Park_in_Fall.jpg/1200px-Point_State_Park_in_Fall.jpg?w=800'
  },
  {
    id: 'river-2',
    name: 'Three Rivers Heritage Trail',
    themes: ['riverside'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'long',
    neighborhood: 'Various',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Three+Rivers+Heritage+Trail+Pittsburgh',
    description: 'A path that follows the water\'s edge, inviting you to move with the current.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/13/80/98/three-rivers-heritage.jpg?w=900&h=500&s=1?w=800'
  },
  {
    id: 'river-3',
    name: 'Mount Washington Overlook',
    themes: ['riverside'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'short',
    neighborhood: 'Mount Washington',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Mount+Washington+Overlook+Pittsburgh',
    description: 'The city spreads below like a map, and the rivers weave through it like silver threads.',
    image: 'https://uncoveringpa.com/wp-content/uploads/2015/01/Pittsburgh-from-Dusquesne-Incline-001.jpg?w=800'
  },
  {
    id: 'river-4',
    name: 'North Shore Riverfront Park',
    themes: ['riverside'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'North Side',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=North+Shore+Riverfront+Park+Pittsburgh',
    description: 'A peaceful stretch where the river whispers and the city feels far away.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pittsburgh_northshorepark.jpg?w=800'
  },

  // Night Theme
  {
    id: 'night-1',
    name: 'Mount Washington at Night',
    themes: ['night'],
    moodArousal: 'calm',
    moodWeight: 3,
    durationTag: 'short',
    neighborhood: 'Mount Washington',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Mount+Washington+Pittsburgh',
    description: 'The city lights twinkle below like stars, and the night wraps you in quiet wonder.',
    image: 'https://i.redd.it/c64yuugz3ae31.jpg?w=800'
  },
  {
    id: 'night-2',
    name: 'Market Square',
    themes: ['night'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Downtown',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Market+Square+Pittsburgh',
    description: 'Evening energy pulses through the square, where lights and laughter fill the air.',
    image: 'https://downtownpittsburgh.com/wp-content/uploads/2024/07/Night-Market-2024.png?w=800'
  },
  {
    id: 'night-3',
    name: 'Cultural District',
    themes: ['night'],
    moodArousal: 'energetic',
    moodWeight: 3,
    durationTag: 'long',
    neighborhood: 'Downtown',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Cultural+District+Pittsburgh',
    description: 'Theaters glow and streets hum with the promise of evening performances.',
    image: 'https://www.figma.com/api/mcp/asset/6f58cef5-e90e-4ddd-abfb-cd897ed3e87c'
  },

  // Artsy Theme
  {
    id: 'artsy-1',
    name: 'The Andy Warhol Museum',
    themes: ['artsy'],
    moodArousal: 'energetic',
    moodWeight: 3,
    durationTag: 'long',
    neighborhood: 'North Side',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Andy+Warhol+Museum+Pittsburgh',
    description: 'Pop art bursts from every wall, inviting you to see the world in bold new colors.',
    image: 'https://www.figma.com/api/mcp/asset/a29c6430-47a0-4158-ad09-70c15e69cd17'
  },
  {
    id: 'artsy-2',
    name: 'Carnegie Museum of Art',
    themes: ['artsy', 'architecture'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'long',
    neighborhood: 'Oakland',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Carnegie+Museum+of+Art+Pittsburgh',
    description: 'Each gallery holds a different world, waiting to stir something deep inside.',
    image: 'https://carnegieart.org/wp-content/uploads/2023/03/HOA.jpg?w=800'
  },
  {
    id: 'artsy-3',
    name: 'Mattress Factory',
    themes: ['artsy'],
    moodArousal: 'energetic',
    moodWeight: 3,
    durationTag: 'medium',
    neighborhood: 'North Side',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Mattress+Factory+Pittsburgh',
    description: 'Art installations that challenge perception and spark endless conversation.',
    image: 'https://mattress.org/wp-content/uploads/2024/10/Vivian-Caccuri-5253-lowres.jpg?w=800'
  },
  {
    id: 'artsy-4',
    name: 'Con Alma',
    themes: ['artsy', 'foodie'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Shadyside',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Con+Alma+Pittsburgh',
    description: 'Jazz flows through the air like liquid gold, and every note tells a story.',
    image: 'https://www.figma.com/api/mcp/asset/d865c79a-3bfb-4228-bc0d-2578924798b9'
  },

  // Foodie Theme
  {
    id: 'foodie-1',
    name: 'Primanti Bros.',
    themes: ['foodie'],
    moodArousal: 'energetic',
    moodWeight: 3,
    durationTag: 'short',
    neighborhood: 'Strip District',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Primanti+Bros+Strip+District+Pittsburgh',
    description: 'A Pittsburgh legend where every bite is a celebration of bold flavors.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/bb/ea/34/home-of-the-almost-famous.jpg?w=800'
  },
  {
    id: 'foodie-2',
    name: 'Smallman Galley',
    themes: ['foodie'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Strip District',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Smallman+Galley+Pittsburgh',
    description: 'A culinary adventure where every stall offers a new taste to discover.',
    image: 'https://www.pittsburghmagazine.com/content/uploads/data-import/1d64829b/smallman1.jpg?w=800'
  },
  {
    id: 'foodie-3',
    name: 'Gaucho Parrilla Argentina',
    themes: ['foodie'],
    moodArousal: 'energetic',
    moodWeight: 2,
    durationTag: 'medium',
    neighborhood: 'Strip District',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Gaucho+Parrilla+Argentina+Pittsburgh',
    description: 'The sizzle of the grill and the warmth of authentic flavors create pure joy.',
    image: 'https://www.pittsburghmagazine.com/content/uploads/2022/04/l/f/gauchoplatter.jpg?w=800'
  },
  {
    id: 'foodie-4',
    name: 'Chaykhana Pittsburgh',
    themes: ['foodie'],
    moodArousal: 'calm',
    moodWeight: 2,
    durationTag: 'short',
    neighborhood: 'Downtown',
    googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Pamelas+Diner+Pittsburgh',
    description: 'Comfort food that feels like a warm hug, served with genuine smiles.',
    image: 'https://tb-static.uber.com/prod/image-proc/processed_images/21d7a11ff2af7620b1a12f0c009c20c8/b92d4926516c2635a39581f43cd533a0.jpeg?w=900&h=500&s=1?w=800'
  }
];

