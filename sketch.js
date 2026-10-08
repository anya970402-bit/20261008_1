// ==============================
// p5.js 響應式選擇題測驗系統
// ==============================

// 儲存五道測驗題目
const quizQuestions = [
  // 第一題
  {
    // 設定題目內容
    question: "在 p5.js 中，哪一個指令可以建立畫布？",

    // 設定四個選項
    options: [
      "createCanvas()",
      "makeCanvas()",
      "canvasCreate()",
      "setCanvas()"
    ],

    // 設定正確答案索引
    answer: 0
  },

  // 第二題
  {
    // 設定題目內容
    question: "在 p5.js 中，哪一個函式會在程式開始時執行一次？",

    // 設定四個選項
    options: [
      "start()",
      "setup()",
      "begin()",
      "init()"
    ],

    // 設定正確答案索引
    answer: 1
  },

  // 第三題
  {
    // 設定題目內容
    question: "在 p5.js 中，哪一個函式會不斷重複執行？",

    // 設定四個選項
    options: [
      "repeat()",
      "looping()",
      "draw()",
      "run()"
    ],

    // 設定正確答案索引
    answer: 2
  },

  // 第四題
  {
    // 設定題目內容
    question: "下列哪一個指令可以設定背景顏色？",

    // 設定四個選項
    options: [
      "background()",
      "colorBackground()",
      "setBackground()",
      "bgColor()"
    ],

    // 設定正確答案索引
    answer: 0
  },

  // 第五題
  {
    // 設定題目內容
    question: "下列哪一個指令可以繪製圓形？",

    // 設定四個選項
    options: [
      "circle()",
      "round()",
      "drawCircle()",
      "ellipseCircle()"
    ],

    // 設定正確答案索引
    answer: 0
  }
];

// 宣告目前題目索引
let currentQuestionIndex = 0;

// 宣告答對題數
let correctCount = 0;

// 宣告是否已經回答
let hasAnswered = false;

// 宣告使用者選擇的選項索引
let selectedOptionIndex = -1;

// 宣告測驗是否完成
let quizFinished = false;

// 宣告程式是否已完成初始化
let quizReady = false;

// 宣告觸控後暫時忽略滑鼠事件的時間
let ignoreMouseUntil = 0;

// 宣告響應式版面資料
const quizLayout = {
  // 宣告頁面內距
  padding: 20,

  // 宣告內容最大寬度
  contentWidth: 700,

  // 宣告標題 Y 座標
  titleY: 50,

  // 宣告題數 Y 座標
  progressY: 90,

  // 宣告題目 Y 座標
  questionY: 145,

  // 宣告選項起始 Y 座標
  optionStartY: 240,

  // 宣告選項寬度
  optionWidth: 400,

  // 宣告選項高度
  optionHeight: 55,

  // 宣告選項間距
  optionGap: 12,

  // 宣告答案提示 Y 座標
  feedbackY: 650,

  // 宣告下一題按鈕 X 座標
  nextButtonX: 0,

  // 宣告下一題按鈕 Y 座標
  nextButtonY: 0,

  // 宣告下一題按鈕寬度
  nextButtonWidth: 190,

  // 宣告下一題按鈕高度
  nextButtonHeight: 52,

  // 宣告重新開始按鈕 X 座標
  restartButtonX: 0,

  // 宣告重新開始按鈕 Y 座標
  restartButtonY: 0,

  // 宣告重新開始按鈕寬度
  restartButtonWidth: 210,

  // 宣告重新開始按鈕高度
  restartButtonHeight: 52
};

// 設定背景顏色
const pageBackgroundColor = "#f8f9fa";

// 設定主要文字顏色
const mainTextColor = "#343a40";

// 設定按鈕顏色
const buttonColor = "#a2d2ff";

// 設定按鈕滑過時顏色
const buttonHoverColor = "#8ecae6";

// 設定正確答案背景顏色
const correctAnswerColor = "#bde0fe";

// 設定錯誤答案背景顏色
const wrongAnswerColor = "#ffc8dd";

// 設定一般選項背景顏色
const normalOptionColor = "#ffffff";

// 設定邊框顏色
const borderColor = "#adb5bd";

