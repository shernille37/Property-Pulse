import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import PropertySearchForm from "@/components/PropertySearchForm";
import PropertyCard from "@/components/PropertyCard";

import { convertToObject } from "@/utils/convertToObject";

import ErrorBadge from "@/components/ErrorBadge";
import { FaArrowLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const properties = await Property.find(query).lean();
  const convertedProperties = convertToObject(properties);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <div className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="fas fa-arrow-left mr-2" />
              Back to Properties
            </Link>
          </div>

          <h1 className="text-2xl mb-4">Search Results</h1>

          {convertedProperties.length == 0 ? (
            <ErrorBadge error={"No search results"} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {convertedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;
