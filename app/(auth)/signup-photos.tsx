import { View, Pressable, Text, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useSignupStore } from '@/src/store/signupStore'

export default function SignupPhoto() {
  const { photo, setField } = useSignupStore()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync()

    if (!result.canceled) {
      setField('photo', result.assets[0])
    }
  }

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Pressable onPress={pickImage}>
        <Text>{photo ? 'Change Photo' : 'Pick Photo'}</Text>
      </Pressable>

      {photo && (
        <Image source={{ uri: photo.uri }} style={{ width: 120, height: 120 }} />
      )}

      <Pressable
        disabled={!photo}
        onPress={() => router.push('/signup-submit')}
      >
        <Text>Finish</Text>
      </Pressable>
    </View>
  )
}
