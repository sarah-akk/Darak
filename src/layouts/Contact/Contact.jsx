// src/layouts/Contact.jsx

import { useEffect, useState } from 'react';
import { fetchContactInfo, updateContactInfo, deleteContactInfo } from '../../httpService/contact';
import { useAuth } from '../../store/AuthContext';
import ContactForm from '../Contact/ContactForm';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const { authData } = useAuth();

  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const data = await fetchContactInfo(authData.token);
        setContactInfo(data);
      } catch (error) {
        console.error('Failed to fetch contact info:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getContactInfo();
  }, [authData.token]);

  const handleFormSubmit = async (formData) => {
    try {
      await updateContactInfo(authData.token, formData);
      setContactInfo(prevInfo => ({ ...prevInfo, [formData.key]: formData.value }));
      setIsFormOpen(false);
      setCurrentEdit(null);
    } catch (error) {
      console.error('Failed to update contact info:', error.message);
    }
  };

  const handleEditClick = (key, value) => {
    setCurrentEdit({ key, value });
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setCurrentEdit(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (key) => {
    try {
      await deleteContactInfo(authData.token, key);
      setContactInfo(prevInfo => {
        const updatedInfo = { ...prevInfo };
        delete updatedInfo[key];
        return updatedInfo;
      });
    } catch (error) {
      console.error('Failed to delete contact info:', error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (!contactInfo) {
    return <div>No contact information available</div>;
  }

  const contactEntries = Object.entries(contactInfo);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <button
        onClick={handleAddClick}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Contact
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactEntries.map(([key, value]) => (
          <div key={key} className="border rounded-lg p-4 shadow-md flex flex-col bg-white">
            <div className="flex-1">
              <h3 className="text-xl font-semibold capitalize">{key.replace(/[0-9]/g, '')}</h3>
              <p className="mt-2">{value}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => handleEditClick(key, value)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteClick(key)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFormOpen && (
        <ContactForm
          initialData={currentEdit}
          onSubmit={handleFormSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Contact;
