import {
    BookOpen, Layers, Shuffle, MessageCircle, Zap, Trophy,
    Plane, Smartphone, Home, Briefcase, Leaf, Telescope,
    Puzzle, Key, Anchor, Circle, Cog, Map, Sparkles, Grid, Link as LinkIcon, Settings, Globe, GraduationCap, History, ArrowRightLeft, Users
} from 'lucide-react';
import type { Chunk, LevelNode, RoleplayScenario } from '../types';

// ==========================================
// DATA
// ==========================================

export const CHAPTER_PATH_NODES: LevelNode[] = [
    { id: 'l1', type: 'intro', title: 'Introducción', icon: BookOpen, difficulty: 1 },
    { id: 'l2', type: 'practice', title: 'Práctica Básica', icon: Layers, difficulty: 1 },
    { id: 'l3', type: 'practice', title: 'Refuerzo', icon: Shuffle, difficulty: 2 },
    { id: 'l4', type: 'chat', title: 'Roleplay: Misión', icon: MessageCircle, chatId: 'dynamic' },
    { id: 'l5', type: 'challenge', title: 'Avanzado', icon: Zap, difficulty: 3 },
    { id: 'l6', type: 'boss', title: 'Gran Desafío', icon: Trophy, isGym: true }
];

export const CHAT_SCENARIOS: Record<string, RoleplayScenario> = {
    'chat-cap1': {
        id: 'chat-cap1', title: 'Check-in im Hotel', partnerName: 'Rezeptionist', avatarColor: 'bg-blue-600',
        aiPersona: 'Rezeptionist', userMission: 'Check-in', systemPrompt: 'Legacy',
        steps: [
            { sender: 'bot', text: 'Guten Tag! Willkommen im Hotel Berlin. Haben Sie reserviert?' },
            {
                sender: 'user', options: [
                    { text: 'Ja, ich habe ein Zimmer gebucht.', isCorrect: true, feedback: 'Bien usado el Perfekt.' },
                    { text: 'Nein, ich will schlafen.', isCorrect: false, feedback: 'Demasiado directo.' },
                ]
            },
            { sender: 'bot', text: 'Wunderbar. Wie ist Ihr Name, bitte?' },
            {
                sender: 'user', options: [
                    { text: 'Mein Name ist Müller.', isCorrect: true, feedback: 'Correcto.' },
                    { text: 'Ich bin Batman.', isCorrect: false, feedback: 'Mantén el personaje.' },
                ]
            },
            { sender: 'bot', text: 'Ah ja, Herr Müller. Sind Sie mit dem Zug gekommen?' },
            {
                sender: 'user', options: [
                    { text: 'Nein, ich bin geflogen.', isCorrect: true, feedback: 'Excelente "Sein" para movimiento.' },
                    { text: 'Ich habe geflogen.', isCorrect: false, feedback: 'Fliegen usa Sein (movimiento).' },
                ]
            },
            { sender: 'bot', text: 'Verstehe. Haben Sie schon zu Mittag gegessen?' },
            {
                sender: 'user', options: [
                    { text: 'Nein, ich habe noch nichts gegessen.', isCorrect: true, feedback: 'Bien negado.' },
                    { text: 'Ja, ich esse jetzt.', isCorrect: false, feedback: 'La pregunta era en pasado.' },
                ]
            },
            { sender: 'bot', text: 'Unser Restaurant ist noch offen. Wie lange bleiben Sie?' },
            {
                sender: 'user', options: [
                    { text: 'Ich bleibe drei Nächte.', isCorrect: true, feedback: 'Correcto.' },
                    { text: 'Morgen.', isCorrect: false, feedback: 'Gramaticalmente incompleto.' },
                ]
            },
            { sender: 'bot', text: 'Gut. Brauchen Sie einen Weckruf?' },
            {
                sender: 'user', options: [
                    { text: 'Ja, bitte um 7 Uhr.', isCorrect: true, feedback: 'Bien.' },
                    { text: 'Nein, ich wache selbst auf.', isCorrect: true, feedback: 'Bien.' },
                ]
            },
            { sender: 'bot', text: 'Hier ist Ihr Schlüssel. Zimmer 304. Schönen Aufenthalt!' },
            {
                sender: 'user', options: [
                    { text: 'Vielen Dank, auf Wiedersehen.', isCorrect: true, feedback: 'Formal y correcto.' },
                    { text: 'Tschüss.', isCorrect: true, feedback: 'Aceptable.' },
                ]
            }
        ]
    },
    'chat-cap7': {
        id: 'chat-cap7', title: 'Streit mit einem Freund', partnerName: 'Leo', avatarColor: 'bg-red-500',
        aiPersona: 'Leo', userMission: 'Resolver el conflicto', systemPrompt: 'Friend',
        steps: [
            { sender: 'bot', text: 'Hey, warum hast du mich gestern nicht angerufen? Ich habe gewartet!' },
            {
                sender: 'user', options: [
                    { text: 'Es tut mir leid, ich hatte viel Stress.', isCorrect: true, feedback: 'Buena disculpa.' },
                    { text: 'Das ist nicht mein Problem.', isCorrect: false, feedback: 'Muy agresivo.' },
                ]
            },
            { sender: 'bot', text: 'Du hättest mir wenigstens schreiben können. Ich war echt sauer.' },
            {
                sender: 'user', options: [
                    { text: 'Ja, du hast recht. Ich war dumm.', isCorrect: true, feedback: 'Aceptando la culpa.' },
                    { text: 'Reg dich nicht auf.', isCorrect: false, feedback: 'Poco empático (Imperativ).' },
                ]
            },
            { sender: 'bot', text: 'Na gut. Aber nächstes Mal sagst du Bescheid, bevor du verschwindest, okay?' },
            {
                sender: 'user', options: [
                    { text: 'Versprochen. Nächstes Mal mache ich es besser.', isCorrect: true, feedback: 'Reconciliación.' },
                    { text: 'Mal sehen.', isCorrect: false, feedback: 'Demasiado vago.' },
                ]
            },
            { sender: 'bot', text: 'Okay, lass uns das vergessen. Gehen wir was essen?' }
        ]
    }
};

