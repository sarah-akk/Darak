import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext'; 
import { getOffer, updateOffer } from '../../httpService/offers'; 
import { ClipLoader } from 'react-spinners';

const EditOffer = () => {
  const [image, setImage] = useState(null);
  const [arDescription, setArDescription] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { authData } = useAuth();
  const navigate = useNavigate();
  const { offerId } = useParams(); 

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const offer = await getOffer(authData.token, offerId);
        setArDescription(offer.data.ar_description);
        setEnDescription(offer.data.en_description);
        setImage(offer.data.image); 
      } catch (error) {
        console.error('Error fetching offer:', error.message);
      }
    };

    fetchOffer();
  }, [authData.token, offerId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancel = () => {
    navigate('/home/offers'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('image', image);
    formData.append('ar_description', arDescription);
    formData.append('en_description', enDescription);
    
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
      await updateOffer(authData.token, offerId, formData);
      navigate('/home/offers');
    } catch (error) {
      console.error('Error updating offer:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Edit Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" id="image" onChange={handleImageChange} className="mt-1" />
        </div>
        <div>
          <label htmlFor="arDescription" className="block text-sm font-medium text-gray-700">Arabic Description</label>
          <textarea
            id="arDescription"
            value={arDescription}
            onChange={(e) => setArDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="enDescription" className="block text-sm font-medium text-gray-700">English Description</label>
          <textarea
            id="enDescription"
            value={enDescription}
            onChange={(e) => setEnDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={20} color="#fff" />
                <span className="ml-2">Saving...</span>
              </div>
            ) : (
              'Save'
            )}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOffer;
