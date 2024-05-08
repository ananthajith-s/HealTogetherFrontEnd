import axios from 'axios';
import React, { useState, useEffect } from 'react';
import avatar from '../../images/doctorAvatar.jpg';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  async function getDoctors() {
    try {
      const response = await axios.get('/doctor/doctors/');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  async function changeStatus(id) {
    try {
      const response = await axios.get(`/doctor/blockDoctor/${id}`);
      getDoctors();
    } catch (error) {
      console.error('No related user', error);
    }
  }

  return (
    <div className="flex h-full bg-acontent mt-3">
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <div className="w-full p-5 flex justify-between">
            <h1 className="font-serif text-3xl text-start  ms-4">Doctors List</h1>
            <input
              type="text"
              placeholder="&#x1F50D; Search email or name"
              className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Doctor Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {filteredDoctors?.length > 0 ? (
                  filteredDoctors?.map((doctor, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          {doctor?.image ? (
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={doctor?.image}
                             alt="avatar"
                            />
                          ) : (
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={avatar}
                              alt="avatar"
                            />
                          )}
                          {doctor?.is_active ? (
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                          ) : (
                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 ring ring-white"></span>
                          )}
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">{doctor?.username}</div>
                          <div className="text-gray-400">{doctor?.email}</div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <p>{doctor?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        {doctor?.is_active ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            Blocked
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex">
                          <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={doctor.is_active}
                              readOnly
                            />
                            <div
                              onClick={() => changeStatus(doctor?.id)}
                              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            {doctor?.is_active ? (
                              <span className="ml-2 text-sm font-medium text-gray-900">Block</span>
                            ) : (
                              <span className="ml-2 text-sm font-medium text-gray-900">Unblock</span>
                            )}
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-red-500 font-bold"
                    >
                      No related doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
