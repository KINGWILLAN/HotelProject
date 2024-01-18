/* eslint-disable react/prop-types */
import { Button, Input } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { getStatesOfCountry } from "../../utils/countries";
import { useMutation } from "@tanstack/react-query";
import { updateRegistrationMutation } from "../../queries/user.mutation";
import { errorFormat } from "../../../../api/src/utils/shared";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";
import {
  selectToken,
  selectUser,
  setUserAndToken,
} from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import CountriesSelect from "../../components/CountriesSelect";
import { SelectInput } from "../../components/SelectInput";
import LocationTracker from "../../components/LocationTracker";
import useCoordinates from "../../hooks/useCoordinates";

function InputIcon({ value, setValue, label, icon, readOnly }) {
  return (
    <div className="w-80">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        icon={icon}
        className="h-20"
        readOnly={readOnly}
      />
    </div>
  );
}

export default function Service() {
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const { handleOpenAuthModal } = useContext(AppContext);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const location = useLocation();
  const { lat, long } = useCoordinates();
  console.log(location.pathname);

  const updateUserMutation = useMutation({
    mutationFn: updateRegistrationMutation,
    onError: (error) => {
      const { message } = errorFormat(error);
      toast.error(message, {
        position: "top-center",
        theme: "colored",
      });
    },
    onSuccess: (data) => {
      // save user and token to redux store here
      if (data.data.token) {
        // Save token to redux store because we will need it later in the future.
        // close modal
        dispatch(setUserAndToken(data.data));
        navigate("/service/create");
      }
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/", {
        state: location.pathname,
      });
    }

    if (user?.accountType === "services") {
      navigate("/service/create");
    }
  }, [handleOpenAuthModal, location.pathname, navigate, user]);

  function handleProfileUpdate() {
    console.log("here");
    updateUserMutation.mutate({
      registrationNumber: companyId,
      country,
      state,
      city: companyCity,
      accountType: "services",
      name: companyName,
      location: {
        lat,
        long,
      },
      token,
    });
  }
  if (!user) {
    return;
  }
  return (
    <div>
      <div>
        {/* services */}
        {/* Login */}
        <div className="flex gap-5 flex-col shadow-md shadow-red-50/70 my-10 max-w-xl mx-auto p-10">
          <h1 className="text-[25px] text-extrabold font-lato text-gray-800">
            Register your company with us.
          </h1>
          <InputIcon
            value={user?.email}
            label="Company Email"
            icon={
              <p className="font-extrabold font-xl font-lato items-center">@</p>
            }
            readOnly
          />
          <InputIcon
            value={companyName}
            setValue={setCompanyName}
            label="Company Name"
          />
          <InputIcon
            value={companyId}
            setValue={setCompanyId}
            label="Company Id"
          />
          <CountriesSelect country={country} setCountry={setCountry} />
          <SelectInput
            label="State"
            data={getStatesOfCountry(country)}
            setValue={setState}
            value={state}
          />
          <InputIcon
            value={companyCity}
            setValue={setCompanyCity}
            label="Company City"
          />
          <LocationTracker lat={lat} long={long} />
          <Button color="red" className="w-80" onClick={handleProfileUpdate}>
            Continue
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
