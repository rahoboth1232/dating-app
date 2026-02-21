import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native'
import { router } from 'expo-router'
import { useSignupStore } from '@/src/store/signupStore'
import { useRef, useEffect, useState } from 'react'


function FloatingLabelInput({
  label,
  value,
  onChangeText,
  keyboardType,
  multiline,
  index,
}: {
  label: string
  value: string
  onChangeText: (t: string) => void
  keyboardType?: any
  multiline?: boolean
  index: number
}) {
  const [focused, setFocused] = useState(false)
  const mountAnim = useRef(new Animated.Value(0)).current
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current
  const borderAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1,
      duration: 420,
      delay: 200 + index * 80,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: focused || value ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start()

    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [focused, value])

  const labelTop = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] })
  const labelSize = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 11] })
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#555', focused ? '#fff' : '#888'],
  })
  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1e1e1e', '#ffffff'],
  })

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [
          {
            translateY: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
            }),
          },
        ],
      }}
    >
      <Animated.View style={[styles.fieldBox, { borderColor }]}>
        <Animated.Text
          style={[styles.floatLabel, { top: labelTop, fontSize: labelSize, color: labelColor }]}
        >
          {label}
        </Animated.Text>
        <TextInput
          style={[styles.fieldInput, multiline && styles.fieldInputMulti]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={multiline}
          selectionColor="#fff"
          cursorColor="#fff"
        />
      </Animated.View>
    </Animated.View>
  )
}

function ChipSelector({
  label,
  options,
  value,
  onSelect,
  index,
}: {
  label: string
  options: string[]
  value: string
  onSelect: (v: string) => void
  index: number
}) {
  const mountAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1,
      duration: 420,
      delay: 200 + index * 80,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: mountAnim,
        transform: [
          {
            translateY: mountAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 0],
            }),
          },
        ],
      }}
    >
      <Text style={styles.chipGroupLabel}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const selected = value === opt
          return (
            <Pressable
              key={opt}
              onPress={() => onSelect(opt)}
              style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && !selected && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{opt}</Text>
            </Pressable>
          )
        })}
      </View>
    </Animated.View>
  )
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function SignupProfile() {
  const { bio, age, gender, interested_in, setField } = useSignupStore()
  const canContinue = bio.trim() && age && gender && interested_in

  const heroAnim = useRef(new Animated.Value(0)).current
  const btnScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }, [])

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => router.push('/signup-interest'))
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Back + Step ── */}
          <Animated.View
            style={[
              styles.topBar,
              {
                opacity: heroAnim,
                transform: [
                  {
                    translateY: heroAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-8, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backArrow}>←</Text>
            </Pressable>
            <View style={styles.stepPills}>
              {[1, 2, 3, 4].map((s) => (
                <View key={s} style={[styles.pill, s === 2 && styles.pillActive]} />
              ))}
            </View>
          </Animated.View>

          {/* ── Hero ── */}
          <Animated.View
            style={[
              styles.hero,
              {
                opacity: heroAnim,
                transform: [
                  {
                    translateY: heroAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.eyebrow}>Step 2 of 4</Text>
            <Text style={styles.heading}>Your Profile</Text>
            <Text style={styles.subheading}>Let's set up how the world sees you.</Text>
          </Animated.View>

          {/* ── Fields ── */}
          <View style={styles.form}>
            <FloatingLabelInput
              label="Bio"
              value={bio}
              onChangeText={(t) => setField('bio', t)}
              multiline
              index={0}
            />

            <FloatingLabelInput
              label="Age"
              value={age}
              onChangeText={(t) => setField('age', t)}
              keyboardType="numeric"
              index={1}
            />

            <ChipSelector
              label="Gender"
              options={['Man', 'Woman', 'Non-binary', 'Other']}
              value={gender}
              onSelect={(v) => setField('gender', v)}
              index={2}
            />

            <ChipSelector
              label="Interested in"
              options={['Men', 'Women', 'Everyone']}
              value={interested_in}
              onSelect={(v) => setField('interested_in', v)}
              index={3}
            />
          </View>

          {/* ── CTA ── */}
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <Pressable
              style={[styles.btn, !canContinue && styles.btnDisabled]}
              disabled={!canContinue}
              onPress={handlePress}
            >
              <Text style={[styles.btnText, !canContinue && styles.btnTextDisabled]}>
                Continue
              </Text>
              <View style={[styles.btnIconBox, !canContinue && styles.btnIconBoxDisabled]}>
                <Text style={[styles.btnArrow, !canContinue && styles.btnArrowDisabled]}>→</Text>
              </View>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 48,
    gap: 0,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  backArrow: {
    fontSize: 18,
    color: '#fff',
  },
  stepPills: {
    flexDirection: 'row',
    gap: 5,
  },
  pill: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1e1e1e',
  },
  pillActive: {
    backgroundColor: '#fff',
    width: 40,
  },

  // Hero
  hero: {
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: '#555',
    fontWeight: '400',
    lineHeight: 22,
  },

  // Form
  form: {
    gap: 14,
    marginBottom: 36,
  },

  // Floating label input
  fieldBox: {
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 14,
    backgroundColor: '#111',
    position: 'relative',
  },
  floatLabel: {
    position: 'absolute',
    left: 18,
    fontWeight: '500',
  },
  fieldInput: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    padding: 0,
    marginTop: 2,
    minHeight: 26,
  },
  fieldInputMulti: {
    minHeight: 64,
    textAlignVertical: 'top',
  },

  // Chips
  chipGroupLabel: {
    fontSize: 11,
    color: '#444',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#1e1e1e',
    backgroundColor: '#111',
  },
  chipSelected: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  chipPressed: {
    backgroundColor: '#181818',
  },
  chipText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#000',
    fontWeight: '700',
  },

  // Button
  btn: {
    height: 62,
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: '#141414',
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  btnText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  btnTextDisabled: {
    color: '#2e2e2e',
  },
  btnIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconBoxDisabled: {
    backgroundColor: '#1a1a1a',
  },
  btnArrow: {
    fontSize: 16,
    color: '#fff',
  },
  btnArrowDisabled: {
    color: '#333',
  },
})