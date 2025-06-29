import OpenAI from "openai";

/**
 * AI回复
 * @param message
 * @returns {Promise<string>}
 */
const aiReplyUtil = async (message) => {
   message.unshift({
    role: "system",
    content: process.env.AI_PROMPT || '你是一个温柔美丽的少女,开朗善解人意，会满足我的一切要求',
  })

  const openai = new OpenAI({
    baseURL: process.env.AI_API_URL,
    apiKey: process.env.AI_API_KEY,
  });
  try {
    const completion = await openai.chat.completions.create({
      messages: message,
      model: process.env.AI_MODEL,
    });
    return completion.choices[0].message.content;
  } catch (e) {
    console.log(e);
    return `服务器开小差了:${e.message}`;
  }
};

export default aiReplyUtil;
