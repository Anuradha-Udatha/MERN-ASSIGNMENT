import axios from "axios";
import { useState, useEffect } from "react";
import PackageCard from "../components/PakageCard";
import Heading from "../components/Heading";


interface Package {
  _id: string;
  Title: string;
  Description: string;
  Image: string;
}

interface ApiResponse {
    success: boolean;
    data: Package[];  
  }

const Packages = () => {
  const [loading, setLoading] = useState(true);
  const [tourPackages, setTourPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:3000/api/v1/packages");

        if (Array.isArray(response.data.data)) {
            setTourPackages(response.data.data);
          } else {
            console.error("Expected an array, but received:", response.data);
          }
        
        // Filter the required fields from the API response
        const filteredPackages = response.data.data.map(pkg => ({
          _id: pkg._id,
          Title: pkg.Title,
          Description: pkg.Description,
          Image: pkg.Image,
        }));

        setTourPackages(filteredPackages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <p>Loading packages...</p>;
  }

  return (
    <>
    <Heading></Heading>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-3">
      {tourPackages.length > 0 ? (
        tourPackages.map((pkg) => (
          <PackageCard
            key={pkg._id} // Use _id as the key
            packageData={pkg} // Pass the package data directly
          />
        ))) : (<p>No packages available at the moment.</p>)}
    </div>
    </>
  );
};

export default Packages;
