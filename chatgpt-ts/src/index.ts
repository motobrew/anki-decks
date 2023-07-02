import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function ask(question: string, model = "gpt-3.5-turbo-0613") {

  const content = `
  Hi, I'm an English learner.
  Give me 2 sentences using "${question}" as idiom, based on most commonly use cases.
  But if the keyword I give you has some different meanings, make sentences as different meaing as possible.
  Shorter is better for each sentence. (8~12 words)
  And then, put them into 2 sections: English sentences and Japanese translation,
  In addition to that, enclose in <u> tags both the keyword and corresponding translation.

  Your response must be complied to the following format.
  Sentences are just example if the keyword was "pop up".

  ## Response
  ### English Sentences
  E-1: A <u>pop-up</u> alerted me of a new message on my phone.
  E-2: Unexpected obstacles often <u>pop up</u> at the worst times.
  
  ### Japanese Translation
  J-1: 携帯に<u>ポップアップ</u>が表示され、新しいメッセージがあることがわかりました。
  J-2: 思いもよらない障害が最悪の時に<u>現れること</u>がよくあります。
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