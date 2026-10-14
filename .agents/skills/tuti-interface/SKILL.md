---
name: tuti-interface
description: Personaliza y mejora la interfaz de una aplicación tomando como referencia la identidad visual, la simplicidad comercial y la experiencia de compra de las tiendas TUTI de Ecuador. Utilizar cuando se solicite diseñar, rediseñar o mejorar pantallas, componentes, navegación o estilos de la aplicación con esta identidad corporativa.
---

# SKILL: Interfaz basada en Tiendas TUTI

## 1. Objetivo

Personalizar y mejorar la interfaz gráfica de la aplicación, a criterio del estudiante, tomando como referencia la imagen corporativa de las tiendas TUTI de Ecuador.

El resultado debe ser una interfaz moderna, intuitiva, limpia, responsive y fácil de utilizar, que transmita sencillez, ahorro, confianza y accesibilidad.

No se debe crear una página de servicios legales. Se debe adaptar el diseño a una experiencia de tienda de descuentos y productos de consumo diario.

## 2. Antes de modificar el proyecto

1. Inspeccionar la estructura de carpetas y los archivos existentes.
2. Identificar el framework, las dependencias, las rutas, los componentes y el sistema de estilos utilizado.
3. Identificar las pantallas principales y las funcionalidades que ya existen.
4. Revisar el logo, los recursos gráficos y las imágenes disponibles en el proyecto.
5. Mantener la arquitectura y las funcionalidades existentes.
6. No reemplazar el proyecto completo ni cambiar de framework sin autorización.
7. Planificar los cambios visuales antes de modificar el código.

## 3. Identidad visual de TUTI

Tomar como referencia la identidad visual de Tiendas TUTI en Ecuador.

### Paleta de colores

- Amarillo corporativo: #FFD500.
- Azul corporativo: #0054A6.
- Negro: #171717.
- Blanco: #FFFFFF.
- Gris claro para fondos secundarios: #F5F5F5.
- Gris para textos secundarios: #666666.

Los códigos son una propuesta de implementación y deben ajustarse si el logo o los recursos oficiales disponibles indican tonos diferentes.

### Aplicación de los colores

- Utilizar el amarillo como color de acento para promociones, precios destacados y acciones importantes.
- Utilizar el azul para elementos de navegación, enlaces y detalles corporativos.
- Utilizar el blanco como fondo predominante para mantener una interfaz limpia.
- Utilizar el negro para textos principales y elementos de alto contraste.
- Utilizar grises claros para separar secciones y organizar el contenido.

Evitar saturar todas las secciones con amarillo o azul. La interfaz debe ser equilibrada y mantener una buena legibilidad.

## 4. Diseño de la interfaz

### Encabezado

Crear una barra superior sencilla que incluya:

- Logo de la tienda.
- Nombre o identidad de la aplicación.
- Navegación principal.
- Buscador de productos, si corresponde.
- Iconos de perfil, carrito o notificaciones únicamente cuando sean necesarios para las funcionalidades existentes.

El encabezado debe ser responsive y fácil de utilizar en dispositivos móviles.

### Sección principal

Diseñar una sección inicial atractiva que transmita ahorro y cercanía.

Texto de referencia:

Título: "Todo lo que necesitas, a precios que te convienen".

Descripción: "Encuentra productos para tu día a día de forma fácil, rápida y económica".

Botón principal: "Explorar productos".

Utilizar imágenes de productos reales del proyecto cuando estén disponibles. Evitar imágenes genéricas que no correspondan con la funcionalidad de la aplicación.

### Productos y categorías

Cuando la aplicación gestione o muestre productos, organizarlos mediante tarjetas sencillas que incluyan:

- Imagen del producto.
- Nombre.
- Precio visible y fácil de identificar.
- Categoría, cuando corresponda.
- Disponibilidad, cuando exista ese dato.
- Acción principal relacionada con el producto.

Las tarjetas deben mantener tamaños consistentes, una separación adecuada y una presentación visual ordenada.

Si la aplicación no es una tienda virtual, adaptar estos principios visuales a sus módulos reales sin inventar funcionalidades de compra.

### Promociones

Si existen promociones en la aplicación, destacarlas con etiquetas claras, colores corporativos y textos breves.

