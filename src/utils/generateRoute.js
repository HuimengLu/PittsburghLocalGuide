import { PLACES } from '../data/places.js';

/**
 * Convert a Place object to Stop format for UI components
 * @param {Object} place - Place object from PLACES
 * @param {number} index - Index in the route (0-based)
 * @returns {Object} Stop object with all required fields
 */
export function convertPlaceToStop(place, index) {
  // Map durationTag to time display
  const timeMap = {
    'short': '1 hr',
    'medium': '1.5 hrs',
    'long': '2 hrs'
  };
  
  // Map theme to display tag (capitalize first letter)
  const themeToTag = (theme) => {
    const map = {
      'artsy': 'Artsy',
      'foodie': 'Foodie',
      'coffee': 'Coffee',
      'architecture': 'Architecture',
      'night': 'Night View',
      'riverside': 'Riverside'
    };
    return map[theme] || theme.charAt(0).toUpperCase() + theme.slice(1);
  };
  
  return {
    id: place.id,
    number: String(index + 1).padStart(2, '0'),
    time: timeMap[place.durationTag] || '1 hr',
    description: place.description,
    image: place.image,
    name: place.name,
    rating: 4.6, // Default rating (can be enhanced later with real data)
    tags: place.themes.map(themeToTag),
    googleMapsUrl: place.googleMapUrl,
    // Keep original place data for reference
    _originalPlace: place
  };
}

/**
 * Normalize duration string to standard format
 * @param {string} duration - Duration in various formats
 * @returns {string} Normalized duration: '30min' | '1h' | '2h' | '3h' | 'half-day' | 'full-day'
 */
function normalizeDuration(duration) {
  const normalized = duration.toLowerCase().trim();
  
  // Handle various formats
  if (normalized.includes('30') || normalized === '30min' || normalized === '30 minutes') {
    return '30min';
  }
  if (normalized === '1h' || normalized === '1 hour' || normalized === '1 hours') {
    return '1h';
  }
  if (normalized === '2h' || normalized === '2 hours') {
    return '2h';
  }
  if (normalized === '3h' || normalized === '3 hours') {
    return '3h';
  }
  if (normalized.includes('half') || normalized === 'half-day') {
    return 'half-day';
  }
  if (normalized.includes('full') || normalized === 'full-day') {
    return 'full-day';
  }
  
  // Default fallback
  return normalized;
}

/**
 * Generate a recommended route based on mood, theme, and duration
 * @param {Object} params - Route generation parameters
 * @param {Object} params.mood - Mood coordinates { x: number, y: number } (0-1)
 * @param {string} params.theme - Theme: 'coffee' | 'architecture' | 'riverside' | 'night' | 'artsy' | 'foodie'
 * @param {string} params.duration - Duration: '30min' | '1h' | '2h' | '3h' | 'half-day' | 'full-day' (or variations)
 * @returns {Array} Array of Place objects representing the recommended route
 */
export function generateRoute({ mood, theme, duration }) {
  // 1. Map mood to arousal level
  // mood.y < 0.5 → 'calm', mood.y >= 0.5 → 'energetic'
  const moodArousal = mood.y < 0.5 ? 'calm' : 'energetic';
  
  // 2. Normalize and map duration to number of places
  const normalizedDuration = normalizeDuration(duration);
  const durationToCount = {
    '30min': 1,
    '1h': 2,
    '2h': 3,
    '3h': 3,
    'half-day': 3,
    'full-day': 4
  };
  const targetCount = durationToCount[normalizedDuration] || 3;
  
  // 3. Filter places by theme and moodArousal (first priority)
  let candidates = PLACES.filter(place => {
    const matchesTheme = place.themes.includes(theme);
    const matchesMood = place.moodArousal === moodArousal;
    return matchesTheme && matchesMood;
  });
  
  // 4. If not enough candidates, relax to theme only
  if (candidates.length < targetCount) {
    candidates = PLACES.filter(place => place.themes.includes(theme));
  }
  
  // 5. If still not enough, use all places (fallback)
  if (candidates.length < targetCount) {
    candidates = [...PLACES];
  }
  
  // 6. Shuffle candidates array (Fisher-Yates shuffle for better randomness)
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 7. Take first N places as the route
  const route = shuffled.slice(0, targetCount);
  
  return route;
}

/**
 * Refresh a single place in the route (for editing page)
 * @param {Object} params - Refresh parameters
 * @param {Object} params.oldPlace - The place to be replaced
 * @param {Object} params.mood - Mood coordinates { x: number, y: number } (0-1)
 * @param {string} params.theme - Theme: 'coffee' | 'architecture' | 'riverside' | 'night' | 'artsy' | 'foodie'
 * @param {Array} params.currentRoute - Current route array of Place objects
 * @returns {Object|null} New Place object, or null if no suitable replacement found
 */
export function refreshOnePlace({ oldPlace, mood, theme, currentRoute }) {
  // Map mood to arousal level
  const moodArousal = mood.y < 0.5 ? 'calm' : 'energetic';
  
  // Get oldPlace's themes (it's an array)
  const oldPlaceThemes = oldPlace.themes || [];
  
  // Get IDs of places already in current route (to exclude them)
  const existingIds = currentRoute.map(place => place.id);
  
  // Filter candidates with strict rules:
  // Must have at least one theme matching oldPlace's themes
  // Must match moodArousal
  // Must not be in currentRoute
  let candidates = PLACES.filter(place => {
    // Check if place has any theme matching oldPlace's themes
    const hasMatchingTheme = oldPlaceThemes.some(theme => place.themes.includes(theme));
    const matchesMood = place.moodArousal === moodArousal;
    const notInRoute = !existingIds.includes(place.id);
    const notOldPlace = place.id !== oldPlace.id;
    
    return hasMatchingTheme && matchesMood && notInRoute && notOldPlace;
  });
  
  // If no candidates with strict rules, relax to theme only
  if (candidates.length === 0) {
    candidates = PLACES.filter(place => {
      const hasMatchingTheme = oldPlaceThemes.some(theme => place.themes.includes(theme));
      const notInRoute = !existingIds.includes(place.id);
      const notOldPlace = place.id !== oldPlace.id;
      
      return hasMatchingTheme && notInRoute && notOldPlace;
    });
  }
  
  // If still no candidates, return null
  if (candidates.length === 0) {
    return null;
  }
  
  // Randomly select one candidate
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const newPlace = candidates[randomIndex];
  
  return newPlace;
}

