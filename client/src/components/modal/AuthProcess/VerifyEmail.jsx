/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { Typography } from "antd";
import { useState, useRef, useEffect, useMemo, useContext } from "react";
import OtpInput from "../../Otp";
import { FaChevronLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { resendCode, verifyUser } from "../../../queries/user.queries";
import { ToastContainer, toast } from "react-toastify";
import { errorFormat } from "../../../utils/errorFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setUser,
  setUserAndToken,
} from "../../../redux/slices/userSlice";
import { AppContext } from "../../../App";

export default function VerifyEmail({ setShowVerify }) {
  const { handleOpenAuthModal } = useContext(AppContext);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const user = useSelector(selectUser);
  const memoizeOtp = useMemo(() => otp, []);
  const inputRefs = useRef([]);
  const verifyEmail = useQuery({
    queryKey: ["veryEmail", user?.email, code],
    meta: {
      code,
      email: user?.email,
    },
    queryFn: verifyUser,
    enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const [verified, setVerified] = useState(false);
  const resendVerificationCode = useQuery({
    queryKey: ["resendCode", user?.email],
    meta: {
      email: user?.email,
    },
    queryFn: resendCode,
    enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const dispatch = useDispatch();

  // Send message for user verification success
  useEffect(() => {
    if (verifyEmail?.data) {
      dispatch(setUserAndToken(verifyEmail.data.data));
      toast.success("You're verified", {
        position: "top-center",
        theme: "colored",
      });
      setVerified(true);
    }
  }, [dispatch, handleOpenAuthModal, verifyEmail.data]);

  // Send verification success message
  useEffect(() => {
    if (resendVerificationCode.isSuccess) {
      toast.success("OTP sent", {
        position: "top-center",
        theme: "colored",
      });
    }
  }, [resendVerificationCode.isSuccess]);

  // check if there's an error verifying user
  useEffect(() => {
    if (verifyEmail?.isError) {
      const { message } = errorFormat(verifyEmail.error);
      toast.error(message, {
        position: "top-right",
        theme: "colored",
      });
    }
  }, [verifyEmail.error, verifyEmail.isError]);

  useEffect(() => {
    setCode(otp.join(""));
  }, [otp]);
  return (
    <div>
      <p
        className="absolute top-14 flex items-center cursor-pointer"
        onClick={() => setShowVerify(false)}
      >
        <FaChevronLeft className=" text-[20px] text-gray-800 shadow-lg" />{" "}
        <span className="text-xs">Go back</span>
      </p>
      <Typography className="text-gray-900 font-normal text-2xl text-center">
        Email Verification
      </Typography>
      <Typography
        className="text-center text-[17px] font-normal text-gray-900"
        variant="paragraph"
        color="gray"
      >
        <strong>Check your Email for an OTP Code </strong>.
      </Typography>
      {/* Enter Verification */}
      <div className="flex justify-center items-center flex-col gap-4">
        <OtpInput otp={otp} setOtp={setOtp} inputRefs={inputRefs} />
        <Button
          className="w-72 py-4"
          color={verified ? "green" : "red"}
          disabled={code.length !== 6}
          onClick={() => verifyEmail.refetch()}
        >
          {verified ? "Verified." : "Let's check"}
        </Button>
        <p className="py-5 text-gray-600 font-normal font-lato ">
          Didn&apos;t receive an OTP?{" "}
          <span
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => {
              setOtp(memoizeOtp);
              resendVerificationCode.refetch();
            }}
          >
            Resend
          </span>
        </p>
        <Button
          color="green"
          fullWidth
          onClick={() => dispatch(setUser({ user: null }))}
          disabled={verified}
        >
          Use another Email
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
