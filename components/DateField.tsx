import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { colors, radius, spacing, touchTarget } from "../theme";
import { formatDate, parseISODate, toISODate } from "../utils/date";

interface DateFieldProps {
  label: string;
  value: string; // ISO "YYYY-MM-DD" o ""
  onChange: (iso: string) => void;
  error?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

// Campo de fecha que abre el selector nativo del sistema:
// - Android: diálogo de calendario (API imperativa DateTimePickerAndroid.open)
// - iOS: hoja inferior con el selector tipo rueda y botones Cancelar / Listo
export const DateField = ({
  label,
  value,
  onChange,
  error,
  placeholder = "Seleccionar fecha",
  minimumDate,
  maximumDate,
  disabled = false,
}: DateFieldProps) => {
  const [iosVisible, setIosVisible] = useState(false);
  const [iosDraft, setIosDraft] = useState<Date>(new Date());

  const current = parseISODate(value) ?? maximumDate ?? new Date();

  const open = () => {
    if (disabled) return;
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: current,
        mode: "date",
        minimumDate,
        maximumDate,
        onValueChange: (_event, date) => onChange(toISODate(date)),
      });
    } else {
      setIosDraft(current);
      setIosVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={open}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value ? formatDate(value) : placeholder}`}
        style={({ pressed }) => [
          styles.field,
          !!error && styles.fieldError,
          disabled && styles.fieldDisabled,
          pressed && styles.fieldPressed,
        ]}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {disabled ? "—" : value ? formatDate(value) : placeholder}
        </Text>
        <Text style={styles.icon}>📅</Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>⚠ {error}</Text> : null}

      {Platform.OS === "ios" && (
        <Modal
          visible={iosVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIosVisible(false)}
        >
          <Pressable style={styles.backdrop} onPress={() => setIosVisible(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Pressable onPress={() => setIosVisible(false)} hitSlop={12}>
                <Text style={styles.sheetCancel}>Cancelar</Text>
              </Pressable>
              <Text style={styles.sheetTitle}>{label.replace(" *", "")}</Text>
              <Pressable
                onPress={() => {
                  onChange(toISODate(iosDraft));
                  setIosVisible(false);
                }}
                hitSlop={12}
              >
                <Text style={styles.sheetDone}>Listo</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={iosDraft}
              mode="date"
              display="spinner"
              locale="es-EC"
              themeVariant="light"
              textColor={colors.black}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onValueChange={(_event, date) => setIosDraft(date)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 6,
  },
  field: {
    minHeight: touchTarget,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  fieldDisabled: {
    backgroundColor: colors.background,
  },
  fieldPressed: {
    borderColor: colors.blue,
  },
  value: {
    fontSize: 16,
    color: colors.black,
  },
  placeholder: {
    color: "#9E9E9E",
  },
  icon: {
    fontSize: 18,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.xl,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  sheetCancel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  sheetDone: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.blue,
  },
});
