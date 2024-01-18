/* eslint-disable react/prop-types */
import { Card, CardBody, Dialog } from "@material-tailwind/react";
import LoginRegister from "./LoginRegister";
import { useContext, useState } from "react";
import VerifyEmail from "./VerifyEmail";
import useScreenSize from "../../../hooks/useScreenSize";
import { AppContext } from "../../../App";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/userSlice";

export default function AuthModal({ label }) {
  const { isVerySmallScreen } = useScreenSize();
  const [showVerify, setShowVerify] = useState(false);
  const { openAuthModal, handleOpenAuthModal } = useContext(AppContext);
  const user = useSelector(selectUser);
  return (
    <>
      <Dialog
        size="xs"
        animate={{
          mount: { scale: 1, y: 3 },
          unmount: { scale: 0.9, y: -100 },
        }}
        open={openAuthModal}
        handler={handleOpenAuthModal}
        className="bg-transparent shadow-md font-roboto"
      >
        <Card className="mx-auto w-full max-w-[36rem]  pt-7 py-5">
          <CardBody className="flex flex-col gap-4">
            <div className="w-full flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Hotels.com_Logo.png/150px-Hotels.com_Logo.png"
                alt="logo"
                loading="lazy"
                className={`${
                  isVerySmallScreen ? "w-[150px]" : "w-[200px]"
                }  object-contain`}
              />
            </div>

            {showVerify || (user?.email && label === "Register") ? (
              <VerifyEmail
                setShowVerify={setShowVerify}
                handleOpenAuthModal={handleOpenAuthModal}
              />
            ) : (
              <LoginRegister
                label={label}
                setShowVerify={setShowVerify}
                handleOpenAuthModal={handleOpenAuthModal}
              />
            )}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
