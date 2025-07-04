// api/ask-guide.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Não precisamos mais do 'loadEnv' do Vite aqui

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

    // --- A CORREÇÃO DEFINITIVA ESTÁ AQUI ---
    // Em produção, a Vercel injeta as variáveis de ambiente diretamente no 'process.env'.
    // Este é o método padrão e mais robusto para um ambiente de servidor.
    const API_KEY = process.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
      // Esta mensagem de erro agora será mais clara no log da Vercel
      throw new Error("ERRO DE SERVIDOR: A variável de ambiente VITE_GEMINI_API_KEY não foi encontrada no ambiente de produção da Vercel.");
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
    console.error('[ERRO NA API /api/ask-guide]', error);
    return res.status(500).json({ error: error.message || 'Desculpe, não consegui encontrar a resposta agora.' });
  }
}