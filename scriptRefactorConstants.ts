import fs from 'fs';

const path = './src/data/constants.ts';
let content = fs.readFileSync(path, 'utf8');

const translations: Record<string, string> = {
    'Arquitectura V2': 'V2 Architecture',
    'En una oración principal, el verbo conjugado SIEMPRE ocupa la posición 2.': 'In a main clause, the conjugated verb ALWAYS occupies the 2nd position.',
    'Regla de Oro: V2': 'Golden Rule: V2',
    'Llaves: Nom/Akk': 'Keys: Nom/Akk',
    'Nominativ vs Akkusativ': 'Nominative vs Accusative',
    'Nominativ: El sujeto (Der Mann). Akkusativ: El objeto (Den Mann).': 'Nominative: The subject (Der Mann). Accusative: The object (Den Mann).',
    'Verbos Modales': 'Modal Verbs',
    'El verbo modal se conjuga en posición 2. El otro verbo va al FINAL en infinitivo.': 'The modal verb is conjugated in position 2. The other verb goes to the END in the infinitive.',
    'Artículos y Género': 'Articles and Gender',
    'Género': 'Gender',
    '3 géneros: Masculino (Der), Femenino (Die), Neutro (Das).': '3 genders: Masculine (Der), Feminine (Die), Neuter (Das).',
    'Motor: Perfekt': 'Engine: Perfekt',
    'Perfekt': 'Perfekt',
    'Auxiliar (Pos 2) + Participio (Final).': 'Auxiliary (Pos 2) + Participle (End).',
    'Ubicación (Dat/Akk)': 'Location (Dat/Akk)',
    'Preposiciones': 'Prepositions',
    'Wo? (Estático) -> Dativo. Wohin? (Movimiento) -> Acusativo.': 'Wo? (Static) -> Dative. Wohin? (Movement) -> Accusative.',
    'Präteritum Básico': 'Basic Präteritum',
    'Präteritum': 'Präteritum',
    'Sein -> War. Haben -> Hatte.': 'Sein -> War. Haben -> Hatte.',
    'Adjetivos (Intro)': 'Adjectives (Intro)',
    'Adjetivos': 'Adjectives',
    'Der rote Apfel (Nom). Den roten Apfel (Akk).': 'Der rote Apfel (Nom). Den roten Apfel (Akk).',
    'Preposiciones (Akk)': 'Prepositions (Akk)',
    'Acusativo': 'Accusative',
    'Estas preposiciones SIEMPRE piden Acusativo: Durch (a través), Für (para), Gegen (contra), Ohne (sin), Um (alrededor).': 'These prepositions ALWAYS take the Accusative: Durch (through), Für (for), Gegen (against), Ohne (without), Um (around).',
    'Preposiciones (Dat)': 'Prepositions (Dat)',
    'Dativo': 'Dative',
    'Siempre Dativo: Aus (de/origen), Bei (en casa de), Mit (con), Nach (hacia), Seit (desde), Von (de), Zu (a).': 'Always Dative: Aus (from/origin), Bei (at/with), Mit (with), Nach (to/after), Seit (since), Von (from/by), Zu (to).',
    'Preposiciones Mixtas': 'Mixed Prepositions',
    'Wechselpräpositionen': 'Two-way Prepositions',
    'Wo? (¿Dónde estoy?) -> Dativo (Estático).\\nWohin? (¿A dónde voy?) -> Acusativo (Movimiento).': 'Wo? (Where am I?) -> Dative (Static).\\nWohin? (Where am I going?) -> Accusative (Movement).',
    'Subordinadas': 'Subordinate Clauses',
    'Verbo al final con weil/dass.': 'Verb at the end with weil/dass.',
    'Verbos + Prep': 'Verbs + Prep',
    'Verbos con Preposición': 'Verbs with Prepositions',
    'Warten auf + Akk. Träumen von + Dat.': 'Warten auf + Akk. Träumen von + Dat.',
    'Frases Relativas': 'Relative Clauses',
    'Relativas': 'Relatives',
    'Verbo al final.': 'Verb at the end.',
    'Voz Pasiva': 'Passive Voice',
    'Pasiva': 'Passive',
    'Werden + Partizip II.': 'Werden + Partizip II.',
    'Los 4 Casos y Preposiciones': 'The 4 Cases and Prepositions',
    'El Genitivo (Wessen?)': 'The Genitive (Wessen?)',
    'Indica posesión. Masculino/Neutro: des Vaters (-s). Femenino/Plural: der Mutter.': 'Indicates possession. Masculine/Neuter: des Vaters (-s). Feminine/Plural: der Mutter.',
    'Wo? (Dativo) vs Wohin? (Acusativo). An, auf, hinter, in, neben, über, unter, vor, zwischen.': 'Wo? (Dative) vs Wohin? (Accusative). An, auf, hinter, in, neben, über, unter, vor, zwischen.',
    'Preposiciones con Genitivo': 'Prepositions with Genitive',
    'Wegen (por causa de), Trotz (a pesar de), Während (durante).': 'Wegen (because of), Trotz (despite), Während (during).',
    'Geografía y Destinos': 'Geography and Destinations',
    'Geografía': 'Geography',
    'In die Türkei (Akk). Ans Meer (Akk). Nach Berlin.': 'In die Türkei (Akk). Ans Meer (Akk). Nach Berlin.',
    'Infinitivos y Concesiones': 'Infinitives and Concessions',
    'Infinitivos': 'Infinitives',
    'Zu aprender. Obwohl es regnet.': 'To learn. Although it rains.', // Note: there's 'Zu lernen. Obwohl es regnet.' in original
    'Zu lernen. Obwohl es regnet.': 'To learn. Although it rains.',
    'Konjunktiv II': 'Konjunktiv II',
    'Ich würde/hätte/wäre.': 'Ich würde/hätte/wäre.',
    'Conectores Dobles': 'Double Connectors',
    'Conectores': 'Connectors',
    'Sowohl... als auch. Weder... noch.': 'Sowohl... als auch. Weder... noch.',
    'Participios Adjetivales': 'Adjectival Participles',
    'Participios': 'Participles',
    'Como adjetivos.': 'As adjectives.',
    'Causa y Efecto': 'Cause and Effect',
    'Consecuencias': 'Consequences',
    'Deshalb (Por eso). Sodass (De modo que).': 'Deshalb (Therefore). Sodass (So that).',
    'Narrativa Temporal': 'Temporal Narrative',
    'Narrativa': 'Narrative',
    'Präteritum escrito. Preposiciones temporales.': 'Written Präteritum. Temporal prepositions.',
    'Adverbios Pronominales': 'Pronominal Adverbs',
    'Pronominales': 'Pronominals',
    'Wo(r)+Prep (Cosa?). Da(r)+Prep (Referencia).': 'Wo(r)+Prep (Thing?). Da(r)+Prep (Reference).',
    'Finalidad': 'Purpose',
    'Um... zu (mismo sujeto). Damit (diferente sujeto).': 'Um... zu (same subject). Damit (different subject).',
    'Adi. Comparativos': 'Comparative Adj.',
    'Declinación Comparativa': 'Comparative Declension',
    'Adjetivo comparativo + terminación del adjetivo.': 'Comparative adjective + adjective ending.',
    'N-Deklination': 'N-Declension',
    'Masculinos débiles (terminan en -e, -and, -ent, -ist) añaden -n en Acusativo/Dativo/Genitivo.': 'Weak masculines (ending in -e, -and, -ent, -ist) add -n in Accusative/Dative/Genitive.',
    'Relativas Complejas': 'Complex Relatives',
    'Relativas Avanzadas': 'Advanced Relatives',
    'Uso de Dativo, Genitivo y Preposiciones en oraciones relativas.': 'Use of Dative, Genitive and Prepositions in relative clauses.',
    'Futuro I': 'Futur I',
    'Werden (presente) + Infinitiv (final). Para planes o suposiciones.': 'Werden (present) + Infinitive (end). For plans or assumptions.',
    'Plusquamperfekt': 'Plusquamperfekt',
    'Estructura: hatte/war + Participio II. Se usa para acciones anteriores a otro momento del pasado.': 'Structure: hatte/war + Partizip II. Used for actions before another time in the past.',
    'Conectores Temporales': 'Temporal Connectors',
    'Nachdem (con Plusquamperfekt) -> Frase principal (con Präteritum).': 'Nachdem (with Plusquamperfekt) -> Main clause (with Präteritum).',
    'Partículas Modales': 'Modal Particles',
    'Partículas': 'Particles',
    'Palabras que no se traducen literal pero dan intención o emoción a la frase.': 'Words that do not translate literally but give intention or emotion to the sentence.',
};

