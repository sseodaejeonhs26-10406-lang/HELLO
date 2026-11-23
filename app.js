"use strict";

// 대전시 자원순환과(2023-09-20) 안내를 기본으로 사용합니다.
// 동구 용전동(2026-10-07)의 다른 기준은 각 안내에서 함께 표시합니다.
// 출처 URL과 확인일은 index.html 하단에 있습니다. 퀴즈 최근 점수만 브라우저에 저장합니다.
const medicines = {
  pill: {
    label: "알약",
    title: "알약은 내용물만 모아 배출해요.",
    summary: "정제·캡슐은 포장을 분리한 뒤, 약만 모아 폐의약품 수거함으로 가져가세요.",
    regional: "대전시(2023)는 알약의 포장 제거를 안내하지만, 동구 용전동(2026.10)은 포장지 그대로 배출하도록 안내합니다. 동구에서 배출할 때는 포장을 뜯기 전 수거처에 확인해 주세요.",
    steps: [
      ["포장을 분리해요", "수거처에서 포장 제거를 안내하면 종이·비닐·PTP 포장을 분리하세요."],
      ["알약만 한곳에 모아요", "흩어지지 않게 봉투 등에 담아 가져갈 준비를 해 주세요."],
      ["폐의약품 수거함으로 가져가요", "동 행정복지센터·보건소·약국에 수거 가능 여부를 확인한 뒤 방문하세요."]
    ],
    cautions: ["개인정보가 적힌 약봉투는 따로 분리하세요.", "가루약은 알약과 달리 약 포지를 뜯지 않고 배출해요.", "남은 약은 일반쓰레기나 하수구로 버리지 마세요."]
  },
  liquid: {
    label: "물약",
    title: "물약은 밀폐용기에 모아 배출해요.",
    summary: "남은 물약·시럽은 새지 않도록 밀폐용기에 담아 폐의약품 수거함으로 가져가세요.",
    regional: "대전시(2023)는 밀폐용기에 모아 배출하도록 안내합니다. 동구 용전동(2026.10)은 뚜껑을 닫아 용기째 배출하되 유리병은 제외한다고 안내하므로, 유리병에 든 약은 방문할 수거처에 먼저 문의해 주세요.",
    steps: [
      ["밀폐할 수 있는 용기에 담아요", "대전시 안내에 따라 남은 액체 약을 밀폐용기에 모아 주세요."],
      ["마개를 단단히 잠가요", "운반할 때 내용물이 새지 않도록 뚜껑이 잘 닫혔는지 확인하세요."],
      ["수거 가능한 곳에 전달해요", "동 행정복지센터·보건소·약국에 용기 기준과 수거 여부를 확인한 뒤 방문하세요."]
    ],
    cautions: ["싱크대·변기·하수구에 물약을 흘려보내지 마세요.", "용기 기준은 수거처마다 다를 수 있어요. 특히 유리병은 먼저 확인하세요.", "개인정보가 적힌 겉 약봉투는 따로 분리하세요."]
  },
  powder: {
    label: "가루약",
    title: "가루약은 포지를 뜯지 않아요.",
    summary: "가루가 날리지 않도록 약 포지에 담긴 상태 그대로 폐의약품 수거함에 배출해요.",
    regional: "대전시(2023)와 동구 용전동(2026.10) 모두 가루약은 포장지 그대로 배출하도록 안내합니다.",
    steps: [
      ["약 포지를 그대로 둬요", "약을 싸고 있는 포장지는 뜯지 마세요."],
      ["개인정보가 적힌 겉봉투를 분리해요", "이름 등이 적힌 바깥 약봉투는 따로 분리하고, 가루약 포지는 그대로 두세요."],
      ["폐의약품 수거함에 배출해요", "방문할 동 행정복지센터·보건소·약국에 수거 가능 여부를 먼저 확인하세요."]
    ],
    cautions: ["가루약을 포지에서 꺼내거나 다른 약과 섞지 마세요.", "변기·싱크대에 흘려보내거나 일반쓰레기로 버리지 마세요.", "포지가 찢어졌다면 가루가 새지 않게 봉투에 담아 수거처에 문의하세요."]
  },
  ointment: {
    label: "연고",
    title: "연고는 튜브 그대로 배출해요.",
    summary: "겉 종이상자만 분리하고, 약이 담긴 튜브나 용기는 그대로 가져가세요.",
    regional: "대전시(2023)는 겉 포장재만 분리하고 용기째 배출하도록, 동구 용전동(2026.10)은 튜브 그대로 배출하도록 안내합니다. 방문 전 수거 가능 여부를 확인해 주세요.",
    steps: [
      ["겉 종이상자를 분리해요", "약이 담긴 튜브·용기는 두고, 바깥 종이상자만 따로 분리하세요."],
      ["내용물은 용기에 그대로 둬요", "연고를 짜내지 말고 마개를 닫아 가져갈 준비를 해 주세요."],
      ["폐의약품 수거함에 배출해요", "동 행정복지센터·보건소·약국에 수거 가능 여부를 확인한 뒤 방문하세요."]
    ],
    cautions: ["남은 연고를 하수구로 씻어내지 마세요.", "약이 남은 튜브는 일반 재활용품으로 배출하지 마세요.", "개인정보가 적힌 약봉투는 따로 분리하세요."]
  }
};

