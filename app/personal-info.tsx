import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { PhotoPicker } from "../components/PhotoPicker";
import { useCVContext } from "../context/CVContext";
import { personalInfoSchema, PersonalInfoForm } from "../validation/schemas";
import { colors, radius, shadow, spacing } from "../theme";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  // mode: "onChange" -> valida cada campo mientras el usuario escribe
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: cvData.personalInfo,
  });

  const onSave = (data: PersonalInfoForm) => {
    updatePersonalInfo(data);
    Alert.alert("Éxito", "Información guardada correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const onInvalid = () => {
    Alert.alert("Revisa el formulario", "Corrige los campos marcados en rojo.");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tus datos</Text>
        <Text style={styles.cardSubtitle}>Los campos con * son obligatorios</Text>

        <Controller
          control={control}
          name="photoUri"
          render={({ field: { value, onChange } }) => (
            <PhotoPicker uri={value} onChange={onChange} />
          )}
        />

        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Nombre Completo *"
              placeholder="Juan Pérez"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Email *"
              placeholder="juan@email.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Teléfono"
              placeholder="+593 99 999 9999"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Ubicación"
              placeholder="Quito, Ecuador"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.location?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="summary"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Resumen Profesional"
              placeholder="Describe brevemente tu perfil profesional..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              style={styles.multiline}
              hint={`${value.length}/500`}
              error={errors.summary?.message}
            />
          )}
        />
      </View>

      <NavigationButton
        title="Guardar Información"
        onPress={handleSubmit(onSave, onInvalid)}
      />
      <NavigationButton
        title="Cancelar"
        onPress={() => router.back()}
        variant="secondary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.blue,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  multiline: {
    height: 110,
    textAlignVertical: "top",
  },
});