content = content.replace(/name:\s*'([^']+)'/g, (match, p1) => {
    if (translations[p1]) {
        return `name: { es: '${p1}', en: '${translations[p1].replace(/'/g, "\\'")}' }`;
    }
    console.log("Missing name:", p1);
    return `name: { es: '${p1}', en: '${p1}' }`;
});

content = content.replace(/title:\s*'([^']+)'/g, (match, p1) => {
    if (translations[p1]) {
        return `title: { es: '${p1}', en: '${translations[p1].replace(/'/g, "\\'")}' }`;
    }
    return match;
});

content = content.replace(/content:\s*'([^']+)'/g, (match, p1) => {
    if (translations[p1]) {
        return `content: { es: '${p1}', en: '${translations[p1].replace(/'/g, "\\'")}' }`;
    }
    return match;
});

// Update title in chapter theory
const chapTheoryTranslations: Record<string, string> = {
    'Bienvenido al B1': 'Welcome to B1',
    'En este nivel consolidaremos tu conocimiento. Empezaremos con el tema de viajes y el Perfekt.': 'At this level we will consolidate your knowledge. We will start with the topic of travel and the Perfekt.',
    'El Perfekt': 'The Perfekt',
    'Recuerda: El auxiliar (haben/sein) va en posición 2. El participio va al FINAL de la frase.': 'Remember: The auxiliary (haben/sein) goes in position 2. The participle goes to the END of the sentence.',
    'Tecnología y Separables': 'Technology and Separables',
    'Muchos verbos técnicos son separables (an-schalten, auf-laden). El prefijo va al final en presente.': 'Many technical verbs are separable (an-schalten, auf-laden). The prefix goes at the end in the present tense.',
    'Vocabulario Tech': 'Tech Vocabulary',
    'Akku (batería), Datei (archivo), Herunterladen (descargar).': 'Akku (battery), Datei (file), Herunterladen (download).',
    'Präteritum vs Perfekt': 'Präteritum vs Perfekt',
    'En el lenguaje hablado usamos Perfekt. Pero para "sein" (war) y "haben" (hatte) y verbos modales, preferimos el Präteritum.': 'In spoken language we use Perfekt. But for "sein" (war) and "haben" (hatte) and modal verbs, we prefer the Präteritum.',
    'Cambios': 'Changes',
    'Umziehen (mudarse) usa "sein" porque implica movimiento/cambio de estado.': 'Umziehen (to move) uses "sein" because it implies movement/change of state.',
    'Vida Laboral': 'Working Life',
    'En el trabajo usamos más formalidad (Sie). El Konjunktiv II (könnten, würden) es clave para pedir cosas amablemente.': 'At work we use more formality (Sie). The Konjunktiv II (könnten, würden) is key for asking for things politely.',
    'Bewerbung': 'Job Application',
    'Sich bewerben um (postularse a) es reflexivo y usa acusativo.': 'Sich bewerben um (to apply for) is reflexive and uses the accusative.',
    'Voz Pasiva': 'Passive Voice',
    'Se usa cuando la acción es más importante que quién la hace. \\nForma: Werden + Partizip II.\\n"Der Müll wird getrennt" (La basura es separada).': 'Used when the action is more important than who does it. \\nForm: Werden + Partizip II.\\n"Der Müll wird getrennt" (The garbage is separated).',
    'Futuro (Futur I)': 'Future (Futur I)',
    'Aunque a veces usamos presente con marcador temporal ("Morgen gehe ich"), el Futur I enfatiza planes o suposiciones.\\nForma: Werden + Infinitiv.': 'Although we sometimes use the present with a time marker ("Morgen gehe ich"), Futur I emphasizes plans or assumptions.\\nForm: Werden + Infinitive.',
    'Plusquamperfekt': 'Plusquamperfekt',
    'El "pasado del pasado". Se forma con War/Hatte (Präteritum) + Participio II.\\nEj: Ich war gegangen (Yo había ido).': 'The "past of the past". It is formed with War/Hatte (Präteritum) + Partizip II.\\nEx: Ich war gegangen (I had gone).',
    'Partículas Modales': 'Modal Particles',
    'Palabras como "halt" (resignación), "doch" (sugerencia amistosa) o "mal" (suavizar) dan vida al alemán hablado.': 'Words like "halt" (resignation), "doch" (friendly suggestion) or "mal" (soften) bring spoken German to life.'
}

