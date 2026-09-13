export const environment = {
  production: true,

  // Earnivo reward verification — the campaign credential from the Earnivo
  // agent panel (Campaign > Website Verification > API Key). Visitors sent
  // here by an Earnivo Website Promotion campaign arrive with a one-time
  // token in the URL; the reward widget pairs that token with this key to
  // confirm the visit and credit the visitor's wallet. Leave blank to
  // disable the widget entirely.
  earnivoApiBaseUrl: 'https://api.earnivo.example.com/api',
  earnivoApiKey: '',
};
