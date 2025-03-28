import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import {useFonts} from "expo-font";


export default function Profile() {

    const [user, setUser] = useState({
        name: 'Yehani Harshika',
        email: 'yehapamunuwa@gmail.com',
        bio: 'Where ambition meets action, success follows 🧑🏼‍💻',
        joinDate: '2025-03-15',
        notesCount: 27,
        profileImage: null, // This would be a URI in a real app
        theme: 'white',
        notifications: true,
        syncEnabled: true,
        address: 'Polonnaruwa,Sri lanka',
        phoneNumber: '+94 76 400 4560',
        socialLinks: {
            facebook: 'https://facebook.com/yeha',
            twitter: 'https://twitter.com/yeha',
            linkedIn: 'https://linkedin.com/yeha',
            instagram: 'https://instagram.com/yeha',
        }
    });

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>; // You can show a loading screen here
    }


    const toggleTheme = () => {
        setUser(prevUser => ({
            ...prevUser,
            theme: prevUser.theme === 'light' ? 'dark' : 'light'
        }));
    };

    const toggleNotifications = () => {
        setUser(prevUser => ({
            ...prevUser,
            notifications: !prevUser.notifications
        }));
    };

    const toggleSync = () => {
        setUser(prevUser => ({
            ...prevUser,
            syncEnabled: !prevUser.syncEnabled
        }));
    };

    // Handlers for actions
    const handleEditProfile = () => {
        // Navigation or modal logic for editing profile
        console.log('Edit profile');
    };

    const handleShareProfile = () => {
        // Share profile logic
        console.log('Share profile');
    };

    const handleHelpSupport = () => {
        // Navigate to help & support screen
        console.log('Navigate to help & support');
    };

    const handlePrivacySecurity = () => {
        // Navigate to privacy & security screen
        console.log('Navigate to privacy & security');
    };

    const handleSignOut = () => {
        console.log('Sign out');
    };

    const formatDate = (dateString: string | number | Date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // @ts-ignore
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header with profile image and name */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileImageContainer}>
                        {user.profileImage ? (
                            <Image
                                source={{ uri: user.profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Text style={styles.profileImageInitials}>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.editImageButton}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userBio}>{user.bio}</Text>
                </View>


                {/* Action buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleEditProfile}
                    >
                        <Ionicons name="create-outline" size={22} color="#6F1E51" />
                        <Text style={styles.actionButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleShareProfile}
                    >
                        <Ionicons name="share-outline" size={22} color="#6F1E51" />
                        <Text style={styles.actionButtonText}>Share Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings section */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Settings</Text>

                    {/* Theme Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="moon-outline" size={22} color="#e84393" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Dark Mode</Text>
                            <Text style={styles.settingDescription}>
                                Change app appearance
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleTheme}
                        >
                            <View style={[styles.toggleTrack, user.theme === 'dark' && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.theme === 'dark' && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Notifications Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="notifications-outline" size={22} color="#e84393" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Reminders and alerts
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleNotifications}
                        >
                            <View style={[styles.toggleTrack, user.notifications && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.notifications && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Cloud Sync Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="cloud-upload-outline" size={22} color="#e84393" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Task Sync</Text>
                            <Text style={styles.settingDescription}>
                                Sync tasks across devices
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleSync}
                        >
                            <View style={[styles.toggleTrack, user.syncEnabled && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.syncEnabled && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account actions */}
                <View style={styles.accountActions}>
                    <TouchableOpacity
                        style={styles.accountActionButton}
                        onPress={handleHelpSupport}
                    >
                        <Ionicons name="help-circle-outline" size={22} color="#555" />
                        <Text style={styles.accountActionText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.accountActionButton}
                        onPress={handlePrivacySecurity}
                    >
                        <Ionicons name="shield-checkmark-outline" size={22} color="#555" />
                        <Text style={styles.accountActionText}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#f44336" />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Media Links */}
                <View style={[styles.socialLinksContainer, styles.cardContainer]}>
                    <Text style={styles.sectionTitle}>Social Links</Text>

                    {/* Facebook Link */}
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-facebook" size={22} color="#3b5998" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.facebook}</Text>
                    </View>

                    {/* Twitter Link */}
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-twitter" size={22} color="#00acee" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.twitter}</Text>
                    </View>

                    {/* LinkedIn Link */}
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-linkedin" size={22} color="#0077b5" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.linkedIn}</Text>
                    </View>

                    {/* Instagram Link */}
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-instagram" size={22} color="#e4405f" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.instagram}</Text>
                    </View>
                </View>

                {/* Address & Phone */}
                <View style={[styles.contactContainer, styles.cardContainer]}>
                    <Text style={styles.sectionTitle}>Contact Info</Text>
                    <Text style={styles.contactText}>Address: {user.address}</Text>
                    <Text style={styles.contactText}>Phone: {user.phoneNumber}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e84393',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageInitials: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Montserrat_500Medium'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#e84393',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        fontFamily: 'Montserrat_500Medium'
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Montserrat_500Medium'
    },
    userBio: {
        fontSize: 14,
        color: '#1B1464',
        marginTop: 4,
        fontFamily: 'Montserrat_500Medium'
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#ddd',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Montserrat_500Medium'
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 16,
        paddingHorizontal: 16,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffd9fa',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    actionButtonText: {
        fontSize: 14,
        color: '#6F1E51',
        fontWeight: '800',
        marginLeft: 8,
        fontFamily: 'Montserrat_500Medium'
    },
    settingsSection: {
        backgroundColor: '#fff',
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        fontFamily: 'Montserrat_500Medium'
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffd9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        fontFamily: 'Montserrat_500Medium'
    },
    settingDescription: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
        fontFamily: 'Montserrat_500Medium'
    },
    settingToggle: {
        marginLeft: 8,
    },
    toggleTrack: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleTrackActive: {
        backgroundColor: '#ffbcf7',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    accountActions: {
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    accountActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    accountActionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 12,
        fontFamily: 'Montserrat_500Medium'
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    signOutText: {
        fontSize: 16,
        color: '#f44336',
        marginLeft: 12,
        fontFamily: 'Montserrat_500Medium'
    },
    cardContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    socialLinksContainer: {
        marginTop: 24,
    },
    socialLinkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 4,
    },
    socialLinkText: {
        fontSize: 14,
        marginLeft: 12,
        color: '#555',
        fontFamily: 'Montserrat_500Medium'
    },
    contactContainer: {
        marginTop: 24,
    },
    contactText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        paddingVertical: 4,
        fontFamily: 'Montserrat_500Medium'
    },
});