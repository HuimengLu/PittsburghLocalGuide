import { useState } from 'react'
import { refreshOnePlace } from '../utils/generateRoute'
import { convertPlaceToStop } from '../utils/generateRoute'
import { PLACES } from '../data/places'

const imgEllipse9 = "https://www.figma.com/api/mcp/asset/c0d1df5d-89ef-4d50-8485-942d1a1a6ac1";
const imgVector5 = "https://www.figma.com/api/mcp/asset/143c3bf9-caf8-4562-b3c4-735e376c2c8c";
const imgGroup7 = "https://www.figma.com/api/mcp/asset/acaa9f66-c876-41af-aefd-8825956f5e41";
const imgGroup8 = "https://www.figma.com/api/mcp/asset/99605667-9f80-44d3-9fb9-d08632424bd7";
const imgChange = "https://www.figma.com/api/mcp/asset/08cbe916-659d-4051-923c-877921dcdc5b";
const imgChange1 = "https://www.figma.com/api/mcp/asset/3c67d713-e8f5-4fd4-8d74-47b1373b6b65";
const imgStar1 = "https://www.figma.com/api/mcp/asset/b7598a4f-e7f9-4f19-8de6-8720c04ec370";

export default function TravelRecommendationEdit({ initialStops, selectedTime, selectedMood, selectedTheme, onStopsChange, onReadyToGo, onBack }) {
  const [stops, setStops] = useState(initialStops || [
    {
      id: 1,
      number: '01',
      time: '2 hrs',
      description: 'This could be a lovely first stop for music lovers',
      image: "https://www.figma.com/api/mcp/asset/8f9edc2a-7001-4eb0-bfef-2d511935ae9b",
      name: 'Con Alma',
      rating: 4.6,
      tags: ['Artsy', 'Foodie'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Con+Alma+Pittsburgh',
    },
    {
      id: 2,
      number: '02',
      time: '1 hr',
      description: 'This place pairs well with your current mood.',
      image: "https://www.figma.com/api/mcp/asset/f57747f1-79f3-47c8-b2c4-c3d71f199fb7",
      name: 'The Andy Warhol Museum',
      rating: 4.6,
      tags: ['Artsy'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Andy+Warhol+Museum+Pittsburgh',
    },
    {
      id: 3,
      number: '03',
      time: '2 hrs',
      description: 'Many people slow down here without meaning to.',
      image: "https://www.figma.com/api/mcp/asset/f10b3017-9338-4df3-8088-6d53ec1bed3f",
      name: 'Cultural District',
      rating: 4.6,
      tags: ['Artsy'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cultural+District+Pittsburgh',
    },
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newStops = [...stops];
    const draggedItem = newStops[draggedIndex];
    newStops.splice(draggedIndex, 1);
    newStops.splice(dropIndex, 0, draggedItem);
    
    // Update numbers
    newStops.forEach((stop, idx) => {
      stop.number = String(idx + 1).padStart(2, '0');
    });

    setStops(newStops);
    if (onStopsChange) {
      onStopsChange(newStops);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSwap = (stopId) => {
    // Find the current stop
    const currentStop = stops.find(s => s.id === stopId);
    if (!currentStop) return;

    // Get the original place object from the stop (stored in _originalPlace)
    // If not available, find it from PLACES by id
    let oldPlace = currentStop._originalPlace;
    if (!oldPlace) {
      oldPlace = PLACES.find(p => p.id === stopId);
    }
    if (!oldPlace) return;

    // Check if we have mood and theme data
    if (!selectedMood || !selectedTheme) {
      console.warn('Cannot refresh place: missing mood or theme data');
      return;
    }

    // Convert current stops to Place objects for currentRoute
    const currentRoute = stops.map(stop => {
      if (stop._originalPlace) {
        return stop._originalPlace;
      }
      // Fallback: find place by id
      return PLACES.find(p => p.id === stop.id);
    }).filter(Boolean); // Remove any undefined values

    // Use refreshOnePlace to get a new place
    const newPlace = refreshOnePlace({
      oldPlace: oldPlace,
      mood: selectedMood,
      theme: selectedTheme.id, // Use theme.id
      currentRoute: currentRoute
    });

    if (!newPlace) {
      console.warn('No suitable replacement found');
      return;
    }

    // Find the index of the stop being replaced
    const stopIndex = stops.findIndex(s => s.id === stopId);
    if (stopIndex === -1) return;

    // Convert new place to stop format
    const newStop = convertPlaceToStop(newPlace, stopIndex);

    // Update the stops array
    const updatedStops = stops.map(stop => 
      stop.id === stopId 
        ? { ...newStop, number: stop.number } // Preserve the number
        : stop
    );

    setStops(updatedStops);
    if (onStopsChange) {
      onStopsChange(updatedStops);
    }
  };

  const handleViewOnMap = (url) => {
    window.open(url, '_blank');
  };

  // Get total time label from selectedTime or default
  const totalTimeLabel = selectedTime ? selectedTime.label : 'Half Day';
  const totalStops = stops ? stops.length : 0;

  return (
    <div className="bg-[#f2f2f2] relative size-full overflow-y-auto" data-name="Travel Recommendation v2" data-node-id="33:322">
      <div className="absolute content-stretch flex flex-col gap-[28px] items-center left-[17px] right-[17px] top-[64px] pb-[120px]" data-node-id="33:323">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="33:324">
          <div className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[24px] text-center w-full whitespace-pre-wrap" data-node-id="33:325">
            <p className="mb-0">{`Let's make this walk feel `}</p>
            <p>even more like you!</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[28px] items-start max-w-[400px] relative shrink-0 w-full" data-node-id="33:327">
          <div className="border border-[rgba(161,161,161,0.2)] border-solid box-border content-stretch flex flex-col gap-[12px] items-start px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-full" data-node-id="33:955">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="33:920">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[14px]" data-node-id="33:906">
                Drag
              </p>
              <div className="h-[14px] relative shrink-0 w-[8.4px]" data-node-id="33:908">
                <img alt="" className="block max-w-none size-full" src={imgGroup8} />
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[14px]" data-node-id="33:916">
                to change the order.
              </p>
            </div>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="33:950">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[14px]" data-node-id="33:918">
                Swap the stop
              </p>
              <div className="relative shrink-0 size-[14px]" data-name="Change" data-node-id="33:943">
                <div className="absolute inset-[-3.57%]">
                  <img alt="" className="block max-w-none size-full" src={imgChange} />
                </div>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[14px]" data-node-id="33:947">
                for another one.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="33:328">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:329">
              Overview:
            </p>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="33:330">
              <div className="relative shrink-0 size-[16px]" data-node-id="33:331">
                <img alt="" className="block max-w-none size-full" src={imgEllipse9} />
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:332">
                {totalTimeLabel}
              </p>
            </div>
            <div className="h-[16px] relative shrink-0 w-0" data-node-id="33:333">
              <div className="absolute bottom-0 left-[-0.25px] right-[-0.25px] top-0">
                <img alt="" className="block max-w-none size-full" src={imgVector5} />
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="33:334">
              <div className="h-[16px] relative shrink-0 w-[13.062px]" data-node-id="33:335">
                <img alt="" className="block max-w-none size-full" src={imgGroup7} />
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:339">
                {totalStops} {totalStops === 1 ? 'Stop' : 'Stops'}
              </p>
            </div>
          </div>
          {stops.map((stop, index) => (
            <div 
              key={stop.id}
              className={`content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full transition-transform ${draggedIndex === index ? 'opacity-50' : ''} ${dragOverIndex === index ? 'translate-y-2' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              data-node-id={`33:${340 + index * 45}`}
            >
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id={`33:${341 + index * 45}`}>
                <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-[14px] cursor-move" data-node-id={`33:${565 + index * 45}`}>
                  <div className="h-[14px] relative shrink-0 w-[8.4px]" data-node-id={`33:${566 + index * 45}`}>
                    <img alt="" className="block max-w-none size-full" src={imgGroup8} />
                  </div>
                </div>
                <div className="border border-[rgba(161,161,161,0.3)] border-solid box-border content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start justify-center min-h-px min-w-px pb-[12px] pt-0 px-0 relative rounded-[6px] self-stretch shrink-0" data-node-id={`33:${352 + index * 45}`}>
                  <div className="h-[120px] relative shrink-0 w-full" data-node-id={`33:${353 + index * 45}`}>
                    <div className="absolute inset-0 rounded-[6px]" data-node-id={`33:${354 + index * 45}`}>
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[6px] size-full" src={stop.image} />
                    </div>
                    <div className="absolute backdrop-blur-[2px] backdrop-filter bottom-[8px] content-stretch flex gap-[8px] items-start left-[12px]" data-node-id={`33:${355 + index * 45}`}>
                      {stop.tags.map((tag, tagIndex) => {
                        const borderColor = tag === 'Artsy' ? '#ffc55b' : tag === 'Foodie' ? '#53ab54' : '#a1a1a1';
                        return (
                          <div 
                            key={tagIndex}
                            className="bg-[rgba(242,242,242,0.6)] border border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0"
                            style={{ borderColor }}
                            data-node-id={`33:${356 + index * 45 + tagIndex}`}
                          >
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-center" data-node-id={`33:${357 + index * 45 + tagIndex}`}>
                              {tag}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-[12px] items-start justify-center px-[12px] py-0 relative shrink-0 w-full" data-node-id={`33:${360 + index * 45}`}>
                    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full" data-node-id={`33:${361 + index * 45}`}>
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id={`33:${1000 + index * 45}`}>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1a1a1a] text-[20px]" data-node-id={`33:${362 + index * 45}`}>
                          {stop.name}
                        </p>
                      </div>
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id={`33:${363 + index * 45}`}>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(74,74,74,0.7)] text-center" data-node-id={`33:${364 + index * 45}`}>
                          Google Review
                        </p>
                        <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-node-id={`33:${365 + index * 45}`}>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-center" data-node-id={`33:${366 + index * 45}`}>
                            {stop.rating}
                          </p>
                          <div className="relative shrink-0 size-[16px]" data-node-id={`33:${367 + index * 45}`}>
                            <div className="absolute inset-[13.98%_15.42%_19.63%_15.42%]">
                              <img alt="" className="block max-w-none size-full" src={imgStar1} />
                            </div>
                          </div>
                        </div>
                        <div className="h-[16px] relative shrink-0 w-0" data-node-id={`33:${1001 + index * 45}`}>
                          <div className="absolute bottom-0 left-[-0.25px] right-[-0.25px] top-0">
                            <img alt="" className="block max-w-none size-full" src={imgVector5} />
                          </div>
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px]" data-node-id={`33:${1003 + index * 45}`}>
                          {stop.time}
                        </p>
                      </div>
                    </div>
                    <p className="-webkit-box font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a4a4a] text-[14px] w-full whitespace-pre-wrap" data-node-id={`33:${368 + index * 45}`}>
                      {stop.description}
                    </p>
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id={`33:${369 + index * 45}`}>
                      <div 
                        className="bg-[rgba(161,161,161,0.2)] box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-px min-w-px px-[10px] py-[6px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
                        data-name="cta" 
                        data-node-id={`33:${370 + index * 45}`}
                        onClick={() => handleViewOnMap(stop.googleMapsUrl)}
                      >
                        <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center whitespace-pre-wrap" data-node-id={`33:${371 + index * 45}`}>
                          View on Map
                        </p>
                      </div>
                      <div 
                        className="border border-[#a1a1a1] border-solid box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-px min-w-[148px] px-[10px] py-[6px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
                        data-name="cta" 
                        data-node-id={`33:${958 + index * 45}`}
                        onClick={() => handleSwap(stop.id)}
                      >
                        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center" data-node-id={`33:${959 + index * 45}`}>
                          Swap
                        </p>
                        <div className="relative shrink-0 size-[14px]" data-name="Change" data-node-id={`33:${961 + index * 45}`}>
                          <div className="absolute inset-[-3.57%]">
                            <img alt="" className="block max-w-none size-full" src={imgChange1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-node-id="33:467">
          {onBack && (
            <div 
              className="relative shrink-0 size-[39px] cursor-pointer hover:opacity-90 transition-opacity" 
              data-name="back" 
              onClick={onBack}
            >
              <img alt="" className="block max-w-none size-full" src="https://www.figma.com/api/mcp/asset/78293303-b5b4-4e13-8534-adeccfa0c1d4" />
            </div>
          )}
          <div 
            className="bg-[#53ab54] box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="cta" 
            data-node-id="33:470"
            onClick={onReadyToGo}
          >
            <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center whitespace-pre-wrap" data-node-id="33:471">
              I'm Ready to Go
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

