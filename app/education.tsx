import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../components/InputField";
import { DateField } from "../components/DateField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Education } from "../types/cv.types";
import { educationSchema, EducationForm } from "../validation/schemas";
import { formatDate } from "../utils/date";
import { createId } from "../utils/id";
import { colors, radius, shadow, spacing } from "../theme";

const EMPTY_FORM: EducationForm = {
  institution: "",
  degree: "",
  field: "",
  graduationDate: "",
};

export default function EducationScreen() {
  const router = useRouter();
  const { cvData, addEducation, deleteEducation } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationForm>({
    resolver: zodResolver(educationSchema),
    mode: "onChange",
    defaultValues: EMPTY_FORM,
  });

  const onAdd = (data: EducationForm) => {
    const newEducation: Education = {
      id: createId(),
      ...data,
    };

    addEducation(newEducation);
    reset(EMPTY_FORM);
    Alert.alert("Éxito", "Educación agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta educación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteEducation(id),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Agregar Nueva Educación</Text>

        <Controller
          control={control}
          name="institution"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Institución *"
              placeholder="Nombre de la universidad o colegio"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.institution?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="degree"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Título *"
              placeholder="Ej: Ingeniería, Licenciatura, Bachillerato"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.degree?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="field"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Área de Estudio"
              placeholder="Ej: Software, Administración"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.field?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="graduationDate"
          render={({ field: { value, onChange } }) => (
            <DateField
              label="Fecha de Graduación (o prevista)"
              value={value}
              onChange={onChange}
              placeholder="Seleccionar fecha (opcional)"
              error={errors.graduationDate?.message}
            />
          )}
        />

        <NavigationButton title="Agregar Educación" onPress={handleSubmit(onAdd)} />
      </View>

      {cvData.education.length > 0 && (
        <>
          <Text style={styles.listTitle}>
            Educación Agregada ({cvData.education.length})
          </Text>
          {cvData.education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemAccent} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {edu.field || edu.graduationDate ? (
                  <Text style={styles.itemDate}>
                    {[edu.field, formatDate(edu.graduationDate)]
                      .filter(Boolean)
                      .join(" · ")}
                  </Text>
                ) : null}
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(edu.id)}
                accessibilityRole="button"
                accessibilityLabel={`Eliminar educación ${edu.degree}`}
                hitSlop={8}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </Pressable>
            </View>
          ))}
        </>
      )}

      <NavigationButton
        title="Volver"
        onPress={() => router.back()}
        variant="secondary"
        style={{ marginTop: spacing.md }}
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
    ...shadow,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.blue,
    marginBottom: spacing.md,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.black,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    ...shadow,
  },
  itemAccent: {
    width: 6,
    alignSelf: "stretch",
    backgroundColor: colors.yellow,
  },
  itemContent: {
    flex: 1,
    padding: 14,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.blue,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: colors.dangerSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "bold",
  },
});
