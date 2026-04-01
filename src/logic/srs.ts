export class SRSSystem {
    static calculateNextReview(current: any, isCorrect: boolean): { strength: number, nextReview: number, stability: number, difficulty: number } {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        let s = current?.stability || 0.5;
        let d = current?.difficulty || 5;
        let strength = current?.strength || 0;

        if (!isCorrect) {
            s = Math.max(0.2, s * 0.4);
            d = Math.min(10, d + 1.5);
            return { strength: 0, nextReview: now + (10 * 60 * 1000), stability: s, difficulty: d };
        } else {
            const boost = 1 + (10 - d) / 10;
            s = Math.min(365, s * 1.8 * boost);
            d = Math.max(1, d - 0.5);
            return { strength: strength + 1, nextReview: now + (s * oneDay), stability: s, difficulty: d };
        }
    }
}
