import React, { useState } from 'react';
import './Business.css';

const Business = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: "Sample Business Name",
    slogan: "Your Trusted Partner in Success",
    type: "Technology",
    location: "New York, USA",
    foundedDate: "2020-01-01",
    owner: "John Doe",
    description: "A leading technology company specializing in innovative solutions for businesses worldwide.",
    website: "www.samplebusiness.com",
    email: "contact@samplebusiness.com",
    phone: "+1 (555) 123-4567"
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="business-profile">
      <div className="profile-header">
        <div className="profile-image-container">
          <div className="profile-image">
            <span className="image-placeholder">🏢</span>
          </div>
          {isEditing && (
            <button className="change-image-btn">
              Change Image
            </button>
          )}
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Business Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Business Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={businessData.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.name}</p>
              )}
            </div>

            <div className="info-item">
              <label>Slogan</label>
              {isEditing ? (
                <input
                  type="text"
                  name="slogan"
                  value={businessData.slogan}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.slogan}</p>
              )}
            </div>

            <div className="info-item">
              <label>Business Type</label>
              {isEditing ? (
                <select
                  name="type"
                  value={businessData.type}
                  onChange={handleChange}
                >
                  <option value="Technology">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                </select>
              ) : (
                <p>{businessData.type}</p>
              )}
            </div>

            <div className="info-item">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={businessData.location}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.location}</p>
              )}
            </div>

            <div className="info-item">
              <label>Founded Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="foundedDate"
                  value={businessData.foundedDate}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.foundedDate}</p>
              )}
            </div>

            <div className="info-item">
              <label>Owner</label>
              {isEditing ? (
                <input
                  type="text"
                  name="owner"
                  value={businessData.owner}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.owner}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Additional Information</h2>
          <div className="info-grid">
            <div className="info-item full-width">
              <label>Description</label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={businessData.description}
                  onChange={handleChange}
                  rows="4"
                />
              ) : (
                <p>{businessData.description}</p>
              )}
            </div>

            <div className="info-item">
              <label>Website</label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={businessData.website}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.website}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={businessData.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.email}</p>
              )}
            </div>

            <div className="info-item">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={businessData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{businessData.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business; 