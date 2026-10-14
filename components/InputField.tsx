import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { colors, radius, spacing, touchTarget } from "../theme";

interface InputFieldProps extends TextInputProps {
    label: string;
    error? : string;
    hint? : string;
}

export const InputField = ({label, error, hint, style, onFocus, onBlur, ...props}: InputFieldProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    focused && styles.inputFocused,
                    !!error && styles.inputError,
                    style,
                ]}
                placeholderTextColor="#9E9E9E"
                accessibilityLabel={label}
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                {...props}
            />
            {error ? (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                    ⚠ {error}
                </Text>
            ) : hint ? (
                <Text style={styles.hintText}>{hint}</Text>
            ) : null}
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
    input: {
        minHeight: touchTarget,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.black,
        backgroundColor: colors.white,
    },
    inputFocused: {
        borderColor: colors.blue,
    },
    inputError: {
        borderColor: colors.danger,
        backgroundColor: colors.dangerSoft,
    },
    errorText: {
        color: colors.danger,
        fontSize: 13,
        marginTop: 4,
    },
    hintText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
});
