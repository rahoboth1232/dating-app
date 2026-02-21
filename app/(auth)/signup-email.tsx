import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSignupStore } from '..//../src/store/signupStore'

export default function SignupEmail() {
  const {
    email,
    username,
    password,
    confirm_password,
    setField,
  } = useSignupStore()

  const passwordsMatch = password === confirm_password
  const isValidEmail = /\S+@\S+\.\S+/.test(email)

  const canContinue =
    isValidEmail &&
    username &&
    password.length >= 8 &&
    passwordsMatch

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.inner}>
        <Text style={styles.title}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(t) => setField('email', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(t) => setField('username', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(t) => setField('password', t)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirm_password}
          onChangeText={(t) => setField('confirm_password', t)}
        />

        <Pressable
          disabled={!canContinue}
          style={[styles.nextBtn, !canContinue && styles.nextBtnDisabled]}
          onPress={() => router.push('/(auth)/signup-profile')}
        >
          <Text style={{ color: '#fff' }}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inner: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  nextBtn: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnDisabled: { backgroundColor: '#D1D5DB' },
})
