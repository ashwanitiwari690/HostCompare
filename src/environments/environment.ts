export const environment = {
  production: false,

  // Earnivo reward verification — the campaign credential from the Earnivo
  // agent panel (Campaign > Website Verification > API Key). Visitors sent
  // here by an Earnivo Website Promotion campaign arrive with a one-time
  // token in the URL; the reward widget pairs that token with this key to
  // confirm the visit and credit the visitor's wallet. Leave blank to
  // disable the widget entirely.
  earnivoApiBaseUrl: 'https://api.admobility.in/api',
  earnivoApiKey: 'ak_d829cba309a1e6de739f3d29a26478428e7c7594f219d99e',

  siteUrl: 'https://host-compare.vercel.app',
  contactEmail: 'ashwini12tiwari@gmail.com',
  adsensePublisherId: 'pub-2030586584805301',
};
