import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Skill, SkillType } from "../types/cv.types";
import { makeSkillSchema, SkillForm } from "../validation/schemas";
import { createId } from "../utils/id";
import { colors, radius, shadow, spacing, touchTarget } from "../theme";

const TYPES: { value: SkillType; label: string; description: string; example: string }[] = [
  {
    value: "hard",
    label: "Dura (técnica)",
    description: "Conocimientos técnicos y medibles",
    example: "Ej: JavaScript, Excel avanzado, Inglés B2",
  },
  {
    value: "soft",
    label: "Blanda",
    description: "Competencias personales y sociales",
    example: "Ej: Trabajo en equipo, Liderazgo, Comunicación",
  },
];

export default function SkillsScreen() {
  const router = useRouter();
  const { cvData, addSkill, deleteSkill } = useCVContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillForm>({
    // el esquema recibe las habilidades existentes para detectar duplicados al escribir
    resolver: zodResolver(makeSkillSchema(cvData.skills)),
    mode: "onChange",
    defaultValues: { type: "hard", name: "" },
  });

  const selectedType = useWatch({ control, name: "type" });
  const selectedInfo = TYPES.find((t) => t.value === selectedType) ?? TYPES[0];

  const onAdd = (data: SkillForm) => {
    const newSkill: Skill = {
      id: createId(),
      name: data.name,
      type: data.type,
    };
    addSkill(newSkill);
    reset({ type: data.type, name: "" });
  };

  const hardSkills = cvData.skills.filter((s) => s.type === "hard");
  const softSkills = cvData.skills.filter((s) => s.type === "soft");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Agregar Habilidad</Text>

        <Text style={styles.label}>Tipo de habilidad</Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <View style={styles.segment} accessibilityRole="radiogroup">
              {TYPES.map((t) => {
                const active = value === t.value;
                return (
                  <Pressable
                    key={t.value}
                    onPress={() => onChange(t.value)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    style={[styles.segmentItem, active && styles.segmentItemActive]}
                  >
                    <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                      {active ? "● " : "○ "}
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
        <Text style={styles.typeHint}>{selectedInfo.description}</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Habilidad *"
              placeholder={selectedInfo.example}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onAdd)}
              hint={`${value.length}/40`}
              error={errors.name?.message}
            />
          )}
        />

        <NavigationButton title="Agregar Habilidad" onPress={handleSubmit(onAdd)} />
      </View>

      <SkillGroup
        title="Habilidades Duras"
        subtitle="Técnicas y medibles"
        skills={hardSkills}
        onDelete={deleteSkill}
      />
      <SkillGroup
        title="Habilidades Blandas"
        subtitle="Personales y sociales"
        skills={softSkills}
        onDelete={deleteSkill}
      />

      <NavigationButton
        title="Volver"
        onPress={() => router.back()}
        variant="secondary"
        style={{ marginTop: spacing.md }}
      />
    </ScrollView>
  );
}

const SkillGroup = ({
  title,
  subtitle,
  skills,
  onDelete,
}: {
  title: string;
  subtitle: string;
  skills: Skill[];
  onDelete: (id: string) => void;
}) => (
  <View style={styles.group}>
    <Text style={styles.groupTitle}>
      {title} ({skills.length})
    </Text>
    <Text style={styles.groupSubtitle}>{subtitle}</Text>
    {skills.length === 0 ? (
      <Text style={styles.empty}>Aún no has agregado ninguna.</Text>
    ) : (
      <View style={styles.chips}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.chip}>
            <Text style={styles.chipText}>{skill.name}</Text>
            <Pressable
              onPress={() => onDelete(skill.id)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={`Eliminar ${skill.name}`}
              style={styles.chipRemove}
            >
              <Text style={styles.chipRemoveText}>✕</Text>
            </Pressable>
          </View>
        ))}
      </View>
    )}
  </View>
);

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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 6,
  },
  segment: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  segmentItem: {
    flex: 1,
    minHeight: touchTarget,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  segmentItemActive: {
    borderColor: colors.blue,
    backgroundColor: colors.blueSoft,
  },
  segmentText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: colors.blue,
  },
  typeHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: spacing.md,
  },
  group: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    ...shadow,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.black,
  },
  groupSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  empty: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.yellowSoft,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: radius.pill,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "600",
  },
  chipRemove: {
    marginLeft: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipRemoveText: {
    fontSize: 11,
    color: colors.black,
    fontWeight: "700",
  },
});
