import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_APP_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
