export const environment = {
  production: false,

  // Earnivo reward verification — the campaign credential from the Earnivo
  // agent panel (Campaign > Website Verification > API Key). Visitors sent
  // here by an Earnivo Website Promotion campaign arrive with a one-time
  // token in the URL; the reward widget pairs that token with this key to
  // confirm the visit and credit the visitor's wallet. Leave blank to
  // disable the widget entirely.
  earnivoApiBaseUrl: 'http://localhost:4227/api',
  earnivoApiKey: 'ak_82617656f44223f158d9b3ed4e4b72e7253b4a59d0259d1e',
};
