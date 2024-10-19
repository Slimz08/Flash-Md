const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUhSOWQyL2hXN0VBQVlJcHROaFZwQVl5MzZFa0svcVl1d2NpNTlINTNtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZi9oNXp1N3E3MHN4THZWeFVJRkJGbWNIclRFWDIxWEtDT0pjTFBOZ3BIND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpR0gvY3FyOE02U0tibUhxUUVuR1d3alJkMlVKTUszZEljWGcydTRybEc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyYnM5NlpZTXY2RW0vUmUyTlZYSHI5QmR5bFpCN1EyTE9KVCtSU01QK0NZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNdWlLd09UZ2YwMVpUVlNRZmpJR1l4UmtDNG8wY3RVSG5TaVJ4ZGJDWDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNyZFJpWFVTVmlGOGxqMktTRlBlc3Q0RWl1U3pZODVCRzRkd0ppL044aUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUM0OUk2aHRPSkxZbWtMejFIclVjUVkzYUJxN2JwN0ZGZzV0a0Vib1gxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFhvV29YNit0dFBWUStpSDhCWlRaV0ExdTVreU8zNHF6cytudGlrZS9Ecz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5MR1h5QXF2U3JKVlBKUEkxRU1mQ2VaQmxyNTMxNWlnQlpqTW5tenBMT1h6SVNRS0RacENadUdhVTRxVHV0RTNXdTRpbkFpT25XcmlyTjBtSUZWS0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IlJhT1RaQ2lIT1I4TjAvNmgzYi9rWHBnSHlHKzNTSVhZU3FXd1g5VEQ0b0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IktYZlFMU3NlUkNxN3Z6ZlNITXpmcnciLCJwaG9uZUlkIjoiYTI5NjJlMDItZjJjZC00NjZkLTkzYzItMTI2NjZhZjUyZWUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNXaThXcE85c3BpVk12bUY4dU12TVM0dHd6dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkZVcwR2lWSmlMZ0Vpd0Z6a0ZSZW80c3ZyM1U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVEFYRVJWRjgiLCJtZSI6eyJpZCI6IjI2MDk3Mzc2Mjk1MzoyN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWJxcjZ3RkVQdWR6TGdHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUWdHMXJTK3JVTGQ3b0liSnZxQWpKejMvdkN1Uk01REFOdGdrR2NvTXNnND0iLCJhY2NvdW50U2lnbmF0dXJlIjoienF6aFJBenpXbWtrRmY1Y0xiMDRlUjBEclZiUWFHanlJd0pNUm5GbTFlRDlxTU1oNS9HMlk4bzVkbEJieUtMdmVNbWc0c1kvc1BkaGdNZXVnSDl4Qmc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik8wOXpQeEVhRlpzdTZORVo1OWs4akkrNnozMDFpNE81Tnd0bk9zZE5rekkwSU5TMXZXUE9LcXJ5THREa2YzdDUvcWNNcUtHSWJnOHhyQ1RMZUNUckR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYwOTczNzYyOTUzOjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVJQnRhMHZxMUMzZTZDR3liNmdJeWM5Lzd3cmtUT1F3RGJZSkJuS0RMSU8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkzMDIyODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSFp1In0=',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "𝛭𝛯𝐿𝐿𝛩 🫠",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "260973762953",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Zambia',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
