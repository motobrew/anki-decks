import shortid from 'shortid';

export async function ask(question: string) {
  const id: string = shortid.generate();
  console.log(id); // 短いランダムなIDが表示されます。
  const content = `
  give me 3 sentences using "${question}"
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

//   const answer = `## Response
// ### English Sentences
// E-1: It's time for you to grow up and start taking responsibility for your actions.
// E-2: When I grow up, I want to be a doctor and help people.
// E-3: My parents always wanted me to grow up to be a successful businessman.
// ### Japanese Translation
// J-1: あなたは責任を持つように成長して、行動を取り始める時が来たんだ。
// J-2: 大人になったら、医者になって人を助けたいと思っています。
// J-3: 私の両親は、私が成功したビジネスマンになるように成長するのを常に望んでいました。`

  console.log(content);
}

ask("help out");