// p5.js 初始化函式
function setup() {
  // 建立符合瀏覽器視窗的全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 將矩形繪製模式設定為中心對齊
  rectMode(CENTER);

  // 將文字設定為水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定字體
  textFont("sans-serif");

  // 啟用平滑效果
  smooth();

  // 取得畫布 HTML 元素
  const canvasElement = document.querySelector("canvas");

  // 確認畫布元素存在
  if (canvasElement !== null) {
    // 使用原生 CSS 設定觸控行為
    canvasElement.style.touchAction = "none";
  }

  // 設定程式已完成初始化
  quizReady = true;

  // 更新響應式版面
  quizUpdateLayout();
}

// p5.js 每一幀執行一次
function draw() {
  // 設定畫布背景
  background(pageBackgroundColor);

  // 如果尚未初始化，停止繪製
  if (!quizReady) {
    // 結束目前畫面
    return;
  }

  // 判斷測驗是否完成
  if (quizFinished) {
    // 顯示結果畫面
    quizDrawResultScreen();
  } else {
    // 顯示題目畫面
    quizDrawQuestionScreen();
  }
}

// 繪製題目畫面
function quizDrawQuestionScreen() {
  // 取得目前題目
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // 設定標題文字大小
  textSize(quizTextSize(30));

  // 設定文字顏色
  fill(mainTextColor);

  // 顯示測驗標題
  text("p5.js 簡易指令練習測驗", width / 2, quizLayout.titleY);

  // 設定進度文字大小
  textSize(quizTextSize(17));

  // 設定進度文字顏色
  fill("#6c757d");

  // 顯示題數
  text(
    "第 " +
      (currentQuestionIndex + 1) +
      " 題／共 " +
      quizQuestions.length +
      " 題",
    width / 2,
    quizLayout.progressY
  );

  // 設定題目文字大小
  textSize(quizTextSize(21));

  // 設定題目文字顏色
  fill(mainTextColor);

  // 顯示題目文字
  quizDrawWrappedText(
    currentQuestion.question,
    width / 2,
    quizLayout.questionY,
    quizLayout.contentWidth,
    quizTextSize(21) * 1.4
  );

  // 逐一繪製四個選項
  for (let i = 0; i < currentQuestion.options.length; i++) {
    // 繪製目前選項
    quizDrawOption(i, currentQuestion.options[i]);
  }

  // 判斷使用者是否已回答
  if (hasAnswered) {
    // 顯示答案提示
    quizDrawAnswerMessage();

    // 顯示下一題按鈕
    quizDrawNextButton();
  }
}

// 繪製單一選項
function quizDrawOption(optionIndex, optionText) {
  // 取得正確答案索引
  const correctAnswerIndex =
    quizQuestions[currentQuestionIndex].answer;

  // 計算選項 X 座標
  const baseX = width / 2;

  // 計算選項 Y 座標
  const baseY =
    quizLayout.optionStartY +
    optionIndex *
      (quizLayout.optionHeight + quizLayout.optionGap);

  // 設定水平動畫位移
  let offsetX = 0;

  // 設定垂直動畫位移
  let offsetY = 0;

  // 判斷使用者是否答錯
  const isWrong =
    hasAnswered &&
    selectedOptionIndex !== correctAnswerIndex;

  // 讓答錯選項左右移動
  if (isWrong && optionIndex === selectedOptionIndex) {
    // 使用 sin 函式產生水平動畫
    offsetX = sin(frameCount * 0.25) * quizSize(10);
  }

  // 讓正確答案上下跳動
  if (isWrong && optionIndex === correctAnswerIndex) {
    // 使用 sin 函式產生垂直動畫
    offsetY = sin(frameCount * 0.25) * quizSize(10);
  }

  // 計算動畫後的 X 座標
  const optionX = baseX + offsetX;

  // 計算動畫後的 Y 座標
  const optionY = baseY + offsetY;

  // 設定選項預設顏色
  let optionColor = normalOptionColor;

  // 判斷使用者是否已回答
  if (hasAnswered) {
    // 判斷使用者是否答錯
    if (selectedOptionIndex !== correctAnswerIndex) {
      // 將正確答案設定為淡藍色
      if (optionIndex === correctAnswerIndex) {
        optionColor = correctAnswerColor;
      }

      // 將錯誤選項設定為淡粉色
      if (optionIndex === selectedOptionIndex) {
        optionColor = wrongAnswerColor;
      }
    }

    // 判斷使用者是否答對
    if (selectedOptionIndex === correctAnswerIndex) {
      // 將答對選項設定為淡藍色
      if (optionIndex === selectedOptionIndex) {
        optionColor = correctAnswerColor;
      }
    }
  }

  // 設定選項背景顏色
  fill(optionColor);

  // 設定選項邊框顏色
  stroke(borderColor);

  // 設定邊框粗細
  strokeWeight(2);

  // 繪製選項按鈕
  rect(
    optionX,
    optionY,
    quizLayout.optionWidth,
    quizLayout.optionHeight,
    quizSize(10)
  );

  // 設定選項文字顏色
  fill(mainTextColor);

  // 顯示選項文字
  quizDrawAutoFitText(
    optionText,
    optionX,
    optionY,
    quizLayout.optionWidth * 0.88,
    quizLayout.optionHeight * 0.75
  );
}

