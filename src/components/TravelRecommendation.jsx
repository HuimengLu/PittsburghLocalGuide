import { useState } from 'react'

const imgEllipse9 = "https://www.figma.com/api/mcp/asset/3c58984a-49ca-4973-bb34-0ebf6e66e614";
const imgVector5 = "https://www.figma.com/api/mcp/asset/37f29865-f941-49ca-905a-495883be71ec";
const imgGroup7 = "https://www.figma.com/api/mcp/asset/6e9c434f-be46-4396-9a6d-9618b9379002";
const imgGroup8 = "https://www.figma.com/api/mcp/asset/964aeb32-8e90-4629-9a84-dcf1883473d5";
const imgVector6 = "https://www.figma.com/api/mcp/asset/19b5d6ab-500f-4f89-a6d1-85f4f3119ceb";
const imgStar1 = "https://www.figma.com/api/mcp/asset/6e49bb63-f2af-4e94-96c1-984609fc361c";

// Sample stops data
const defaultStops = [
  {
    id: 1,
    number: '01',
    time: '2 hrs',
    description: 'This could be a lovely first stop for music lovers',
    image: "https://www.figma.com/api/mcp/asset/8f8933bf-42a3-4988-a77c-1f0beb0c33c2",
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
    image: "https://www.figma.com/api/mcp/asset/2c3a55cf-cc3d-4d8e-ba50-7fd55aecf1f5",
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
    image: "https://www.figma.com/api/mcp/asset/cd74364e-d471-45ef-9958-2bcedc998d63",
    name: 'Cultural District',
    rating: 4.6,
    tags: ['Artsy'],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cultural+District+Pittsburgh',
  },
];

