// 京都算盤 - ミニゲーム機能

class MinigameSystem {
    constructor(calculator) {
        this.calculator = calculator;
        this.hiddenCommands = {
            '7941': '算盤の音ゲーム',      // 7941 = 算盤の音（ななよんいち）
            '1088': '俳句作りゲーム',      // 1088 = 俳句（いちぜろはちはち）
            '3333': '京都クイズゲーム',    // 3333 = 京都（さんさんさんさん）
            '7777': '季節当てゲーム'       // 7777 = 季節（なななななな）
        };
        this.currentCommand = '';
        this.isMinigameActive = false;
        this.currentGame = null;
        
        this.initializeCommandSystem();
    }

    // 隠しコマンドシステムの初期化
    initializeCommandSystem() {
        // 数字入力時にコマンドをチェック
        const originalAppendNumber = this.calculator.appendNumber.bind(this.calculator);
        this.calculator.appendNumber = (number) => {
            originalAppendNumber(number);
            this.checkHiddenCommand(number);
        };
    }

    // 隠しコマンドのチェック
    checkHiddenCommand(number) {
        this.currentCommand += number;
        
        // 4桁になったらコマンドをチェック
        if (this.currentCommand.length === 4) {
            if (this.hiddenCommands[this.currentCommand]) {
                this.activateMinigame(this.currentCommand);
            }
            this.currentCommand = ''; // リセット
        }
        
        // 5桁以上になったらリセット
        if (this.currentCommand.length > 4) {
            this.currentCommand = '';
        }
    }

    // ミニゲームの起動
    activateMinigame(command) {
        this.isMinigameActive = true;
        const gameName = this.hiddenCommands[command];
        
        // 計算機を非表示
        document.querySelector('.calculator').style.display = 'none';
        
        // ミニゲーム画面を表示
        this.showMinigameScreen(gameName, command);
    }

    // ミニゲーム画面の表示
    showMinigameScreen(gameName, command) {
        const gameContainer = document.createElement('div');
        gameContainer.className = 'minigame-container';
        gameContainer.innerHTML = `
            <div class="minigame-header">
                <h2 class="minigame-title">${gameName}</h2>
                <p class="minigame-subtitle">隠しコマンド: ${command}</p>
            </div>
            <div class="minigame-content" id="minigameContent">
                <!-- ゲーム内容がここに表示される -->
            </div>
            <div class="minigame-controls">
                <button class="minigame-btn" onclick="minigameSystem.exitMinigame()">電卓に戻る</button>
            </div>
        `;
        
        document.body.appendChild(gameContainer);
        
        // アニメーション効果を追加
        this.animateMinigameEntrance();
        
        // ゲームを開始
        setTimeout(() => {
            this.startGame(gameName);
        }, 300);
    }

    // ミニゲーム入場アニメーション
    animateMinigameEntrance() {
        const container = document.querySelector('.minigame-container');
        const header = container.querySelector('.minigame-header');
        const content = container.querySelector('.minigame-content');
        const controls = container.querySelector('.minigame-controls');
        
        // コンテナ全体のアニメーション
        container.style.animation = 'minigameFadeIn 0.6s ease-out';
        
        // ヘッダーのアニメーション
        setTimeout(() => {
            header.style.animation = 'minigameBounceIn 0.8s ease-out';
        }, 100);
        
        // コンテンツのアニメーション
        setTimeout(() => {
            content.style.animation = 'minigameSlideIn 0.6s ease-out';
        }, 300);
        
        // コントロールのアニメーション
        setTimeout(() => {
            controls.style.animation = 'minigameFadeIn 0.5s ease-out';
        }, 500);
    }

    // ゲーム開始
    startGame(gameName) {
        const content = document.getElementById('minigameContent');
        
        switch(gameName) {
            case '算盤の音ゲーム':
                this.startAbacusSoundGame(content);
                break;
            case '俳句作りゲーム':
                this.startHaikuGame(content);
                break;
            case '京都クイズゲーム':
                this.startKyotoQuizGame(content);
                break;
            case '季節当てゲーム':
                this.startSeasonGame(content);
                break;
        }
    }

