import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0d0d14',
          borderTopColor: '#2a2a3a',
        },
        tabBarActiveTintColor: '#ff4d6d',
        tabBarInactiveTintColor: '#8888aa',
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => null,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => null,
        }}
      />
    </Tabs>
  )
}
