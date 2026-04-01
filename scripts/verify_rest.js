const API_KEY = "AIzaSyDQ_JRSF9DY0sVmEzRJXUhqhmw1efK1ajE";

async function checkModels() {
    console.log("\n📡 Consultando lista de modelos vía REST...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ ERROR API:", JSON.stringify(data, null, 2));
        } else {
            console.log("✅ MODELOS DISPONIBLES:");
            if (data.models) {
                data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods?.join(', ')})`));
            } else {
                console.log("⚠️ No se encontraron modelos (array vacío).");
            }
        }
    } catch (e) {
        console.error("🔥 Error de red:", e.message);
    }
}

checkModels();
