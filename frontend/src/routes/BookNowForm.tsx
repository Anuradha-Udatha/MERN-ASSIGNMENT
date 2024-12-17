import React, { useState } from "react";
import axios from "axios";

interface BookNowFormProps {
  PackageId: string; // PackageId passed as a prop
  onClose: () => void; // Function to close the modal
}

const BookNowForm: React.FC<BookNowFormProps> = ({ PackageId, onClose }) => {
  // Individual state variables for each input field
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [NumberOfTravellers, setNumberOfTravellers] = useState(1);
  const [SpecialRequests, setSpecialRequests] = useState("");
  
  const [error, setError] = useState(""); // To handle form errors
  const [loading, setLoading] = useState(false); // To manage form submission state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
  
    try {
      const data = {
      name: Name,  // Changed from Name to lowercase
      email: Email,  // Changed from Email to lowercase
      phone: PhoneNumber,  // Changed from PhoneNumber to 'phone'
      numOfTravellers: NumberOfTravellers,  // Changed key name
      specialRequests: SpecialRequests || "",
      packageId: PackageId  // Changed from PackageId to lowercase
      };
  
      console.log("Exact payload being sent:", JSON.stringify(data, null, 2));
  
      const response = await axios.post(
        "http://localhost:3000/api/v1/bookings", 
        data, 
        {
          headers: { 
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Booking successful:", response.data);
      alert("Booking successful!");
      onClose();
    } catch (error: any) {
      console.error("Full error object:", error);
      
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
  
      setError("Failed to book. Please try again."); 
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold mb-4">Book Now</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Show error message */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)} // Update individual state
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)} // Update individual state
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} // Update individual state
              required
              pattern="^[0-9]{10}$" // Validate phone number (10 digits)
              title="Phone number must be 10 digits"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Travellers</label>
            <input
              type="number"
              value={NumberOfTravellers}
              onChange={(e) => setNumberOfTravellers(Number(e.target.value))} // Parse as number
              required
              min={1}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Requests</label>
            <textarea
              value={SpecialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)} // Update individual state
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-2 px-4 rounded-md shadow-md ${loading ? "bg-gray-400" : "bg-blue-600"} text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookNowForm;
