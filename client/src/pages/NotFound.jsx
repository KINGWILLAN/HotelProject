import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[50vh] -full items-center justify-center bg-purple-50/20 text-gray-800 flex flex-col gap-10">
      <h1 className="text-[45px] text-purple-500">
        The page you requested for is not found
      </h1>
      <br />
      <Link to="/" className="flex text-[40px] flex-col gap-10">
        Please redirect to the Home Page
        <Button>Home</Button>
      </Link>
    </div>
  );
}
