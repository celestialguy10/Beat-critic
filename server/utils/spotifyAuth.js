import axios from "axios";
import fs from "fs/promises"; // Node.js file system with promises
import qs from "qs";

const TOKEN_FILE_PATH = "./token.json";

const getStoredToken = async () => {
  try {
    const data = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
    const tokenData = JSON.parse(data);

    if (Date.now() < tokenData.expiresAt) {
      return tokenData.accessToken;
    }
    return null; // expired
  } catch (err) {
    return null; // file doesn't exist or is invalid
  }
};

const saveTokenToFile = async (accessToken, expiresIn) => {
  const bufferSeconds = 60; // 1 minute safety margin

  const tokenData = {
    accessToken,
    expiresAt: Date.now() + (expiresIn - bufferSeconds) * 1000,
  };
  await fs.writeFile(TOKEN_FILE_PATH, JSON.stringify(tokenData), "utf-8");
};

const getSpotifyToken = async () => {
  const cachedToken = await getStoredToken();
  if (cachedToken) return cachedToken;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    })
  );

  const newToken = response.data.access_token;
  const expiresIn = response.data.expires_in;

  await saveTokenToFile(newToken, expiresIn);

  return newToken;
};

export default getSpotifyToken;