content = content.replace(/title:\s*'([^']+)',\s*content:\s*'([^']+)'/g, (match, p1, p2) => {
     const t1 = chapTheoryTranslations[p1] || translations[p1] || p1;
     const t2 = chapTheoryTranslations[p2] || translations[p2] || p2;
     return `title: { es: '${p1}', en: '${t1.replace(/'/g, "\\'")}' }, content: { es: '${p2}', en: '${t2.replace(/'/g, "\\'")}' }`;
});

// Update Chapters title to be bilingual
content = content.replace(/title:\s*'Kapitel 1: Gute Reise!'/g, "title: { es: 'Kapitel 1: Gute Reise!', en: 'Chapter 1: Have a good trip!' }");
content = content.replace(/title:\s*'Kapitel 2: Das ist ja praktisch'/g, "title: { es: 'Kapitel 2: Das ist ja praktisch', en: 'Chapter 2: That\\'s practical' }");
content = content.replace(/title:\s*'Kapitel 3: Veränderungen'/g, "title: { es: 'Kapitel 3: Veränderungen', en: 'Chapter 3: Changes' }");
content = content.replace(/title:\s*'Kapitel 4: Arbeitswelt'/g, "title: { es: 'Kapitel 4: Arbeitswelt', en: 'Chapter 4: Working World' }");
content = content.replace(/title:\s*'Kapitel 5: Umweltfreundlich\?'/g, "title: { es: 'Kapitel 5: Umweltfreundlich?', en: 'Chapter 5: Eco-friendly?' }");
content = content.replace(/title:\s*'Kapitel 6: Blick nach vorn'/g, "title: { es: 'Kapitel 6: Blick nach vorn', en: 'Chapter 6: Looking Forward' }");
content = content.replace(/title:\s*'Kapitel 7: Zwischenmenschliches'/g, "title: { es: 'Kapitel 7: Zwischenmenschliches', en: 'Chapter 7: Interpersonal' }");
content = content.replace(/title:\s*'Examen EOI B1\.1'/g, "title: { es: 'Examen EOI B1.1', en: 'B1.1 Official Exam' }");


fs.writeFileSync(path, content);
console.log("Success!");
