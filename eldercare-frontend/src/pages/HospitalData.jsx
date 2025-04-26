import React from 'react';

const HospitalData = () => {
  // Static hospital information
  const hospitalInfo = {
    name: "Pune Elderly Care Hospital",
    address: "101, Care Street, Pune, Maharashtra, India",
    contact: "020-12345678", // Emergency contact number
    services: [
      "24/7 Emergency Services",
      "Elderly Care and Support",
      "General Medicine",
      "Cardiology",
      "Neurology",
      "Physical Therapy",
      "Medication Management",
      "Routine Health Check-ups"
    ],
    doctorList: [
      { name: "Dr. Arun Kumar", specialty: "Geriatrics" },
      { name: "Dr. Priya Deshmukh", specialty: "Cardiology" },
      { name: "Dr. Rajesh Mehta", specialty: "Neurology" }
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{hospitalInfo.name}</h1>
      <p className="text-xl">{hospitalInfo.address}</p>
      <p className="text-xl">Emergency Contact: <a href={`tel:${hospitalInfo.contact}`} className="text-blue-500">{hospitalInfo.contact}</a></p>

      <h2 className="mt-4 text-lg font-semibold">Services:</h2>
      <ul className="list-disc ml-6">
        {hospitalInfo.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-lg font-semibold">Doctors:</h2>
      <ul className="list-disc ml-6">
        {hospitalInfo.doctorList.map((doctor, index) => (
          <li key={index}>
            {doctor.name} - {doctor.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalData;
