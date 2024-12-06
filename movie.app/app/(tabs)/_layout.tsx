import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BookmarkIcon, HomeIcon, Settings2Icon, UserIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderColor: '#000' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="movie/[title]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <BookmarkIcon size={18} color={color} />,
        }}
      />
    </Tabs>
  );
}