    // 算盤の音ゲーム
    startAbacusSoundGame(content) {
        content.innerHTML = `
            <div class="abacus-game">
                <h3>算盤の音を聞いて数字を当てよう！</h3>
                <div class="abacus-display">
                    <div class="abacus-beads" id="abacusBeads"></div>
                </div>
                <div class="game-input">
                    <input type="number" id="abacusAnswer" placeholder="答えを入力" min="1" max="10">
                    <button onclick="minigameSystem.checkAbacusAnswer()">回答</button>
                </div>
                <div class="game-score">
                    <p>スコア: <span id="abacusScore">0</span></p>
                    <p>残り時間: <span id="abacusTime">30</span>秒</p>
                </div>
            </div>
        `;
        
        this.abacusScore = 0;
        this.abacusTime = 30;
        this.currentAbacusNumber = 0;
        
        this.generateAbacusPattern();
        this.startAbacusTimer();
    }

    // 算盤パターンの生成
    generateAbacusPattern() {
        this.currentAbacusNumber = Math.floor(Math.random() * 10) + 1; // 1-10の範囲に修正
        const beads = document.getElementById('abacusBeads');
        beads.innerHTML = '';
        
        // 算盤の玉を視覚的に表現（最大10個）
        for (let i = 0; i < 10; i++) {
            const bead = document.createElement('div');
            bead.className = 'abacus-bead';
            if (i < this.currentAbacusNumber) {
                bead.classList.add('active');
            }
            beads.appendChild(bead);
        }
        
        // アニメーション効果を追加
        this.animateAbacusBeads();
    }

    // 算盤の玉のアニメーション
    animateAbacusBeads() {
        const beads = document.querySelectorAll('.abacus-bead');
        beads.forEach((bead, index) => {
            setTimeout(() => {
                bead.style.animation = 'none';
                bead.offsetHeight; // リフローを強制
                bead.style.animation = 'abacusBeadAppear 0.5s ease-out';
            }, index * 50);
        });
    }

    // 算盤ゲームのタイマー
    startAbacusTimer() {
        const timer = setInterval(() => {
            this.abacusTime--;
            document.getElementById('abacusTime').textContent = this.abacusTime;
            
            if (this.abacusTime <= 0) {
                clearInterval(timer);
                this.endAbacusGame();
            }
        }, 1000);
    }

    // 算盤ゲームの回答チェック
    checkAbacusAnswer() {
        const answer = parseInt(document.getElementById('abacusAnswer').value);
        const scoreElement = document.getElementById('abacusScore');
        
        if (answer === this.currentAbacusNumber) {
            this.abacusScore += 10;
            scoreElement.textContent = this.abacusScore;
            
            // 正解アニメーション
            this.animateCorrectAnswer();
            this.animateScoreUpdate(scoreElement);
            
            setTimeout(() => {
                this.generateAbacusPattern();
                document.getElementById('abacusAnswer').value = '';
            }, 1000);
        } else {
            // 不正解アニメーション
            this.animateWrongAnswer();
            
            setTimeout(() => {
                alert(`不正解！正解は ${this.currentAbacusNumber} でした。`);
                this.generateAbacusPattern();
                document.getElementById('abacusAnswer').value = '';
            }, 500);
        }
    }

    // 正解アニメーション
    animateCorrectAnswer() {
        const beads = document.querySelectorAll('.abacus-bead.active');
        beads.forEach((bead, index) => {
            setTimeout(() => {
                bead.style.animation = 'correctAnswer 0.6s ease-out';
            }, index * 100);
        });
    }

    // 不正解アニメーション
    animateWrongAnswer() {
        const beads = document.querySelectorAll('.abacus-bead');
        beads.forEach((bead, index) => {
            setTimeout(() => {
                bead.style.animation = 'wrongAnswer 0.5s ease-out';
            }, index * 50);
        });
    }

    // スコア更新アニメーション
    animateScoreUpdate(element) {
        element.classList.add('updated');
        setTimeout(() => {
            element.classList.remove('updated');
        }, 600);
    }

    // 算盤ゲーム終了
    endAbacusGame() {
        document.getElementById('minigameContent').innerHTML = `
            <div class="game-result">
                <h3>ゲーム終了！</h3>
                <p>最終スコア: ${this.abacusScore}点</p>
                <p>${this.abacusScore >= 30 ? '素晴らしい！算盤の達人です！' : 'もう少し練習が必要ですね。'}</p>
            </div>
        `;
    }

