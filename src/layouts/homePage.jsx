import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTags, faBuilding, faConciergeBell, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      <nav className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 bg-gray-100 rounded-lg p-2 w-40 flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2" /> Daraak
        </h2>
        <ul>
          <li className={`mb-4 ${activeLink.startsWith('/home/offers') ? 'text-blue-300' : ''}`}>
            <Link to="offers" className="hover:text-gray-300 flex items-center" onClick={() => setActiveLink('/home/offers')}>
              <FontAwesomeIcon icon={faTags} className="mr-2" /> Offers
            </Link>
          </li>
          <li className={`mb-4 ${activeLink.startsWith('/home/PSections') ? 'text-blue-300' : ''}`}>
            <Link to="PSections" className="hover:text-gray-300 flex items-center" onClick={() => setActiveLink('/home/PSections')}>
              <FontAwesomeIcon icon={faBuilding} className="mr-2" /> Properties
            </Link>
          </li>
          <li className={`mb-4 ${activeLink.startsWith('/home/SerSections') ? 'text-blue-300' : ''}`}>
            <Link to="SerSections" className="hover:text-gray-300 flex items-center" onClick={() => setActiveLink('/home/SerSections')}>
              <FontAwesomeIcon icon={faConciergeBell} className="mr-2" /> Services
            </Link>
          </li>
          <li className={`mb-4 ${activeLink.startsWith('/home/contact') ? 'text-blue-300 ' : ''}`}>
            <Link to="contact" className="hover:text-gray-300 flex items-center" onClick={() => setActiveLink('/home/contact')}>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact
            </Link>
          </li>
          <li className={`mb-4 ${activeLink === '/home/profile' ? 'text-blue-300' : ''}`}>
            <Link to="profile" className="hover:text-gray-300 flex items-center" onClick={() => setActiveLink('/home/profile')}>
              <FontAwesomeIcon icon={faKey} className="mr-2" /> Change Password
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-6 ml-64 bg-gray-100">
        {activeLink === '/home' ? (
          <div className="welcome-section p-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to the Dashboard</h1>
            <p className="text-lg mb-6 text-gray-600">
              Use the navigation menu on the left to manage offers, properties, services, contact information, and your password.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center">
                <FontAwesomeIcon icon={faTags} className="text-3xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Manage Offers</h3>
                  <p className="text-sm">Add, edit, and view offers</p>
                </div>
              </div>
              <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center">
                <FontAwesomeIcon icon={faBuilding} className="text-3xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Manage Properties</h3>
                  <p className="text-sm">Add, edit, and view properties</p>
                </div>
              </div>
              <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center">
                <FontAwesomeIcon icon={faConciergeBell} className="text-3xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Manage Services</h3>
                  <p className="text-sm">Add, edit, and view services</p>
                </div>
              </div>
              <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-sm">View and update contact details</p>
                </div>
              </div>
              <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center">
                <FontAwesomeIcon icon={faKey} className="text-3xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Change Password</h3>
                  <p className="text-sm">Update your password</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default HomePage;
