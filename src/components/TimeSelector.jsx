import { useState, useRef, useCallback, useEffect } from 'react'

const timeOptions = [
  { value: 30, label: '30 Minutes', description: 'Just a quick breath of fresh air', cta: "https://www.figma.com/api/mcp/asset/05f99120-8c63-4bb9-9ba2-ad31b7a6de3f" },
  { value: 60, label: '1 Hour', description: 'A light loop', cta: "https://www.figma.com/api/mcp/asset/37b526f8-18af-4b75-b1c7-cddd609eb1ee" },
  { value: 120, label: '2 Hours', description: 'A small city adventure', cta: "https://www.figma.com/api/mcp/asset/0a46e49c-4c5b-4634-bd81-2009ffcfce6d" },
  { value: 180, label: '3 Hours', description: 'A slow afternoon walk', cta: "https://www.figma.com/api/mcp/asset/f078cdb4-4bb9-4513-9087-44fea4256b28" },
  { value: 240, label: 'Half Day', description: 'Let the city carry you', cta: "https://www.figma.com/api/mcp/asset/f795c716-2ff5-4b96-b1ae-6f63cc9ed0df" },
  { value: 480, label: 'Full Day', description: 'Today belongs to Pittsburgh', cta: "https://www.figma.com/api/mcp/asset/fa2e9474-51e5-4dca-b835-a03a3d9b719d" },
];

// Selector cursor image
const imgSelectorCursor = "https://www.figma.com/api/mcp/asset/24:259"; // This should be the selector cursor image from Figma

