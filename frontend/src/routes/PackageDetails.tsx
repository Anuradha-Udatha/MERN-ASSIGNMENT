import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface PackageDetailsType {
  _id: string;
  Title: string;
  Description: string;
  Image: string;
  Price: number;
  AvailableDates: string[];
}

const PackageDetails = () => {
  const { id } = useParams(); // Get the dynamic ID from the route
  const [packageDetails, setPackageDetails] = useState<PackageDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false); // State to toggle booking form

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/packages/${id}`);
        setPackageDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package details:", error);
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleBookNowClick = () => {
    setShowBookingForm(true); // Show booking form when clicked
  };

  if (loading) {
    return <p>Loading package details...</p>;
  }

  if (!packageDetails) {
    return <p>Package not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            className="w-full max-w-lg rounded-lg shadow-lg"
            src={packageDetails.Image || "default-image.jpg"}
            alt={packageDetails.Title}
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-blue-600">
            {packageDetails.Title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {packageDetails.Description}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-300">
            Price: <span className="text-blue-600">{packageDetails.Price} INR</span>
          </p>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-blue-600 mb-2">
              Available Dates:
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
              {packageDetails.AvailableDates && packageDetails.AvailableDates.length > 0 ? (
                packageDetails.AvailableDates.map((date, index) => (
                  <li key={index}>{new Date(date).toLocaleDateString()}</li>
                ))
              ) : (
                <p>No available dates.</p>
              )}
            </ul>
          </div>
          <button
            onClick={handleBookNowClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Form (conditionally rendered) */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Book Now</h2>
            <form action="/api/v1/bookings" method="POST" className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="number"
                name="numOfTravellers"
                placeholder="Number of Travellers"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              <textarea
                name="specialRequests"
                placeholder="Special Requests"
                className="w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
              <input
                type="hidden"
                name="packageId"
                value={packageDetails._id}
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Submit Booking
                </button>
              </div>
            </form>
            <button
              onClick={() => setShowBookingForm(false)}
              className="mt-4 text-red-600 hover:text-red-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
