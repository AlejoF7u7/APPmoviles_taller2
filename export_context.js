/* global __dirname */
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = 'contexto_proyecto.md';
const ROOT_DIR = __dirname;

const IGNORE_DIRS = [
    // Dependencias y control de versiones
    'node_modules', '.git',
    // Caché y builds de Expo / Metro / EAS
    '.expo', '.expo-shared', 'dist', 'web-build', 'build', '.eas', '.metro-health-check',
    // Carpetas nativas generadas (Continuous Native Generation)
    'android', 'ios', '.kotlin', '.gradle', 'Pods',
    // Editores, herramientas y tests
    '.vscode', '.idea', '.claude', '.opencode', '.tamagui', 'coverage', '__tests__',
    // Imágenes, fuentes y otros binarios
    'assets',
];

const IGNORE_FILES = [
    // Lockfiles (enormes y sin valor como contexto)
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lock', 'bun.lockb',
    // Archivos generados
    'expo-env.d.ts', 'tsconfig.tsbuildinfo',
    // El propio script y su salida
    OUTPUT_FILE, 'export_context.js',
    // Sistema operativo
    '.DS_Store', 'Thumbs.db',
];

const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.css'];

// Nunca exportar secretos ni credenciales de firma
const SECRET_PATTERNS = [/^\.env/, /\.(jks|keystore|p8|p12|key|pem|mobileprovision)$/i];

function isSecret(item) {
    return SECRET_PATTERNS.some((pattern) => pattern.test(item));
}

function buildContext(currentPath) {
    const items = fs.readdirSync(currentPath).sort();

    for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(item)) {
                buildContext(itemPath);
            }
        } else {
            const ext = path.extname(item);
            const isAllowedExtension = ALLOWED_EXTENSIONS.includes(ext);
            const isConfigFile = item === '.gitignore' || item.includes('config');

            if (!IGNORE_FILES.includes(item) && !isSecret(item) && (isAllowedExtension || isConfigFile)) {
                try {
                    const content = fs.readFileSync(itemPath, 'utf8');
                    const relativePath = path.relative(ROOT_DIR, itemPath).split(path.sep).join('/');
                    const separator = `\n\n================================================\n`;
                    const fileHeader = `📄 ARCHIVO: ${relativePath}\n================================================\n\n`;

                    fs.appendFileSync(path.join(ROOT_DIR, OUTPUT_FILE), separator + fileHeader + content);
                } catch (error) {
                    console.error(`Error leyendo ${itemPath}:`, error.message);
                }
            }
        }
    }
}

fs.writeFileSync(path.join(ROOT_DIR, OUTPUT_FILE), '# Contexto Completo del Proyecto\n');
console.log('⏳ Recopilando código...');
buildContext(ROOT_DIR);
console.log(`✅ ¡Listo! Todo tu código se ha consolidado en el archivo: ${OUTPUT_FILE}`);
