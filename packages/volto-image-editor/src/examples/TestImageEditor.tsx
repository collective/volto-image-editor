import React from 'react';
import ImageEditor from '../components/ImageEditor/ImageEditor';

const TestImageEditor = () => {
  const handleImageSave = (imageData: string) => {
    console.log('Image saved:', imageData);

    // Criar download automático para testar
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'edited-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancel = () => {
    console.log('Editor cancelled');
    alert('Editor cancelado');
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}
    >
      <h1 style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
        Teste do Editor de Imagem Avançado
      </h1>
      <ImageEditor
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        onImageSave={handleImageSave}
        onCancel={handleCancel}
      />

      <div
        style={{
          color: 'white',
          padding: '20px',
          fontSize: '14px',
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '5px',
        }}
      >
        <h4>Funcionalidades disponíveis:</h4>
        <ul style={{ margin: '10px 0' }}>
          <li>⚙️ Settings modal full-screen (acima da imagem)</li>
          <li>🔄 Reset geral (canto superior direito)</li>
          <li>↻ Reset rotação/flip (na toolbar, ativa quando há mudanças)</li>
          <li>🖱️ Slider com clique direto</li>
          <li>🎨 Ajustes de brilho, contraste, saturação, matiz</li>
          <li>📐 Aspect ratios variados</li>
          <li>⭕ Stencils: retângulo ou círculo</li>
          <li>📏 Configurações completas de cropping</li>
        </ul>
      </div>
    </div>
  );
};

export default TestImageEditor;
