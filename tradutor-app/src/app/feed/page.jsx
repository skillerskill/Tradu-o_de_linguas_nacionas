"use client";
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('kikongo');
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);

  const handleTranslate = () => {
    // Aqui você pode integrar com o sistema de tradução real
    const newTranslation = `${inputText} (tradução para ${selectedLanguage})`;
    setTranslatedText(newTranslation);

    // Adiciona tradução ao histórico
    setHistory([newTranslation, ...history]);
  };

  return (
    <div className={styles.container}>
      <h1>Tradutor de Kikongo/Kimbundo</h1>

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
        <option value="kikongo">Kikongo</option>
        <option value="kimbundo">Kimbundo</option>
        <option value="portugues">Português</option>
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
