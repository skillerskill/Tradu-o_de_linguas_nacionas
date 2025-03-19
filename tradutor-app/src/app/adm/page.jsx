"use client";
import { useState, useEffect } from 'react';
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

// Componente de Menu Lateral
function Sidebar({ onSelectOption }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Menu de Admin</h2>
      <ul>
        <li>
          <button onClick={() => onSelectOption('listUsers')}>Listar Usuários</button>
        </li>
        <li>
          <button onClick={() => onSelectOption('deleteUsers')}>Deletar Usuários</button>
        </li>
        <li>
          <button onClick={() => onSelectOption('updateTranslations')}>Atualizar Traduções</button>
        </li>
      </ul>
    </aside>
  );
}

// Componente Principal
export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const [language, setLanguage] = useState('kikongo'); // Estado para a linguagem selecionada
  const [word, setWord] = useState(''); // Estado para a palavra
  const [meaning, setMeaning] = useState(''); // Estado para o significado
  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/users'); // Endpoint da API para buscar usuários
      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Atualiza o estado com os usuários recebidos
      } else {
        console.error('Erro ao buscar usuários');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Função para deletar um usuário
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuário deletado com sucesso!');
        fetchUsers(); // Atualiza a lista de usuários após a exclusão
      } else {
        alert('Erro ao deletar usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  // Busca os usuários quando a opção "Listar Usuários" é selecionada
  useEffect(() => {
    if (selectedOption === 'listUsers') {
      fetchUsers();
    }
  }, [selectedOption]);

  // Função para lidar com a seleção de opções no menu lateral
  const handleMenuSelection = (option) => {
    setSelectedOption(option);
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      language,
      word,
      meaning,
    };

    try {
      const response = await fetch('http://localhost:9000/api/translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Tradução adicionada com sucesso!');
        setWord('');
        setMeaning('');
      } else {
        alert('Erro ao adicionar tradução.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  // Renderiza o conteúdo com base na opção selecionada
  const renderContent = () => {
    switch (selectedOption) {
      case 'listUsers':
        return (
          <div className={styles.contentSection}>
            <h2>Listar Usuários</h2>
            <table className={styles.usersTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Data de Registro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className={styles.deleteButton}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'deleteUsers':
        return (
          <div className={styles.contentSection}>
            <h2>Deletar Usuários</h2>
            <p>Aqui você pode deletar usuários do sistema.</p>
          </div>
        );
      case 'updateTranslations':
        return (
          <div className={styles.contentSection}>
            <h2>Atualizar Traduções</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Linguagem:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={styles.selectLanguage}
                >
                  <option value="kikongo">Kikongo</option>
                  <option value="kimbundo">Kimbundo</option>
                  <option value="portugues">Português</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Palavra:</label>
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className={styles.inputText}
                  placeholder="Digite a palavra"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Significado:</label>
                <input
                  type="text"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  className={styles.inputText}
                  placeholder="Digite o significado"
                  required
                />
              </div>
              <button type="submit" className={styles.translateButton}>
                Adicionar Tradução
              </button>
            </form>
          </div>
        );
      default:
        return (
          <div className={styles.contentSection}>
            <h2>Bem-vindo ao Painel de Admin</h2>
            <p>Selecione uma opção no menu lateral para começar.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainLayout}>
        <Sidebar onSelectOption={handleMenuSelection} />
        <div className={styles.mainContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}