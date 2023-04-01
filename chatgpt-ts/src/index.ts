import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export async function ask(question: string, model = "gpt-3.5-turbo-0301") {

  const content = `
  I'm learning English slang.
  give me 3 sentences using "${question}" as slang,
  and put into 2 sections: English sentences and Japanese translation
  then enclose query keywords in <u> tags
  like the following format

  ## Response
  ### English Sentences
  E-1: Don't forget to <u>lock up</u> the doors before you leave the house.
  E-2: The security guard will <u>lock up</u> the building at 10 PM every night.
  E-3: The police will <u>lock up</u> the criminals in jail.
  
  ### Japanese Translation
  J-1: 家を出る前にドアを<u>施錠</u>するのを忘れないでください。
  J-2: セキュリティーガードは毎晩10時に建物を<u>施錠</u>します。
  J-3: 警察は犯罪者を刑務所に<u>監禁</u>します。
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