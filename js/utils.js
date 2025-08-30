// 京都算盤 - ユーティリティ関数

// 数値のフォーマット
export function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    
    const number = parseFloat(num);
    if (isNaN(number)) return '0';
    
    // 小数点以下が長すぎる場合は丸める
    if (number.toString().includes('.')) {
        return parseFloat(number.toFixed(10)).toString();
    }
    
    return number.toString();
}

// 京都の季節判定
export function getKyotoSeason(month) {
    const seasons = {
        1: '冬の京都', 2: '冬の京都', 3: '春の京都',
        4: '春の京都', 5: '春の京都', 6: '夏の京都',
        7: '夏の京都', 8: '夏の京都', 9: '秋の京都',
        10: '秋の京都', 11: '秋の京都', 12: '冬の京都'
    };
    
    return seasons[month] || '春の京都';
}

// 和暦の月名
export function getJapaneseMonth(month) {
    const months = {
        1: '睦月', 2: '如月', 3: '弥生', 4: '卯月',
        5: '皐月', 6: '水無月', 7: '文月', 8: '葉月',
        9: '長月', 10: '神無月', 11: '霜月', 12: '師走'
    };
    
    return months[month] || '睦月';
}

// 俳句データ
export function getHaikuData() {
    return {
        1: '一輪の花\n春の訪れ\n算盤の音',
        2: '二重の橋\n川面に映る\n古都の影',
        3: '三日月夜\n寺の鐘響く\n静寂の中',
        4: '四季の移ろい\n京都の美しさ\n永遠に続く',
        5: '五重の塔\n空にそびえ立つ\n歴史の証',
        6: '六波羅蜜\n心の修行\n悟りへの道',
        7: '七福神\n幸せを運ぶ\n古都の神々',
        8: '八坂の塔\n祇園の夜を\n照らし続ける',
        9: '九重の雲\n空高く舞う\n京都の空',
        10: '十全十美\n完璧な美しさ\n古都の魅力'
    };
}

// 京都の名所データ
export function getKyotoPlaces() {
    return {
        temples: ['清水寺', '金閣寺', '銀閣寺', '東寺', '西本願寺', '南禅寺', '大徳寺'],
        gardens: ['龍安寺の石庭', '銀閣寺の庭園', '金閣寺の庭園', '南禅寺の庭園', '大徳寺の庭園'],
        teaTypes: ['抹茶', '煎茶', '玉露', 'ほうじ茶', '玄米茶'],
        kimonoTypes: ['訪問着', '留袖', '振袖', '小紋', '浴衣'],
        crafts: [
            { name: '京扇子', min: 2000, max: 15000 },
            { name: '京友禅', min: 50000, max: 500000 },
            { name: '清水焼', min: 3000, max: 30000 },
            { name: '京漆器', min: 10000, max: 100000 },
            { name: '京竹細工', min: 5000, max: 50000 }
        ]
    };
}

// ランダムな値を取得
export function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 配列からランダムな要素を取得
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 数値の検証
export function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// エラーハンドリング
export function handleError(error, context = '') {
    console.error(`京都算盤エラー ${context}:`, error);
    
    // ユーザーに分かりやすいエラーメッセージを表示
    const errorMessages = {
        'division_by_zero': 'ゼロで割ることはできません',
        'invalid_input': '無効な入力です',
        'overflow': '計算結果が大きすぎます',
        'underflow': '計算結果が小さすぎます'
    };
    
    const message = errorMessages[error] || '計算エラーが発生しました';
    alert(message);
}

// デバッグ用ログ
export function debugLog(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[京都算盤] ${message}`, data);
    }
}

// パフォーマンス測定
export function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    debugLog(`${name} 実行時間: ${(end - start).toFixed(2)}ms`);
    return result;
}
