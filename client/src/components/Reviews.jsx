import { Avatar } from "antd";
import StarIcon from "./StarIcon";
import HorizontalScroll from "./HorizontalScroll";

function User() {
  return (
    <div className="w-[300px] md:w-[350px]">
      <div className="flex items-center gap-4">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          className="w-14 h-14"
        />
        <div>
          <h1 className="font-bold text-[16px]">Tania Andrew</h1>
          <p className="font-normal text-[14px] text-gray-700">
            Abuja, Nigeria
          </p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <StarIcon rating={5} /> <p className="text-gray-800">September 2022</p>
      </div>
      <p className="font-normal text-[18px] text-gray-900 leading-10">
        Incredible beautiful place with a perfect combination of privacy and
        access to serene environment.
      </p>
    </div>
  );
}

function Review() {
  return (
    <div>
      <User />
    </div>
  );
}
export default function Reviews() {
  return (
    <HorizontalScroll
      title="Reviews"
      description="Average rating will appear after 3 reviews"
      top="-bottom-5"
    >
      <Review />
      <Review />
      <Review />
      <Review />
    </HorizontalScroll>
  );
}
