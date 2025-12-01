import { useState, useRef, useCallback, useEffect } from 'react'

// Emotional indicator images for each mood
const emotionalIndicators = {
  Neutral: "https://www.figma.com/api/mcp/asset/d0697937-e95d-48a4-8a30-3f0b00cb8c14",
  Energetic: "https://www.figma.com/api/mcp/asset/e3a6b3a1-3245-4dd6-b6ee-a1a0be5f5b8d",
  Relaxed: "https://www.figma.com/api/mcp/asset/f9887fdf-26fc-47af-85a5-4e6011fcee77",
  Anxious: "https://www.figma.com/api/mcp/asset/46b3b27e-be7c-4646-8df1-144355d288aa",
  Down: "https://www.figma.com/api/mcp/asset/5e0c59a6-79e7-4323-bdb8-ab37498a5405",
};

// Vector images (lines) - different for each mood state
const vectorImages = {
  Neutral: {
    vector3: "https://www.figma.com/api/mcp/asset/6388d112-dd8c-4bde-8da9-3186ce47f5ac",
    vector2: "https://www.figma.com/api/mcp/asset/8928cc28-b9b6-415c-aaf3-5be7f3964cd8",
    cursor: "https://www.figma.com/api/mcp/asset/cfd5f803-789d-4698-b80e-0cd412f631f1",
  },
  Energetic: {
    vector3: "https://www.figma.com/api/mcp/asset/aafb0f2d-c38c-4291-8512-cdcfc9fd797f",
    vector2: "https://www.figma.com/api/mcp/asset/024cf9b5-6cc0-4c8c-a3d4-192ecd69ad1d",
    cursor: "https://www.figma.com/api/mcp/asset/8c82d655-63c9-4f3d-a6fd-591215c3b9bc",
  },
  Relaxed: {
    vector3: "https://www.figma.com/api/mcp/asset/ec591b38-8436-4299-aedc-9a1d182e14e5",
    vector2: "https://www.figma.com/api/mcp/asset/f464c968-3fd3-4129-b2f8-93d6e8d8f53e",
    cursor: "https://www.figma.com/api/mcp/asset/0c6e1bfc-bc67-4d98-a316-09252618c496",
  },
  Anxious: {
    vector3: "https://www.figma.com/api/mcp/asset/f8a1894d-a72d-4fa2-85c2-874b7ab0be7b",
    vector2: "https://www.figma.com/api/mcp/asset/4e741ae4-c2c7-4cd5-9168-a83f3b105279",
    cursor: "https://www.figma.com/api/mcp/asset/5a7b3e6d-8f20-4a1b-9b15-f6e165b634aa",
  },
  Down: {
    vector3: "https://www.figma.com/api/mcp/asset/aa9c26d2-9b85-4c3c-954b-3061f5a419d0",
    vector2: "https://www.figma.com/api/mcp/asset/d696e83c-da79-4f49-b34b-d78c30d08b22",
    cursor: "https://www.figma.com/api/mcp/asset/b09f2e0f-9af7-43e0-893e-6c363673d803",
  },
};

const imgCta = "https://www.figma.com/api/mcp/asset/553e4b1c-0acc-4a6a-b666-af125d033932";

// Mood labels based on position
// Note: Y axis is inverted (0 = top, 1 = bottom)
// - Top-left (x <= 0.5, y < 0.5): Anxious (High energy + Unpleasant)
// - Top-right (x > 0.5, y < 0.5): Energetic (High energy + Pleasant)
// - Bottom-right (x > 0.5, y >= 0.5): Relaxed (Low energy + Pleasant)
// - Bottom-left (x <= 0.5, y >= 0.5): Down (Low energy + Unpleasant)
// - Center area (within ~0.3-0.7 range): Neutral
const getMoodLabel = (x, y) => {
  const centerThreshold = 0.15; // Distance from center (0.5) to be considered "center" - smaller range for Neutral
  const distFromCenterX = Math.abs(x - 0.5);
  const distFromCenterY = Math.abs(y - 0.5);
  
  // If close to center, return Neutral
  if (distFromCenterX < centerThreshold && distFromCenterY < centerThreshold) {
    return 'Neutral';
  }
  
  // Otherwise, determine quadrant
  // Top-left: Anxious (x <= 0.5, y < 0.5)
  if (x <= 0.5 && y < 0.5) return 'Anxious';
  // Top-right: Energetic (x > 0.5, y < 0.5)
  if (x > 0.5 && y < 0.5) return 'Energetic';
  // Bottom-right: Relaxed (x > 0.5, y >= 0.5)
  if (x > 0.5 && y >= 0.5) return 'Relaxed';
  // Bottom-left: Down (x <= 0.5, y >= 0.5)
  return 'Down';
};

