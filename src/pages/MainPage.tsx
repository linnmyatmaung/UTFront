import { getPinCodeStatus } from "@/api/authApi";
import { getAllSelections, SelectionResponse } from "@/api/selectionApi";
import { BtnPass } from "@/api/voteApi";
import Loader from "@/common/Loader";
import Nav from "@/components/Nav";
import SwiperComponent from "@/components/swiper/SwiperComponent";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";


function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [maleData , setMaleData] = useState<SelectionResponse[]>([]);
  const [femaleData , setFemaleData] = useState<SelectionResponse[]>([]);
  const [activeMaleId, setActiveMaleId] = useState<BtnPass | null>(null);
  const [activeFemaleId, setActiveFemaleId] = useState<BtnPass | null>(null);
  const [status, setStatus] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const data: SelectionResponse[] = await getAllSelections();

      // Separate male and female data
      const males = data.filter((item) => item.gender === "Male");
      const females = data.filter((item) => item.gender === "Female");

      setMaleData(males);
      setFemaleData(females);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPinCodeStatus = async () => {
    try {
      const res = await getPinCodeStatus();
      if(res.data === 1){
        setStatus(false);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }


  useEffect(() => {

    fetchData();
    fetchPinCodeStatus();
  }, []);

  if(loading){
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center items-center sm:py-12">
      <Nav/>
        {/* Male Swiper */}
      <SwiperComponent title="KING" data={maleData} onActiveIndexChange={(newIndex) => setActiveMaleId(maleData[newIndex] ? { id: maleData[newIndex].id, name: maleData[newIndex].name } : null)} />
      {/* Female Swiper */}
      <SwiperComponent title="QUEEN" data={femaleData} onActiveIndexChange={(newIndex) => setActiveFemaleId(femaleData[newIndex] ? { id: femaleData[newIndex].id, name: femaleData[newIndex].name } : null)}/>

      {status && <Button male={activeMaleId} female={activeFemaleId} onAfterStatus={(data) => setStatus(data)}/>}
    </div>
  );
}

export default MainPage;
