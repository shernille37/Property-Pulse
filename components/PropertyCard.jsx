"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
  FaTrash,
} from "react-icons/fa";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";

const PropertyCard = ({ property, savedProperty = false }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };

  const handleDelete = async () => {
    if (!savedProperty) return;

    const res = await bookmarkProperty(property._id);

    if (res.error) return toast.error(res.error);
    toast.success(res.message);
  };

  return (
    <div className="rounded-xl shadow-md relative">
      {savedProperty && (
        <button
          onClick={handleDelete}
          className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-red-500 flex items-center justify-center transition-colors hover:bg-red-100"
        >
          <FaTrash className="text-white" />
        </button>
      )}

      <Link href={`/properties/${property._id}`}>
        <Image
          src={`${property.images[0]}`}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-center md:text-left lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className=" lg:inline" /> {property.beds}{" "}
            <span className=" lg:inline">
              Bed{`${property.beds > 1 ? "s" : ""}`}
            </span>
          </p>
          <p>
            <FaBath className=" lg:inline" /> {property.baths}{" "}
            <span className=" lg:inline">
              Bath{`${property.baths > 1 ? "s" : ""}`}
            </span>
          </p>
          <p>
            <FaRulerCombined className=" lg:inline mr-2" />
            {property.sqft} <span className=" lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaMoneyBill className=" lg:inline" /> Weekly
          </p>
          <p>
            <FaMoneyBill className=" lg:inline" /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
