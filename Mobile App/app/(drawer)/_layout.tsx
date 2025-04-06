import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: 'Home',
                    //headerShown: false,
                    title: 'Home',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: 'Profile',
                    headerShown: false,
                    title: 'My Profile',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Self_help"
                options={{
                    drawerLabel: 'Self help',
                    headerShown: false,
                    title: 'Self_help',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="settings-outline" size={24} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}