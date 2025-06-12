import { CodeLoginRequest } from "@/api/authApi";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import PinInput from "react-pin-input";

const VotingPinInput: React.FC = () => {

  const { codelogin } = useAuthContext();
  const [PinError , setPinError] = useState(false);

  const handleComplete = async (value: string) => {
    const request: CodeLoginRequest = { Rcode: value };
    try {
      await codelogin(request);
      // Handle successful login if needed
    } catch (error) {
      console.error("Invalid PIN code", error);
      setPinError(true);
    }
    // Add your PIN verification logic here
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-white mb-6">Enter Your PIN</h2>
      <PinInput
        length={6} // Set the length of the PIN
        initialValue=""
        type="custom"
        inputMode="text"
        style={{ display: "flex", justifyContent: "center" }}
        inputStyle={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "transparent",
          borderRadius: "10px",
          width: "35px",
          height: "35px",
          margin: "0 4px",
          fontSize: "24px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.1)",
          backgroundColor: "#222",
          color: "#fff",
          outline: "none",
          transition: "0.3s ease-in-out",
        }}
        inputFocusStyle={{
          borderColor: "#8a00c4", // Neon color
          boxShadow: "0 0 10px #2d2a98, 0 0 40px #8a00c4", // Neon glow effect
        }}
        onComplete={handleComplete} // Triggered when PIN is completely entered
      />
      {PinError && <p className="text-red-500">Invalid PIN</p>}
    </div>
  );
};

export default VotingPinInput;
