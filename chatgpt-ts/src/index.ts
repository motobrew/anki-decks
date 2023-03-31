import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function ask(content: string, model = "gpt-3.5-turbo-0301") {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: content }],
  });

  const answer = response.data.choices[0].message?.content;
  console.log(answer);
}

const question = `
give me 3 sentences using "grow up"
and use the following format
## Response
### English Sentences
E-1: I am so happy to be spending time with my friends today.
E-2: Seeing my dog wag his tail always makes me feel so happy.
E-3: The happiest moments of my life have been spent with my family.
### Japanese Translation:
J-1: 私は今日友達と過ごせてとても幸せです。
J-2: 私の犬が尻尾を振るのを見ると、いつも幸せな気持ちになります。
J-3: 私の人生で最も幸せだった瞬間は家族と過ごしたものです。
`;
ask(question);