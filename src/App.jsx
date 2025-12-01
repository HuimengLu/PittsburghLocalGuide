import { useState } from 'react'
import FirstScreen from './components/FirstScreen'
import MoodSelector from './components/MoodSelector'
import ThemeSelector from './components/ThemeSelector'
import TimeSelector from './components/TimeSelector'
import TravelRecommendation from './components/TravelRecommendation'
import TravelRecommendationEdit from './components/TravelRecommendationEdit'
import { generateRoute } from './utils/generateRoute'
import { convertPlaceToStop } from './utils/generateRoute'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [recommendationStops, setRecommendationStops] = useState(null);

  const handleMoodSelected = (mood) => {
    setSelectedMood(mood);
  };

  const handleThemeSelected = (theme) => {
    setSelectedTheme(theme);
  };

  const handleTimeSelected = (time) => {
    setSelectedTime(time);
  };

  // Page navigation
  if (currentPage === 'mood-selector') {
    return (
      <MoodSelector 
        onMoodSelected={handleMoodSelected}
        onNext={() => setCurrentPage('theme-selector')}
        onBack={() => setCurrentPage('welcome')}
      />
    );
  }

  if (currentPage === 'theme-selector') {
    return (
      <ThemeSelector
        onThemeSelected={handleThemeSelected}
        onNext={() => setCurrentPage('time-selector')}
        onBack={() => setCurrentPage('mood-selector')}
      />
    );
  }

  if (currentPage === 'time-selector') {
    return (
      <TimeSelector
        onTimeSelected={handleTimeSelected}
        onNext={() => {
          // Generate stops using generateRoute
          if (selectedTime && selectedMood && selectedTheme) {
            const route = generateRoute({
              mood: selectedMood,
              theme: selectedTheme.id, // Use theme.id
              duration: selectedTime.label // Use selectedTime.label
            });
            
            // Convert places to stops format
            const stopsToGenerate = route.map((place, index) => 
              convertPlaceToStop(place, index)
            );
            
            setRecommendationStops(stopsToGenerate);
          }
          setCurrentPage('travel-recommendation');
        }}
        onBack={() => setCurrentPage('theme-selector')}
      />
    );
  }

  if (currentPage === 'travel-recommendation') {
    return (
      <TravelRecommendation
        stops={recommendationStops}
        selectedTime={selectedTime}
        onTweakIt={() => setCurrentPage('travel-recommendation-edit')}
        onReadyToGo={() => {
          console.log('Ready to go!', { selectedMood, selectedTheme, selectedTime, stops: recommendationStops });
          // Here you could navigate to a final page or show a success message
        }}
        onBack={() => setCurrentPage('time-selector')}
      />
    );
  }

  if (currentPage === 'travel-recommendation-edit') {
    return (
      <TravelRecommendationEdit
        initialStops={recommendationStops}
        selectedTime={selectedTime}
        selectedMood={selectedMood}
        selectedTheme={selectedTheme}
        onStopsChange={(updatedStops) => setRecommendationStops(updatedStops)}
        onReadyToGo={() => {
          console.log('Ready to go from edit!', { selectedMood, selectedTheme, selectedTime, stops: recommendationStops });
          // Here you could navigate to a final page or show a success message
        }}
        onBack={() => setCurrentPage('travel-recommendation')}
      />
    );
  }

  return <FirstScreen onGetStarted={() => setCurrentPage('mood-selector')} />
}

export default App

