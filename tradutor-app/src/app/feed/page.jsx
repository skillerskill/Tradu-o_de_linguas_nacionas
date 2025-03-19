"use client";
import { useState } from 'react';
import styles from './Home.module.css';

// Componente de Header
function Header() {
  return (
    <header className={styles.header}>
      <h1>Tradutor de Kikongo/Kimbundo para Português</h1>
      <p>Traduza palavras e frases de Kikongo ou Kimbundo para Português e vice-versa.</p>
    </header>
  );
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('kikongo');
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);

  // Função simulada de tradução
  const translateText = (text, language) => {
    const translations = {
      kikongo: {
        'ola': 'Matondo',
        'mundo': 'mundo',
        // Adicione mais traduções de Kikongo para Português aqui
      },
      kimbundo: {
        'ola': 'olá',
        'mundo': 'mundo',
        // Adicione mais traduções de Kimbundo para Português aqui
      },
      portugues: {
        'olá': 'ola',
        'mundo': 'mundo',
        // Adicione mais traduções de Português para Kikongo/Kimbundo aqui
      },
    };

    return translations[language][text.toLowerCase()] || `Tradução não encontrada para "${text}"`;
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      alert('Por favor, insira um texto para traduzir.');
      return;
    }

    const newTranslation = translateText(inputText, selectedLanguage);
    setTranslatedText(newTranslation);

    // Adiciona tradução ao histórico
    setHistory([`${inputText} → ${newTranslation} (${selectedLanguage})`, ...history]);
  };

  return (
    <div className={styles.container}>
      <Header />

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className={styles.inputText}
        placeholder="Digite a palavra ou frase"
      />

      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className={styles.selectLanguage}
      >
        <option value="kikongo">Kikongo para Português</option>
        <option value="kimbundo">Kimbundo para Português</option>
        <option value="portugues">Português para Kikongo/Kimbundo</option>
      </select>

      <button onClick={handleTranslate} className={styles.translateButton}>
        Traduzir
      </button>

      <div className={styles.resultArea}>
        <h3>Resultado:</h3>
        <p>{translatedText || 'A tradução aparecerá aqui...'}</p>
      </div>

      <div className={styles.history}>
        <h3>Histórico de Traduções</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index} className={styles.historyItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}