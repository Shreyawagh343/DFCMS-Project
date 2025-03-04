import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button"; // Assuming you're using a UI library like shadcn/ui
import toast, { Toaster } from "react-hot-toast"; // Import toast for notifications

const DeleteCase = () => {
  const { caseId } = useParams(); 
  // Get the caseId from the URL
  const navigate = useNavigate(); // For redirecting after deletion

  const handleDelete = async () => {
    const token = localStorage.getItem("authtoken"); // Get the authentication token
    if (!token) {
      toast.error("You must be logged in to delete a case.");
      return;
    }

    // Show a toast confirmation dialog
    toast.custom(
      (t) => (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete this case?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)} // Dismiss the toast
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the toast
                try {
                  const response = await axios.delete(
                    `http://localhost:4001/cases/${caseId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                      },
                    }
                  );

                  if (response.status === 200) {
                    toast.success("Case deleted successfully!");
                    let code = JSON.parse(localStorage.getItem("users")).officerCode;
                    navigate(`/officer/${code}/dashboard`); // Redirect to the cases list page after deletion
                  } else {
                    toast.error("Failed to delete case.");
                  }
                } catch (error) {
                  console.error("Error deleting case:", error);
                  toast.error(
                    error.response?.data?.message || "Failed to delete case."
                  );
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep the toast open until the user interacts
      }
    );
  };

  return (
    <>
      <Button
        variant="destructive" // Use a destructive style for the delete button
        onClick={handleDelete} className="text-[1.3rem] ml-[1rem] h-[3rem] bg-red-500 w-[15rem] mt-4"
      >
        Delete Case
      </Button>
      <Toaster /> {/* Render the Toaster component for displaying toasts */}
    </>
  );
};

export default DeleteCase;