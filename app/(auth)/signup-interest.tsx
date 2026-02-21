import { View, TextInput, Pressable, Text, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useSignupStore } from '@/src/store/signupStore'
import { useState } from 'react'

const SUGGESTED_INTERESTS = [
  '🎵 Music', '🎮 Gaming', '🍕 Foodie', '✈️ Travel',
  '📚 Reading', '🏋️ Fitness', '🎨 Art', '🎬 Movies',
  '🐶 Pets', '🌿 Nature', '💻 Tech', '🧘 Yoga',
  '📸 Photography', '🍳 Cooking', '🎸 Guitar', '⚽ Sports',
]

export default function SignupInterests() {
  const { interests, setField } = useSignupStore()
  const [text, setText] = useState('')

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setField('interests', interests.filter((i) => i !== item))
    } else {
      setField('interests', [...interests, item])
    }
  }

  const addCustom = () => {
    const trimmed = text.trim()
    if (!trimmed || interests.includes(trimmed)) return
    setField('interests', [...interests, trimmed])
    setText('')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Your Interests</Text>
      <Text style={styles.subheading}>Pick what you love — or add your own</Text>

      {/* Suggested chips */}
      <View style={styles.chipsGrid}>
        {SUGGESTED_INTERESTS.map((item) => {
          const selected = interests.includes(item)
          return (
            <Pressable
              key={item}
              onPress={() => toggleInterest(item)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {item}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Custom interest input */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add your own..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addCustom}
          style={styles.input}
        />
        <Pressable onPress={addCustom} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      {/* Custom added chips */}
      {interests.filter((i) => !SUGGESTED_INTERESTS.includes(i)).length > 0 && (
        <View style={styles.chipsGrid}>
          {interests
            .filter((i) => !SUGGESTED_INTERESTS.includes(i))
            .map((item) => (
              <Pressable
                key={item}
                onPress={() => toggleInterest(item)}
                style={[styles.chip, styles.chipSelected]}
              >
                <Text style={[styles.chipText, styles.chipTextSelected]}>
                  {item} ✕
                </Text>
              </Pressable>
            ))}
        </View>
      )}

      {/* Counter */}
      {interests.length > 0 && (
        <Text style={styles.counter}>{interests.length} selected</Text>
      )}

      {/* Next button */}
      <Pressable
        disabled={!interests.length}
        onPress={() => router.push('/(auth)/signup-photos')}
        style={[styles.nextBtn, !interests.length && styles.nextBtnDisabled]}
      >
        <Text style={styles.nextBtnText}>Continue →</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: '#0f0f0f',
    minHeight: '100%',
    gap: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 16,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 15,
    color: '#888',
    marginTop: -12,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#2e2e2e',
    backgroundColor: '#1a1a1a',
  },
  chipSelected: {
    backgroundColor: '#ff4d6d',
    borderColor: '#ff4d6d',
  },
  chipText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 1.5,
    borderColor: '#2e2e2e',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 15,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ff4d6d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '300',
  },
  counter: {
    color: '#ff4d6d',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextBtn: {
    backgroundColor: '#ff4d6d',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  nextBtnDisabled: {
    backgroundColor: '#2e2e2e',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})