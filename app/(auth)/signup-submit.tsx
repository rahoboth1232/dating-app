import { Pressable, Text } from 'react-native'
import { useSignupStore } from '@/src/store/signupStore'
import { useRegister } from '@/hooks/useRegister'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignupSubmit() {
  const {
    email,
    username,
    password,
    confirm_password,
    bio,
    age,
    gender,
    interested_in,
    interests,
    photo,
  } = useSignupStore()
  const { mutate, isPending } = useRegister()

  const handleSubmit = () => {
    mutate({
      email,
      username,
      password,
      confirm_password,
      bio,
      age,
      gender,
      interested_in,
      interests,
      photo,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    <Pressable onPress={handleSubmit}>
      <Text>{isPending ? 'Creating...' : 'Finish Signup'}</Text>
    </Pressable>
    </SafeAreaView>
  )
}