export default function TravelRecommendation({ stops = defaultStops, selectedTime, onTweakIt, onReadyToGo, onBack }) {
  const handleViewOnMap = (url) => {
    window.open(url, '_blank');
  };

  // Get total time label from selectedTime or default
  const totalTimeLabel = selectedTime ? selectedTime.label : 'Half Day';
  const totalStops = stops ? stops.length : 0;

  return (
    <div className="bg-[#f2f2f2] relative size-full overflow-y-auto" data-name="Travel Recommendation v2" data-node-id="27:596">
      <div className="absolute content-stretch flex flex-col gap-[28px] items-center left-[17px] right-[17px] top-[64px] pb-[120px]" data-node-id="27:597">
        <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0 text-center w-full whitespace-pre-wrap" data-node-id="27:598">
          <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#4a4a4a] text-[24px] w-full" data-node-id="27:599">
            A city walk shaped for you
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#a1a1a1] text-[16px] w-full" data-node-id="27:600">
            Recommended by the locals
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[28px] items-start max-w-[400px] relative shrink-0 w-full" data-node-id="27:609">
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="33:133">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:184">
              Overview:
            </p>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="33:134">
              <div className="relative shrink-0 size-[16px]" data-node-id="33:135">
                <img alt="" className="block max-w-none size-full" src={imgEllipse9} />
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:136">
                {totalTimeLabel}
              </p>
            </div>
            <div className="h-[16px] relative shrink-0 w-0" data-node-id="33:137">
              <div className="absolute bottom-0 left-[-0.25px] right-[-0.25px] top-0">
                <img alt="" className="block max-w-none size-full" src={imgVector5} />
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="33:138">
              <div className="h-[16px] relative shrink-0 w-[13.062px]" data-node-id="33:285">
                <img alt="" className="block max-w-none size-full" src={imgGroup7} />
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px]" data-node-id="33:140">
                {totalStops} {totalStops === 1 ? 'Stop' : 'Stops'}
              </p>
            </div>
          </div>
          {stops.map((stop, index) => (
            <div key={stop.id} className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id={`33:${210 + index}`}>
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id={`33:${170 + index * 12}`}>
                <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id={`33:${171 + index * 12}`}>
                  <div className="h-[24px] relative shrink-0 w-[19.592px]" data-node-id={`33:${172 + index * 12}`}>
                    <img alt="" className="block max-w-none size-full" src={imgGroup8} />
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[24px]" data-node-id={`33:${176 + index * 12}`}>
                    {stop.number}
                  </p>
                </div>
                <div className="relative self-stretch shrink-0 w-0" data-node-id={`33:${177 + index * 12}`}>
                  <div className="absolute bottom-0 left-[-0.25px] right-[-0.25px] top-0">
                    <img alt="" className="block max-w-none size-full" src={imgVector6} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative shrink-0" data-node-id={`33:${178 + index * 12}`}>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#a1a1a1] text-[16px]" data-node-id={`33:${179 + index * 12}`}>
                    {stop.time}
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#4a4a4a] text-[16px] w-[min-content] whitespace-pre-wrap" data-node-id={`33:${180 + index * 12}`}>
                    {stop.description}
                  </p>
                  <div className="border border-[rgba(161,161,161,0.3)] border-solid box-border content-stretch flex flex-col gap-[12px] items-start justify-center pb-[12px] pt-0 px-0 relative rounded-[6px] shrink-0 w-full" data-node-id={`33:${213 + index * 12}`}>
                    <div className="h-[180px] relative shrink-0 w-full" data-node-id={`33:${214 + index * 12}`}>
                      <div className="absolute bottom-0 left-0 right-[0.41px] rounded-[6px] top-0" data-node-id={`33:${215 + index * 12}`}>
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[6px] size-full" src={stop.image} />
                      </div>
                      <div className={`absolute backdrop-blur-[2px] backdrop-filter bottom-[8px] content-stretch flex gap-[8px] items-start left-[12px]`} data-node-id={`33:${216 + index * 12}`}>
                        {stop.tags.map((tag, tagIndex) => {
                          const borderColor = tag === 'Artsy' ? '#ffc55b' : tag === 'Foodie' ? '#53ab54' : '#a1a1a1';
                          return (
                            <div 
                              key={tagIndex}
                              className="bg-[rgba(242,242,242,0.6)] border border-solid box-border content-stretch flex gap-[10px] items-center justify-center px-[8px] py-[4px] relative rounded-[20px] shrink-0"
                              style={{ borderColor }}
                              data-node-id={`33:${217 + index * 12 + tagIndex}`}
                            >
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-center" data-node-id={`33:${218 + index * 12 + tagIndex}`}>
                                {tag}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-[12px] items-start justify-center px-[12px] py-0 relative shrink-0 w-full" data-node-id={`33:${221 + index * 12}`}>
                      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full" data-node-id={`33:${222 + index * 12}`}>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1a1a1a] text-[20px]" data-node-id={`33:${223 + index * 12}`}>
                          {stop.name}
                        </p>
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id={`33:${224 + index * 12}`}>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(74,74,74,0.7)] text-center" data-node-id={`33:${225 + index * 12}`}>
                            Google Review
                          </p>
                          <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-node-id={`33:${226 + index * 12}`}>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[12px] text-center" data-node-id={`33:${227 + index * 12}`}>
                              {stop.rating}
                            </p>
                            <div className="relative shrink-0 size-[16px]" data-node-id={`33:${228 + index * 12}`}>
                              <div className="absolute inset-[13.98%_15.42%_19.63%_15.42%]">
                                <img alt="" className="block max-w-none size-full" src={imgStar1} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id={`33:${230 + index * 12}`}>
                        <div 
                          className="bg-[#ffc55b] box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-px min-w-px px-[10px] py-[6px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
                          data-name="cta" 
                          data-node-id={`33:${231 + index * 12}`}
                          onClick={() => handleViewOnMap(stop.googleMapsUrl)}
                        >
                          <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center whitespace-pre-wrap" data-node-id={`33:${232 + index * 12}`}>
                            View on Map
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-node-id="30:963">
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
            className="border border-[#a1a1a1] border-solid box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="cta" 
            data-node-id="30:960"
            onClick={onTweakIt}
          >
            <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#a1a1a1] text-[16px] text-center whitespace-pre-wrap" data-node-id="30:961">
              tweak it
            </p>
          </div>
          <div 
            className="bg-[#53ab54] box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="cta" 
            data-node-id="30:957"
            onClick={onReadyToGo}
          >
            <p className="capitalize flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center whitespace-pre-wrap" data-node-id="30:958">
              I'm Ready to Go
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

