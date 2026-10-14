import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { CVData, Skill } from "../types/cv.types";
import { formatDate } from "../utils/date";
import { colors, radius, shadow, spacing } from "../theme";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;
  const hardSkills = skills.filter((s) => s.type === "hard");
  const softSkills = skills.filter((s) => s.type === "soft");

  const isEmpty =
    !personalInfo.fullName &&
    experiences.length === 0 &&
    education.length === 0 &&
    skills.length === 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.sheet}>
        {/* Encabezado con foto e información personal */}
        <View style={styles.header}>
          {personalInfo.photoUri ? (
            <Image
              source={{ uri: personalInfo.photoUri }}
              style={styles.photo}
              contentFit="cover"
              accessibilityLabel={`Foto de ${personalInfo.fullName || "perfil"}`}
            />
          ) : null}
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{personalInfo.fullName || "Tu Nombre"}</Text>
            {personalInfo.email ? (
              <Text style={styles.contactText}>✉️  {personalInfo.email}</Text>
            ) : null}
            {personalInfo.phone ? (
              <Text style={styles.contactText}>📱  {personalInfo.phone}</Text>
            ) : null}
            {personalInfo.location ? (
              <Text style={styles.contactText}>📍  {personalInfo.location}</Text>
            ) : null}
          </View>
        </View>

        {personalInfo.summary ? (
          <Section title="Resumen Profesional">
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </Section>
        ) : null}

        {experiences.length > 0 && (
          <Section title="Experiencia Laboral">
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Actualidad" : formatDate(exp.endDate)}
                </Text>
                {exp.description ? (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Educación">
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                {edu.field ? <Text style={styles.itemSubtitle}>{edu.field}</Text> : null}
                <Text style={styles.itemInstitution}>{edu.institution}</Text>
                {edu.graduationDate ? (
                  <Text style={styles.itemDate}>{formatDate(edu.graduationDate)}</Text>
                ) : null}
              </View>
            ))}
          </Section>
        )}

        {hardSkills.length > 0 && (
          <Section title="Habilidades Técnicas">
            <SkillChips skills={hardSkills} />
          </Section>
        )}

        {softSkills.length > 0 && (
          <Section title="Habilidades Blandas">
            <SkillChips skills={softSkills} />
          </Section>
        )}

        {isEmpty && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>
              No hay información para mostrar.{"\n"}
              Completa las secciones para ver tu CV.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionMarker} />
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    </View>
    {children}
  </View>
);

const SkillChips = ({ skills }: { skills: Skill[] }) => (
  <View style={styles.chips}>
    {skills.map((skill) => (
      <Text key={skill.id} style={styles.chip}>
        {skill.name}
      </Text>
    ))}
  </View>
);

const PHOTO = 92;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: 4,
    borderBottomColor: colors.yellow,
    paddingBottom: spacing.md,
    marginBottom: spacing.lg,
  },
  photo: {
    width: PHOTO,
    height: PHOTO,
    borderRadius: PHOTO / 2,
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.black,
    marginBottom: 6,
  },
  contactText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionMarker: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: colors.yellow,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.blue,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 21,
  },
  item: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
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
    marginBottom: 2,
  },
  itemInstitution: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.black,
    backgroundColor: colors.yellowSoft,
    borderRadius: radius.pill,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
