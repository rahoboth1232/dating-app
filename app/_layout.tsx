import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/src/api/queryClient'
import { useAuthStore } from '@/src/store/authStore'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const token = useAuthStore((s) => s.token)
  const segments = useSegments()
  const router = useRouter()
  const firstSegment = segments[0]

  useEffect(() => {
    if (isHydrated) {
      SplashScreen.hideAsync()
    }
  }, [isHydrated])

  useEffect(() => {
    if (!isHydrated) return

    const inTabs = firstSegment === '(tabs)'

    if (token && !inTabs) {
      router.replace('/(tabs)/Home')
    } else if (!token && inTabs) {
      router.replace('/')
    }
  }, [token, isHydrated, firstSegment])

  if (!isHydrated) return null

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  )
}

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Something went wrong</Text>
      <Text style={{ color: '#666', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
        {error.message}
      </Text>
      <Pressable
        onPress={retry}
        style={{ backgroundColor: '#FF4D6D', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12 }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Try Again</Text>
      </Pressable>
    </View>
  )
}
