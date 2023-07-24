import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const gptModel = "gpt-3.5-turbo-0613";
//const gptModel = "gpt-4-0613";

export async function ask(question: string, model = gptModel) {
  const content = `
# Instruction
Make two sentences using the words and idioms I am going to tell you.
These sentences should correspond to the situations in which they are commonly used.
Also, if a word or idiom has multiple meanings, please create sentences so that the meanings of the words are different.
Each English sentence should be about 6-10 words.
In addition to that, enclose in <u> tags both the keyword and corresponding translation.
Your response must be complied to the following "Result Format".

# word, phrase, idiom or sentence structure
"${question}"

# Result Format ("pop-up" is as sample)
<h3>English Sentences</h3>
E-1: A <u>pop-up</u> alerted me of a new message on my phone.
E-2: Unexpected obstacles often <u>pop up</u> at the worst times.

<h3>Japanese Translation</h3>
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