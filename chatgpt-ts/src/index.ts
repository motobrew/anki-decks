import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function ask(question: string, model = "gpt-3.5-turbo-0301") {

  const content = `
  Hi, I'm an English learner.
  Give me 2 sentences using "${question}", based on most commonly use cases.
  But if the keyword I give you has some different meanings, make sentences as different meaing as possible. Shorter is better for each sentence. (8~12 words)
  And then, put them into 2 sections: English sentences and Japanese translation,
  In addition to that, enclose in <u> tags both the keyword and corresponding translation.
  Your response must be complied to the following format.

  ## Response
  ### English Sentences
  E-1: The advertisement <u>pop up</u> on my computer screen while I was browsing.
  E-2: We decided to have a picnic if the weather <u>pop up</u> clear tomorrow.
  
  ### Japanese Translation
  J-1: 私がウェブを閲覧している間に広告が画面に<u>ポップアップ</u>しました。
  J-2: もし明日天気が<u>急によくなる</u>なら、ピクニックをすることにしました。
  `;

  const response = await openai.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: content }],
  });

  const answer = response.data.choices[0].message?.content;

  console.log(answer);
}

const args: string[] = process.argv.slice(2);

ask(args[0]);