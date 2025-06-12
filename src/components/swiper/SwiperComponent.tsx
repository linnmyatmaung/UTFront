import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper core styles
import "swiper/css/effect-coverflow"; // Coverflow effect styles
import { EffectCoverflow } from "swiper/modules";
import { SelectionResponse } from "@/api/selectionApi";
import { base_api_url } from "@/api/apiClient";
import { useState } from "react";
import KingCrown from "@/assets/King.png";
import QueenCrown from "@/assets/Queen.png";

interface SwiperComponentProps {
  title: string;
  data: SelectionResponse[];
  onActiveIndexChange: (newIndex: number) => void;
}

function SwiperComponent({
  title,
  data,
  onActiveIndexChange,
}: SwiperComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const hobbies = data[activeIndex]?.hobby.split(",") || [];

  const handleSlideChange = (newIndex: number) => {
    // Trigger fade-out animation
    setFade(true);

    // Change the active slide after the fade-out animation
    setTimeout(() => {
      setActiveIndex(newIndex);
      onActiveIndexChange(newIndex);
      setFade(false); // Trigger fade-in animation
    }, 300); // Match the CSS transition duration
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[390px] py-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={title === "KING" ? KingCrown : QueenCrown}
            alt="Crown"
            className="size-10"
          />
          <h1 className="font-lobster text-4xl font-bold text-center mx-4 bg-gradient-to-r from-[#d3d28a] to-[#ffffff] bg-clip-text text-transparent">
            {title}
          </h1>
          <img
            src={title === "KING" ? KingCrown : QueenCrown}
            alt="Crown"
            className="size-10"
          />
        </div>

        {/* Swiper Container */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.4}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
          }}
          modules={[EffectCoverflow]}
          onActiveIndexChange={(swiper) => handleSlideChange(swiper.realIndex)}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="p-4">
              <div className="size-60 bg-gradient-to-r from-pink-300 via-red-400 to-violet-700 rounded-full flex items-center justify-center text-white font-bold glow-container mb-4">
                <img
                  className="size-56 object-cover rounded-full"
                  src={base_api_url + "/" + item.profileImg}
                  alt={item.name}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data[activeIndex] && (
          <div className="flex items-center justify-center mt-3">
            <div className="font-poppins text-lg font-bold flex flex-col gap-4 w-1/3 items-center ml-4">
              <h2>Name:</h2>
              <h2>Major:</h2>
              <h2>Hobby:</h2>
            </div>
            <div
              className={`font-poppins text-lg font-bold flex flex-col gap-3 w-2/3 transition-opacity duration-300 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <h2>{data[activeIndex].name}</h2>
              <h2>{data[activeIndex].major}</h2>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r text-xs from-pink-300 via-red-400 to-violet-700 rounded-full px-4 py-2 text-gray-800 font-poppins font-bold"
                  >
                    {hobby}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwiperComponent;
