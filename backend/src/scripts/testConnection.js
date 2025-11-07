console.log('🧪 Iniciando teste de conexão...');

try {
  // Importa a configuração do Supabase
  const { supabase } = await import('./src/config/supabase.js');
  
  console.log('✅ Supabase configurado com sucesso!');
  console.log('🔍 Testando conexão com o banco...');
  
  // Substitua 'sua_tabela' pelo nome real da sua tabela
  const tableName = 'plano_verao';
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(2);
  
  if (error) {
    console.log('❌ Erro na consulta:', error.message);
    console.log('💡 Dica: Verifique o nome da tabela no Supabase');
  } else {
    console.log('✅ Conexão com o banco bem-sucedida!');
    console.log(`📊 Encontrados ${data.length} registros`);
    
    if (data.length > 0) {
      console.log('📄 Primeiro registro:');
      console.log(JSON.stringify(data[0], null, 2));
    }
  }
  
} catch (error) {
  console.log('❌ Erro geral:', error.message);
}