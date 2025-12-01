const imgImage1 = "https://i.pinimg.com/1200x/b9/24/34/b924347395b1cc36fcb38ffe87f53d6c.jpg";

export default function FirstScreen({ onGetStarted }) {
  return (
    <div className="relative w-full h-screen bg-[#f2f2f2] overflow-hidden">
      <img
        alt=""
        src={imgImage1}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute bg-[#f2f2f2] box-border flex flex-col gap-[80px] items-center left-1/2 top-1/2 px-[17px] py-[36px] rounded-[6px] w-[295px] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-[32px] items-start text-center w-full">
          <div className="flex flex-col gap-[8px] items-start w-full">
            <p className="font-['Inria_Serif:Bold',sans-serif] leading-[normal] text-[#1a1a1a] text-[36px] w-full whitespace-pre-wrap">
              Welcome to Pittsburgh
            </p>
            <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#a1a1a1] text-[14px] w-full whitespace-pre-wrap">
              <p className="mb-0">{`Get personalized city walk guides `}</p>
              <p>from the locals</p>
            </div>
          </div>

          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[#4a4a4a] text-[16px] w-full whitespace-pre-wrap">
            Based on your mood, interests, and available time, get the perfect route tailored just for you.
          </p>
        </div>

        <div
          className="bg-[#53ab54] box-border flex gap-[10px] items-center justify-center p-[10px] rounded-[6px] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={onGetStarted}
        >
          <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[normal] text-[#f2f2f2] text-[16px] text-center">
            Let's get started
          </p>
        </div>
      </div>
    </div>
  );
}