export default function TimeSelector({ onTimeSelected, onNext, onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to 1 Hour
  const [currentAngle, setCurrentAngle] = useState(0); // Current angle during dragging (continuous)
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef(null);
  const startAngleRef = useRef(0);
  const startIndexRef = useRef(1);

  const selectedTime = timeOptions[selectedIndex];
  const totalOptions = timeOptions.length;
  
  // Calculate angle for each option (6 options, evenly spaced around circle)
  // Starting from top (12 o'clock = -90 degrees)
  const getAngleForIndex = (index) => {
    // Each option is 60 degrees apart (360 / 6)
    // Start from top: -90 degrees
    return -90 + (index * (360 / totalOptions));
  };

  // Get the nearest index for a given angle
  const getNearestIndex = (angle) => {
    // Normalize angle to -180 to 180 range
    let normalizedAngle = ((angle % 360) + 360) % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    
    // Find closest option
    let minDiff = Infinity;
    let nearestIndex = 0;
    
    for (let i = 0; i < totalOptions; i++) {
      const optionAngle = getAngleForIndex(i);
      let diff = Math.abs(normalizedAngle - optionAngle);
      // Handle wrap-around (e.g., -90 and 270 are the same)
      if (diff > 180) {
        diff = 360 - diff;
      }
      
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    }
    
    return nearestIndex;
  };

  // Get angle from center point
  const getAngleFromCenter = (clientX, clientY) => {
    if (!dialRef.current) return 0;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    // Calculate angle in degrees, with 0 at right (3 o'clock), -90 at top (12 o'clock)
    return (Math.atan2(deltaY, deltaX) * 180 / Math.PI);
  };

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const angle = getAngleFromCenter(e.clientX, e.clientY);
    startAngleRef.current = angle;
    startIndexRef.current = selectedIndex;
    setCurrentAngle(getAngleForIndex(selectedIndex));
  }, [selectedIndex]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const angle = getAngleFromCenter(e.clientX, e.clientY);
    
    // Calculate the change in angle
    let deltaAngle = angle - startAngleRef.current;
    
    // Handle wrap-around (when crossing 180/-180 boundary)
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    
    // Update current angle (continuous) - add delta to the starting angle
    const startOptionAngle = getAngleForIndex(startIndexRef.current);
    let newAngle = startOptionAngle + deltaAngle;
    
    // Normalize to -180 to 180 range for easier calculation
    if (newAngle > 180) newAngle -= 360;
    if (newAngle < -180) newAngle += 360;
    
    setCurrentAngle(newAngle);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest option
    const nearestIndex = getNearestIndex(currentAngle);
    setSelectedIndex(nearestIndex);
    setCurrentAngle(getAngleForIndex(nearestIndex));
    
    if (onTimeSelected) {
      onTimeSelected(timeOptions[nearestIndex]);
    }
  }, [isDragging, currentAngle, onTimeSelected]);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const angle = getAngleFromCenter(touch.clientX, touch.clientY);
    startAngleRef.current = angle;
    startIndexRef.current = selectedIndex;
    setCurrentAngle(getAngleForIndex(selectedIndex));
  }, [selectedIndex]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const angle = getAngleFromCenter(touch.clientX, touch.clientY);
    
    let deltaAngle = angle - startAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    
    const startOptionAngle = getAngleForIndex(startIndexRef.current);
    let newAngle = startOptionAngle + deltaAngle;
    
    if (newAngle > 180) newAngle -= 360;
    if (newAngle < -180) newAngle += 360;
    
    setCurrentAngle(newAngle);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const nearestIndex = getNearestIndex(currentAngle);
    setSelectedIndex(nearestIndex);
    setCurrentAngle(getAngleForIndex(nearestIndex));
    
    if (onTimeSelected) {
      onTimeSelected(timeOptions[nearestIndex]);
    }
  }, [isDragging, currentAngle, onTimeSelected]);

  useEffect(() => {
    // Initialize current angle
    setCurrentAngle(getAngleForIndex(selectedIndex));
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // SVG parameters
  const size = 282;
  const center = size / 2;
  const radius = 120; // Radius of the dial circle
  const strokeWidth = 20;
  
  // Calculate angle for display (use currentAngle if dragging, otherwise use selectedIndex angle)
  const displayAngle = isDragging ? currentAngle : getAngleForIndex(selectedIndex);
  
  // Calculate preview index when dragging (for displaying text)
  const previewIndex = isDragging ? getNearestIndex(currentAngle) : selectedIndex;
  const displayTime = timeOptions[previewIndex]; // Use preview when dragging, selected when not
  
  // Convert angle to radians and calculate position
  const angleRad = (displayAngle * Math.PI) / 180;
  const cursorX = center + radius * Math.cos(angleRad);
  const cursorY = center + radius * Math.sin(angleRad);
  
  // Calculate arc for Ellipse 6 (trail from top to cursor)
  const startAngleDeg = -90;
  const endAngleDeg = displayAngle;

  const startNorm = (startAngleDeg + 360) % 360;
  const endNorm = (endAngleDeg + 360) % 360;

  const sweepAngle = (endNorm - startNorm + 360) % 360;

  const sweepFlag = 1;
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  // Arc path calculation
  const startX = center + radius * Math.cos((startAngleDeg * Math.PI) / 180);
  const startY = center + radius * Math.sin((startAngleDeg * Math.PI) / 180);
  const endX = center + radius * Math.cos((endAngleDeg * Math.PI) / 180);
  const endY = center + radius * Math.sin((endAngleDeg * Math.PI) / 180);

  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

  return (
    <div 
      className="bg-[#f2f2f2] relative size-full overflow-y-auto" 
      data-name="Time Selector" 
      data-node-id="23:128"
    >
      <div className="absolute content-stretch flex flex-col gap-[72px] items-center left-0 right-0 top-[169px] pb-[20px]" data-node-id="38:1309">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[24px] text-center" data-node-id="24:263">
          How much time do you have?
        </p>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid justify-items-start leading-[0] relative shrink-0" data-node-id="30:989">
          <div 
            ref={dialRef}
            className="col-[1] ml-[calc(50%+-141px)] mt-[calc(50%+-141px)] relative row-[1] size-[282px] cursor-grab active:cursor-grabbing select-none"
            data-node-id="30:988"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ touchAction: 'none' }}
          >
            <svg width={size} height={size} className="absolute inset-0">
              {/* Background circle (Ellipse 5) */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(161, 161, 161, 0.2)"
                strokeWidth={strokeWidth}
              />
              
              {/* Ellipse 6 - Trail arc from top to cursor */}
              <path
                d={arcPath}
                fill="none"
                stroke="#ffc55b"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              {/* Selector cursor */}
              <g transform={`translate(${cursorX}, ${cursorY})`}>
                <circle
                  cx={0}
                  cy={0}
                  r={17.5}
                  fill="#ffffff"
                  stroke="rgba(161, 161, 161, 0.2)"
                  strokeWidth={1}
                />
              </g>
            </svg>
            
            {/* Text overlay in the center - shows preview when dragging, selected when not */}
            <div className="absolute content-stretch flex flex-col gap-[4px] items-center leading-[normal] left-[40px] top-[118px] not-italic text-center w-[202px] whitespace-pre-wrap pointer-events-none" data-node-id="34:1023">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#4a4a4a] text-[20px] w-full" data-node-id="34:1024">
                {displayTime.label}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#a1a1a1] text-[14px] w-full" data-node-id="34:1025">
                {displayTime.description}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex gap-[10px] items-start justify-center px-[18px] py-[10px] relative shrink-0 w-full" data-name="cta" data-node-id="36:1217">
          <div 
            className="relative shrink-0 size-[39px] cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="back" 
            data-node-id="36:1218"
            onClick={onBack}
          >
            <img alt="" className="block max-w-none size-full" src={selectedTime.cta} />
          </div>
          <div 
            className="bg-[#53ab54] box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="cta" 
            data-node-id="36:1220"
            onClick={onNext}
          >
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center" data-node-id="36:1221">
              Let's build my walk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
