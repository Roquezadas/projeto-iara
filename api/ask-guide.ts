// api/ask-guide.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadEnv } from 'vite';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { locationName, question } = req.body;
    if (!locationName || !question) {
      return res.status(400).json({ error: 'Nome do local e pergunta são obrigatórios.' });
    }

    const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), '');
    const API_KEY = env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
      throw new Error("Chave da API do Gemini não configurada no servidor.");
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `
      Você é "Iara", uma guia turística historiadora, apaixonada e especialista na cidade de Manaus.
      Seu tom é amigável, informativo e cheio de curiosidades.
      Um usuário está a visitar o local: "${locationName}".
      Ele fez a seguinte pergunta: "${question}".
      
      Responda à pergunta do usuário de forma concisa e interessante, mantendo a sua persona de guia especialista.
      Se a pergunta for fora do tópico sobre o local ou sobre a história de Manaus, gentilmente o traga de volta ao assunto.
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    
    return res.status(200).json({ answer });

  } catch (error: any) {
    console.error('[API_ERROR /api/ask-guide]', error);
    return res.status(500).json({ error: 'Desculpe, não consegui encontrar a resposta agora.' });
  }
}