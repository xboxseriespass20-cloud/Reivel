# REIVEL - Plataforma Educativa para ECOEMS

## 📚 Descripción General

REIVEL es una plataforma educativa interactiva diseñada para ayudar a estudiantes mexicanos a prepararse para el **Examen Común de Egreso para la Educación Media Superior (ECOEMS)**.

La plataforma ofrece:
- ✅ Simulación completa del examen ECOEMS (128 preguntas)
- 📖 Modo de práctica por materia (50 preguntas por tema)
- 📊 Seguimiento de resultados y puntuaciones
- 🎯 Interfaz responsiva para computadoras, tablets y celulares
- 💾 Almacenamiento local de progreso

## 🎯 Características Principales

### Modo Examen
- 128 preguntas distribuidas en 11 materias
- Simulación realista del examen ECOEMS
- Visualización de preguntas una a la vez
- Botones de navegación: anterior, siguiente, finalizar
- Revisión rápida de preguntas respondidas y no respondidas
- Resultados detallados al finalizar

### Modo Práctica
- 11 materias disponibles para practicar
- 50 preguntas por materia
- Práctica independiente por tema
- Resultados inmediatos al terminar

### Materias Incluidas
1. **Matemáticas** - 12 preguntas (examen) + 50 (práctica)
2. **Español** - 12 preguntas (examen) + 50 (práctica)
3. **Geografía** - 12 preguntas (examen) + 50 (práctica)
4. **Biología** - 12 preguntas (examen) + 50 (práctica)
5. **Física** - 12 preguntas (examen) + 50 (práctica)
6. **Química** - 12 preguntas (examen) + 50 (práctica)
7. **Historia Universal** - 6 preguntas (examen) + 50 (práctica)
8. **Historia de México** - 6 preguntas (examen) + 50 (práctica)
9. **Habilidad Matemática** - 16 preguntas (examen) + 50 (práctica)
10. **Habilidad Verbal** - 16 preguntas (examen) + 50 (práctica)
11. **Formación Cívica y Ética** - 12 preguntas (examen) + 50 (práctica)

## 📂 Estructura del Proyecto

```
REIVEL.WEB/
├── index.html                 # Página principal
├── ecoems.html               # Página del módulo ECOEMS
├── css/
│   └── style.css             # Estilos principales y responsivos
├── js/
│   ├── main.js               # Lógica general y navegación
│   ├── exam-mode.js          # Lógica del modo examen
│   ├── practice-mode.js      # Lógica del modo práctica
│   └── utils.js              # Funciones utilitarias
├── data/
│   ├── subjects.js           # Configuración de materias
│   ├── exam-questions.js     # Preguntas del examen (128)
│   └── practice-questions.js # Preguntas de práctica (550+)
└── README.md                 # Este archivo
```

## 🚀 Cómo Usar

### Instalación
1. Descargar o clonar el proyecto
2. Abrir `index.html` en un navegador web moderno
3. ¡Listo! No requiere instalación adicional

### Uso
1. **Desde la página inicial:**
   - Haz clic en la tarjeta "ECOEMS" para acceder al módulo de preparación

2. **En ECOEMS tienes dos opciones:**
   - **Modo Examen:** Realiza una prueba completa de 128 preguntas
   - **Modo Práctica:** Selecciona una materia y practica con 50 preguntas

3. **Respondiendo preguntas:**
   - Haz clic en la opción que creas correcta
   - Usa los botones "Anterior" y "Siguiente" para navegar
   - Los botones se desactivan automáticamente cuando no hay más preguntas

4. **Visualizando resultados:**
   - Al finalizar verás tu porcentaje de aciertos
   - Resultados desglosados por materia
   - Opción de intentar de nuevo o volver al menú

## 🎨 Diseño y Características

- **Interfaz moderna y limpia:** Diseño minimalista enfocado en usabilidad
- **Completamente responsivo:** Se adapta a cualquier tamaño de pantalla
- **Paleta de colores profesional:** Colores distintivos para cada materia
- **Progresión visual:** Barra de progreso que muestra avance en tiempo real
- **Accesibilidad:** Soporte completo para navegación con teclado

## 💾 Almacenamiento de Datos

- Los datos se almacenan localmente en el navegador usando `localStorage`
- El progreso se guarda automáticamente mientras respondes preguntas
- Los datos persisten incluso después de cerrar el navegador
- No se envía información a servidores externos

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| ← | Pregunta anterior |
| → | Siguiente pregunta |
| 1-4 | Seleccionar opción A, B, C o D |

## 🔧 Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- localStorage habilitado (para almacenar progreso)
- Resolución mínima: 320px (móvil)

## 📊 Cálculo de Puntuaciones

- **Excelente:** 90% - 100%
- **Muy bien:** 80% - 89%
- **Bien:** 70% - 79%
- **Aceptable:** 60% - 69%
- **Necesita mejorar:** 0% - 59%

## 🔄 Actualizaciones Futuras

Se planea agregar:
- [ ] Módulos completos de Secundaria 1°, 2° y 3° grado
- [ ] Sistema de estadísticas avanzadas
- [ ] Explicaciones detalladas para cada respuesta
- [ ] Modo de repaso por temas débiles
- [ ] Sincronización con servidor (opcional)
- [ ] App móvil nativa
- [ ] Sistema de usuarios y historial de resultados

## 📝 Notas Importantes

- Las preguntas están basadas en el formato real del ECOEMS
- Todas las preguntas son educativas y de prácticar
- Se recomienda usar en combinación con otros materiales de estudio
- El tiempo de respuesta no está limitado (a diferencia del examen real)

## 💡 Consejos de Estudio

1. **Modo Examen:** Usa primero en modo práctica para familiarizarte
2. **Concentración:** Dedica tiempo sin distracciones
3. **Repaso:** Revisa las preguntas que no respondiste correctamente
4. **Materias débiles:** Practica más en los temas donde tengas dificultad
5. **Consistencia:** Practica regularmente para mejores resultados

## 📧 Soporte y Retroalimentación

Para reportar errores, sugerencias o pregunt solicita:
- Verifica que el navegador esté actualizado
- Limpia el caché del navegador
- Desactiva extensiones que bloqueen scripts
- Intenta en otro navegador

## 📄 Licencia

Este proyecto es de uso educativo y gratuito para estudiantes mexicanos.

---

**REIVEL - Tu compañero en la preparación para ECOEMS**

¡Mucho éxito en tu examen! 🎓