export default function MoodSelector({ onMoodSelected, onNext, onBack }) {
  const [mood, setMood] = useState({ x: 0.52, y: 0.52 }); // Default to Neutral (center)
  const [displayMoodLabel, setDisplayMoodLabel] = useState('Neutral');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has interacted with the pad
  const padRef = useRef(null);

  const handlePadInteraction = useCallback((clientX, clientY) => {
    if (!padRef.current) return;

    const rect = padRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    const newMood = { x, y };
    setMood(newMood);
    setHasInteracted(true); // Mark as interacted when user drags/click the cursor
    
    if (onMoodSelected) {
      onMoodSelected(newMood);
    }
  }, [onMoodSelected]);

  const handleMouseDown = (e) => {
    handlePadInteraction(e.clientX, e.clientY);
    
    const handleMouseMove = (e) => {
      handlePadInteraction(e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handlePadInteraction(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handlePadInteraction(touch.clientX, touch.clientY);
  };

  const cursorX = mood.x * 100;
  const cursorY = mood.y * 100;
  const moodLabel = getMoodLabel(mood.x, mood.y);
  const currentVectors = vectorImages[moodLabel] || vectorImages.Neutral;

  // Handle mood change with fade transition
  useEffect(() => {
    if (moodLabel !== displayMoodLabel && !isTransitioning) {
      setIsTransitioning(true);
      
      // After fade transition completes, update display mood
      const transitionTimer = setTimeout(() => {
        setDisplayMoodLabel(moodLabel);
        setIsTransitioning(false);
      }, 300); // Transition duration
      
      return () => clearTimeout(transitionTimer);
    }
  }, [moodLabel, displayMoodLabel, isTransitioning]);

  return (
    <div className="bg-[#f2f2f2] relative size-full overflow-hidden" data-name="Mood Selector" data-node-id="14:77">
      <div className="absolute content-stretch flex flex-col gap-[clamp(24px,4vh,36px)] items-center justify-center left-0 right-0 top-0 bottom-0 px-[18px] py-[clamp(20px,3vh,40px)]" data-node-id="38:1301">
        <div className="content-stretch flex flex-col gap-[clamp(20px,3vh,36px)] items-center relative shrink-0 w-full" data-node-id="17:75">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-w-full not-italic relative shrink-0 text-[#4a4a4a] text-[clamp(20px,4vw,24px)] text-center w-[min-content] whitespace-pre-wrap" data-node-id="14:86">
            How are you feeling?
          </p>
          <div className="content-stretch flex flex-col gap-[clamp(8px,1.5vh,12px)] items-center relative shrink-0" data-name="emotion" data-node-id="14:176">
            <div className="relative shrink-0 w-[clamp(120px,25vw,186px)] h-[clamp(120px,25vw,186px)] max-w-[186px] max-h-[186px] aspect-square" data-name="emotional indicator" data-node-id="14:175">
              {/* New emotion (fading in) - behind old one */}
              {isTransitioning && (
                <img 
                  alt="" 
                  className="block max-w-none w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ease-in-out"
                  style={{ opacity: 1 }}
                  src={emotionalIndicators[moodLabel]} 
                />
              )}
              {/* Current/Previous emotion (fading out) - on top */}
              <img 
                alt="" 
                className="block max-w-none w-full h-full object-contain transition-opacity duration-300 ease-in-out"
                style={{ 
                  opacity: isTransitioning ? 0 : 1
                }}
                src={emotionalIndicators[displayMoodLabel]} 
              />
            </div>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#4a4a4a] text-[clamp(14px,3.5vw,16px)] text-center w-[min-content] whitespace-pre-wrap transition-opacity duration-300" data-node-id="14:104">
              {moodLabel}
            </p>
          </div>
          <div className="relative w-full max-w-[clamp(280px,85vw,359px)] flex justify-center" data-name="emotional selector" data-node-id="14:185">
            <div className="relative w-full max-w-[clamp(250px,78vw,313px)] aspect-square" data-name="emotional coordinates" data-node-id="14:184">
              {/* Axis labels */}
              <div className="absolute top-[-clamp(16px,3vw,24px)] left-1/2 -translate-x-1/2">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#a1a1a1] text-[clamp(10px,2.5vw,12px)] text-center uppercase" data-node-id="14:101">
                  High energy
                </p>
              </div>
              <div className="absolute bottom-[-clamp(16px,3vw,24px)] left-1/2 -translate-x-1/2">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#a1a1a1] text-[clamp(10px,2.5vw,12px)] text-center uppercase" data-node-id="14:102">
                  Low energy
                </p>
              </div>
              <div className="absolute left-[-clamp(40px,12vw,60px)] top-1/2 -translate-y-1/2">
                <div className="flex-none rotate-[270deg]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#a1a1a1] text-[clamp(10px,2.5vw,12px)] text-center uppercase" data-node-id="14:90">
                    Unpleasant
                  </p>
                </div>
              </div>
              <div className="absolute right-[-clamp(40px,12vw,60px)] top-1/2 -translate-y-1/2">
                <div className="flex-none rotate-[90deg]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#a1a1a1] text-[clamp(10px,2.5vw,12px)] text-center uppercase" data-node-id="14:89">
                    Pleasant
                  </p>
                </div>
              </div>

              {/* Pad (clickable area) */}
              <div 
                ref={padRef}
                className="bg-[#f2f2f2] border border-[rgba(161,161,161,0.2)] border-solid h-full rounded-[6px] w-full relative cursor-crosshair touch-none"
                data-node-id="14:103"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {/* Vertical line */}
                <div className="absolute top-0 left-1/2 h-full w-0 -translate-x-1/2">
                  <div className="absolute inset-0">
                    <img alt="" className="block max-w-none size-full transition-opacity duration-300" src={currentVectors.vector3} />
                  </div>
                </div>
                
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 h-0 w-full -translate-y-1/2">
                  <div className="absolute inset-0">
                    <img alt="" className="block max-w-none size-full transition-opacity duration-300" src={currentVectors.vector2} />
                  </div>
                </div>

                {/* Selector cursor */}
                <div 
                  className="absolute w-[clamp(24px,6vw,36px)] h-[clamp(24px,6vw,36px)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${cursorX}%`,
                    top: `${cursorY}%`,
                  }}
                  data-name="selector cursor" 
                  data-node-id="14:183"
                >
                  <img alt="" className="block max-w-none size-full" src={currentVectors.cursor} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex gap-[10px] items-start justify-center px-[18px] py-[10px] relative shrink-0 w-full" data-name="cta" data-node-id="36:1229">
          <div 
            className="relative shrink-0 size-[39px] cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="back" 
            data-node-id="36:1230"
            onClick={onBack}
          >
            <img alt="" className="block max-w-none size-full" src={imgCta} />
          </div>
          <div 
            className={`box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 transition-opacity ${
              hasInteracted 
                ? 'bg-[#53ab54] cursor-pointer hover:opacity-90' 
                : 'bg-[rgba(161,161,161,0.3)] cursor-not-allowed opacity-60'
            }`}
            data-name="cta" 
            data-node-id="36:1232"
            onClick={hasInteracted ? onNext : undefined}
          >
            <p className={`capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-center whitespace-pre-wrap ${hasInteracted ? 'text-[#f2f2f2]' : 'text-[#a1a1a1]'}`} data-node-id="36:1233">
              next
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


