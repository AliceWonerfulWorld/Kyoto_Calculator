// 京都算盤 - 京都モード専用機能
class KyotoFeatures {
    constructor(calculator) {
        this.calculator = calculator;
    }

    // 寺の階段数を計算
    calculateTempleSteps() {
        const steps = Math.floor(Math.random() * 100) + 50; // 50-149段
        const temples = ['清水寺', '金閣寺', '銀閣寺', '東寺', '西本願寺'];
        const temple = temples[Math.floor(Math.random() * temples.length)];
        
        this.calculator.currentInput = steps.toString();
        this.calculator.previousInput = `${temple}の階段数`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(steps);
    }

    // 茶の価格を計算
    calculateTeaPrice() {
        const price = Math.floor(Math.random() * 5000) + 1000; // 1000-5999円
        const teaTypes = ['抹茶', '煎茶', '玉露', 'ほうじ茶', '玄米茶'];
        const teaType = teaTypes[Math.floor(Math.random() * teaTypes.length)];
        
        this.calculator.currentInput = price.toString();
        this.calculator.previousInput = `${teaType}の価格（円）`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(price);
    }

    // 着物の値段を計算
    calculateKimono() {
        const price = Math.floor(Math.random() * 200000) + 50000; // 5万-25万円
        const kimonoTypes = ['訪問着', '留袖', '振袖', '小紋', '浴衣'];
        const kimonoType = kimonoTypes[Math.floor(Math.random() * kimonoTypes.length)];
        
        this.calculator.currentInput = price.toString();
        this.calculator.previousInput = `${kimonoType}の値段（円）`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(price);
    }

    // 庭園の面積を計算
    calculateGarden() {
        const area = Math.floor(Math.random() * 1000) + 100; // 100-1099㎡
        const gardens = ['龍安寺の石庭', '銀閣寺の庭園', '金閣寺の庭園', '南禅寺の庭園', '大徳寺の庭園'];
        const garden = gardens[Math.floor(Math.random() * gardens.length)];
        
        this.calculator.currentInput = area.toString();
        this.calculator.previousInput = `${garden}の面積（㎡）`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(area);
    }

    // 京都の伝統工芸品の価格計算
    calculateTraditionalCrafts() {
        const crafts = [
            { name: '京扇子', min: 2000, max: 15000 },
            { name: '京友禅', min: 50000, max: 500000 },
            { name: '清水焼', min: 3000, max: 30000 },
            { name: '京漆器', min: 10000, max: 100000 },
            { name: '京竹細工', min: 5000, max: 50000 }
        ];
        
        const craft = crafts[Math.floor(Math.random() * crafts.length)];
        const price = Math.floor(Math.random() * (craft.max - craft.min)) + craft.min;
        
        this.calculator.currentInput = price.toString();
        this.calculator.previousInput = `${craft.name}の価格（円）`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(price);
    }

    // 京都の名所の距離計算
    calculateDistance() {
        const locations = [
            { name: '清水寺から金閣寺', distance: 8.5 },
            { name: '銀閣寺から龍安寺', distance: 12.3 },
            { name: '東寺から西本願寺', distance: 2.1 },
            { name: '南禅寺から大徳寺', distance: 6.7 },
            { name: '八坂神社から下鴨神社', distance: 4.2 }
        ];
        
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        this.calculator.currentInput = location.distance.toString();
        this.calculator.previousInput = `${location.name}の距離（km）`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(location.distance);
    }

    // 京都の季節の花の開花時期
    calculateFlowerSeason() {
        const flowers = [
            { name: '桜', month: 4, day: 15 },
            { name: '紫陽花', month: 6, day: 20 },
            { name: '紅葉', month: 11, day: 25 },
            { name: '雪景色', month: 1, day: 10 }
        ];
        
        const flower = flowers[Math.floor(Math.random() * flowers.length)];
        
        this.calculator.currentInput = `${flower.month}/${flower.day}`;
        this.calculator.previousInput = `${flower.name}の見頃`;
        this.calculator.operator = null;
        this.calculator.shouldResetDisplay = true;
        this.calculator.updateDisplay();
        this.calculator.showHaikuResult(flower.month);
    }
}

// グローバル変数
let kyotoFeatures;

// ページ読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // calculatorが初期化された後に実行
    setTimeout(() => {
        if (calculator) {
            kyotoFeatures = new KyotoFeatures(calculator);
        }
    }, 100);
});

// グローバル関数の定義（HTMLから呼び出すため）
function calculateTempleSteps() {
    if (kyotoFeatures) {
        kyotoFeatures.calculateTempleSteps();
    }
}

function calculateTeaPrice() {
    if (kyotoFeatures) {
        kyotoFeatures.calculateTeaPrice();
    }
}

function calculateKimono() {
    if (kyotoFeatures) {
        kyotoFeatures.calculateKimono();
    }
}

function calculateGarden() {
    if (kyotoFeatures) {
        kyotoFeatures.calculateGarden();
    }
}
