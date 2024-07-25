import { useEffect, useState } from 'react';
import { useAuth } from '../../store/AuthContext'; 
import { fetchOffers , deleteOffer  } from '../../httpService/offers'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import defaultImage from '../../assets/house.jpg';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authData } = useAuth(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOffers(authData.token);
        if (data && Array.isArray(data.data)) {
          setOffers(data.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authData.token) {
      fetchData();
    }
  }, [authData.token]);

  const handleEditClick = (offerId) => {
    navigate(`/home/offers/edit-offer/${offerId}`);
  };

  const handleDeleteClick = async (offerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this offer?');
    if (!confirmDelete) return;

    try {
      await deleteOffer(authData.token, offerId);
      setOffers(offers.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error('Error deleting offer:', error.message);
    }
  };

  const handleAddClick = () => {
    navigate('/home/offers/add-offer');  
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#0000ff" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-20 py-6">
      <h1 className="text-3xl font-bold mb-10">Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              style={{ width: '300px', position: 'relative' }}
            >
              <div className="flex justify-between p-2 absolute top-2 right-2">
                <FontAwesomeIcon 
                  icon={faEdit} 
                  onClick={(e) => { e.stopPropagation(); handleEditClick(offer.id); }} 
                  className="cursor-pointer text-blue-500 hover:text-blue-700" 
                />
                <FontAwesomeIcon 
                  icon={faTrash} 
                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(offer.id); }} 
                  className="cursor-pointer text-red-500 hover:text-red-700" 
                />
              </div>
              <img 
                src={defaultImage} // Use the imported image
                alt={offer.en_description} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-blue-600" dangerouslySetInnerHTML={{ __html: offer.en_description }}></h2>
                <p className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: offer.ar_description }}></p>
                <p className="text-gray-500 text-sm">Offer ID: {offer.id}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available.</p>
        )}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-700 text-white p-8 rounded-full shadow-lg hover:bg-blue-900 transition duration-300 ease-in-out"
        onClick={handleAddClick}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Offers;
