import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  User, Mail, Phone, MapPin, Camera,
  Save, X, Key, Bell, Shield,
  Globe, Linkedin, Twitter, Facebook, Instagram
} from 'lucide-react';
import api from '../../utils/api';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    publicProfile: true,
    showEmail: false,
    showPhone: false
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || 'Tell us about yourself...',
        location: user.location || '',
        website: user.website || '',
        socialLinks: user.socialLinks || {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      });
      
      if (user.profileImage) {
        setProfileImage(user.profileImage);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        console.log('Saving profile:', profile);
        setSaving(false);
        setSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    // Implement password change logic
    alert('Password change feature coming soon!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Implement account deletion logic
      console.log('Deleting account...');
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User size={18} /> },
    { id: 'preferences', name: 'Preferences', icon: <Bell size={18} /> },
    { id: 'security', name: 'Security', icon: <Shield size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your profile, preferences, and account security
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="ml-3 font-medium">{tab.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={handleChangePassword}
                    className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                  >
                    <Key size={18} />
                    <span className="ml-3 font-medium">Change Password</span>
                  </button>
                  
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition mt-2"
                  >
                    <X size={18} />
                    <span className="ml-3 font-medium">Delete Account</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Save className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Profile updated successfully!</p>
                      <p className="text-green-700 text-sm">Your changes have been saved.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>

                  {/* Profile Image */}
                  <div className="flex items-center mb-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-400">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                            {profile.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                        <Camera size={20} className="text-gray-600" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <div className="ml-6">
                      <h3 className="text-lg font-bold">{profile.name}</h3>
                      <p className="text-gray-600">{profile.email}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Click the camera icon to update your profile picture
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="location"
                          value={profile.location}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Facebook className="absolute left-3 top-3 text-blue-600" size={20} />
                        <input
                          type="url"
                          value={profile.socialLinks.facebook}
                          onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Facebook profile URL"
                        />
                      </div>

                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 text-blue-400" size={20} />
                        <input
                          type="url"
                          value={profile.socialLinks.twitter}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Twitter profile URL"
                        />
                      </div>

                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 text-pink-600" size={20} />
                        <input
                          type="url"
                          value={profile.socialLinks.instagram}
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Instagram profile URL"
                        />
                      </div>

                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 text-blue-700" size={20} />
                        <input
                          type="url"
                          value={profile.socialLinks.linkedin}
                          onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="LinkedIn profile URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-8">Notification Preferences</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="text-blue-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive email updates about your account</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('emailNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="text-purple-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-600">Get browser notifications</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('pushNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="text-yellow-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('marketingEmails')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.marketingEmails ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="text-green-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-gray-600">Allow others to view your profile</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('publicProfile')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.publicProfile ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.publicProfile ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="text-red-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Show Email Publicly</p>
                          <p className="text-sm text-gray-600">Display your email on your public profile</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('showEmail')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.showEmail ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.showEmail ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <Phone className="text-blue-600 mr-3" size={20} />
                        <div>
                          <p className="font-medium">Show Phone Number</p>
                          <p className="text-sm text-gray-600">Display your phone number on your public profile</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange('showPhone')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          preferences.showPhone ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.showPhone ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Preferences
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-8">Security Settings</h2>

                  <div className="space-y-8">
                    {/* Password Change */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">Password</h3>
                          <p className="text-sm text-gray-600">Change your account password</p>
                        </div>
                        <button
                          onClick={handleChangePassword}
                          className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                          Change Password
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Last changed: 2 months ago
                      </p>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                          Enable 2FA
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Currently disabled. We recommend enabling 2FA for better security.
                      </p>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-bold mb-4">Active Sessions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Chrome on Windows</p>
                            <p className="text-sm text-gray-600">Current session • jalandhar, Punjab</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            Current
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">android</p>
                            <p className="text-sm text-gray-600">Last active: 2 hours ago • jalandhar, Punjab</p>
                          </div>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Revoke
                          </button>
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                        Sign out from all devices
                      </button>
                    </div>

                    {/* Account Deletion */}
                    <div className="p-6 border border-red-200 bg-red-50 rounded-lg">
                      <h3 className="text-lg font-bold text-red-800 mb-2">Delete Account</h3>
                      <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;