const options = document.querySelectorAll("[data-medicine]");
const title = document.getElementById("medicine-title");
const summary = document.getElementById("medicine-summary");
const regionalDetail = document.getElementById("regional-detail");
const steps = document.getElementById("medicine-steps");
const cautions = document.getElementById("medicine-cautions");
const status = document.getElementById("selection-status");
const panel = document.getElementById("guide-panel");
const error = document.getElementById("guide-error");
let requestedMedicine = "pill";

function showMedicine(key, announce = true) {
  requestedMedicine = key;
  const medicine = medicines[key];
  if (!medicine || !medicine.title || !Array.isArray(medicine.steps) || !Array.isArray(medicine.cautions)) {
    panel.hidden = true;
    error.hidden = false;
    options.forEach(button => button.setAttribute("aria-pressed", "false"));
    status.textContent = "";
    return;
  }
  error.hidden = true;
  panel.hidden = false;
  options.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.medicine === key)));
  title.textContent = medicine.title;
  summary.textContent = medicine.summary;
  regionalDetail.textContent = medicine.regional;
  steps.replaceChildren(...medicine.steps.map(([heading, body]) => {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    const paragraph = document.createElement("p");
    strong.textContent = heading;
    paragraph.textContent = body;
    item.append(strong, paragraph);
    return item;
  }));
  cautions.replaceChildren(...medicine.cautions.map(text => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
  if (announce) status.textContent = `${medicine.label} 배출 방법과 주의사항을 표시했습니다.`;
}

options.forEach(button => button.addEventListener("click", () => showMedicine(button.dataset.medicine)));
document.getElementById("retry-guide").addEventListener("click", () => showMedicine(requestedMedicine));
showMedicine("pill", false);

// 카드 문구만 수정하면 됩니다. 이미지 파일이나 외부 라이브러리는 필요하지 않습니다.
const reasonCards = [
  { icon: "💧", topic: "물을 지켜요", title: "물에 흘려보내면, 물이 오염될 수 있어요.", description: "남은 약을 싱크대나 변기에 버리면 약 성분이 물로 흘러들 수 있어요. 물약도 하수구에 버리지 말고 따로 모아 주세요." },
  { icon: "🌱", topic: "땅을 지켜요", title: "일반쓰레기로 버린 약은 땅에도 영향을 줘요.", description: "약이 일반쓰레기와 함께 매립되면 토양을 오염시킬 수 있어요. 남은 약은 종량제봉투에 넣지 말고 폐의약품으로 분리해요." },
  { icon: "🐟", topic: "생태계를 지켜요", title: "물과 땅의 오염은 생태계로 이어져요.", description: "환경에 흘러든 약 성분은 생태계에 나쁜 영향을 줄 수 있어요. 작은 양의 남은 약도 올바르게 배출하는 습관이 필요해요." },
  { icon: "♻️", topic: "오늘부터 실천해요", title: "약은 종류에 맞게, 폐의약품 수거함으로.", description: "위 안내에서 약 종류별 준비 방법을 확인하세요. 방문할 수거처의 포장·용기 기준을 확인하고 배출하면, 약이 분리 수거되어 소각 처리될 수 있어요." }
];
let reasonIndex = 0;
const reasonCard = document.getElementById("reason-card");
const reasonError = document.getElementById("reason-error");
const reasonControls = document.getElementById("reason-controls");
const reasonPrev = document.getElementById("reason-prev");
const reasonNext = document.getElementById("reason-next");
const reasonPosition = document.getElementById("reason-position");

function showReason(index) {
  const card = reasonCards[index];
  const valid = Boolean(card && card.title && card.description && card.topic && card.icon);
  reasonCard.hidden = !valid;
  reasonControls.hidden = !valid;
  reasonError.hidden = valid;
  if (!valid) return;
  reasonIndex = index;
  document.getElementById("reason-icon").textContent = card.icon;
  document.getElementById("reason-topic").textContent = card.topic;
  document.getElementById("reason-title").textContent = card.title;
  document.getElementById("reason-description").textContent = card.description;
  reasonPosition.textContent = `${index + 1} / ${reasonCards.length}`;
  reasonPosition.setAttribute("aria-label", `전체 ${reasonCards.length}장 중 ${index + 1}번째 카드`);
  reasonPrev.disabled = index === 0;
  reasonNext.disabled = index === reasonCards.length - 1;
}

reasonPrev.addEventListener("click", () => showReason(Math.max(0, reasonIndex - 1)));
reasonNext.addEventListener("click", () => showReason(Math.min(reasonCards.length - 1, reasonIndex + 1)));
document.getElementById("retry-reasons").addEventListener("click", () => showReason(reasonIndex));
showReason(0);

// O는 true, X는 false입니다. 문제와 해설은 위 대전시 안내를 기준으로 합니다.
const quizQuestions = [
  { question: "남은 물약은 싱크대에 흘려보내도 괜찮아요.", answer: false, explanation: "약 성분은 물을 오염시킬 수 있어요. 물약은 새지 않게 밀폐용기에 담아 폐의약품 수거함에 배출해요." },
  { question: "가루약은 약 포지를 뜯지 않고 그대로 배출해요.", answer: true, explanation: "대전시 안내에 따르면 가루약은 약 포지 상태 그대로 배출해요. 개인정보가 적힌 겉 약봉투는 따로 분리하세요." },
  { question: "남은 연고는 겉 종이상자만 분리하고 튜브째 배출해요.", answer: true, explanation: "연고를 짜낼 필요는 없어요. 겉 종이상자를 분리하고 마개를 닫아 튜브나 용기 그대로 폐의약품 수거함으로 가져가세요." }
];
const quizStorageKey = "yakso-quiz-score-v1";
const quizArea = document.getElementById("quiz-question-area");
const quizQuestion = document.getElementById("quiz-question");
const quizPosition = document.getElementById("quiz-position");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizResult = document.getElementById("quiz-result");
const quizScoreHeading = document.getElementById("quiz-score");
const quizRecent = document.getElementById("quiz-recent");
const quizButtons = [document.getElementById("quiz-o"), document.getElementById("quiz-x")];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function showQuizQuestion() {
  quizAnswered = false;
  quizArea.hidden = false;
  quizResult.hidden = true;
  quizPosition.textContent = `문제 ${quizIndex + 1} / ${quizQuestions.length}`;
  quizQuestion.textContent = quizQuestions[quizIndex].question;
  quizFeedback.replaceChildren();
  quizNext.disabled = true;
  quizNext.textContent = quizIndex === quizQuestions.length - 1 ? "결과 보기" : "다음 문제";
  quizButtons.forEach(button => {
    button.disabled = false;
    button.setAttribute("aria-pressed", "false");
  });
}

function answerQuiz(answer) {
  if (quizAnswered || quizIndex >= quizQuestions.length) return;
  quizAnswered = true;
  const current = quizQuestions[quizIndex];
  const correct = answer === current.answer;
  if (correct) quizScore++;
  quizButtons.forEach((button, index) => {
    button.disabled = true;
    button.setAttribute("aria-pressed", String(answer === (index === 0)));
  });
  const verdict = document.createElement("strong");
  verdict.textContent = `${correct ? "정답이에요!" : "아쉬워요."} 정답은 ${current.answer ? "O" : "X"}예요.`;
  const explanation = document.createElement("p");
  explanation.textContent = current.explanation;
  quizFeedback.append(verdict, explanation);
  quizNext.disabled = false;
}

function showQuizResult() {
  quizArea.hidden = true;
  quizResult.hidden = false;
  quizScoreHeading.textContent = `${quizQuestions.length}문제 중 ${quizScore}개 정답 · ${quizScore} / ${quizQuestions.length}점`;
  document.getElementById("quiz-result-message").textContent = quizScore === quizQuestions.length
    ? "모두 맞혔어요! 배운 내용을 일상에서도 실천해 보세요."
    : "수고했어요! 위 배출 안내와 카드뉴스를 읽고 다시 도전해 보세요.";
  try {
    localStorage.setItem(quizStorageKey, JSON.stringify({ correct: quizScore, total: quizQuestions.length }));
    quizRecent.textContent = `최근 완료 결과: ${quizScore} / ${quizQuestions.length}점`;
  } catch {
    quizRecent.textContent = "이번 결과는 저장하지 못했어요. 다시 풀기는 계속 사용할 수 있어요.";
  }
  quizScoreHeading.focus();
}

quizButtons[0].addEventListener("click", () => answerQuiz(true));
quizButtons[1].addEventListener("click", () => answerQuiz(false));
quizNext.addEventListener("click", () => {
  if (!quizAnswered || quizIndex >= quizQuestions.length) return;
  quizIndex++;
  if (quizIndex === quizQuestions.length) {
    showQuizResult();
  } else {
    showQuizQuestion();
    quizQuestion.focus();
  }
});
document.getElementById("quiz-restart").addEventListener("click", () => {
  quizIndex = 0;
  quizScore = 0;
  showQuizQuestion();
  quizQuestion.focus();
});

try {
  const saved = JSON.parse(localStorage.getItem(quizStorageKey));
  if (saved && saved.total === quizQuestions.length && Number.isInteger(saved.correct) && saved.correct >= 0 && saved.correct <= saved.total) {
    quizRecent.textContent = `최근 완료 결과: ${saved.correct} / ${saved.total}점`;
  }
} catch {
  // 저장이 제한되거나 이전 데이터가 잘못되어도 퀴즈는 정상적으로 시작합니다.
}
showQuizQuestion();
