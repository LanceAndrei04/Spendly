import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaPalette, FaGlobe } from 'react-icons/fa';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    position: 'CEO',
    bio: 'Experienced business leader with 15+ years in finance and management.'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    currency: 'USD'
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profileData);
  };

  const handleSecurityUpdate = (e) => {
    e.preventDefault();
    // Handle security update logic here
    console.log('Security updated:', securityData);
  };

  const handlePreferencesUpdate = (e) => {
    e.preventDefault();
    // Handle preferences update logic here
    console.log('Preferences updated:', preferences);
  };

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser className="tab-icon" />
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FaLock className="tab-icon" />
          Security
        </button>
        <button 
          className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FaBell className="tab-icon" />
          Preferences
        </button>
      </div>

      <div className="account-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Profile Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={profileData.position}
                  onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Security Settings</h2>
            <form onSubmit={handleSecurityUpdate}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                />
              </div>
              <button type="submit" className="save-button">Update Password</button>
            </form>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-section">
            <h2>Preferences</h2>
            <form onSubmit={handlePreferencesUpdate}>
              <div className="form-group">
                <label>Theme</label>
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notifications</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.email}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        notifications: {...preferences.notifications, email: e.target.checked}
                      })}
                    />
                    Email Notifications
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.push}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        notifications: {...preferences.notifications, push: e.target.checked}
                      })}
                    />
                    Push Notifications
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.sms}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        notifications: {...preferences.notifications, sms: e.target.checked}
                      })}
                    />
                    SMS Notifications
                  </label>
                </div>
              </div>
              <button type="submit" className="save-button">Save Preferences</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account; 