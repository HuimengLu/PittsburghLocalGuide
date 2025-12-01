import { useState } from 'react'

const imgRectangle2 = "https://www.figma.com/api/mcp/asset/21962b0e-afff-489c-ba13-be4e0bf62ec1";
const imgRectangle3 = "https://www.figma.com/api/mcp/asset/e62bb386-fd0d-4a50-9e2b-431402eb9d3a";
const imgRectangle4 = "https://www.figma.com/api/mcp/asset/93dd90e9-1396-4891-b483-c61928ee452c";
const imgRectangle5 = "https://www.figma.com/api/mcp/asset/513f42d8-8fcc-437d-a952-f9cff565fd22";
const imgRectangle6 = "https://www.figma.com/api/mcp/asset/8cf29ecb-f826-4705-a1be-3556d924c946";
const imgRectangle7 = "https://www.figma.com/api/mcp/asset/37ed90e2-0c5b-493b-be8b-e122c86f4d25";
const imgCta = "https://www.figma.com/api/mcp/asset/b1cd47d4-3aae-489c-a8d3-0ad6794eb3d5";

// Themes ordered to match the grid layout: row 1 (Artsy, Architecture), row 2 (Coffee, Foodie), row 3 (Night view, Not sure?)
const themes = [
  { id: 'artsy', name: 'Artsy', image: imgRectangle2 },
  { id: 'architecture', name: 'Architecture', image: imgRectangle3 },
  { id: 'coffee', name: 'Coffee', image: imgRectangle4 },
  { id: 'foodie', name: 'Foodie', image: imgRectangle5 },
  { id: 'night-view', name: 'Night view', image: imgRectangle6 },
  { id: 'not-sure', name: 'Not sure?', image: imgRectangle7 },
];

export default function ThemeSelector({ onThemeSelected, onNext, onBack }) {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    if (onThemeSelected) {
      onThemeSelected(theme);
    }
  };

  return (
    <div className="bg-[#f2f2f2] relative size-full overflow-y-auto" data-name="Theme Selector" data-node-id="23:151">
      <div className="absolute content-stretch flex flex-col gap-[72px] items-center left-0 right-0 top-[64px] pb-[20px]" data-node-id="38:1307">
        <div className="content-stretch flex flex-col gap-[36px] items-center relative shrink-0 w-full" data-node-id="23:153">
          <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[17px] py-0 relative shrink-0 w-full" data-node-id="38:1308">
            <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[#4a4a4a] text-[24px] text-center whitespace-pre-wrap" data-node-id="23:154">
              What do you feel like exploring?
            </p>
          </div>
          <div className="gap-[9px] grid grid-cols-2 grid-rows-3 h-[540px] relative shrink-0 w-[359px]" data-node-id="35:1053">
            {themes.map((theme, index) => {
              const row = Math.floor(index / 2) + 1;
              const col = (index % 2) + 1;
              return (
              <div 
                key={theme.id}
                className={`border border-[rgba(161,161,161,0.2)] border-solid box-border content-stretch flex flex-col gap-[8px] items-center justify-self-stretch px-0 py-[4px] relative rounded-[6px] self-start shrink-0 cursor-pointer transition-opacity hover:opacity-90`}
                style={{ gridColumn: col, gridRow: row }}
                data-node-id={`35:${1054 + index}`}
                onClick={() => handleThemeClick(theme)}
              >
                <div className="h-[140px] relative rounded-[6px] shrink-0 w-full" data-node-id={`35:${1055 + index}`}>
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[6px] size-full" src={theme.image} />
                  {selectedTheme?.id === theme.id && (
                    <div className="absolute inset-0 border-2 border-[#53ab54] rounded-[6px] z-10" />
                  )}
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4a4a4a] text-[16px] text-center w-full whitespace-pre-wrap" data-node-id={`35:${1056 + index}`}>
                  {theme.name}
                </p>
              </div>
              );
            })}
          </div>
        </div>
        <div className="box-border content-stretch flex gap-[10px] items-start justify-center px-[18px] py-[10px] relative shrink-0 w-full" data-name="cta" data-node-id="36:1193">
          <div 
            className="relative shrink-0 size-[39px] cursor-pointer hover:opacity-90 transition-opacity" 
            data-name="back" 
            data-node-id="36:1194"
            onClick={onBack}
          >
            <img alt="" className="block max-w-none size-full" src={imgCta} />
          </div>
          <div 
            className={`box-border content-stretch flex flex-[1_0_0] gap-[10px] items-center justify-center max-w-[200px] min-h-px min-w-[148px] p-[10px] relative rounded-[6px] shrink-0 transition-opacity ${
              selectedTheme 
                ? 'bg-[#53ab54] cursor-pointer hover:opacity-90' 
                : 'bg-[rgba(161,161,161,0.3)] cursor-not-allowed opacity-60'
            }`}
            data-name="cta" 
            data-node-id="36:1196"
            onClick={selectedTheme ? onNext : undefined}
          >
            <p className={`flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-center whitespace-pre-wrap ${selectedTheme ? 'text-[#f2f2f2]' : 'text-[#a1a1a1]'}`} data-node-id="36:1197">
              This is my vibe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

