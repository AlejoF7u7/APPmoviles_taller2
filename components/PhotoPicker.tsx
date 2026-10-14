import React from "react";
import { View, Text, Pressable, StyleSheet, Alert, Linking } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { colors, radius, spacing, touchTarget } from "../theme";

interface PhotoPickerProps {
  uri: string;
  onChange: (uri: string) => void;
}

// Opciones comunes: solo imágenes, recorte cuadrado (foto de perfil) y compresión
const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

export const PhotoPicker = ({ uri, onChange }: PhotoPickerProps) => {
  const handleResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permiso de cámara",
        "Necesitamos acceso a la cámara para tomar tu foto de perfil.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }
    try {
      handleResult(await ImagePicker.launchCameraAsync(PICKER_OPTIONS));
    } catch {
      Alert.alert("Cámara no disponible", "No se pudo abrir la cámara en este dispositivo.");
    }
  };

  const pickFromGallery = async () => {
    try {
      handleResult(await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS));
    } catch {
      Alert.alert("Error", "No se pudo abrir la galería.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto de perfil</Text>
      <View style={styles.row}>
        <View style={styles.avatar}>
          {uri ? (
            <Image
              source={{ uri }}
              style={styles.image}
              contentFit="cover"
              accessibilityLabel="Foto de perfil seleccionada"
            />
          ) : (
            <Text style={styles.avatarPlaceholder}>👤</Text>
          )}
        </View>
        <View style={styles.actions}>
          <ActionButton label="📷  Tomar foto" onPress={takePhoto} />
          <ActionButton label="🖼  Elegir de galería" onPress={pickFromGallery} />
          {uri ? (
            <Pressable onPress={() => onChange("")} hitSlop={8} accessibilityRole="button">
              <Text style={styles.remove}>Quitar foto</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const ActionButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
  >
    <Text style={styles.actionText}>{label}</Text>
  </Pressable>
);

const AVATAR = 104;

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    borderWidth: 3,
    borderColor: colors.yellow,
    backgroundColor: colors.blueSoft,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    fontSize: 44,
  },
  actions: {
    flex: 1,
    gap: spacing.sm,
  },
  action: {
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.blue,
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  actionPressed: {
    backgroundColor: colors.blueSoft,
  },
  actionText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "600",
  },
  remove: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 4,
    minHeight: touchTarget / 2,
  },
});
