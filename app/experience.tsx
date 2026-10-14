import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../components/InputField";
import { DateField } from "../components/DateField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";
import { experienceSchema, ExperienceForm } from "../validation/schemas";
import { formatDate, parseISODate } from "../utils/date";
import { createId } from "../utils/id";
import { colors, radius, shadow, spacing } from "../theme";

const EMPTY_FORM: ExperienceForm = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    mode: "onChange",
    defaultValues: EMPTY_FORM,
  });

  const [startDate, current] = useWatch({ control, name: ["startDate", "current"] });

  const onAdd = (data: ExperienceForm) => {
    const newExperience: Experience = {
      id: createId(),
      ...data,
      endDate: data.current ? "" : data.endDate,
    };

    addExperience(newExperience);
    reset(EMPTY_FORM);
    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
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
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <Controller
          control={control}
          name="company"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Empresa *"
              placeholder="Nombre de la empresa"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.company?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="position"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Cargo *"
              placeholder="Tu posición"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.position?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange } }) => (
            <DateField
              label="Fecha de Inicio *"
              value={value}
              onChange={(iso) => {
                onChange(iso);
                // revalida la fecha de fin por si quedó antes del nuevo inicio
                trigger("endDate");
              }}
              maximumDate={new Date()}
              error={errors.startDate?.message}
            />
          )}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Trabajo actual</Text>
          <Controller
            control={control}
            name="current"
            render={({ field: { value, onChange } }) => (
              <Switch
                value={value}
                onValueChange={(checked) => {
                  onChange(checked);
                  if (checked) setValue("endDate", "");
                  trigger("endDate");
                }}
                trackColor={{ false: colors.border, true: colors.yellow }}
                thumbColor={value ? colors.blue : colors.white}
                ios_backgroundColor={colors.border}
                accessibilityLabel="Trabajo actual"
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="endDate"
          render={({ field: { value, onChange } }) => (
            <DateField
              label={current ? "Fecha de Fin (trabajo actual)" : "Fecha de Fin *"}
              value={value}
              onChange={onChange}
              disabled={current}
              minimumDate={parseISODate(startDate)}
              maximumDate={new Date()}
              error={errors.endDate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Descripción"
              placeholder="Describe tus responsabilidades y logros..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              style={styles.multiline}
              hint={`${value.length}/500`}
              error={errors.description?.message}
            />
          )}
        />

        <NavigationButton title="Agregar Experiencia" onPress={handleSubmit(onAdd)} />
      </View>

      {cvData.experiences.length > 0 && (
        <>
          <Text style={styles.listTitle}>
            Experiencias Agregadas ({cvData.experiences.length})
          </Text>
          {cvData.experiences.map((exp) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemAccent} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Actualidad" : formatDate(exp.endDate)}
                </Text>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(exp.id)}
                accessibilityRole="button"
                accessibilityLabel={`Eliminar experiencia ${exp.position}`}
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
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
  },
  multiline: {
    height: 110,
    textAlignVertical: "top",
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
