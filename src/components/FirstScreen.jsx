const imgImage1 = "https://www.figma.com/api/mcp/asset/6f25771c-b020-40f1-b4fe-d00e350afc85";

export default function FirstScreen({ onGetStarted }) {
  return (
    <div className="bg-[#f2f2f2] relative size-full overflow-hidden" data-name="First Screen" data-node-id="7:3">
      <div className="absolute h-[1800px] left-[-404px] top-[-474px] w-[1200px]" data-name="image 1" data-node-id="74:1390">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute bg-[#f2f2f2] box-border content-stretch flex flex-col gap-[80px] items-center left-1/2 px-[17px] py-[36px] rounded-[6px] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[295px]" data-node-id="12:35">
        <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 text-center w-full" data-node-id="12:14">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="12:15">
            <p className="font-['Inria_Serif:Bold',sans-serif] leading-[normal] relative shrink-0 text-[#1a1a1a] text-[36px] w-full whitespace-pre-wrap" data-node-id="10:4">
              Welcome to Pittsburgh
            </p>
            <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#a1a1a1] text-[14px] w-full whitespace-pre-wrap" data-node-id="12:11">
              <p className="mb-0">{`Get personalized city walk guides `}</p>
              <p>from the locals</p>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#4a4a4a] text-[16px] w-full whitespace-pre-wrap" data-node-id="12:12">
            Based on your mood, interests, and available time, get the perfect route tailored just for you.
          </p>
        </div>
        <div 
          className="bg-[#53ab54] box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[6px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
          data-name="cta" 
          data-node-id="12:17"
          onClick={onGetStarted}
        >
          <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#f2f2f2] text-[16px] text-center" data-node-id="12:16">
            Let's get started
          </p>
        </div>
      </div>
    </div>
  );
}

