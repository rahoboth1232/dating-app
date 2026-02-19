import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';

const Profile = () => {
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ name: '', email: '', bio: '' });


  const fetchProfile = async () => {
    setLoading(true);
    setError(null); 

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profiles/'); // Replace with your API endpoint
      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setEditedProfile({ name: data.name, email: data.email, bio: data.bio });
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the saving of the edited profile
  const saveProfile = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://your-backend-api.com/profile', {
        method: 'PUT', // Assuming you're updating the profile with a PUT request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully!');
        setIsEditing(false);
        fetchProfile(); // Re-fetch the profile to show updated data
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (err) {
      setError(err.message); // Handle any errors during the save
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch the profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {profile ? (
        <View style={styles.profileContainer}>
          {isEditing ? (
            // Editable Inputs
            <>
              <TextInput
                style={styles.input}
                value={editedProfile.name}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
              />
              <TextInput
                style={styles.input}
                value={editedProfile.email}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
              />
              <TextInput
                style={styles.input}
                value={editedProfile.bio}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, bio: text })}
                multiline
                numberOfLines={4}
              />
            </>
          ) : (
            // Display Profile Info
            <>
              <Text style={styles.profileText}>Name: {profile.name}</Text>
              <Text style={styles.profileText}>Email: {profile.email}</Text>
              <Text style={styles.profileText}>Bio: {profile.bio}</Text>
            </>
          )}
        </View>
      ) : (
        !loading && <Text>No profile data available</Text>
      )}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Save Changes" onPress={saveProfile} />
        ) : (
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        )}
      </View>

      {isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    marginBottom: 20,
    width: '100%',
  },
  profileText: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Profile;
