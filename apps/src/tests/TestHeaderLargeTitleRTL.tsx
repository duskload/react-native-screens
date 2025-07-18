import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MainScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Large Title RTL Test</Text>
        <Text style={styles.description}>
          This screen tests headerLargeTitle functionality with RTL (Right-to-Left) direction.
          The large title should be properly aligned and behave correctly in RTL mode.
        </Text>
        <Text style={styles.arabicText}>
          هذا نص تجريبي باللغة العربية لاختبار وظيفة العنوان الكبير مع اتجاه النص من اليمين إلى اليسار
        </Text>
        <Text style={styles.hebrewText}>
          זהו טקסט בדיקה בעברית לבדיקת פונקציונליות הכותרת הגדולה עם כיוון טקסט מימין לשמאל
        </Text>
        <View style={styles.scrollContent}>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} style={styles.item}>
              Item {i + 1} - Scroll to see large title collapse
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default function TestHeaderLargeTitleRTL() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          // Enable large title
          headerLargeTitle: true,
          // Set RTL direction
          direction: 'rtl',
          // Configure large title style
          headerLargeTitleStyle: {
            fontSize: 34,
            fontWeight: 'bold',
            color: '#007AFF',
          },
          // Additional styling for better RTL testing
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#007AFF',
        }}
      >
        <Stack.Screen 
          name="MainScreen" 
          component={MainScreen}
          options={{
            title: 'RTL Large Title Test',
            headerLargeTitle: true,
            direction: 'rtl',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  arabicText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'right',
    fontFamily: 'System',
  },
  hebrewText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'right',
    fontFamily: 'System',
  },
  scrollContent: {
    marginTop: 20,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 16,
  },
});