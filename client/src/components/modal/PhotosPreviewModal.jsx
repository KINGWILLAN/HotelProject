/* eslint-disable react/prop-types */
import { Dialog, Card, CardBody } from "@material-tailwind/react";
import IconStyle from "../IconStyle";
import { FaChevronLeft } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";
import { IoMdShare } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import ImagePreview from "../ImagePreview";

export default function PhotosPreviewModal({
  openPreviewModal,
  handlePhotoPreviewModal,
  images,
}) {
  const { isVerySmallScreen } = useScreenSize();
  return (
    <>
      <Dialog
        size="md"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        open={openPreviewModal}
        handler={handlePhotoPreviewModal}
        className="bg-transparent shadow-md font-roboto"
      >
        <Card className="mx-auto w-full max-w-[1300px] h-[90vh] overflow-y-scroll">
          <CardBody className="flex flex-col gap-4 w-full">
            {/* Icon Styles */}
            <div className="flex justify-between items-center gap-5 sticky bg-white rounded-b-md mt-4 p-3 shadow-md shadow-red-50 top-0 left-0 right-0">
              <FaChevronLeft onClick={handlePhotoPreviewModal} />
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

            {/* Images dumping */}
            {images.map((image, index) => (
              <ImagePreview
                key={image + index}
                src={import.meta.env.VITE_S3_IMAGE_URL + image}
                id={image + index}
              />
            ))}
          </CardBody>
          {/* <CardFooter className="pt-0"></CardFooter> */}
        </Card>
      </Dialog>
    </>
  );
}