// 顯示答案訊息
function quizDrawAnswerMessage() {
  // 取得目前題目
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // 判斷是否答對
  if (selectedOptionIndex === currentQuestion.answer) {
    // 設定答對文字顏色
    fill("#2a9d8f");

    // 設定答對文字大小
    textSize(quizTextSize(20));

    // 顯示答對文字
    text("答對了！", width / 2, quizLayout.feedbackY);
  } else {
    // 設定答錯文字顏色
    fill("#e76f51");

    // 設定答錯文字大小
    textSize(quizTextSize(17));

    // 顯示答錯文字
    quizDrawWrappedText(
      "答錯了，正確答案是：" +
        currentQuestion.options[currentQuestion.answer],
      width / 2,
      quizLayout.feedbackY,
      quizLayout.contentWidth,
      quizTextSize(17) * 1.3
    );
  }
}

// 繪製下一題按鈕
function quizDrawNextButton() {
  // 判斷滑鼠是否位於按鈕內
  const isHovering = quizPointInside(
    mouseX,
    mouseY,
    quizLayout.nextButtonX,
    quizLayout.nextButtonY,
    quizLayout.nextButtonWidth,
    quizLayout.nextButtonHeight
  );

  // 設定按鈕顏色
  fill(isHovering ? buttonHoverColor : buttonColor);

  // 設定邊框顏色
  stroke("#6c757d");

  // 設定邊框粗細
  strokeWeight(2);

  // 繪製按鈕
  rect(
    quizLayout.nextButtonX,
    quizLayout.nextButtonY,
    quizLayout.nextButtonWidth,
    quizLayout.nextButtonHeight,
    quizSize(10)
  );

  // 設定按鈕文字顏色
  fill(mainTextColor);

  // 設定文字大小
  textSize(quizTextSize(18));

  // 顯示按鈕文字
  text(
    currentQuestionIndex === quizQuestions.length - 1
      ? "查看結果"
      : "下一題",
    quizLayout.nextButtonX,
    quizLayout.nextButtonY
  );
}

// 繪製結果畫面
function quizDrawResultScreen() {
  // 設定標題顏色
  fill(mainTextColor);

  // 設定標題大小
  textSize(quizTextSize(34));

  // 顯示測驗完成
  text("測驗完成！", width / 2, height * 0.27);

  // 設定分數顏色
  fill("#457b9d");

  // 設定分數大小
  textSize(quizTextSize(28));

  // 顯示分數
  text(
    "你答對了 " +
      correctCount +
      "／" +
      quizQuestions.length +
      " 題",
    width / 2,
    height * 0.42
  );

  // 宣告結果訊息
  let resultMessage = "";

  // 判斷答對題數
  if (correctCount === quizQuestions.length) {
    // 設定滿分訊息
    resultMessage = "太棒了，你全部答對了！";
  } else if (correctCount >= 3) {
    // 設定中高分訊息
    resultMessage = "表現很好，繼續加油！";
  } else {
    // 設定鼓勵訊息
    resultMessage = "再練習幾次，你一定會進步！";
  }

  // 設定結果文字顏色
  fill("#6c757d");

  // 設定結果文字大小
  textSize(quizTextSize(20));

  // 顯示結果訊息
  text(resultMessage, width / 2, height * 0.54);

  // 顯示重新開始按鈕
  quizDrawRestartButton();
}

