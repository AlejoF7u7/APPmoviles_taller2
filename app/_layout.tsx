import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {CVProvider} from "../context/CVContext";
import {colors} from "../theme";

export default function RootLayout() {
  return (
    <CVProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          // Encabezado con la identidad TUTI: amarillo con texto negro
          headerStyle: {backgroundColor: colors.yellow},
          headerTintColor: colors.black,
          headerTitleStyle: {fontWeight: "800"},
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: {backgroundColor: colors.background},
        }}
      >
        <Stack.Screen name="index" options={{title: "Crear CV"}} />
        <Stack.Screen name="personal-info" options={{title: "Información Personal"}} />
        <Stack.Screen name="experience" options={{title: "Experiencia Laboral"}} />
        <Stack.Screen name="education" options={{title: "Educación"}} />
        <Stack.Screen name="skills" options={{title: "Habilidades"}} />
        <Stack.Screen name="preview" options={{title: "Vista Previa"}} />
      </Stack>
    </CVProvider>
  );
}
