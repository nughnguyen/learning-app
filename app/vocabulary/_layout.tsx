import { Stack } from 'expo-router';

export default function VocabularyLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Select Level', headerShadowVisible: false, headerStyle: { backgroundColor: '#f9fafb' } }} />
      <Stack.Screen name="[level]/index" options={{ headerTitle: 'Topics' }} />
      <Stack.Screen name="[level]/[topic]" options={{ headerTitle: 'Lesson' }} />
    </Stack>
  );
}