export const GRAMMAR_SYSTEMS = [
    {
        level: 'A1', color: 'bg-green-500', title: 'Fundamentos (A1)',
        systems: [
            {
                id: 'a1-struc', icon: Puzzle, name: 'Arquitectura V2', desc: 'El verbo siempre en 2ª posición.',
                theory: [{ title: 'Regla de Oro: V2', content: 'En una oración principal, el verbo conjugado SIEMPRE ocupa la posición 2.' }],
                exercises: [
                    { id: 'g-a1-01', german: 'Ich spiele heute Fußball.', spanish: 'Yo juego hoy al fútbol.', keywords: ['spiele'], difficulty: 1, grammarTags: ['v2'] },
                    { id: 'g-a1-02', german: 'Heute spiele ich Fußball.', spanish: 'Hoy juego yo al fútbol.', keywords: ['heute', 'spiele'], difficulty: 1, grammarTags: ['v2'] },
                    { id: 'g-a1-03', german: 'Am Morgen trinkt er Kaffee.', spanish: 'Por la mañana bebe él café.', keywords: ['morgen', 'trinkt'], difficulty: 1, grammarTags: ['v2'] },
                    { id: 'g-a1-04-ex', german: 'Wir lernen Deutsch.', spanish: 'Aprendemos alemán.', keywords: ['lernen'], difficulty: 1, grammarTags: ['v2'] },
                    { id: 'g-a1-05-ex', german: 'Das Kind lacht laut.', spanish: 'El niño ríe fuerte.', keywords: ['lacht', 'laut'], difficulty: 1, grammarTags: ['v2'] }
                ]
            },
            {
                id: 'a1-cases', icon: Key, name: 'Llaves: Nom/Akk', desc: 'Sujeto vs Objeto.',
                theory: [{ title: 'Nominativ vs Akkusativ', content: 'Nominativ: El sujeto (Der Mann). Akkusativ: El objeto (Den Mann).' }],
                exercises: [
                    { id: 'g-a1-04', german: 'Der Mann isst den Apfel.', spanish: 'El hombre come la manzana.', keywords: ['der', 'den', 'apfel'], difficulty: 1, grammarTags: ['akk'] },
                    { id: 'g-a1-05', german: 'Ich habe einen Bruder.', spanish: 'Tengo un hermano.', keywords: ['einen', 'bruder'], difficulty: 1, grammarTags: ['akk'] },
                    { id: 'g-a1-06', german: 'Sie sucht den Schlüssel.', spanish: 'Ella busca la llave.', keywords: ['sucht', 'den'], difficulty: 1, grammarTags: ['akk'] },
                    { id: 'g-a1-07-ex', german: 'Ich kenne den Lehrer.', spanish: 'Conozco al profesor.', keywords: ['den', 'lehrer'], difficulty: 1, grammarTags: ['akk'] },
                    { id: 'g-a1-08-ex', german: 'Wir sehen den Hund.', spanish: 'Vemos al perro.', keywords: ['den', 'hund'], difficulty: 1, grammarTags: ['akk'] }
                ]
            },
            {
                id: 'a1-modals', icon: Anchor, name: 'Verbos Modales', desc: 'Können, müssen, wollen.',
                theory: [{ title: 'Verbos Modales', content: 'El verbo modal se conjuga en posición 2. El otro verbo va al FINAL en infinitivo.' }],
                exercises: [
                    { id: 'g-a1-07', german: 'Ich kann gut schwimmen.', spanish: 'Sé nadar bien.', keywords: ['kann', 'schwimmen'], difficulty: 1, grammarTags: ['modal'] },
                    { id: 'g-a1-08', german: 'Wir müssen Hausaufgaben machen.', spanish: 'Tenemos que hacer deberes.', keywords: ['müssen', 'machen'], difficulty: 1, grammarTags: ['modal'] },
                    { id: 'g-a1-09', german: 'Willst du ein Eis essen?', spanish: '¿Quieres comer un helado?', keywords: ['willst', 'essen'], difficulty: 1, grammarTags: ['modal'] },
                    { id: 'g-a1-10-ex', german: 'Darf ich hier rauchen?', spanish: '¿Puedo fumar aquí?', keywords: ['darf', 'rauchen'], difficulty: 1, grammarTags: ['modal'] },
                    { id: 'g-a1-11-ex', german: 'Du sollst mehr schlafen.', spanish: 'Deberías dormir más.', keywords: ['sollst', 'schlafen'], difficulty: 1, grammarTags: ['modal'] }
                ]
            },
            {
                id: 'a1-articles', icon: Circle, name: 'Artículos y Género', desc: 'Der, Die, Das, Ein, Eine.',
                theory: [{ title: 'Género', content: '3 géneros: Masculino (Der), Femenino (Die), Neutro (Das).' }],
                exercises: [
                    { id: 'g-a1-13', german: 'Das ist ein Tisch.', spanish: 'Esto es una mesa.', keywords: ['ein', 'tisch'], difficulty: 1, grammarTags: ['nom'] },
                    { id: 'g-a1-14', german: 'Die Frau liest eine Zeitung.', spanish: 'La mujer lee un periódico.', keywords: ['die', 'eine'], difficulty: 1, grammarTags: ['nom', 'akk'] },
                    { id: 'g-a1-15', german: 'Ein Kind spielt im Park.', spanish: 'Un niño juega en el parque.', keywords: ['ein', 'kind'], difficulty: 1, grammarTags: ['nom'] },
                    { id: 'g-a1-16-ex', german: 'Der Computer ist teuer.', spanish: 'El ordenador es caro.', keywords: ['der', 'computer'], difficulty: 1, grammarTags: ['nom'] },
                    { id: 'g-a1-17-ex', german: 'Hast du eine Schwester?', spanish: '¿Tienes una hermana?', keywords: ['eine'], difficulty: 1, grammarTags: ['akk'] }
                ]
            }
        ]
    },
    {
        level: 'A2',
        color: 'bg-yellow-500',
        title: 'Narrativa (A2)',
        systems: [
            {
                id: 'a2-perfekt', icon: Cog, name: 'Motor: Perfekt', desc: 'Pasado hablado.',
                theory: [{ title: 'Perfekt', content: 'Auxiliar (Pos 2) + Participio (Final).' }],
                exercises: [
                    { id: 'g-a2-01', german: 'Ich habe gestern Fußball gespielt.', spanish: 'Ayer jugué al fútbol.', keywords: ['habe', 'gespielt'], difficulty: 2, grammarTags: ['perfekt'] },
                    { id: 'g-a2-02', german: 'Er ist früh aufgestanden.', spanish: 'Él se ha levantado temprano.', keywords: ['ist', 'aufgestanden'], difficulty: 2, grammarTags: ['perfekt'] },
                    { id: 'g-a2-02b', german: 'Wir haben viel gelacht.', spanish: 'Nos hemos reído mucho.', keywords: ['haben', 'gelacht'], difficulty: 2, grammarTags: ['perfekt'] },
                    { id: 'g-a2-03-ex', german: 'Hast du das Buch gelesen?', spanish: '¿Has leído el libro?', keywords: ['hast', 'gelesen'], difficulty: 2, grammarTags: ['perfekt'] },
                    { id: 'g-a2-04-ex', german: 'Wir sind nach Berlin gefahren.', spanish: 'Hemos ido (en coche/tren) a Berlín.', keywords: ['sind', 'gefahren'], difficulty: 2, grammarTags: ['perfekt'] },
                    { id: 'g-a2-05-ex', german: 'Ich habe einen Brief geschrieben.', spanish: 'He escrito una carta.', keywords: ['habe', 'geschrieben'], difficulty: 2, grammarTags: ['perfekt'] }
                ]
            },
            {
                id: 'a2-preps', icon: Map, name: 'Ubicación (Dat/Akk)', desc: 'Wechselpräpositionen.',
                theory: [{ title: 'Preposiciones', content: 'Wo? (Estático) -> Dativo. Wohin? (Movimiento) -> Acusativo.' }],
                exercises: [
                    { id: 'g-a2-05', german: 'Das Buch liegt auf dem Tisch.', spanish: 'El libro está sobre la mesa.', keywords: ['auf', 'dem'], difficulty: 2, grammarTags: ['dat'] },
                    { id: 'g-a2-06', german: 'Ich lege das Buch auf den Tisch.', spanish: 'Pongo el libro sobre la mesa.', keywords: ['auf', 'den'], difficulty: 2, grammarTags: ['akk'] },
                    { id: 'g-a2-07', german: 'Die Katze ist unter dem Bett.', spanish: 'El gato está bajo la cama.', keywords: ['unter', 'dem'], difficulty: 2, grammarTags: ['dat'] },
                    { id: 'g-a2-08-ex', german: 'Wir gehen in den Park.', spanish: 'Vamos al parque.', keywords: ['in', 'den'], difficulty: 2, grammarTags: ['akk'] },
                    { id: 'g-a2-09-ex', german: 'Wir sind im Park.', spanish: 'Estamos en el parque.', keywords: ['im'], difficulty: 2, grammarTags: ['dat'] },
                    { id: 'g-a2-10-ex', german: 'Stell die Vase auf den Tisch.', spanish: 'Pon el jarrón sobre la mesa.', keywords: ['auf', 'den'], difficulty: 2, grammarTags: ['akk'] }
                ]
            },
            {
                id: 'a2-prateritum', icon: BookOpen, name: 'Präteritum Básico', desc: 'War y Hatte.',
                theory: [{ title: 'Präteritum', content: 'Sein -> War. Haben -> Hatte.' }],
                exercises: [
                    { id: 'g-a2-11', german: 'Ich war gestern krank.', spanish: 'Ayer estuve enfermo.', keywords: ['war', 'krank'], difficulty: 2, grammarTags: ['präteritum'] },
                    { id: 'g-a2-12', german: 'Wir hatten keine Zeit.', spanish: 'No teníamos tiempo.', keywords: ['hatten', 'zeit'], difficulty: 2, grammarTags: ['präteritum'] },
                    { id: 'g-a2-13', german: 'Das Wetter war schön.', spanish: 'El tiempo era bonito.', keywords: ['war', 'schön'], difficulty: 2, grammarTags: ['präteritum'] },
                    { id: 'g-a2-14-ex', german: 'Er hatte viel Glück.', spanish: 'Él tuvo mucha suerte.', keywords: ['hatte', 'glück'], difficulty: 2, grammarTags: ['präteritum'] },
                    { id: 'g-a2-15-ex', german: 'Wart ihr zu Hause?', spanish: '¿Estabais en casa?', keywords: ['wart', 'hause'], difficulty: 2, grammarTags: ['präteritum'] }
                ]
            },
            {
                id: 'a2-adj', icon: Sparkles, name: 'Adjetivos (Intro)', desc: 'Finales básicos (-e, -en).',
                theory: [{ title: 'Adjetivos', content: 'Der rote Apfel (Nom). Den roten Apfel (Akk).' }],
                exercises: [
                    { id: 'g-a2-16', german: 'Der große Mann lacht.', spanish: 'El hombre grande ríe.', keywords: ['große', 'mann'], difficulty: 2, grammarTags: ['adj'] },
                    { id: 'g-a2-17', german: 'Das kleine Kind spielt.', spanish: 'El niño pequeño juega.', keywords: ['kleine', 'kind'], difficulty: 2, grammarTags: ['adj'] },
                    { id: 'g-a2-18-ex', german: 'Ich trinke den heißen Kaffee.', spanish: 'Bebo el café caliente.', keywords: ['heißen', 'kaffee'], difficulty: 2, grammarTags: ['adj', 'akk'] },
                    { id: 'g-a2-19-ex', german: 'Die junge Frau ist nett.', spanish: 'La mujer joven es amable.', keywords: ['junge', 'frau'], difficulty: 2, grammarTags: ['adj'] }
                ]
            },
            {
                id: 'a2-prep-akk-new', icon: Zap, name: 'Preposiciones (Akk)', desc: 'Durch, für, gegen, ohne, um.',
                theory: [{ title: 'Acusativo', content: 'Estas preposiciones SIEMPRE piden Acusativo: Durch (a través), Für (para), Gegen (contra), Ohne (sin), Um (alrededor).' }],
                exercises: [
                    { id: 'g-a2-prep-akk-01', german: 'Der Hund läuft durch den Park.', spanish: 'El perro corre a través del parque.', keywords: ['durch', 'den'], difficulty: 2, grammarTags: ['akk', 'prep'] },
                    { id: 'g-a2-prep-akk-02', german: 'Das Wasser ist für meinen Vater.', spanish: 'El agua es para mi padre.', keywords: ['für', 'meinen'], difficulty: 2, grammarTags: ['akk', 'prep'] },
                    { id: 'g-a2-prep-akk-03', german: 'Er kommt ohne seine Freundin.', spanish: 'Él viene sin su novia.', keywords: ['ohne', 'seine'], difficulty: 2, grammarTags: ['akk', 'prep'] }
                ]
            },
            {
                id: 'a2-prep-dat-new', icon: Anchor, name: 'Preposiciones (Dat)', desc: 'Aus, bei, mit, nach, seit, von, zu.',
                theory: [{ title: 'Dativo', content: 'Siempre Dativo: Aus (de/origen), Bei (en casa de), Mit (con), Nach (hacia), Seit (desde), Von (de), Zu (a).' }],
                exercises: [
                    { id: 'g-a2-prep-dat-01', german: 'Ich komme aus dem Haus.', spanish: 'Vengo de la casa.', keywords: ['aus', 'dem'], difficulty: 2, grammarTags: ['dat', 'prep'] },
                    { id: 'g-a2-prep-dat-02', german: 'Wir fahren mit dem Zug.', spanish: 'Vamos en tren.', keywords: ['mit', 'dem'], difficulty: 2, grammarTags: ['dat', 'prep'] },
                    { id: 'g-a2-prep-dat-03', german: 'Ich bin bei dir.', spanish: 'Estoy contigo.', keywords: ['bei', 'dir'], difficulty: 2, grammarTags: ['dat', 'prep'] }
                ]
            },
            {
                id: 'a2-prep-mix-new', icon: Shuffle, name: 'Preposiciones Mixtas', desc: '¿Lugar o Movimiento?',
                theory: [{ title: 'Wechselpräpositionen', content: 'Wo? (¿Dónde estoy?) -> Dativo (Estático).\nWohin? (¿A dónde voy?) -> Acusativo (Movimiento).' }],
                exercises: [
                    { id: 'g-a2-prep-mix-01', german: 'Die Katze ist unter dem Tisch.', spanish: 'El gato está bajo la mesa.', keywords: ['unter', 'dem'], difficulty: 2, grammarTags: ['dat', 'prep'] },
                    { id: 'g-a2-prep-mix-02', german: 'Die Katze läuft unter den Tisch.', spanish: 'El gato corre debajo de la mesa.', keywords: ['unter', 'den'], difficulty: 2, grammarTags: ['akk', 'prep'] },
                    { id: 'g-a2-prep-mix-03', german: 'Das Bild hängt an der Wand.', spanish: 'El cuadro cuelga en la pared.', keywords: ['an', 'der'], difficulty: 2, grammarTags: ['dat', 'prep'] }
                ]
            }
        ]
    },
    {
        level: 'B1',
        color: 'bg-orange-500',
        title: 'Conexiones (B1)',
        systems: [
            {
                id: 'b1-sub', icon: Grid, name: 'Subordinadas', desc: 'Verbo al final (weil, dass).',
                theory: [{ title: 'Subordinadas', content: 'Verbo al final con weil/dass.' }],
                exercises: [
                    { id: 'g-b1-01', german: 'Ich lerne Deutsch, weil es wichtig ist.', spanish: 'Aprendo alemán porque es importante.', keywords: ['weil', 'ist'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-02', german: 'Er weiß, dass sie kommt.', spanish: 'Él sabe que ella viene.', keywords: ['dass', 'kommt'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-02b', german: 'Wenn ich Zeit habe, lese ich.', spanish: 'Si tengo tiempo, leo.', keywords: ['wenn', 'habe', 'lese'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-03-ex', german: 'Ich bleibe zu Hause, weil es regnet.', spanish: 'Me quedo en casa porque llueve.', keywords: ['weil', 'regnet'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-04-ex', german: 'Sie fragt, ob du kommst.', spanish: 'Ella pregunta si vienes.', keywords: ['ob', 'kommst'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-05-ex', german: 'Als ich klein war, spielte ich viel.', spanish: 'Cuando era pequeño, jugaba mucho.', keywords: ['als', 'war', 'spielte'], difficulty: 3, grammarTags: ['nebensatz'] }
                ]
            },
            {
                id: 'b1-verb-prep', icon: MessageCircle, name: 'Verbos + Prep', desc: 'Warten auf, Träumen von...',
                theory: [{ title: 'Verbos con Preposición', content: 'Warten auf + Akk. Träumen von + Dat.' }],
                exercises: [
                    { id: 'g-b1-05', german: 'Ich warte auf den Bus.', spanish: 'Espero al autobús.', keywords: ['warte', 'auf', 'den'], difficulty: 3, grammarTags: ['prep'] },
                    { id: 'g-b1-06', german: 'Sie träumt von einem Haus.', spanish: 'Ella sueña con una casa.', keywords: ['träumt', 'von', 'einem'], difficulty: 3, grammarTags: ['prep'] },
                    { id: 'g-b1-07', german: 'Wir interessieren uns für Musik.', spanish: 'Nos interesamos por la música.', keywords: ['interessieren', 'für'], difficulty: 3, grammarTags: ['prep'] },
                    { id: 'g-b1-08-ex', german: 'Er denkt an seine Familie.', spanish: 'Él piensa en su familia.', keywords: ['denkt', 'an'], difficulty: 3, grammarTags: ['prep'] },
                    { id: 'g-b1-09-ex', german: 'Ich freue mich auf den Urlaub.', spanish: 'Me alegro por las vacaciones.', keywords: ['freue', 'auf'], difficulty: 3, grammarTags: ['prep'] },
                    { id: 'g-b1-10-ex', german: 'Wir sprechen über das Wetter.', spanish: 'Hablamos sobre el tiempo.', keywords: ['sprechen', 'über'], difficulty: 3, grammarTags: ['prep'] }
                ]
            },
            {
                id: 'b1-relativ', icon: LinkIcon, name: 'Frases Relativas', desc: 'Der Mann, der...',
                theory: [{ title: 'Relativas', content: 'Verbo al final.' }],
                exercises: [
                    { id: 'g-b1-11', german: 'Das ist der Mann, der mich liebt.', spanish: 'Ese es el hombre que me ama.', keywords: ['der', 'liebt'], difficulty: 3, grammarTags: ['relativ'] },
                    { id: 'g-b1-12', german: 'Die Stadt, die wir besuchen, ist schön.', spanish: 'La ciudad que visitamos es bonita.', keywords: ['die', 'besuchen'], difficulty: 3, grammarTags: ['relativ'] },
                    { id: 'g-b1-13-ex', german: 'Das Auto, das dort steht, ist neu.', spanish: 'El coche que está ahí es nuevo.', keywords: ['das', 'steht'], difficulty: 3, grammarTags: ['relativ'] },
                    { id: 'g-b1-14-ex', german: 'Die Kinder, mit denen ich spiele, sind nett.', spanish: 'Los niños con los que juego son amables.', keywords: ['denen', 'spiele'], difficulty: 3, grammarTags: ['relativ'] }
                ]
            },
            {
                id: 'b1-passiv', icon: Settings, name: 'Voz Pasiva', desc: 'Werden + Partizip II.',
                theory: [{ title: 'Pasiva', content: 'Werden + Partizip II.' }],
                exercises: [
                    { id: 'g-b1-15', german: 'Der Müll wird getrennt.', spanish: 'La basura es separada.', keywords: ['wird', 'getrennt'], difficulty: 3, grammarTags: ['passiv'] },
                    { id: 'g-b1-16', german: 'Das Fenster wird geöffnet.', spanish: 'La ventana es abierta.', keywords: ['wird', 'geöffnet'], difficulty: 3, grammarTags: ['passiv'] },
                    { id: 'g-b1-17-ex', german: 'Das Auto wird repariert.', spanish: 'El coche es reparado.', keywords: ['wird', 'repariert'], difficulty: 3, grammarTags: ['passiv'] },
                    { id: 'g-b1-18-ex', german: 'Der Kuchen wird gebacken.', spanish: 'El pastel es horneado.', keywords: ['wird', 'gebacken'], difficulty: 3, grammarTags: ['passiv'] }
                ]
            },
            {
                id: 'b1-cases', icon: BookOpen, name: 'Los 4 Casos y Preposiciones', desc: 'Genitivo, preposiciones mixtas y repaso total.',
                theory: [
                    { title: 'El Genitivo (Wessen?)', content: 'Indica posesión. Masculino/Neutro: des Vaters (-s). Femenino/Plural: der Mutter.' },
                    { title: 'Preposiciones Mixtas', content: 'Wo? (Dativo) vs Wohin? (Acusativo). An, auf, hinter, in, neben, über, unter, vor, zwischen.' },
                    { title: 'Preposiciones con Genitivo', content: 'Wegen (por causa de), Trotz (a pesar de), Während (durante).' }
                ],
                exercises: [
                    { id: 'g-b1-19', german: 'Das ist das Auto des Lehrers.', spanish: 'Este es el coche del profesor.', keywords: ['das', 'des', 'lehrers'], difficulty: 3, grammarTags: ['genitiv'] },
                    { id: 'g-b1-20', german: 'Wegen des Regens bleiben wir zu Hause.', spanish: 'Por la lluvia nos quedamos en casa.', keywords: ['wegen', 'des', 'regens'], difficulty: 3, grammarTags: ['genitiv', 'prep'] },
                    { id: 'g-b1-21', german: 'Ich stelle die Lampe auf den Tisch.', spanish: 'Pongo la lámpara sobre la mesa.', keywords: ['auf', 'den'], difficulty: 3, grammarTags: ['akk', 'wechselpraposition'] },
                    { id: 'g-b1-22', german: 'Die Lampe steht auf dem Tisch.', spanish: 'La lámpara está sobre la mesa.', keywords: ['auf', 'dem'], difficulty: 3, grammarTags: ['dat', 'wechselpraposition'] },
                    { id: 'g-b1-23', german: 'Trotz der Kälte gehen wir raus.', spanish: 'A pesar del frío salimos.', keywords: ['trotz', 'der', 'kälte'], difficulty: 3, grammarTags: ['genitiv', 'prep'] }
                ]
            },
            {
                id: 'b1-geo', icon: Globe, name: 'Geografía y Destinos', desc: 'Wohin? in die Türkei, ans Meer.',
                theory: [{ title: 'Geografía', content: 'In die Türkei (Akk). Ans Meer (Akk). Nach Berlin.' }],
                exercises: [
                    { id: 'g-b1-24', german: 'Ich reise in die Türkei.', spanish: 'Viajo a Turquía.', keywords: ['in', 'die', 'türkei'], difficulty: 3, grammarTags: ['prep', 'geo'] },
                    { id: 'g-b1-25', german: 'Wir fahren ans Meer.', spanish: 'Vamos al mar.', keywords: ['ans', 'meer'], difficulty: 3, grammarTags: ['prep', 'geo'] },
                    { id: 'g-b1-26', german: 'Er fährt in die Schweiz.', spanish: 'Él va a Suiza.', keywords: ['in', 'die', 'schweiz'], difficulty: 3, grammarTags: ['prep', 'geo'] },
                    { id: 'g-b1-27-ex', german: 'Wir sind an der Ostsee.', spanish: 'Estamos en el Báltico.', keywords: ['an', 'der'], difficulty: 3, grammarTags: ['prep', 'geo'] }
                ]
            },
            {
                id: 'b1-infinitive', icon: Anchor, name: 'Infinitivos y Concesiones', desc: 'Zu + Infinitiv, Obwohl.',
                theory: [{ title: 'Infinitivos', content: 'Zu lernen. Obwohl es regnet.' }],
                exercises: [
                    { id: 'g-b1-28', german: 'Es ist schwer, Deutsch zu lernen.', spanish: 'Es difícil aprender alemán.', keywords: ['zu', 'lernen'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-29', german: 'Obwohl es regnet, gehe ich raus.', spanish: 'Aunque llueve, salgo.', keywords: ['obwohl', 'regnet'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-30', german: 'Da ich Hunger habe, esse ich.', spanish: 'Como tengo hambre, como.', keywords: ['da', 'hunger'], difficulty: 3, grammarTags: ['nebensatz'] },
                    { id: 'g-b1-31-ex', german: 'Ich habe Lust zu reisen.', spanish: 'Tengo ganas de viajar.', keywords: ['lust', 'zu', 'reisen'], difficulty: 3, grammarTags: ['nebensatz'] }
                ]
            }
        ]

    },
    {
        level: 'B2',
        color: 'bg-blue-600',
        title: 'Maestría (B2)',
        systems: [
            {
                id: 'b2-konj', icon: Sparkles, name: 'Konjunktiv II', desc: 'Deseos y cortesía.',
                theory: [{ title: 'Konjunktiv II', content: 'Ich würde/hätte/wäre.' }],
                exercises: [
                    { id: 'g-b2-01', german: 'Wenn ich reich wäre, würde ich reisen.', spanish: 'Si fuera rico, viajaría.', keywords: ['wäre', 'würde', 'reisen'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-02', german: 'Könnten Sie mir bitte helfen?', spanish: '¿Podría ayudarme por favor?', keywords: ['könnten', 'helfen'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-03-ex', german: 'Ich hätte gern ein Wasser.', spanish: 'Me gustaría un agua.', keywords: ['hätte', 'gern'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-04-ex', german: 'An deiner Stelle würde ich mehr lernen.', spanish: 'En tu lugar, yo estudiaría más.', keywords: ['würde', 'lernen'], difficulty: 4, grammarTags: ['konj'] }
                ]
            },
            {
                id: 'b2-connect', icon: LinkIcon, name: 'Conectores Dobles', desc: 'Zwar... aber, weder... noch.',
                theory: [{ title: 'Conectores', content: 'Sowohl... als auch. Weder... noch.' }],
                exercises: [
                    { id: 'g-b2-03', german: 'Er spricht sowohl Deutsch als auch Englisch.', spanish: 'Él habla tanto alemán como inglés.', keywords: ['sowohl', 'als', 'auch'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-04', german: 'Ich trinke weder Tee noch Kaffee.', spanish: 'No bebo ni té ni café.', keywords: ['weder', 'noch'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-05-ex', german: 'Je mehr ich lerne, desto mehr weiß ich.', spanish: 'Cuanto más aprendo, más sé.', keywords: ['je', 'desto'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-06-ex', german: 'Zwar ist es teuer, aber es ist gut.', spanish: 'Cierto que es caro, pero es bueno.', keywords: ['zwar', 'aber'], difficulty: 4, grammarTags: ['konj'] }
                ]
            },
            {
                id: 'b2-partizip', icon: Layers, name: 'Participios Adjetivales', desc: 'Das singende Kind.',
                theory: [{ title: 'Participios', content: 'Como adjetivos.' }],
                exercises: [
                    { id: 'g-b2-07', german: 'Der lachende Mann ist mein Vater.', spanish: 'El hombre que ríe es mi padre.', keywords: ['lachende', 'mann'], difficulty: 4, grammarTags: ['partizip'] },
                    { id: 'g-b2-08', german: 'Die gekochte Suppe schmeckt gut.', spanish: 'La sopa cocinada sabe bien.', keywords: ['gekochte', 'suppe'], difficulty: 4, grammarTags: ['partizip'] },
                    { id: 'g-b2-09-ex', german: 'Das schlafende Baby ist süß.', spanish: 'El bebé durmiente es dulce.', keywords: ['schlafende', 'baby'], difficulty: 4, grammarTags: ['partizip'] },
                    { id: 'g-b2-10-ex', german: 'Die reparierte Maschine läuft wieder.', spanish: 'La máquina reparada funciona de nuevo.', keywords: ['reparierte', 'maschine'], difficulty: 4, grammarTags: ['partizip'] }
                ]
            },
            {
                id: 'b2-conseq', icon: Zap, name: 'Causa y Efecto', desc: 'Deshalb, Sodass, Lassen.',
                theory: [{ title: 'Consecuencias', content: 'Deshalb (Por eso). Sodass (De modo que).' }],
                exercises: [
                    { id: 'g-b2-11', german: 'Der Zug hatte Verspätung, deshalb bin ich spät.', spanish: 'El tren tuvo retraso, por eso llego tarde.', keywords: ['deshalb'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-12', german: 'Es regnete stark, sodass wir nicht gingen.', spanish: 'Llovía fuerte, de modo que no fuimos.', keywords: ['sodass'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-13', german: 'Ich lasse mir die Haare schneiden.', spanish: 'Me corto el pelo.', keywords: ['lasse', 'schneiden'], difficulty: 4, grammarTags: ['verb'] },
                    { id: 'g-b2-14-ex', german: 'Lass mich schlafen!', spanish: '¡Déjame dormir!', keywords: ['lass', 'schlafen'], difficulty: 4, grammarTags: ['verb'] }
                ]
            },
            {
                id: 'b2-narrative', icon: BookOpen, name: 'Narrativa Temporal', desc: 'Präteritum y Preposiciones.',
                theory: [{ title: 'Narrativa', content: 'Präteritum escrito. Preposiciones temporales.' }],
                exercises: [
                    { id: 'g-b2-15', german: 'Er lebte lange in Berlin.', spanish: 'Él vivió mucho tiempo en Berlín.', keywords: ['lebte'], difficulty: 4, grammarTags: ['präteritum'] },
                    { id: 'g-b2-16', german: 'Während der Nacht schlief er nicht.', spanish: 'Durante la noche no durmió.', keywords: ['während', 'nacht'], difficulty: 4, grammarTags: ['genitiv'] },
                    { id: 'g-b2-17', german: 'Seit drei Jahren lernt er Deutsch.', spanish: 'Desde hace tres años aprende alemán.', keywords: ['seit', 'jahren'], difficulty: 4, grammarTags: ['dat'] },
                    { id: 'g-b2-18-ex', german: 'Nach dem Essen gingen sie spazieren.', spanish: 'Después de comer fueron a pasear.', keywords: ['nach', 'essen'], difficulty: 4, grammarTags: ['dat'] }
                ]
            },
            {
                id: 'b2-pronom', icon: Shuffle, name: 'Adverbios Pronominales', desc: 'Wofür, Daran, Damit.',
                theory: [{ title: 'Pronominales', content: 'Wo(r)+Prep (Cosa?). Da(r)+Prep (Referencia).' }],
                exercises: [
                    { id: 'g-b2-19', german: 'Woran denkst du?', spanish: '¿En qué piensas?', keywords: ['woran'], difficulty: 4, grammarTags: ['pron'] },
                    { id: 'g-b2-20', german: 'Ich denke daran.', spanish: 'Pienso en ello.', keywords: ['daran'], difficulty: 4, grammarTags: ['pron'] },
                    { id: 'g-b2-21', german: 'Womit schreibst du?', spanish: '¿Con qué escribes?', keywords: ['womit'], difficulty: 4, grammarTags: ['pron'] },
                    { id: 'g-b2-22-ex', german: 'Ich freue mich darüber.', spanish: 'Me alegro de ello.', keywords: ['darüber'], difficulty: 4, grammarTags: ['pron'] }
                ]
            },
            {
                id: 'b2-final', icon: Key, name: 'Finalidad', desc: 'Damit, Um... zu.',
                theory: [{ title: 'Finalidad', content: 'Um... zu (mismo sujeto). Damit (diferente sujeto).' }],
                exercises: [
                    { id: 'g-b2-23', german: 'Ich lerne, um zu reisen.', spanish: 'Aprendo para viajar.', keywords: ['um', 'zu', 'reisen'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-24', german: 'Sprich laut, damit ich dich höre.', spanish: 'Habla alto para que te oiga.', keywords: ['damit', 'höre'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-25-ex', german: 'Er spart, um ein Auto zu kaufen.', spanish: 'Él ahorra para comprar un coche.', keywords: ['um', 'auto', 'zu', 'kaufen'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-26-ex', german: 'Mach das Licht an, damit wir sehen.', spanish: 'Enciende la luz para que veamos.', keywords: ['damit', 'sehen'], difficulty: 4, grammarTags: ['konj'] }
                ]
            },
            {
                id: 'b2-adj-decl', icon: Sparkles, name: 'Adi. Comparativos', desc: 'Ein schnelleres Auto.',
                theory: [{ title: 'Declinación Comparativa', content: 'Adjetivo comparativo + terminación del adjetivo.' }],
                exercises: [
                    { id: 'g-b2-27', german: 'Ein schnelleres Auto ist teuer.', spanish: 'Un coche más rápido es caro.', keywords: ['schnelleres'], difficulty: 4, grammarTags: ['adj'] },
                    { id: 'g-b2-28', german: 'Ich möchte einen besseren Wein.', spanish: 'Quiero un vino mejor.', keywords: ['besseren'], difficulty: 4, grammarTags: ['adj', 'akk'] },
                    { id: 'g-b2-29-ex', german: 'Das ist die schönste Frau.', spanish: 'Esa es la mujer más guapa.', keywords: ['schönste'], difficulty: 4, grammarTags: ['adj'] },
                    { id: 'g-b2-30-ex', german: 'Mit kleineren Kindern.', spanish: 'Con niños más pequeños.', keywords: ['kleineren'], difficulty: 4, grammarTags: ['adj', 'dat'] }
                ]
            },
            {
                id: 'b2-n-dek', icon: Puzzle, name: 'N-Deklination', desc: 'Den Studenten, Des Kunden.',
                theory: [{ title: 'N-Deklination', content: 'Masculinos débiles (terminan en -e, -and, -ent, -ist) añaden -n en Acusativo/Dativo/Genitivo.' }],
                exercises: [
                    { id: 'g-b2-31', german: 'Ich sehe den Studenten.', spanish: 'Veo al estudiante.', keywords: ['den', 'studenten'], difficulty: 4, grammarTags: ['n-dek'] },
                    { id: 'g-b2-32', german: 'Der Name des Kunden ist Müller.', spanish: 'El nombre del cliente es Müller.', keywords: ['des', 'kunden'], difficulty: 4, grammarTags: ['n-dek', 'genitiv'] },
                    { id: 'g-b2-33-ex', german: 'Wir helfen dem Polizisten.', spanish: 'Ayudamos al policía.', keywords: ['dem', 'polizisten'], difficulty: 4, grammarTags: ['n-dek', 'dat'] },
                    { id: 'g-b2-34-ex', german: 'Kennst du den Jungen?', spanish: '¿Conoces al chico?', keywords: ['den', 'jungen'], difficulty: 4, grammarTags: ['n-dek'] }
                ]
            },
            {
                id: 'b2-relativ-2', icon: LinkIcon, name: 'Relativas Complejas', desc: 'Dem ich helfe, Womit.',
                theory: [{ title: 'Relativas Avanzadas', content: 'Uso de Dativo, Genitivo y Preposiciones en oraciones relativas.' }],
                exercises: [
                    { id: 'g-b2-35', german: 'Der Mann, dem ich helfe, ist nett.', spanish: 'El hombre a quien ayudo es amable.', keywords: ['dem', 'helfe'], difficulty: 4, grammarTags: ['relativ', 'dat'] },
                    { id: 'g-b2-36', german: 'Der Tisch, an dem wir sitzen.', spanish: 'La mesa en la que estamos sentados.', keywords: ['an', 'dem'], difficulty: 4, grammarTags: ['relativ', 'prep'] },
                    { id: 'g-b2-37-ex', german: 'Die Frau, mit der ich spreche.', spanish: 'La mujer con la que hablo.', keywords: ['mit', 'der'], difficulty: 4, grammarTags: ['relativ', 'dat'] },
                    { id: 'g-b2-38-ex', german: 'Das Haus, dessen Tür rot ist.', spanish: 'La casa cuya puerta es roja.', keywords: ['dessen'], difficulty: 4, grammarTags: ['relativ', 'genitiv'] }
                ]
            },
            {
                id: 'b2-futur-sys', icon: Telescope, name: 'Futuro I', desc: 'Werden + Infinitiv.',
                theory: [{ title: 'Futuro I', content: 'Werden (presente) + Infinitiv (final). Para planes o suposiciones.' }],
                exercises: [
                    { id: 'g-b2-39', german: 'Es wird morgen regnen.', spanish: 'Mañana lloverá.', keywords: ['wird', 'regnen'], difficulty: 4, grammarTags: ['futur'] },
                    { id: 'g-b2-40', german: 'Ich werde dich besuchen.', spanish: 'Te visitaré.', keywords: ['werde', 'besuchen'], difficulty: 4, grammarTags: ['futur'] },
                    { id: 'g-b2-41-ex', german: 'Er wird wohl zu Hause sein.', spanish: 'Él estará probablemente en casa.', keywords: ['wird', 'sein'], difficulty: 4, grammarTags: ['futur'] },
                    { id: 'g-b2-42-ex', german: 'Wir werden sehen.', spanish: 'Veremos.', keywords: ['werden', 'sehen'], difficulty: 4, grammarTags: ['futur'] }
                ]
            }
        ]
    },
    {
        level: 'B2+',
        color: 'bg-indigo-600',
        title: 'Nivel B2: Profundización',
        systems: [
            {
                id: 'b2-plusquam', icon: History, name: 'Plusquamperfekt', desc: 'Cuando algo ocurrió antes que otra cosa en el pasado.',
                theory: [{ title: 'Plusquamperfekt', content: 'Estructura: hatte/war + Participio II. Se usa para acciones anteriores a otro momento del pasado.' }],
                exercises: [
                    { id: 'g-b2-plus-01', german: 'Ich hatte gegessen, bevor er kam.', spanish: 'Yo había comido antes de que él viniera.', keywords: ['hatte', 'gegessen'], difficulty: 4, grammarTags: ['plusquamperfekt'] },
                    { id: 'g-b2-plus-02', german: 'Er war schon gegangen.', spanish: 'Él ya se había ido.', keywords: ['war', 'gegangen'], difficulty: 4, grammarTags: ['plusquamperfekt'] },
                    { id: 'g-b2-plus-03-ex', german: 'Wir hatten das Haus gekauft.', spanish: 'Habíamos comprado la casa.', keywords: ['hatten', 'gekauft'], difficulty: 4, grammarTags: ['plusquamperfekt'] }
                ]
            },
            {
                id: 'b2-temp-conn', icon: ArrowRightLeft, name: 'Conectores Temporales', desc: 'Ordenar historias: bevor, nachdem, während, bis.',
                theory: [{ title: 'Conectores', content: 'Nachdem (con Plusquamperfekt) -> Frase principal (con Präteritum).' }],
                exercises: [
                    { id: 'g-b2-temp-01', german: 'Bevor ich schlafe, lese ich.', spanish: 'Antes de dormir, leo.', keywords: ['bevor'], difficulty: 4, grammarTags: ['konj'] },
                    { id: 'g-b2-temp-02', german: 'Nachdem er gegessen hatte, ging er.', spanish: 'Después de haber comido, se fue.', keywords: ['nachdem', 'hatte'], difficulty: 4, grammarTags: ['konj', 'plusquamperfekt'] },
                    { id: 'g-b2-temp-03-ex', german: 'Wir warten, bis du kommst.', spanish: 'Esperamos hasta que vengas.', keywords: ['bis'], difficulty: 4, grammarTags: ['konj'] }
                ]
            },
            {
                id: 'b2-modal-part', icon: MessageCircle, name: 'Partículas Modales', desc: 'Dar vida al texto (halt, eben, doch, mal).',
                theory: [{ title: 'Partículas', content: 'Palabras que no se traducen literal pero dan intención o emoción a la frase.' }],
                exercises: [
                    { id: 'g-b2-mod-01', german: 'Das ist halt so.', spanish: 'Es así y punto (resignación).', keywords: ['halt'], difficulty: 4, grammarTags: ['partikel'] },
                    { id: 'g-b2-mod-02', german: 'Komm doch mal her!', spanish: '¡Ven aquí (anda)!', keywords: ['doch', 'mal'], difficulty: 4, grammarTags: ['partikel'] },
                    { id: 'g-b2-mod-03-ex', german: 'Das war eben Pech.', spanish: 'Fue simplemente mala suerte.', keywords: ['eben'], difficulty: 4, grammarTags: ['partikel'] }
                ]
            }
        ]
    }
];

export const CHAPTERS = [
    { id: 'cap1', title: 'Kapitel 1: Gute Reise!', icon: Plane, desc: 'Viajes, Perfekt' },
    { id: 'cap2', title: 'Kapitel 2: Das ist ja praktisch', icon: Smartphone, desc: 'Tecnología, Separables' },
    { id: 'cap3', title: 'Kapitel 3: Veränderungen', icon: Home, desc: 'Mudanza, Präteritum' },
    { id: 'cap4', title: 'Kapitel 4: Arbeitswelt', icon: Briefcase, desc: 'Trabajo, Cortesía' },
    { id: 'cap5', title: 'Kapitel 5: Umweltfreundlich?', icon: Leaf, desc: 'Ecología, Pasiva' },
    { id: 'cap6', title: 'Kapitel 6: Blick nach vorn', icon: Telescope, desc: 'Futuro, Futur I' },
    { id: 'cap7', title: 'Kapitel 7: Zwischenmenschliches', icon: Users, color: 'text-pink-600', borderColor: 'border-pink-600', desc: 'Relaciones, Conflictos y Plusquamperfekt' },
    { id: 'exam-b1', title: 'Examen EOI B1.1', subtitle: 'Simulacro: Lesen, Hören, Schreiben', icon: GraduationCap, color: 'text-yellow-500', borderColor: 'border-yellow-500', route: '/examen-b1' },
];

export const B1_CHUNKS: Chunk[] = [
    // KAPITEL 1: GUTE REISE (Viajes)
    { id: 'c1-01', chapterId: 'cap1', difficulty: 1, german: 'Ich packe den Koffer.', spanish: 'Hago la maleta.', keywords: ['packe', 'koffer'], grammarTags: ['akk'] },
    { id: 'c1-02', chapterId: 'cap1', difficulty: 1, german: 'Der Flug hat Verspätung.', spanish: 'El vuelo tiene retraso.', keywords: ['flug', 'verspätung'], grammarTags: ['nom'] },
    { id: 'c1-03', chapterId: 'cap1', difficulty: 2, german: 'Ich habe das Ticket gebucht.', spanish: 'He reservado el billete.', keywords: ['habe', 'gebucht'], grammarTags: ['perfekt'] },
    { id: 'c1-04', chapterId: 'cap1', difficulty: 2, german: 'Wir haben den Zug verpasst.', spanish: 'Hemos perdido el tren.', keywords: ['haben', 'verpasst'], grammarTags: ['perfekt'] },
    { id: 'c1-05', chapterId: 'cap1', difficulty: 2, german: 'Haben Sie ein Zimmer frei?', spanish: '¿Tiene una habitación libre?', keywords: ['zimmer', 'frei'], grammarTags: ['frage'] },
    { id: 'c1-06', chapterId: 'cap1', difficulty: 3, german: 'Ich möchte mich beschweren.', spanish: 'Quiero quejarme.', keywords: ['möchte', 'beschweren'], grammarTags: ['modal', 'reflexiv'] },
    { id: 'c1-07', chapterId: 'cap1', difficulty: 3, german: 'Wegen des Staus kamen wir spät.', spanish: 'Por el atasco llegamos tarde.', keywords: ['wegen', 'staus'], grammarTags: ['genitiv'] },
    { id: 'c1-08', chapterId: 'cap1', difficulty: 2, german: 'Der Passagier sucht seinen Platz.', spanish: 'El pasajero busca su asiento.', keywords: ['passagier', 'platz'], grammarTags: ['akk'] },
    { id: 'c1-09', chapterId: 'cap1', difficulty: 2, german: 'Wir besichtigen den Dom.', spanish: 'Visitamos la catedral.', keywords: ['besichtigen', 'dom'], grammarTags: ['akk'] },
    { id: 'c1-10', chapterId: 'cap1', difficulty: 1, german: 'Die Reise war wunderbar.', spanish: 'El viaje fue maravilloso.', keywords: ['reise', 'war'], grammarTags: ['präteritum'] },

    // KAPITEL 2: TECHNIK (Tecnología)
    { id: 'c2-01', chapterId: 'cap2', difficulty: 1, german: 'Der Akku ist leer.', spanish: 'La batería está vacía.', keywords: ['akku', 'leer'], grammarTags: ['nom'] },
    { id: 'c2-02', chapterId: 'cap2', difficulty: 2, german: 'Ich muss mein Handy aufladen.', spanish: 'Tengo que cargar mi móvil.', keywords: ['muss', 'aufladen'], grammarTags: ['modal', 'trennbare'] },
    { id: 'c2-03', chapterId: 'cap2', difficulty: 2, german: 'Kannst du die Datei drucken?', spanish: '¿Puedes imprimir el archivo?', keywords: ['kannst', 'drucken'], grammarTags: ['modal'] },
    { id: 'c2-04', chapterId: 'cap2', difficulty: 1, german: 'Das WLAN ist sehr langsam.', spanish: 'El Wi-Fi es muy lento.', keywords: ['wlan', 'langsam'], grammarTags: ['adj'] },
    { id: 'c2-05', chapterId: 'cap2', difficulty: 2, german: 'Er schaltet den Computer an.', spanish: 'Él enciende el ordenador.', keywords: ['schaltet', 'an'], grammarTags: ['trennbare'] },
    { id: 'c2-06', chapterId: 'cap2', difficulty: 3, german: 'Ich habe mein Passwort vergessen.', spanish: 'He olvidado mi contraseña.', keywords: ['habe', 'vergessen'], grammarTags: ['perfekt'] },
    { id: 'c2-07', chapterId: 'cap2', difficulty: 3, german: 'Laden Sie die App herunter.', spanish: 'Descargue usted la aplicación.', keywords: ['laden', 'herunter'], grammarTags: ['imperativ'] },
    { id: 'c2-08', chapterId: 'cap2', difficulty: 2, german: 'Das Gerät funktioniert nicht.', spanish: 'El aparato no funciona.', keywords: ['gerät', 'funktioniert'], grammarTags: ['negation'] },
    { id: 'c2-09', chapterId: 'cap2', difficulty: 2, german: 'Ich speichere die Fotos.', spanish: 'Guardo las fotos.', keywords: ['speichere', 'fotos'], grammarTags: ['akk'] },

    // KAPITEL 3: VERÄNDERUNGEN (Cambios)
    { id: 'c3-01', chapterId: 'cap3', difficulty: 2, german: 'Ich bin nach Berlin umgezogen.', spanish: 'Me he mudado a Berlín.', keywords: ['bin', 'umgezogen'], grammarTags: ['perfekt', 'sein'] },
    { id: 'c3-02', chapterId: 'cap3', difficulty: 2, german: 'Ich habe neue Freunde gefunden.', spanish: 'He encontrado nuevos amigos.', keywords: ['habe', 'gefunden'], grammarTags: ['perfekt'] },
    { id: 'c3-03', chapterId: 'cap3', difficulty: 2, german: 'Am Anfang war es schwer.', spanish: 'Al principio fue difícil.', keywords: ['war', 'schwer'], grammarTags: ['präteritum'] },
    { id: 'c3-04', chapterId: 'cap3', difficulty: 3, german: 'Ich vermisse meine Familie.', spanish: 'Echo de menos a mi familia.', keywords: ['vermisse', 'familie'], grammarTags: ['akk'] },
    { id: 'c3-05', chapterId: 'cap3', difficulty: 3, german: 'Ich gewöhne mich an das Klima.', spanish: 'Me acostumbro al clima.', keywords: ['gewöhne', 'klima'], grammarTags: ['reflexiv', 'akk'] },
    { id: 'c3-06', chapterId: 'cap3', difficulty: 2, german: 'Mein Leben hat sich verändert.', spanish: 'Mi vida ha cambiado.', keywords: ['leben', 'verändert'], grammarTags: ['perfekt'] },
    { id: 'c3-07', chapterId: 'cap3', difficulty: 1, german: 'Früher wohnte ich in Madrid.', spanish: 'Antes vivía en Madrid.', keywords: ['wohnte'], grammarTags: ['präteritum'] },
    { id: 'c3-08', chapterId: 'cap3', difficulty: 3, german: 'Die Entscheidung war richtig.', spanish: 'La decisión fue correcta.', keywords: ['entscheidung', 'war'], grammarTags: ['präteritum'] },

    // KAPITEL 4: ARBEITSWELT (Trabajo)
    { id: 'c4-01', chapterId: 'cap4', difficulty: 2, german: 'Ich bewerbe mich um den Job.', spanish: 'Solicito el trabajo.', keywords: ['bewerbe', 'job'], grammarTags: ['reflexiv', 'prep'] },
    { id: 'c4-02', chapterId: 'cap4', difficulty: 2, german: 'Er hat viel Erfahrung.', spanish: 'Él tiene mucha experiencia.', keywords: ['hat', 'erfahrung'], grammarTags: ['akk'] },
    { id: 'c4-03', chapterId: 'cap4', difficulty: 3, german: 'Wir müssen Überstunden machen.', spanish: 'Tenemos que hacer horas extra.', keywords: ['müssen', 'überstunden'], grammarTags: ['modal'] },
    { id: 'c4-04', chapterId: 'cap4', difficulty: 3, german: 'Könnten Sie das wiederholen?', spanish: '¿Podría repetir eso?', keywords: ['könnten', 'wiederholen'], grammarTags: ['konjunktiv'] },
    { id: 'c4-05', chapterId: 'cap4', difficulty: 1, german: 'Ich arbeite im Homeoffice.', spanish: 'Trabajo desde casa.', keywords: ['arbeite', 'homeoffice'], grammarTags: ['dat'] },
    { id: 'c4-06', chapterId: 'cap4', difficulty: 2, german: 'Der Chef ist zufrieden.', spanish: 'El jefe está satisfecho.', keywords: ['chef', 'zufrieden'], grammarTags: ['adj'] },
    { id: 'c4-07', chapterId: 'cap4', difficulty: 3, german: 'Ich habe eine Gehaltserhöhung bekommen.', spanish: 'He recibido un aumento de sueldo.', keywords: ['gehaltserhöhung', 'bekommen'], grammarTags: ['perfekt'] },
    { id: 'c4-08', chapterId: 'cap4', difficulty: 2, german: 'Das Meeting beginnt um neun.', spanish: 'La reunión empieza a las nueve.', keywords: ['meeting', 'beginnt'], grammarTags: ['zeit'] },

    // KAPITEL 5: UMWELT (Medio Ambiente)
    { id: 'c5-01', chapterId: 'cap5', difficulty: 2, german: 'Wir trennen den Müll.', spanish: 'Separamos la basura.', keywords: ['trennen', 'müll'], grammarTags: ['akk'] },
    { id: 'c5-02', chapterId: 'cap5', difficulty: 3, german: 'Man sollte Wasser sparen.', spanish: 'Se debería ahorrar agua.', keywords: ['sollte', 'sparen'], grammarTags: ['modal', 'konjunktiv'] },
    { id: 'c5-03', chapterId: 'cap5', difficulty: 3, german: 'Plastik ist schlecht für die Umwelt.', spanish: 'El plástico es malo para el medio ambiente.', keywords: ['plastik', 'umwelt'], grammarTags: ['nom'] },
    { id: 'c5-04', chapterId: 'cap5', difficulty: 2, german: 'Ich benutze öffentliche Verkehrsmittel.', spanish: 'Uso transporte público.', keywords: ['benutze', 'verkehrsmittel'], grammarTags: ['akk'] },
    { id: 'c5-05', chapterId: 'cap5', difficulty: 2, german: 'Das Licht ist noch an.', spanish: 'La luz todavía está encendida.', keywords: ['licht', 'an'], grammarTags: ['adv'] },
    { id: 'c5-06', chapterId: 'cap5', difficulty: 3, german: 'Wir verzichten auf Fleisch.', spanish: 'Renunciamos a la carne.', keywords: ['verzichten', 'fleisch'], grammarTags: ['prep'] },
    { id: 'c5-07', chapterId: 'cap5', difficulty: 2, german: 'Die Luft ist verschmutzt.', spanish: 'El aire está contaminado.', keywords: ['luft', 'verschmutzt'], grammarTags: ['adj'] },
    { id: 'c5-08', chapterId: 'cap5', difficulty: 3, german: 'Er engagiert sich für den Naturschutz.', spanish: 'Él se compromete con la conservación.', keywords: ['engagiert', 'naturschutz'], grammarTags: ['reflexiv'] },

    // KAPITEL 6: ZUKUNFT (Futuro)
    { id: 'c6-01', chapterId: 'cap6', difficulty: 2, german: 'In der Zukunft werden wir fliegen.', spanish: 'En el futuro volaremos.', keywords: ['werden', 'fliegen'], grammarTags: ['futur'] },
    { id: 'c6-02', chapterId: 'cap6', difficulty: 2, german: 'Die Technik wird besser sein.', spanish: 'La tecnología será mejor.', keywords: ['wird', 'sein'], grammarTags: ['futur'] },
    { id: 'c6-03', chapterId: 'cap6', difficulty: 3, german: 'Ich hoffe, dass alles gut wird.', spanish: 'Espero que todo vaya bien.', keywords: ['hoffe', 'dass', 'wird'], grammarTags: ['nebensatz'] },
    { id: 'c6-04', chapterId: 'cap6', difficulty: 2, german: 'Die Roboter werden arbeiten.', spanish: 'Los robots arbeiten.', keywords: ['roboter', 'arbeiten'], grammarTags: ['futur'] },
    { id: 'c6-05', chapterId: 'cap6', difficulty: 3, german: 'Wir werden länger leben.', spanish: 'Viviremos más tiempo.', keywords: ['werden', 'länger'], grammarTags: ['komparativ'] },
    { id: 'c6-06', chapterId: 'cap6', difficulty: 2, german: 'Ich habe einen Plan.', spanish: 'Tengo un plan.', keywords: ['habe', 'plan'], grammarTags: ['akk'] },
    { id: 'c6-07', chapterId: 'cap6', difficulty: 3, german: 'Die Gesellschaft verändert sich.', spanish: 'La sociedad cambia.', keywords: ['gesellschaft', 'verändert'], grammarTags: ['reflexiv'] },
    { id: 'c6-08', chapterId: 'cap6', difficulty: 1, german: 'Bald ist Weihnachten.', spanish: 'Pronto es Navidad.', keywords: ['bald', 'weihnachten'], grammarTags: ['nom'] },

    // KAPITEL 7: ZWISCHENMENSCHLICHES (Relaciones)
    { id: 'c7-01', chapterId: 'cap7', difficulty: 1, german: 'Eine gute Beziehung braucht Vertrauen.', spanish: 'Una buena relación necesita confianza.', keywords: ['beziehung', 'vertrauen'], grammarTags: ['nom'] },
    { id: 'c7-02', chapterId: 'cap7', difficulty: 1, german: 'Eifersucht macht alles kaputt.', spanish: 'Los celos lo arruinan todo.', keywords: ['eifersucht', 'kaputt'], grammarTags: ['nom'] },
    { id: 'c7-03', chapterId: 'cap7', difficulty: 2, german: 'Sie war schon gegangen.', spanish: 'Ella ya se había ido.', keywords: ['war', 'gegangen'], grammarTags: ['plusquamperfekt'] },
    { id: 'c7-04', chapterId: 'cap7', difficulty: 2, german: 'Wir hatten uns gestritten.', spanish: 'Nos habíamos peleado.', keywords: ['hatten', 'gestritten'], grammarTags: ['plusquamperfekt'] },
    { id: 'c7-05', chapterId: 'cap7', difficulty: 2, german: 'Nachdem wir geredet hatten, war alles gut.', spanish: 'Después de que habíamos hablado, todo estuvo bien.', keywords: ['nachdem', 'hatten'], grammarTags: ['nebensatz', 'plusquamperfekt'] },
    { id: 'c7-06', chapterId: 'cap7', difficulty: 2, german: 'Bevor du gehst, küss mich.', spanish: 'Antes de que te vayas, bésame.', keywords: ['bevor', 'gehst'], grammarTags: ['nebensatz'] },
    { id: 'c7-07', chapterId: 'cap7', difficulty: 3, german: 'Das ist halt so.', spanish: 'Es así (y punto).', keywords: ['halt'], grammarTags: ['modalpartikel'] },
    { id: 'c7-08', chapterId: 'cap7', difficulty: 3, german: 'Komm doch mal vorbei!', spanish: '¡Pásate (anda)!', keywords: ['doch', 'mal'], grammarTags: ['modalpartikel'] }
];

export const CHAPTER_THEORY: Record<string, { title: string, content: string }[]> = {
    'cap1': [
        { title: 'Bienvenido al B1', content: 'En este nivel consolidaremos tu conocimiento. Empezaremos con el tema de viajes y el Perfekt.' },
        { title: 'El Perfekt', content: 'Recuerda: El auxiliar (haben/sein) va en posición 2. El participio va al FINAL de la frase.' }
    ],
    'cap2': [
        { title: 'Tecnología y Separables', content: 'Muchos verbos técnicos son separables (an-schalten, auf-laden). El prefijo va al final en presente.' },
        { title: 'Vocabulario Tech', content: 'Akku (batería), Datei (archivo), Herunterladen (descargar).' }
    ],
    'cap3': [
        { title: 'Präteritum vs Perfekt', content: 'En el lenguaje hablado usamos Perfekt. Pero para "sein" (war) y "haben" (hatte) y verbos modales, preferimos el Präteritum.' },
        { title: 'Cambios', content: 'Umziehen (mudarse) usa "sein" porque implica movimiento/cambio de estado.' }
    ],
    'cap4': [
        { title: 'Vida Laboral', content: 'En el trabajo usamos más formalidad (Sie). El Konjunktiv II (könnten, würden) es clave para pedir cosas amablemente.' },
        { title: 'Bewerbung', content: 'Sich bewerben um (postularse a) es reflexivo y usa acusativo.' }
    ],
    'cap5': [
        { title: 'Voz Pasiva', content: 'Se usa cuando la acción es más importante que quién la hace. \nForma: Werden + Partizip II.\n"Der Müll wird getrennt" (La basura es separada).' }
    ],
    'cap6': [
        { title: 'Futuro (Futur I)', content: 'Aunque a veces usamos presente con marcador temporal ("Morgen gehe ich"), el Futur I enfatiza planes o suposiciones.\nForma: Werden + Infinitiv.' }
    ],
    'cap7': [
        { title: 'Plusquamperfekt', content: 'El "pasado del pasado". Se forma con War/Hatte (Präteritum) + Participio II.\nEj: Ich war gegangen (Yo había ido).' },
        { title: 'Partículas Modales', content: 'Palabras como "halt" (resignación), "doch" (sugerencia amistosa) o "mal" (suavizar) dan vida al alemán hablado.' }
    ]
};

export const GLOBAL_CHUNKS: Chunk[] = [
    ...B1_CHUNKS,
    ...GRAMMAR_SYSTEMS.flatMap(level => level.systems.flatMap(system => system.exercises))
];
