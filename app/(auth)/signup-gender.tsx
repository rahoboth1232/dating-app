import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useSignupStore } from '@/src/store/signupStore'
import { useRegister } from '../../hooks/useRegister'

const HAVE_KIDS_OPTIONS = ['Have kids', "Don't have kids"]
const WANT_KIDS_OPTIONS = ["Don't want kids", 'Open to kids', 'Want kids', 'Not sure']
const GENDER_OPTIONS = ['Man', 'Woman', 'Non-binary', 'Other']

export default function SignupGender() {
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
    setField,
  } = useSignupStore()
  const registerMutation = useRegister()

  const [haveKids, setHaveKids] = useState<string | null>(null)
  const [wantKids, setWantKids] = useState<string | null>(null)

  const handleFinish = () => {
    registerMutation.mutate({
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '90%' }]} />
      </View>

      <View style={styles.inner}>
        <View>
          <Text style={styles.title}>Do you have kids or family{'\n'}plans?</Text>
          <Text style={styles.subtitle}>
            Let's get deeper. Feel free to skip if you'd prefer not to say.
          </Text>

          {/* Gender Section */}
          <Text style={styles.sectionLabel}>Gender</Text>
          <View style={styles.chipRow}>
            {GENDER_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={gender === opt.toLowerCase()}
                onPress={() => setField('gender', opt.toLowerCase())}
              />
            ))}
          </View>

          {/* Have Kids Section */}
          <Text style={styles.sectionLabel}>Have kids</Text>
          <View style={styles.chipRow}>
            {HAVE_KIDS_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={haveKids === opt}
                onPress={() => setHaveKids(haveKids === opt ? null : opt)}
              />
            ))}
          </View>

          {/* Want Kids Section */}
          <Text style={styles.sectionLabel}>Kids</Text>
          <View style={styles.chipRow}>
            {WANT_KIDS_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt}
                selected={wantKids === opt}
                onPress={() => setWantKids(wantKids === opt ? null : opt)}
              />
            ))}
          </View>
        </View>

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <Pressable
            onPress={handleFinish}
            disabled={registerMutation.isPending}
            style={[styles.nextBtn, registerMutation.isPending && styles.nextBtnDisabled]}
          >
            {registerMutation.isPending
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={styles.nextArrow}>›</Text>
            }
          </Pressable>
        </View>
      </View>
    </View>
</SafeAreaView>
  )
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label} {selected ? '✓' : '+'}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 80 },
  progressTrack: { height: 4, backgroundColor: '#E5E7EB' },
  progressFill: { height: 4, backgroundColor: '#111827' },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: { fontSize: 15, color: '#6B7280', lineHeight: 22, marginBottom: 28 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: '#fff',
  },
  chipSelected: {
    borderColor: '#111827',
    backgroundColor: '#111827',
  },
  chipPressed: { opacity: 0.75 },
  chipText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  chipTextSelected: { color: '#fff' },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  skipText: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  nextBtn: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center', justifyContent: 'center',
  },
  nextBtnDisabled: { backgroundColor: '#D1D5DB' },
  nextArrow: { fontSize: 30, color: '#fff', marginLeft: 3 },
})