import { BtnPass, insertVoteLog, VoteLogRequest } from "@/api/voteApi";
import { useState } from "react";

interface ButtonProps {
  male: BtnPass | null;
  female: BtnPass | null;
  onAfterStatus: (status: boolean) => void;
}

const Button = ({ male, female , onAfterStatus }: ButtonProps) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleClick = () => {
    setPopupVisible(true);
  };

  const handleConfirm = async() => {
    if(male?.id && female?.id){
      const data: VoteLogRequest = {
        maleId: male.id,
        femaleId: female.id
      }
      try{
        const res = await insertVoteLog(data);
        if(res.status === 201){
          setPopupVisible(false);
          onAfterStatus(false);
        }
      }catch(error){
        console.error("Failed to vote:", error);
      }
    }
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <div className="relative group flex flex-col justify-center">
      <h2 className="text-primary text-lg text-bold mb-4 text-center">👇!! Click here to vote Both !!👇</h2>
        <button
          className="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-violet-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-violet-600"
          onClick={handleClick}
        >
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 via-red-400 to-violet-700 p-[2px] opacity-20 transition-opacity duration-500 group-hover:opacity-100"></span>
          <span className="relative z-10 block px-20 py-3 rounded-2xl bg-violet-600">
            <div className="relative z-10 flex items-center space-x-3 justify-center">
              <span className="text-violet-300">Vote</span>
            </div>
          </span>
        </button>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Confirm Your Selection
            </h2>
            <p className="mb-4">KING  : {male?.name}</p>
            <p className="mb-4">QUEEN : {female?.name}</p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
