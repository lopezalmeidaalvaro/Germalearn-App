import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Chunk {
    german: string;
    spanish: string;
    [key: string]: any;
}

interface ValidationResult {
    isCorrect: boolean;
    feedback: string;
}

export class AITutorService {

    static setApiKey(key: string): void {
        localStorage.setItem('gemini_api_key', key.trim());
    }

    static getApiKey(): string {
        return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    }

    static async evaluateCreative(sentence: string, targets: any, providedKey?: string, baseLanguage: 'en' | 'es' = 'es'): Promise<ValidationResult> {
        // 1. Recuperación robusta de la clave (Prioridad: Argumento -> LocalStorage -> Env)
        let token = providedKey;
        if (!token) {
            token = AITutorService.getApiKey();
        }

        // 2. Limpieza final (Sanitización)
        const finalKey = token ? token.trim() : "";

        // Log de seguridad (enmascarado para debug, útil en producción limitada)
        console.log("🔑 Usando API Key:", finalKey ? `${finalKey.substring(0, 5)}...` : "NINGUNA");

        if (!finalKey) {
            throw new Error("⚠️ No hay API Key configurada. Por favor, ve a Ajustes e ingrésala de nuevo.");
        }

        // 3. Preparación de Datos (Lógica del Profesor)
        let targetWords: string[] = [];
        if (targets && Array.isArray(targets.keywords)) {
            targetWords = targets.keywords;
        } else if (Array.isArray(targets)) {
            targetWords = targets.map((t: any) => typeof t === 'string' ? t : t.german || t.word || "");
        } else if (targets && typeof targets === 'object') {
            targetWords = Object.values(targets).filter(v => typeof v === 'string') as string[];
        }
        targetWords = targetWords.map(t => t.toLowerCase().trim()).filter(t => t.length > 0);

        // Validaciones locales (ELIMINADA LA VALIDACIÓN RÍGIDA DE TEXTO)
        // Se delega al tutor IA la validación flexible (Lema/Raíz)
        if (targetWords.length === 0) throw new Error("Error técnico: Sin palabras clave.");

        // 4. Generación de Prompt
        const langInstruction = baseLanguage === 'en'
            ? 'The user\'s native language is English. Provide ALL feedback, explanations, and corrections in English. CRITICAL: The user interface and the reference translations MUST be exactly in this language: en (English). For example, if the language is \'en\', do not give me a Spanish sentence to translate into German; give me an English sentence to translate into German.'
            : 'El idioma nativo del usuario es Español. Proporciona TODOS los comentarios, explicaciones y correcciones en Español. CRITICAL: The user interface and the reference translations MUST be exactly in this language: es (Spanish).';

        const prompt = `
        ${langInstruction}

        Actúa como un profesor de alemán experto y pedagógico.
        
        CONTEXTO:
        El alumno debe construir una frase creativa usando estas palabras base (lemas): [${targetWords.join(', ')}].
        Frase del Alumno: "${sentence}"
        
        REGLAS DE EVALUACIÓN (FLEXIBILIDAD GRAMATICAL):
        1. **Validación por LEMA**: No exijas la palabra exacta. Acepta CUALQUIER conjugación (si es verbo), declinación (si es sustantivo/adjetivo) o variación gramática válida de las palabras requeridas.
           - Ejemplo: Si se pide "haben", acepta "hast", "hat", "hatte", "hätten".
           - Ejemplo: Si se pide "Hund", acepta "Hunde", "Hunden", "Hundes".
        2. **Prioridad**: Lo más importante es que la frase sea gramaticalmente correcta y tenga sentido. Si el usuario ha modificado la palabra para que encaje en la frase, ¡es CORRECTO!
        3. **Ignora mayúsculas/minúsculas** en la validación de palabras clave (aunque corrige si la gramática alemana lo exige).

        INSTRUCCIONES DE RESPUESTA:
        - Si la frase es correcta (usando las palabras en alguna forma válida): {"isCorrect": true, "feedback": "¡Excelente uso del vocabulario!"}
        - Si la frase es incorrecta (gramática mal o no usó la palabra en ninguna forma): {"isCorrect": false, "feedback": "Explica el error brevemente en español, mencionando si faltó alguna palabra clave (o su variación)."}
        
        Responde SOLO el JSON.
        `;

        try {
            // 5. Conexión con SDK Oficial (Producción: gemini-flash-latest)
            const genAI = new GoogleGenerativeAI(finalKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // 6. Parseo de Respuesta
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const jsonResult = JSON.parse(cleanText);

            if (jsonResult.isCorrect === false) {
                throw new Error(jsonResult.feedback);
            }

            return jsonResult;

        } catch (error: any) {
            console.error("🔥 Error Gemini:", error);
            const msg = error.message || "Error de conexión con IA.";
            throw new Error(msg.replace("Error:", "").trim());
        }
    }

    static async evaluateExamTask(text: string, taskContext: string, providedKey?: string, baseLanguage: 'en' | 'es' = 'es'): Promise<ValidationResult> {
        let token = providedKey || AITutorService.getApiKey();
        const finalKey = token ? token.trim() : "";

        if (!finalKey) throw new Error("⚠️ No hay API Key. Configúrala en Ajustes.");

        const langInstruction = baseLanguage === 'en'
            ? 'The user\'s native language is English. Provide ALL feedback, corrections and explanations in English. CRITICAL: The user interface and the reference translations MUST be exactly in this language: en (English).'
            : 'El idioma nativo del usuario es Español. Proporciona TODOS los comentarios y correcciones en Español. CRITICAL: The user interface and the reference translations MUST be exactly in this language: es (Spanish).';

        const prompt = `
        ${langInstruction}

        Actúa como un profesor de alemán del Nivel B1 (Examen Oficial).
        
        TAREA DEL ALUMNO:
        "${taskContext}"

        TEXTO DEL ALUMNO:
        "${text}"

        INSTRUCCIONES DE CORRECCIÓN:
        1. Evalúa si el texto cumple la tarea (contenido).
        2. Corrige errores gramaticales y de vocabulario (B1).
        3. Sé constructivo. Si es perfecto, dilo.

        FORMATO RESPUESTA JSON:
        {
            "isCorrect": boolean, (true si se entiende y cumple la tarea, aunque tenga fallos menores. false si es incomprensible o no cumple la tarea)
            "feedback": "string" (Breve corrección en ESPAÑOL. Menciona 1-2 errores clave o felicita. Máximo 2 frases.)
        }
        Responde SOLO el JSON.
        `;

        try {
            const genAI = new GoogleGenerativeAI(finalKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResp = response.text();

            const cleanText = textResp.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);

        } catch (error: any) {
            console.error("🔥 Error Exam AI:", error);
            throw new Error("Error al corregir. Intenta de nuevo.");
        }
    }

    static async chat(history: { role: string, parts: string }[], systemPrompt: string, providedKey?: string): Promise<string> {
        let token = providedKey || AITutorService.getApiKey();
        const finalKey = token ? token.trim() : "";

        if (!finalKey) throw new Error("⚠️ No hay API Key. Configúrala en Ajustes.");

        try {
            const genAI = new GoogleGenerativeAI(finalKey);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: `SYSTEM INITIALIZATION: ${systemPrompt}` }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Verstanden. Ich bin bereit für das Rollenspiel." }],
                    },
                    ...history.map(h => ({
                        role: h.role === 'user' ? 'user' : 'model',
                        parts: [{ text: h.parts }]
                    }))
                ],
                generationConfig: {
                    maxOutputTokens: 150,
                },
            });

            const result = await chat.sendMessage("Weiter."); // Trigger next response essentially
            const response = await result.response;
            return response.text();

        } catch (error: any) {
            console.error("🔥 Error Chat AI:", error);
            throw new Error("Error en el chat.");
        }
    }

    static async chatJson(history: { role: string, parts: string }[], systemPrompt: string, providedKey?: string): Promise<any> {
        let token = providedKey || AITutorService.getApiKey();
        const finalKey = token ? token.trim() : "";

        if (!finalKey) throw new Error("⚠️ No hay API Key. Configúrala en Ajustes.");

        try {
            const genAI = new GoogleGenerativeAI(finalKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                generationConfig: { responseMimeType: "application/json" }
            });

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: `SYSTEM_INSTRUCTION_JSON: ${systemPrompt}` }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "OK" }], // Acknowledge without breaking JSON flow
                    },
                    ...history.map(h => ({
                        role: h.role === 'user' ? 'user' : 'model',
                        parts: [{ text: h.parts }]
                    }))
                ]
            });

            // Force JSON in the prompt trigger as well to be safe
            const result = await chat.sendMessage("Generate next JSON response.");
            const response = await result.response;
            const text = response.text();

            // Robust JSON parsing
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);

        } catch (error: any) {
            console.error("🔥 Error ChatJSON AI:", error);
            // Fallback object to prevent crash - INCLUDE ERROR FOR DEBUGGING FOR USER
            return {
                aiMessage: `Error Técnico: ${error.message || "Conexión Fallida"}. Intenta de nuevo.`,
                userOptions: ["Reintentar", "Salir"],
                isFinished: false
            };
        }
    }
}