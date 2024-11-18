import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
     
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="e-paper/index"/>
    </Stack>
  );
};

export default RootLayout;