// 繪製重新開始按鈕
function quizDrawRestartButton() {
  // 判斷滑鼠是否在按鈕內
  const isHovering = quizPointInside(
    mouseX,
    mouseY,
    quizLayout.restartButtonX,
    quizLayout.restartButtonY,
    quizLayout.restartButtonWidth,
    quizLayout.restartButtonHeight
  );

  // 設定按鈕顏色
  fill(isHovering ? buttonHoverColor : buttonColor);

  // 設定邊框顏色
  stroke("#6c757d");

  // 設定邊框粗細
  strokeWeight(2);

  // 繪製重新開始按鈕
  rect(
    quizLayout.restartButtonX,
    quizLayout.restartButtonY,
    quizLayout.restartButtonWidth,
    quizLayout.restartButtonHeight,
    quizSize(10)
  );

  // 設定文字顏色
  fill(mainTextColor);

  // 設定文字大小
  textSize(quizTextSize(18));

  // 顯示重新開始文字
  text(
    "重新開始",
    quizLayout.restartButtonX,
    quizLayout.restartButtonY
  );
}

// 處理滑鼠點擊
function mousePressed() {
  // 判斷是否需要忽略滑鼠事件
  if (millis() < ignoreMouseUntil) {
    // 阻止預設行為
    return false;
  }

  // 處理滑鼠點擊
  quizProcessPointer(mouseX, mouseY);

  // 阻止瀏覽器預設行為
  return false;
}

// 處理觸控點擊
function touchStarted() {
  // 判斷是否有觸控點
  if (touches.length > 0) {
    // 處理第一個觸控點
    quizProcessPointer(touches[0].x, touches[0].y);

    // 設定短時間內忽略滑鼠事件
    ignoreMouseUntil = millis() + 500;
  }

  // 阻止瀏覽器預設行為
  return false;
}

// 處理滑鼠或觸控點擊
function quizProcessPointer(pointerX, pointerY) {
  // 判斷測驗是否結束
  if (quizFinished) {
    // 判斷是否點擊重新開始
    if (
      quizPointInside(
        pointerX,
        pointerY,
        quizLayout.restartButtonX,
        quizLayout.restartButtonY,
        quizLayout.restartButtonWidth,
        quizLayout.restartButtonHeight
      )
    ) {
      // 重新開始測驗
      quizReset();
    }

    // 結束點擊處理
    return;
  }

  // 判斷是否尚未回答
  if (!hasAnswered) {
    // 逐一檢查每個選項
    for (
      let i = 0;
      i < quizQuestions[currentQuestionIndex].options.length;
      i++
    ) {
      // 計算選項 X 座標
      const optionX = width / 2;

      // 計算選項 Y 座標
      const optionY =
        quizLayout.optionStartY +
        i *
          (quizLayout.optionHeight +
            quizLayout.optionGap);

      // 判斷點擊是否在選項內
      if (
        quizPointInside(
          pointerX,
          pointerY,
          optionX,
          optionY,
          quizLayout.optionWidth,
          quizLayout.optionHeight
        )
      ) {
        // 記錄使用者選擇
        selectedOptionIndex = i;

        // 設定已經回答
        hasAnswered = true;

        // 判斷是否答對
        if (
          selectedOptionIndex ===
          quizQuestions[currentQuestionIndex].answer
        ) {
          // 答對題數加一
          correctCount++;
        }

        // 停止檢查其他選項
        break;
      }
    }

    // 結束尚未回答處理
    return;
  }

  // 判斷是否點擊下一題按鈕
  if (
    quizPointInside(
      pointerX,
      pointerY,
      quizLayout.nextButtonX,
      quizLayout.nextButtonY,
      quizLayout.nextButtonWidth,
      quizLayout.nextButtonHeight
    )
  ) {
    // 進入下一題
    quizGoToNextQuestion();
  }
}

