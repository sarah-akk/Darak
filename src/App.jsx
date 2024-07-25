import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './layouts/authPage';
import HomePage from './layouts/homePage';
import Offers from './layouts/Offers/offers';
import AddOffer from './layouts/Offers//AddOffer';
import EditOffer from './layouts/Offers//EditOffer';
import PSections from './layouts/Properties/PSections ';
import AddPSection from './layouts/Properties/AddPSection';
import EditPSection from './layouts/Properties/EdiPSection';
import Properties from './layouts/Properties/Properties';
import AddProperty from './layouts/Properties/AddProperty';
import EditProperty from './layouts/Properties/EditProperty';
import SerSections from './layouts/Services/SerSections';
import AddSerSection from './layouts/Services/AddSerSection';
import EditSerSection from './layouts/Services/EditSerSection';
import Services from './layouts/Services/Services';
import AddService from './layouts/Services/AddService';
import EditService from './layouts/Services/EditService';
import Contact from './layouts/Contact/Contact';
import Profile from './layouts/Profile/profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="offers" element={<Offers />} />
          <Route path="offers/add-offer" element={<AddOffer/>} />
          <Route path="offers/edit-offer/:offerId" element={<EditOffer/>} />
          <Route path="PSections" element={<PSections />} />
          <Route path="add-PSection" element={<AddPSection />} />
          <Route path="edit-PSection/:sectionId" element={<EditPSection />} />
          <Route path="PSections/properties" element={<Properties />} />
          <Route path="PSections/properties/add-property" element={<AddProperty />} />
          <Route path="PSections/properties/edit-property" element={<EditProperty />} />
          <Route path="SerSections" element={<SerSections />} />
          <Route path="add-SerSection" element={<AddSerSection />} />
          <Route path="edit-SerSection/:id" element={<EditSerSection />} />
          <Route path="SerSections/services" element={<Services />} />
          <Route path="SerSections/add-Service" element={<AddService />} />
          <Route path="SerSections/edit-service/:serviceId" element={<EditService />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
