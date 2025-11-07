import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('🔌 Configurando Supabase...');
console.log('📋 SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Faltando');
console.log('🔑 SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurado' : '❌ Faltando');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Configure o arquivo .env com SUPABASE_URL e SUPABASE_ANON_KEY');
}

console.log('🚀 Cliente Supabase criado com sucesso!');
export const supabase = createClient(supabaseUrl, supabaseKey);