// 進入下一題
function quizGoToNextQuestion() {
  // 判斷是否仍有下一題
  if (currentQuestionIndex < quizQuestions.length - 1) {
    // 題目索引加一
    currentQuestionIndex++;

    // 重設回答狀態
    hasAnswered = false;

    // 重設選項索引
    selectedOptionIndex = -1;

    // 更新版面
    quizUpdateLayout();
  } else {
    // 設定測驗完成
    quizFinished = true;
  }
}

// 重設測驗
function quizReset() {
  // 回到第一題
  currentQuestionIndex = 0;

  // 將分數歸零
  correctCount = 0;

  // 設定尚未回答
  hasAnswered = false;

  // 清除選項索引
  selectedOptionIndex = -1;

  // 設定測驗尚未完成
  quizFinished = false;

  // 更新版面
  quizUpdateLayout();
}

// 判斷座標是否在指定區域內
function quizPointInside(
  pointX,
  pointY,
  centerX,
  centerY,
  boxWidth,
  boxHeight
) {
  // 計算左邊界
  const left = centerX - boxWidth / 2;

  // 計算右邊界
  const right = centerX + boxWidth / 2;

  // 計算上邊界
  const top = centerY - boxHeight / 2;

  // 計算下邊界
  const bottom = centerY + boxHeight / 2;

  // 回傳是否位於範圍內
  return (
    pointX >= left &&
    pointX <= right &&
    pointY >= top &&
    pointY <= bottom
  );
}

// 將文字分割成多行
function quizWrapText(content, maxWidth) {
  // 將文字拆成單一字元
  const characters = content.split("");

  // 建立文字行陣列
  const lines = [];

  // 宣告目前文字行
  let currentLine = "";

  // 逐字處理文字
  for (let i = 0; i < characters.length; i++) {
    // 建立測試文字行
    const testLine = currentLine + characters[i];

    // 判斷是否超過最大寬度
    if (
      textWidth(testLine) > maxWidth &&
      currentLine.length > 0
    ) {
      // 儲存目前文字行
      lines.push(currentLine);

      // 開始新的文字行
      currentLine = characters[i];
    } else {
      // 更新目前文字行
      currentLine = testLine;
    }
  }

  // 儲存最後一行
  if (currentLine.length > 0) {
    // 將最後一行加入陣列
    lines.push(currentLine);
  }

  // 回傳文字行
  return lines;
}

// 繪製自動換行文字
function quizDrawWrappedText(
  content,
  centerX,
  centerY,
  maxWidth,
  lineHeight
) {
  // 將文字分成多行
  const lines = quizWrapText(content, maxWidth);

  // 計算文字總高度
  const totalHeight = lines.length * lineHeight;

  // 逐行顯示文字
  for (let i = 0; i < lines.length; i++) {
    // 計算目前文字行的 Y 座標
    const lineY =
      centerY -
      totalHeight / 2 +
      lineHeight / 2 +
      i * lineHeight;

    // 繪製目前文字行
    text(lines[i], centerX, lineY);
  }
}

// 繪製自動縮放文字
function quizDrawAutoFitText(
  content,
  centerX,
  centerY,
  maxWidth,
  maxHeight
) {
  // 設定文字初始大小
  let currentSize = quizTextSize(19);

  // 套用文字大小
  textSize(currentSize);

  // 文字太寬時縮小
  while (
    textWidth(content) > maxWidth &&
    currentSize > 12
  ) {
    // 縮小文字
    currentSize--;

    // 套用新的文字大小
    textSize(currentSize);
  }

  // 判斷文字是否能直接顯示
  if (textWidth(content) <= maxWidth) {
    // 顯示單行文字
    text(content, centerX, centerY);

    // 結束函式
    return;
  }

  // 顯示自動換行文字
  quizDrawWrappedText(
    content,
    centerX,
    centerY,
    maxWidth,
    currentSize * 1.2
  );
}

// 取得響應式文字大小
function quizTextSize(baseSize) {
  // 取得畫布較短的一邊
  const shortestSide = min(width, height);

  // 計算縮放比例
  const scale = constrain(
    shortestSide / 700,
    0.72,
    1.15
  );

  // 回傳調整後文字大小
  return baseSize * scale;
}

