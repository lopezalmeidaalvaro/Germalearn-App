import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDQ_JRSF9DY0sVmEzRJXUhqhmw1efK1ajE"; // Clave del usuario

async function testModel(modelName) {
    console.log(`\n🧪 Probando modelo: ${modelName}...`);
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent("Di 'Hola Mundo' en alemán.");
        const response = await result.response;
        const text = response.text();

        console.log(`✅ ÉXITO con ${modelName}:`, text);
        return true;
    } catch (error) {
        console.error(`❌ ERROR con ${modelName}:`, error.message);
        return false;
    }
}

async function run() {
    console.log("🚀 Iniciando diagnóstico de Gemini API...");

    // Prueba 1: Alias Latest (el que aparece en la lista)
    const flashSuccess = await testModel("gemini-flash-latest");

    if (!flashSuccess) {
        // Prueba 2: Pro Legacy
        const proSuccess = await testModel("gemini-pro");

        if (!proSuccess) {
            // Prueba 3: Version especifica 1.0
            await testModel("gemini-1.0-pro");
        }
    }
}

run();
