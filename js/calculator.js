// 京都算盤 - 基本計算機能
class KyotoCalculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.currentMode = 'normal';

        // DOM要素の取得
        this.currentDisplay = document.getElementById('current');
        this.previousDisplay = document.getElementById('previous');
        this.haikuResult = document.getElementById('haikuResult');
        this.seasonText = document.getElementById('seasonText');
        this.dateText = document.getElementById('dateText');
        this.kyotoButtons = document.getElementById('kyotoButtons');

        this.initializeEventListeners();
        this.updateDisplay();
        this.updateSeasonDisplay();
        
        // 季節表示を定期的に更新（1時間ごと）
        setInterval(() => this.updateSeasonDisplay(), 3600000);
    }

    // イベントリスナーの初期化
    initializeEventListeners() {
        // キーボードサポート
        document.addEventListener('keydown', (event) => this.handleKeyPress(event));
    }

    // キーボード入力の処理
    handleKeyPress(event) {
        const key = event.key;
        
        if (key >= '0' && key <= '9' || key === '.') {
            this.appendNumber(key);
        } else if (key === '+' || key === '-') {
            this.appendOperator(key);
        } else if (key === '*') {
            this.appendOperator('*');
        } else if (key === '/') {
            event.preventDefault();
            this.appendOperator('/');
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            this.calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.clearAll();
        } else if (key === 'Backspace') {
            this.deleteLast();
        }
    }

    // ディスプレイの更新
    updateDisplay() {
        this.currentDisplay.textContent = this.currentInput;
        if (this.operator) {
            this.previousDisplay.textContent = `${this.previousInput} ${this.operator}`;
        } else {
            this.previousDisplay.textContent = this.previousInput;
        }
    }

    // アニメーション効果
    animateResult() {
        this.currentDisplay.classList.remove('animate');
        setTimeout(() => {
            this.currentDisplay.classList.add('animate');
        }, 10);
    }

    // 数字の追加
    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }
        
        if (number === '.' && this.currentInput.includes('.')) {
            return;
        }
        
        if (this.currentInput === '0' && number !== '.') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }
        
        this.updateDisplay();
    }

    // 演算子の追加
    appendOperator(op) {
        if (this.operator && !this.shouldResetDisplay) {
            this.calculate();
        }
        
        this.operator = op;
        this.previousInput = this.currentInput;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    // 計算の実行
    calculate() {
        if (!this.operator || this.shouldResetDisplay) {
            return;
        }
        
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        
        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('ゼロで割ることはできません');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        this.currentInput = result.toString();
        this.operator = null;
        this.previousInput = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.animateResult();
        
        // 和算モードまたは京都モードで俳句を表示
        if (this.currentMode === 'wasan' || this.currentMode === 'kyoto') {
            this.showHaikuResult(result);
        }
    }

    // 全クリア
    clearAll() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    // 一文字削除
    deleteLast() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    // 京都の季節と暦を更新
    updateSeasonDisplay() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        
        const seasons = {
            1: '冬の京都', 2: '冬の京都', 3: '春の京都',
            4: '春の京都', 5: '春の京都', 6: '夏の京都',
            7: '夏の京都', 8: '夏の京都', 9: '秋の京都',
            10: '秋の京都', 11: '秋の京都', 12: '冬の京都'
        };
        
        const months = {
            1: '睦月', 2: '如月', 3: '弥生', 4: '卯月',
            5: '皐月', 6: '水無月', 7: '文月', 8: '葉月',
            9: '長月', 10: '神無月', 11: '霜月', 12: '師走'
        };
        
        const reiwaYear = year - 2018;
        this.seasonText.textContent = seasons[month];
        this.dateText.textContent = `令和${reiwaYear}年 ${months[month]}`;
    }

    // モード切り替え
    setMode(mode) {
        this.currentMode = mode;
        
        // モードボタンのアクティブ状態を更新
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(mode + 'Mode').classList.add('active');
        
        // 京都モードのボタンを表示/非表示
        if (mode === 'kyoto') {
            this.kyotoButtons.style.display = 'grid';
        } else {
            this.kyotoButtons.style.display = 'none';
        }
        
        // モードに応じた表示を更新
        this.updateDisplay();
    }

    // 俳句風の結果表示
    showHaikuResult(result) {
        const haikus = {
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
        
        const num = Math.floor(Math.abs(result)) % 10 || 10;
        const haiku = haikus[num] || '算盤の音\n静かに響く\n古都の夜';
        
        this.haikuResult.textContent = haiku;
        this.haikuResult.classList.add('show');
        
        setTimeout(() => {
            this.haikuResult.classList.remove('show');
        }, 3000);
    }
}

// グローバル関数として公開（HTMLから呼び出すため）
let calculator;

// ページ読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    calculator = new KyotoCalculator();
});

// グローバル関数の定義
function appendNumber(number) {
    calculator.appendNumber(number);
}

function appendOperator(op) {
    calculator.appendOperator(op);
}

function calculate() {
    calculator.calculate();
}

function clearAll() {
    calculator.clearAll();
}

function deleteLast() {
    calculator.deleteLast();
}

function setMode(mode) {
    calculator.setMode(mode);
}