    // 俳句作りゲーム
    startHaikuGame(content) {
        const haikuWords = {
            '春': ['桜', '花', '風', '光', '新緑'],
            '夏': ['蝉', '暑さ', '風鈴', '夕涼み', '祭り'],
            '秋': ['紅葉', '月', '涼風', '実り', '夕日'],
            '冬': ['雪', '寒さ', '炉', '静寂', '梅']
        };
        
        const season = Object.keys(haikuWords)[Math.floor(Math.random() * 4)];
        const words = haikuWords[season];
        
        content.innerHTML = `
            <div class="haiku-game">
                <h3>${season}の俳句を作ろう！</h3>
                <p>以下の単語を使って俳句を作成してください：</p>
                <div class="haiku-words">
                    ${words.map(word => `<span class="haiku-word">${word}</span>`).join('')}
                </div>
                <div class="haiku-input">
                    <textarea id="haikuInput" placeholder="5-7-5の俳句を入力してください" rows="3"></textarea>
                    <button onclick="minigameSystem.checkHaiku()">完成</button>
                </div>
                <div class="haiku-example">
                    <p>例: 桜散る　風に舞い踊る　春の光</p>
                </div>
            </div>
        `;
        
        this.haikuWords = words;
        this.haikuSeason = season;
    }

    // 俳句チェック
    checkHaiku() {
        const haiku = document.getElementById('haikuInput').value.trim();
        const lines = haiku.split(/[　\s]+/);
        
        if (lines.length === 3) {
            const syllableCount = lines.map(line => this.countSyllables(line));
            
            if (syllableCount[0] === 5 && syllableCount[1] === 7 && syllableCount[2] === 5) {
                // 正解アニメーション
                this.animateHaikuSuccess();
                setTimeout(() => {
                    alert('素晴らしい俳句です！京都の美しさが表現されています。');
                }, 500);
            } else {
                // 不正解アニメーション
                this.animateHaikuError();
                setTimeout(() => {
                    alert(`音数が正しくありません。5-7-5で作成してください。\n現在: ${syllableCount.join('-')}`);
                }, 500);
            }
        } else {
            this.animateHaikuError();
            setTimeout(() => {
                alert('3行で俳句を作成してください。');
            }, 500);
        }
    }

