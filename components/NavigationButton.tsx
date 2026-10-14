import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { colors, radius, touchTarget } from "../theme";

interface NavigationButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: NavigationButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" && styles.textPrimary,
          variant === "secondary" && styles.textSecondary,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: touchTarget,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  // Amarillo TUTI con texto negro: acción principal
  primary: {
    backgroundColor: colors.yellow,
  },
  // Azul TUTI en contorno: acciones secundarias / navegación
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.blue,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  textPrimary: {
    color: colors.black,
  },
  textSecondary: {
    color: colors.blue,
  },
  textDisabled: {
    color: colors.white,
  },
});
