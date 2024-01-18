/* eslint-disable react/prop-types */
import {
  Button,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { Divider } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";
import { TiInfoLarge } from "react-icons/ti";
import { authMutation } from "../../../queries/user.mutation";
import { errorFormat } from "../../../utils/errorFormat";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser, setUserAndToken } from "../../../redux/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../App";

function MyInput({ label, value, setValue, type, icon, constraints }) {
  return (
    <div>
      <Input
        label={label}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        icon={icon}
        value={value}
        size="lg"
      />
      {constraints && (
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center gap-1 font-normal"
        >
          <TiInfoLarge /> {constraints}
        </Typography>
      )}
    </div>
  );
}

export default function LoginRegister({ label, setShowVerify }) {
  const [showPassword, setShowPassword] = useState(false);
  const { handleOpenAuthModal } = useContext(AppContext);
  const [action, setAction] = useState(label);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  const mutation = useMutation({
    mutationFn: authMutation,
    onError(error) {
      console.log(error);
      setTimeout(() => {
        toast.error(errorFormat(error).message, {
          position: "top-center",
        });
      }, 1);
    },
    onSuccess(data) {
      // const {token, user} = data.data;
      // save user and token to redux store here
      if (data.data.token) {
        // Save token to redux store because we will need it later in the future.
        // close modal
        dispatch(setUserAndToken(data.data));
        handleOpenAuthModal();
      } else {
        // proceed to verification page
        dispatch(setUser(data.data));
        setShowVerify(true);
      }
    },
  });

  let canContinue = validator.isEmail(email) && !!password;

  function handleAuth() {
    // code for handling Authentication Here
    if (action === "Register") {
      mutation.mutate({ email, password });
    } else {
      console.log(action, "here");
      mutation.mutate({ email, password, route: "login" });
    }
  }

  useEffect(() => {
    setAction(label);
  }, [label]);

  function toggleAction() {
    setAction((prev) => {
      if (prev === "Login") {
        return "Register";
      }
      return "Login";
    });
  }

  if (mutation.isPending) {
    canContinue = false;
  }

  return (
    <>
      <CardBody className="flex flex-col gap-4">
        <Typography className="text-gray-900 font-normal text-2xl text-center">
          Welcome
        </Typography>
        <Typography
          className="text-center text-[17px] font-normal text-gray-900"
          variant="paragraph"
          color="gray"
        >
          Enter your email and password to <strong>{action}</strong>.
        </Typography>
        <Typography className="-mb-2" variant="h6">
          Your Email
        </Typography>

        <MyInput
          label="Email"
          value={email}
          setValue={setEmail}
          constraints="Must be a valid Email"
          icon={<p className="font-extrabold text-black ">@</p>}
        />
        <Typography className="-mb-2" variant="h6">
          Your Password
        </Typography>
        <MyInput
          label="Password"
          value={password}
          type={`${showPassword ? "text" : "password"}`}
          setValue={setPassword}
          showPassword={showPassword}
          icon={
            showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye onClick={() => setShowPassword(true)} />
            )
          }
          constraints="Must be more than three chars"
        />

        <div className="-ml-2.5 -mt-3">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          color="red"
          onClick={handleAuth}
          disabled={!canContinue}
          fullWidth
          className="bg-purple-500"
        >
          {action}
        </Button>
        <Typography variant="small" className="mt-4 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={toggleAction}
          >
            {action === "Login" ? "Register" : "Login"}
          </Typography>
        </Typography>
        <Divider>Or</Divider>
        <Button
          variant="outlined"
          fullWidth
          className="flex items-center text-left gap-3 mb-10"
        >
          <FcGoogle className="text-lg" />
          <Typography
            variant="paragraph"
            className="font-medium capitalize font-lato"
          >
            Continue with Google
          </Typography>
        </Button>
        <ToastContainer autoClose={8000} />
      </CardFooter>
    </>
  );
}
