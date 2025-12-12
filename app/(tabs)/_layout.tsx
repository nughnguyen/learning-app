import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Dimensions, Animated, StyleSheet, Text, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const MARGIN = 20;
const TAB_BAR_WIDTH = width - 2 * MARGIN;

const TAB_CONFIG: any = {
  index: { icon: 'home-outline', activeIcon: 'home', color: '#6C5CE7', label: 'Home' }, // Purple
  course: { icon: 'book-outline', activeIcon: 'book', color: '#FFA502', label: 'Course' }, // Cartoon Orange
  support: { icon: 'help-buoy-outline', activeIcon: 'help-buoy', color: '#2ED573', label: 'Support' }, // Lime Green
  setting: { icon: 'settings-outline', activeIcon: 'settings', color: '#FF4757', label: 'Setting' }, // Coral Red
  profile: { icon: 'person-outline', activeIcon: 'person', color: '#1E90FF', label: 'Profile' }, // Dodger Blue
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const totalTabs = state.routes.length;
  // Adjust tab width to be slightly smaller than full division to account for spacing if needed, 
  // but here we use exact division for smooth sliding.
  const tabWidth = TAB_BAR_WIDTH / totalTabs;
  
  const translateX = useRef(new Animated.Value(0)).current;

  // Get active route config
  const activeRouteName = state.routes[state.index].name;
  const activeConfig = TAB_CONFIG[activeRouteName] || TAB_CONFIG['index'];

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      damping: 15,
      stiffness: 100,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {/* Animated Active Indicator (Circle) */}
        <Animated.View
          style={[
            styles.activeIndicatorContainer,
            {
              width: tabWidth,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Dynamic Background Color */}
          <View style={[styles.activeIndicator, { backgroundColor: activeConfig.color }]} />
        </Animated.View>

        {/* Tab Items */}
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name] || TAB_CONFIG['index']; // Fallback

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = isFocused ? config.activeIcon : config.icon;
          
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.tabItem, { width: tabWidth }]}
            >
              <View style={[styles.iconContainer, isFocused && styles.activeIconContainer]}>
                 <Ionicons 
                    name={iconName} 
                    size={26} 
                    color={isFocused ? 'white' : '#A4B0BE'} 
                 />
              </View>
              {/* Colored Label when active? Or keeping simple? 
                  User said "Animation", illustrative. Usually labels are hidden or simple. 
                  Let's make label match the Active Color when focused!
              */}
              <Text style={[styles.label, { color: isFocused ? config.color : '#A4B0BE', opacity: isFocused ? 1 : 0.8 }]}>
                  {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
        initialRouteName="index" 
        backBehavior="initialRoute"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="support" />
      <Tabs.Screen name="course" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="setting" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 15, // Reduced from 25 to 15
    left: MARGIN,
    right: MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30, // Adjusted
    height: 55, // Reduced from 65 to 55
    width: TAB_BAR_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    alignItems: 'center', 
  },
  activeIndicatorContainer: {
    position: 'absolute',
    top: -25, // Half of 50px height sticks out. Center aligns with Top Border.
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor handled dynamically
    borderWidth: 4,
    borderColor: 'white', // Changed to white to blend with bar? Or keep gray. Let's try white for seamless look.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  tabItem: {
    height: 55, // Adjusted to match bar
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconContainer: {
    marginBottom: 4,
    zIndex: 10, 
  },
  activeIconContainer: {
    transform: [{ translateY: -23 }], // Adjusted slightly for new center
  },
  label: {
    fontSize: 9, 
    fontWeight: '700', 
    position: 'absolute',
    bottom: 3, // Lowered slightly to fit tight space
  },
});