No inventar descuentos, precios ni promociones reales. Utilizar los datos existentes o contenido de demostración claramente identificado.

### Navegación y pie de página

Mantener una navegación clara, con nombres comprensibles y una jerarquía visual consistente.

El pie de página puede incluir información de contacto, enlaces útiles y datos institucionales si existen en el proyecto.

No agregar enlaces que no funcionen ni información comercial falsa.

## 5. Estilo visual

Aplicar los siguientes criterios:

- Diseño minimalista y comercial.
- Tipografía sans serif legible.
- Espaciado consistente.
- Bordes discretos y radios moderados.
- Sombras suaves cuando aporten claridad.
- Iconos coherentes entre sí.
- Botones con estados hover, focus, active y disabled.
- Contraste suficiente entre texto y fondo.
- Jerarquía clara entre títulos, descripciones, precios y acciones.
- Animaciones breves y discretas, sin perjudicar el rendimiento.

Evitar interfaces recargadas, degradados excesivos, exceso de sombras, animaciones innecesarias y componentes que parezcan de una plantilla genérica.

No utilizar el azul marino y dorado de una página de abogados como identidad principal. La referencia visual debe ser TUTI.

## 6. Experiencia de usuario y accesibilidad

- Garantizar que la aplicación se adapte a móviles, tabletas y computadoras.
- Evitar desbordamientos horizontales.
- Utilizar botones y controles con tamaños adecuados para pantallas táctiles.
- Mantener textos legibles y etiquetas comprensibles.
- Añadir textos alternativos a las imágenes importantes.
- Mantener indicadores visibles de foco para navegación por teclado.
- Mostrar estados de carga, errores y ausencia de resultados cuando corresponda.
- No depender exclusivamente del color para comunicar información.
- Mantener formularios fáciles de comprender y utilizar.

## 7. Implementación técnica

1. Reutilizar los componentes existentes siempre que sea posible.
2. Mantener las rutas, la lógica de negocio, la autenticación y las conexiones con las APIs o bases de datos.
3. Separar la presentación visual de la lógica de negocio cuando la arquitectura del proyecto lo permita.
4. Reutilizar componentes para botones, tarjetas, encabezados y elementos repetidos.
5. Centralizar los colores y estilos principales en variables o tokens de diseño cuando sea compatible con el proyecto.
6. No instalar dependencias adicionales si la implementación puede realizarse con las herramientas existentes.
7. No introducir datos ficticios en operaciones reales ni eliminar funcionalidades que ya funcionan.
8. Respetar el lenguaje, framework y convenciones de código del proyecto.

## 8. Proceso de trabajo

Ejecutar el trabajo en este orden:

1. Analizar el proyecto actual.
2. Identificar las pantallas que necesitan mejoras.
3. Definir la paleta de colores y los componentes visuales.
4. Rediseñar las pantallas existentes con la identidad visual de TUTI.
5. Implementar los cambios directamente en los archivos correspondientes.
6. Revisar el diseño en tamaños de pantalla diferentes.
7. Ejecutar las comprobaciones o pruebas disponibles.
8. Corregir errores visuales y funcionales.
9. Informar qué archivos se modificaron y qué mejoras se implementaron.

No limitarse a explicar cómo se harían los cambios. Implementarlos directamente cuando el entorno de trabajo permita editar el proyecto.

## 9. Criterios de aceptación

El trabajo se considera terminado cuando:

- La interfaz refleja la identidad visual de TUTI.
- Se utilizan de forma consistente los colores corporativos definidos.
- Las pantallas tienen una apariencia moderna, ordenada y profesional.
- Los elementos visuales se adaptan a móviles y computadoras.
- La navegación y los botones existentes continúan funcionando.
- No se han eliminado funcionalidades originales.
- No hay errores visibles de alineación, desbordamiento o legibilidad.
- Las pruebas disponibles se han ejecutado y sus resultados se han revisado.
- Se entrega un resumen de los cambios realizados.

## 10. Resultado esperado

Entregar una aplicación visualmente mejorada, con una identidad inspirada en Tiendas TUTI de Ecuador, que demuestre la capacidad del estudiante para personalizar una interfaz mediante una SKILL.md, manteniendo la funcionalidad, la usabilidad y la calidad técnica del proyecto.

Referencia visual: https://tuti.com.ec/
