/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { IoMdShare } from "react-icons/io";
import { Divider } from "antd";
import { MdFavoriteBorder } from "react-icons/md";
import IconStyle from "../components/IconStyle";
import PhotosPreviewModal from "../components/modal/PhotosPreviewModal";
import { useState } from "react";
import Container from "../components/Container";
import PreviewManyPhotos from "../components/PreviewManyPhotos";
import { Typography } from "@material-tailwind/react";
import ReservationCard from "../components/ReservationCard";
import InlineContainer from "../components/InlineContainer";
import WhatYouEnjoy from "../components/WhatYouEnjoy";
import Environs from "../components/Environs";
import DatePicker from "../components/DatePicker";
import Reviews from "../components/Reviews";
import StarIcon from "../components/StarIcon";
import ThingsToKnow from "../components/ThignsToKnow";
import { useSelector } from "react-redux";
import { selectServices } from "../redux/slices/servicesSlice";

export default function ServicePage() {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const { serviceId } = useParams();
  const dbService = useSelector(selectServices);
  const service = dbService.find(
    (service) => service?._id.toString() === serviceId
  );

  const { isVerySmallScreen, isTabletScreen } = useScreenSize();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log(service);

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  function handleDateChange(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  function handlePhotoPreviewModal() {
    setOpenPreviewModal((cur) => !cur);
  }
  // if (true) {
  //   return <p>Maintenance mode</p>;
  // }
  return (
    <>
      <div className="pt-7 font-roboto scroll-smooth">
        <Container>
          {/* Category / Like and Share */}
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-[25px] md:text-[35px] font-extrabold transition-all ease-linear">
              {service?.serviceCategory}
            </h1>
            <div className="flex justify-between items-center gap-5">
              <IconStyle
                isVerySmallScreen={isVerySmallScreen}
                Icon={IoMdShare}
                label="Share"
              />
              <IconStyle
                isVerySmallScreen={isVerySmallScreen}
                Icon={MdFavoriteBorder}
                label="Save"
              />
            </div>
          </div>
          {/* Service Images */}
          <div onClick={handlePhotoPreviewModal}>
            {isTabletScreen ? (
              <div className="relative pt-5">
                <img
                  className="h-96 w-full object-cover object-center rounded-lg"
                  src={
                    import.meta.env.VITE_S3_IMAGE_URL +
                    service?.serviceImages[0]
                  }
                  alt={service?.serviceImages[0]}
                />
                <h1 className="absolute bottom-0 right-0 font-extrabold text-white text-[20px] bg-purple-300 px-5 p-1 rounded-tl-lg">
                  1/{service?.serviceImages.length}
                </h1>
              </div>
            ) : (
              <PreviewManyPhotos images={service?.serviceImages} />
            )}
          </div>
          {/* Details about service */}
          <div className="flex flex-col gap-2">
            <Typography
              variant={`${
                isVerySmallScreen ? "h6" : isTabletScreen ? "h5" : "h4"
              }`}
              className="pt-3 font-roboto"
            >
              Comfortable Room in {service?.serviceLocation?.city},{" "}
              {service?.serviceLocation?.state}
            </Typography>
            <StarIcon rating={service?.serviceRating} />
            {/* <Typography variant="paragraph" className="font-lato text-justify">
              {service?.serviceDescription}
            </Typography> */}
          </div>
          <Divider />
          {/* Payment and Reservation */}

          <InlineContainer alignment="text-justify">
            <p className="leading-7">{service?.serviceDescription}</p>
            <Divider />
            <Environs />

            <Divider />
            <WhatYouEnjoy />

            <Divider />
            <DatePicker
              selectionRange={selectionRange}
              handleDateChange={handleDateChange}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
            />
          </InlineContainer>
          <div
            className={`hidden md:inline-block text-[20px] 
            top-20 md:w-1/2 xl:w-2/5 align-top pl-5 lg:pl-10 ${"sticky top-20"} scroll-smooth`}
            style={{
              zIndex: -1,
            }}
          >
            <ReservationCard
              price={service?.servicePrice}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </Container>
        <Divider />
        <Container>
          <div className="bg-white">
            <Reviews />
            <Divider />
            <ThingsToKnow />
          </div>
        </Container>
      </div>
      {/* Modal codes goes here */}
      <PhotosPreviewModal
        openPreviewModal={openPreviewModal}
        handlePhotoPreviewModal={handlePhotoPreviewModal}
        images={service?.serviceImages}
      />
    </>
  );
}
