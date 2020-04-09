function createObj(en, zh) {
  return { en, zh };
}
export const TEXT = {
  portfolio: createObj("Portfolio", "組合"),
  hsi: createObj("HSI", "恆指"),
  maxDD: createObj("Max. Drawdown", "最大回撤"),
  summary: createObj("Summary", "概要"),
  stocks: createObj("Stocks", "股票"),
  value: createObj("Value", "值"),
  portion: createObj("Portion", "比例"),
  statistics: createObj("Statistics", "統計"),
  alpha: createObj("Alpha", "阿爾法"),
  beta: createObj("Beta", "貝塔"),
  sharpe: createObj("Sharpe", "夏普"),
  sortino: createObj("Sortino", "索提諾"),
  hedge: createObj(
    "Completely hedge your portfolio by shorting:",
    "將組合完全對沖:"
  ),
  contracts: createObj("contracts of", "張"),
  correlation: createObj("Correlation", "相關"),
  calculations: createObj(
    "Calculations based on 750 days of daily returns",
    "用750天每日回報計算"
  ),
  createPortfolio: createObj("Create a Portfolio", "加投資組合"),
  submit: createObj("Submit", "提交"),
  stockCode: createObj("Stock Code", "股票代號"),
  amount: createObj("Amount", "錢"),
  welcome: createObj("Welcome back!", "歡迎回來!"),
  register: createObj("Register", "申請"),
  forgotPassword: createObj("Forgot password", "忘記密碼"),
  login: createObj("Login", "登入"),
  password: createObj("Password", "密碼"),
  email: createObj("Email", "電郵"),
  confirmPassword: createObj("Confirm Password", "確認密碼"),
  resetPassword: createObj("Reset Password", "重設密碼"),
  wrongPassword: createObj("Wrong Password", "密碼錯誤"),
  verifyEmail: createObj("Please verify your email", "請確認你的電郵"),
  sendForgotPassword: createObj("Password reset email has been sent", "已發出電郵重設密碼"),
};
