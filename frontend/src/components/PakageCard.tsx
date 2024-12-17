import { Link } from "react-router-dom";

interface PackageCardProps {
  packageData: {
    _id: string;
    Title: string;
    Description: string;
    Image: string;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center items-center p-5">
        <img
          className="rounded-t-lg"
          src={packageData.Image || "default-image.jpg"}
          alt={packageData.Title}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {packageData.Title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {packageData.Description}
        </p>
        <Link
          to={`/packages/${packageData._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View more
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
