import React, { useState } from "react";
import axios from "axios";
import { Card, Input, Typography } from "@material-tailwind/react";
import { toast, Toaster } from 'react-hot-toast';
import Department from "./Department";

export default function AddDepartmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      const response = await axios.post("/doctor/createDepartment/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success('Department added succefully')
      console.log(response.data); 

      // Reset form fields
      setName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Could not add department", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <Card color="transparent" shadow={false} className="ml-3 mt-3">
        <Toaster position="top-center" reverseOrder={false} limit={1}></Toaster>
      <Typography variant="h4" color="blue-gray" className="font-serif mt-3 text-start ">
        Add Department
      </Typography>

      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Input
            size="lg"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 mt-3"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="focus:outline-none mt-5"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none "
          >
            Add Department
          </button>
        </div>
      </form>
    </Card>
  );
}