// 取得響應式尺寸
function quizSize(baseSize) {
  // 取得畫布較短的一邊
  const shortestSide = min(width, height);

  // 計算縮放比例
  const scale = constrain(
    shortestSide / 700,
    0.72,
    1.15
  );

  // 回傳調整後尺寸
  return baseSize * scale;
}

// 更新響應式版面
function quizUpdateLayout() {
  // 取得畫布寬度
  const screenWidth = max(width, 1);

  // 取得畫布高度
  const screenHeight = max(height, 1);

  // 判斷是否為小螢幕
  const isSmallScreen =
    screenWidth <= 600 ||
    screenHeight <= 600;

  // 判斷是否為手機橫向
  const isLandscape =
    screenWidth > screenHeight;

  // 設定頁面內距
  quizLayout.padding = isSmallScreen ? 12 : 24;

  // 設定內容最大寬度
  quizLayout.contentWidth = min(
    screenWidth - quizLayout.padding * 2,
    700
  );

  // 設定標題位置
  quizLayout.titleY = screenHeight * 0.075;

  // 設定題數位置
  quizLayout.progressY = screenHeight * 0.14;

  // 設定題目位置
  quizLayout.questionY = screenHeight * 0.23;

  // 設定選項寬度
  quizLayout.optionWidth = quizLayout.contentWidth;

  // 設定選項間距
  quizLayout.optionGap =
    isLandscape && isSmallScreen ? 6 : 10;

  // 設定選項高度
  if (isLandscape && isSmallScreen) {
    // 手機橫向使用較矮選項
    quizLayout.optionHeight = constrain(
      screenHeight * 0.10,
      34,
      46
    );
  } else {
    // 一般畫面使用標準選項高度
    quizLayout.optionHeight = constrain(
      screenHeight * 0.065,
      42,
      60
    );
  }

  // 計算四個選項的總高度
  const totalOptionsHeight =
    quizLayout.optionHeight * 4 +
    quizLayout.optionGap * 3;

  // 設定選項起始位置
  quizLayout.optionStartY =
    screenHeight * 0.43 -
    totalOptionsHeight / 2;

  // 設定答題提示位置
  quizLayout.feedbackY = screenHeight * 0.80;

  // 設定下一題按鈕大小
  quizLayout.nextButtonWidth = min(
    quizLayout.contentWidth,
    isSmallScreen ? 180 : 220
  );

  // 設定下一題按鈕高度
  quizLayout.nextButtonHeight = constrain(
    screenHeight * 0.07,
    40,
    58
  );

  // 設定下一題按鈕位置
  quizLayout.nextButtonX = screenWidth / 2;

  // 將下一題按鈕放在底部
  quizLayout.nextButtonY =
    screenHeight -
    quizLayout.nextButtonHeight * 0.8;

  // 設定重新開始按鈕大小
  quizLayout.restartButtonWidth = min(
    quizLayout.contentWidth,
    isSmallScreen ? 190 : 230
  );

  // 設定重新開始按鈕高度
  quizLayout.restartButtonHeight = constrain(
    screenHeight * 0.07,
    40,
    58
  );

  // 設定重新開始按鈕位置
  quizLayout.restartButtonX = screenWidth / 2;

  // 設定重新開始按鈕位置
  quizLayout.restartButtonY = screenHeight * 0.70;

  // 判斷畫面高度是否過小
  if (screenHeight < 480) {
    // 將標題往上移動
    quizLayout.titleY = screenHeight * 0.06;

    // 將題數文字往上移動
    quizLayout.progressY = screenHeight * 0.12;

    // 將題目往上移動
    quizLayout.questionY = screenHeight * 0.20;

    // 將選項往上移動
    quizLayout.optionStartY =
      screenHeight * 0.40 -
      totalOptionsHeight / 2;

    // 將答題提示往上移動
    quizLayout.feedbackY = screenHeight * 0.77;

    // 將下一題按鈕靠近底部
    quizLayout.nextButtonY =
      screenHeight -
      quizLayout.nextButtonHeight * 0.65;
  }
}

// 視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算響應式版面
  quizUpdateLayout();
}