    // 俳句成功アニメーション
    animateHaikuSuccess() {
        const words = document.querySelectorAll('.haiku-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = 'correctAnswer 0.8s ease-out';
            }, index * 200);
        });
    }

    // 俳句エラーアニメーション
    animateHaikuError() {
        const words = document.querySelectorAll('.haiku-word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = 'wrongAnswer 0.5s ease-out';
            }, index * 100);
        });
    }

    // 音数カウント（簡易版）
    countSyllables(text) {
        // ひらがな・カタカナ・漢字を1音としてカウント（簡易版）
        return text.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '').length;
    }

    // 京都クイズゲーム
    startKyotoQuizGame(content) {
        const questions = [
            {
                question: '清水寺の本堂は何と呼ばれていますか？',
                options: ['清水の舞台', '清水の本堂', '清水の堂', '清水の殿'],
                answer: 0
            },
            {
                question: '金閣寺の正式名称は？',
                options: ['鹿苑寺', '慈照寺', '龍安寺', '大徳寺'],
                answer: 0
            },
            {
                question: '京都の三大祭りに含まれないのは？',
                options: ['祇園祭', '葵祭', '時代祭', '天神祭'],
                answer: 3
            },
            {
                question: '銀閣寺の正式名称は？',
                options: ['鹿苑寺', '慈照寺', '龍安寺', '大徳寺'],
                answer: 1
            }
        ];
        
        this.quizQuestions = questions;
        this.quizCurrent = 0;
        this.quizScore = 0;
        
        this.showQuizQuestion();
    }

    // クイズ問題表示
    showQuizQuestion() {
        const content = document.getElementById('minigameContent');
        const question = this.quizQuestions[this.quizCurrent];
        
        content.innerHTML = `
            <div class="quiz-game">
                <h3>京都クイズ</h3>
                <div class="quiz-progress">
                    <p>問題 ${this.quizCurrent + 1} / ${this.quizQuestions.length}</p>
                    <p>スコア: ${this.quizScore}</p>
                </div>
                <div class="quiz-question">
                    <h4>${question.question}</h4>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => 
                            `<button class="quiz-option" onclick="minigameSystem.selectQuizAnswer(${index})">${option}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // クイズ回答選択
    selectQuizAnswer(selectedIndex) {
        const question = this.quizQuestions[this.quizCurrent];
        const options = document.querySelectorAll('.quiz-option');
        const selectedOption = options[selectedIndex];
        
        if (selectedIndex === question.answer) {
            this.quizScore += 10;
            
            // 正解アニメーション
            selectedOption.style.animation = 'correctAnswer 0.8s ease-out';
            
            setTimeout(() => {
                alert('正解！');
                this.quizCurrent++;
                
                if (this.quizCurrent < this.quizQuestions.length) {
                    this.showQuizQuestion();
                } else {
                    this.endQuiz();
                }
            }, 800);
        } else {
            // 不正解アニメーション
            selectedOption.style.animation = 'wrongAnswer 0.5s ease-out';
            
            setTimeout(() => {
                alert(`不正解！正解は「${question.options[question.answer]}」でした。`);
                this.quizCurrent++;
                
                if (this.quizCurrent < this.quizQuestions.length) {
                    this.showQuizQuestion();
                } else {
                    this.endQuiz();
                }
            }, 500);
        }
    }

    // クイズ終了
    endQuiz() {
        document.getElementById('minigameContent').innerHTML = `
            <div class="game-result">
                <h3>クイズ終了！</h3>
                <p>最終スコア: ${this.quizScore}点 / ${this.quizQuestions.length * 10}点</p>
                <p>${this.quizScore >= 30 ? '京都通ですね！' : 'もう少し京都について学んでみましょう。'}</p>
            </div>
        `;
    }

    // 季節当てゲーム
    startSeasonGame(content) {
        const seasonData = {
            '春': ['桜', '新緑', '花見', '入学式', '暖かい'],
            '夏': ['蝉', '暑い', '花火', '海水浴', '冷たい'],
            '秋': ['紅葉', '涼しい', '収穫', '運動会', '夕日'],
            '冬': ['雪', '寒い', '正月', 'スキー', '暖炉']
        };
        
        const season = Object.keys(seasonData)[Math.floor(Math.random() * 4)];
        const words = seasonData[season];
        
        content.innerHTML = `
            <div class="season-game">
                <h3>季節当てゲーム</h3>
                <p>以下の単語から季節を当ててください：</p>
                <div class="season-words">
                    ${words.map(word => `<span class="season-word">${word}</span>`).join('')}
                </div>
                <div class="season-input">
                    <select id="seasonSelect">
                        <option value="">季節を選択</option>
                        <option value="春">春</option>
                        <option value="夏">夏</option>
                        <option value="秋">秋</option>
                        <option value="冬">冬</option>
                    </select>
                    <button onclick="minigameSystem.checkSeason('${season}')">回答</button>
                </div>
            </div>
        `;
        
        this.seasonAnswer = season;
    }

    // 季節チェック
    checkSeason(correctSeason) {
        const selectedSeason = document.getElementById('seasonSelect').value;
        const words = document.querySelectorAll('.season-word');
        
        if (selectedSeason === correctSeason) {
            // 正解アニメーション
            this.animateSeasonSuccess(words);
            
            setTimeout(() => {
                alert(`正解！${correctSeason}の季節ですね。`);
                // 新しい問題を生成
                this.startSeasonGame(document.getElementById('minigameContent'));
            }, 1000);
        } else {
            // 不正解アニメーション
            this.animateSeasonError(words);
            
            setTimeout(() => {
                alert(`不正解！正解は「${correctSeason}」でした。`);
                // 新しい問題を生成
                this.startSeasonGame(document.getElementById('minigameContent'));
            }, 500);
        }
    }

    // 季節正解アニメーション
    animateSeasonSuccess(words) {
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = 'correctAnswer 0.8s ease-out';
            }, index * 150);
        });
    }

    // 季節不正解アニメーション
    animateSeasonError(words) {
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animation = 'wrongAnswer 0.5s ease-out';
            }, index * 100);
        });
    }

    // ミニゲーム終了
    exitMinigame() {
        this.isMinigameActive = false;
        document.querySelector('.minigame-container').remove();
        document.querySelector('.calculator').style.display = 'block';
        this.calculator.clearAll();
    }
}

// グローバル変数
let minigameSystem;

// ページ読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // calculatorが初期化された後に実行
    setTimeout(() => {
        if (calculator) {
            minigameSystem = new MinigameSystem(calculator);
        }
    }, 200);
});
