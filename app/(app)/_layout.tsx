import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  const { user } = useAuth();
  if (!user) {
    <Redirect href={"/"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="home" />
    </Stack>
  );
};

export default AppLayout;
