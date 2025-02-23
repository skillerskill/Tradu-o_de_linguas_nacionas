"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@traducao.com' && password === '12345') {
      router.push('/dashboard');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          
          <label htmlFor="password" className={styles.label}>Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          
          <button type="submit" className={styles.button}>Entrar</button>
          
          <div className={styles.forgot-password}>
            <a href="#">Esqueceu a senha?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
