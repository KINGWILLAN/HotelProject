/* eslint-disable react/prop-types */

export default function OtpInput({ otp, setOtp, inputRefs }) {
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric values
    if (/[^0-9]/.test(value)) {
      return;
    }

    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (index < otp.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to the previous input on backspace
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full bg-purple-50/20 my-5 rounded-md shadow-lg">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className="w-12 h-12 py-4 my-5 !border !border-gray-500 bg-white text-gray-800 rounded-md shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-950 focus:!border-t-gray-900 focus:ring-gray-900/10 font-bold font-lato text-[20px] text-center outline-none"
        />
      ))}
    </div>
  );
}
