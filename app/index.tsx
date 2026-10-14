import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter, Href } from "expo-router";
import { useCVContext } from "../context/CVContext";
import { NavigationButton } from "../components/NavigationButton";
import { colors, radius, shadow, spacing, touchTarget } from "../theme";

interface SectionItem {
  number: number;
  icon: string;
  title: string;
  description: string;
  done: boolean;
  status: string;
  action: string;
  route: Href;
}

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const { personalInfo, experiences, education, skills } = cvData;
  const isPersonalInfoComplete = !!(personalInfo.fullName && personalInfo.email);

  const sections: SectionItem[] = [
    {
      number: 1,
      icon: "👤",
      title: "Información Personal",
      description: "Foto, nombre, contacto y resumen",
      done: isPersonalInfoComplete,
      status: isPersonalInfoComplete ? "Completado" : "Pendiente",
      action: "Editar",
      route: "/personal-info",
    },
    {
      number: 2,
      icon: "💼",
      title: "Experiencia",
      description: "Empresas, cargos y fechas",
      done: experiences.length > 0,
      status: experiences.length > 0 ? `${experiences.length} agregada(s)` : "Pendiente",
      action: "Agregar",
      route: "/experience",
    },
    {
      number: 3,
      icon: "🎓",
      title: "Educación",
      description: "Títulos e instituciones",
      done: education.length > 0,
      status: education.length > 0 ? `${education.length} agregada(s)` : "Pendiente",
      action: "Agregar",
      route: "/education",
    },
    {
      number: 4,
      icon: "⭐",
      title: "Habilidades",
      description: "Blandas y duras (técnicas)",
      done: skills.length > 0,
      status: skills.length > 0 ? `${skills.length} agregada(s)` : "Pendiente",
      action: "Agregar",
      route: "/skills",
    },
  ];

  const completed = sections.filter((s) => s.done).length;
  const progress = completed / sections.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Sección principal (hero) con la identidad TUTI */}
      <View style={styles.hero}>
        <Text style={styles.heroBadge}>CV CREATOR</Text>
        <Text style={styles.heroTitle}>Tu hoja de vida, fácil y rápida</Text>
        <Text style={styles.heroText}>
          Completa cada sección desde tu celular y obtén un CV claro y profesional.
        </Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {completed} de {sections.length} secciones completas
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
        </View>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: sections.length, now: completed }}
        >
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.listTitle}>Secciones del CV</Text>

      {sections.map((section) => (
        <Pressable
          key={section.number}
          onPress={() => router.push(section.route)}
          accessibilityRole="button"
          accessibilityLabel={`${section.title}, ${section.status}. ${section.action}`}
          style={({ pressed }) => [styles.section, pressed && styles.sectionPressed]}
        >
          <View style={styles.sectionIcon}>
            <Text style={styles.sectionIconText}>{section.icon}</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.sectionTitle}>
              {section.number}. {section.title}
            </Text>
            <Text style={styles.sectionDescription}>{section.description}</Text>
            {/* Estado con icono + texto: no depende solo del color */}
            <View style={[styles.badge, section.done ? styles.badgeDone : styles.badgePending]}>
              <Text style={[styles.badgeText, section.done ? styles.badgeTextDone : styles.badgeTextPending]}>
                {section.done ? "✓ " : "○ "}
                {section.status}
              </Text>
            </View>
          </View>
          <Text style={styles.sectionAction}>{section.action} ›</Text>
        </Pressable>
      ))}

      <NavigationButton
        title="Ver Vista Previa del CV"
        onPress={() => router.push("/preview")}
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
  hero: {
    backgroundColor: colors.yellow,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.blue,
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    overflow: "hidden",
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.black,
    lineHeight: 31,
  },
  heroText: {
    fontSize: 15,
    color: colors.black,
    marginTop: spacing.sm,
    lineHeight: 21,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.black,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.blue,
  },
  progressTrack: {
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.black,
    marginBottom: spacing.sm,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    minHeight: touchTarget,
    ...shadow,
  },
  sectionPressed: {
    backgroundColor: colors.blueSoft,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.yellowSoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionIconText: {
    fontSize: 22,
  },
  sectionBody: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  sectionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
  },
  badgeDone: {
    backgroundColor: "#E8F5E9",
  },
  badgePending: {
    backgroundColor: colors.background,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  badgeTextDone: {
    color: colors.success,
  },
  badgeTextPending: {
    color: colors.textSecondary,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.blue,
    marginLeft: 8,
  },
});
