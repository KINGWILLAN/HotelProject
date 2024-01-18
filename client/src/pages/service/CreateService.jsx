/* eslint-disable react/prop-types */
import { Button, Input, Progress, Textarea } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { serviceMutation } from "../../queries/user.mutation";
import { errorFormat } from "../../../../api/src/utils/shared";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { AppContext } from "../../App";
import { selectToken, selectUser } from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCompression from "../../components/images/ImageCompressor";
import { getPresignedUrl, uploadToS3 } from "../../utils/upload";
import CountriesSelect from "../../components/CountriesSelect";
import { getStatesOfCountry } from "../../utils/countries";
import { SelectInput } from "../../components/SelectInput";
import useCoordinates from "../../hooks/useCoordinates";
import LocationTracker from "../../components/LocationTracker";
// import { Image } from "cloudinary-react";

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

export default function CreateService() {
  const user = useSelector(selectUser);
  const { handleOpenAuthModal } = useContext(AppContext);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const location = useLocation();
  const [servicePackage, setServicePackage] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceCity, setServiceCity] = useState(user?.city);
  const [serviceCountry, setServiceCountry] = useState(user?.country);
  const [serviceState, setServiceState] = useState(user?.state);
  // const [lat, setLat] = useState(null);
  // const [long, setLong] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [files, setFiles] = useState([]);
  const { lat, long } = useCoordinates();

  const serviceCreationMutation = useMutation({
    mutationFn: serviceMutation,
    onError: (error) => {
      const { message } = errorFormat(error);
      toast.error(message, {
        position: "top-center",
        theme: "colored",
      });
    },
    onSuccess: () => {
      navigate("/");
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

  async function handleCreateService() {
    // Get presignedUrl and Upload images to AWS;
    // handleUpload();
    const serviceImageUrl = [];
    try {
      if (files) {
        for (let file of files) {
          const { url, key } = await getPresignedUrl(file.type, token);
          await uploadToS3(url, file, (uploadPercentage) => {
            console.log(`Upload Progress: ${uploadPercentage}%`);
            setPercentage(uploadPercentage);
          });
          serviceImageUrl.push(key);
        }
      }
    } catch (error) {
      console.log(error);
    }

    serviceCreationMutation.mutate({
      serviceLocation: {
        city: serviceCity,
        country: serviceCountry,
        state: serviceState,
      },
      accountType: "services",
      servicePackage,
      serviceExactLocation: {
        coordinates: [long, lat],
      },
      serviceImages: serviceImageUrl,
      token,
      serviceDescription,
    });
  }
  if (!user) {
    return;
  }
  return (
    <div>
      <div>
        <div className="flex gap-5 flex-col shadow-md shadow-red-50/70 my-10 max-w-xl mx-auto p-10">
          <h1 className="text-[25px] text-extrabold font-lato text-gray-800">
            Create a service
          </h1>
          <InputIcon
            value={user?.email}
            label="Service Email"
            icon={
              <p className="font-extrabold font-xl font-lato items-center">@</p>
            }
            readOnly
          />
          <InputIcon
            value={servicePackage}
            setValue={setServicePackage}
            label="Service Package"
          />
          <div className="w-80">
            <Textarea
              label="Service Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </div>
          <CountriesSelect
            country={serviceCountry}
            setCountry={setServiceCountry}
          />
          <SelectInput
            label="State"
            data={getStatesOfCountry(serviceCountry)}
            setValue={setServiceState}
            value={serviceState}
          />
          <InputIcon
            value={serviceCity}
            setValue={setServiceCity}
            label="Service City"
          />
          <LocationTracker lat={lat} long={long} />
          <div>
            <h1>Please provide photos of the service you&apos;re rendering.</h1>
            <ImageCompression files={files} setFiles={setFiles} />
          </div>
          {!!percentage && (
            <div>
              <p>Uploading images</p>
              <Progress value={percentage} label="Completed" />
            </div>
          )}
          <Button color="red" className="w-80" onClick={handleCreateService}>
            Create
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
