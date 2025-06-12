import VotingPinInput from "@/components/VotingPinInput";
import utyccImage from "@/assets/utycc.png";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TwinklingParticles from "@/components/ui/TwinklingParticles ";

export function AuthCodePage() {
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center items-center sm:py-12">
      <div className="absolute z-0">
        <TwinklingParticles />
      </div>
      <SpotlightCard className="w-[350px] z-10 relative">
        <div>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <h2 className="text-primary text-base font-poppins mb-3 font-semibold text-end">
                2024-2025
              </h2>
            </div>
            <img src={utyccImage} alt="UTYCC" className="size-24 mb-4" />
            <h1 className="text-primary text-2xl font-poppins mb-3 font-semibold">
              WELCOME TO UTYCC
            </h1>
            <h1 className="text-primary text-2xl font-poppins mb-3 font-semibold">
              KING & QUEEN
            </h1>
            <h1 className="text-primary text-xl font-poppins mb-3 font-semibold">
              VOTING EVENT
            </h1>
          </div>
          <VotingPinInput />
        </div>
      </SpotlightCard>

    </div>
  );
}
