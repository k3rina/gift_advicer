import { API_KEY } from './consts';
async function sendChatGPTRequest(question: string): Promise<string[]> {
  try {
    const request_question = `Please suggest gift for person who is: ${question} return answer in Russian without numeration, split answers by ; `;
    const response = await fetch(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Замените YOUR_API_KEY на ваш ключ API
          // Authorization: `Bearer ${API_KEY}`,
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt: request_question,
          max_tokens: 100, // Максимальное количество токенов в ответе
          temperature: 0.75, // Уровень разнообразия ответа (чем выше, тем более разнообразный ответ)
          n: 4, // Количество различных ответов
          //   stop: ['\n'], // Символы для остановки генерации ответа
        }),
      }
    );

    const data = await response.json();
    const answer = data.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error(error);
    // Обработка ошибок
    return error as string[];
  }
}

export const getRequestFromStorage = (): string => {
  const finalRequestToApi = window.localStorage.getItem('request');
  const storageRequest = finalRequestToApi?.slice(0, -1);
  console.log(storageRequest);
  return storageRequest!;
};

export default sendChatGPTRequest;
