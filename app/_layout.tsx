import React, { useEffect } from "react";
import { Stack } from "expo-router";
import AuthProvider from "@/providers/AuthProvider";

const RootLayoutNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootLayoutNavigation />
    </AuthProvider>
  );
};

export default RootLayout;
