async function testConnection() {
  console.log('🧪 Iniciando teste de conexão...');

  try {
    // Importa a configuração do Supabase
    const { supabase } = await import('./src/config/supabase.js');
    
    console.log('✅ Supabase configurado com sucesso!');
    console.log('🔍 Testando conexão com a tabela: plano_verao');
    
    const { data, error } = await supabase
      .from('plano_verao')
      .select('*')
      .limit(5);
    
    if (error) {
      console.log('❌ Erro na consulta:', error.message);
      console.log('💡 Dica: Verifique se a tabela "plano_verao" existe no Supabase');
      return;
    }

    console.log('✅ Conexão com o banco bem-sucedida!');
    console.log(`📊 Encontrados ${data.length} registros na tabela plano_verao`);
    
    if (data.length > 0) {
      console.log('\n📄 Estrutura dos dados:');
      console.log('Colunas disponíveis:', Object.keys(data[0]));
      
      console.log('\n📋 Primeiros 2 registros:');
      data.slice(0, 2).forEach((client, index) => {
        console.log(`\n--- Cliente ${index + 1} ---`);
        console.log('Cliente:', client.cliente);
        console.log('Adesão:', client.aderido);
        console.log('Volume 2024:', client.volume_2024);
        console.log('Volume 2025:', client.volume_2025);
        console.log('Faturamento 2024:', client.faturamento_2024);
        console.log('Faturamento 2025:', client.faturamento_2025);
      });
    } else {
      console.log('ℹ️  A tabela existe mas está vazia.');
    }
    
  } catch (error) {
    console.log('❌ Erro geral:', error.message);
    console.log('Stack:', error.stack);
  }
}

// Executa a função
testConnection();